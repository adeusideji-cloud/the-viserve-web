import { NextRequest, NextResponse } from "next/server";

const SETUP_KEY = "viserve-init-2026-secure";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (body.key !== SETUP_KEY) return NextResponse.json({ error: "Invalid key" }, { status: 403 });

  const projectRef = "qaiiadeqktohmllbvnnw";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  // Get management API token via service role (using the platform API)
  const res = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Note: Management API needs dashboard token, not service role
      // We'll use direct pg connection via Supabase REST instead
    },
    body: JSON.stringify({ query: "SELECT 1" }),
  });

  // Use Supabase's pg endpoint via service role
  const { createClient } = await import("@supabase/supabase-js");
  const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  const results: string[] = [];

  // Check if tables exist and create if not
  const checks = [
    {
      name: "admin_users",
      sql: `INSERT INTO public.admin_users (email, full_name, role, is_active) VALUES ('__check__', '__check__', 'admin', false) ON CONFLICT (email) DO NOTHING`,
    }
  ];

  const { error: checkError } = await admin.from("admin_users").select("id").limit(1);

  if (checkError?.code === "42P01") {
    // Table doesn't exist - we need Management API
    // Try GitHub Actions trigger approach instead
    results.push("Tables need to be created via Supabase SQL Editor");

    return NextResponse.json({
      status: "needs_setup",
      message: "Please run the SQL below in your Supabase SQL Editor",
      sql: getSetupSQL(),
      results
    });
  }

  // Tables exist - create the first superadmin
  if (body.create_admin) {
    const { full_name, email, password } = body.create_admin;

    // Create auth user
    const { data: userData, error: userError } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name }
    });

    if (userError) return NextResponse.json({ error: userError.message }, { status: 400 });

    // Insert into admin_users
    const { error: insertError } = await admin.from("admin_users").insert({
      auth_user_id: userData.user.id,
      email,
      full_name,
      role: "superadmin",
    });

    if (insertError) {
      await admin.auth.admin.deleteUser(userData.user.id);
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    results.push(`✅ Superadmin created: ${email}`);
  }

  return NextResponse.json({ success: true, results });
}

function getSetupSQL() {
  return `
-- Run this in Supabase SQL Editor
create table if not exists public.admin_users (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid references auth.users on delete cascade unique,
  email text unique not null,
  full_name text not null,
  role text not null default 'admin' check (role in ('superadmin','admin','viewer')),
  is_active boolean default true,
  last_login timestamptz,
  created_at timestamptz default now(),
  created_by uuid
);
alter table public.admin_users enable row level security;

create table if not exists public.admin_activity_log (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references public.admin_users(id),
  action text not null, target_type text, target_id text, details jsonb,
  created_at timestamptz default now()
);
alter table public.admin_activity_log enable row level security;

alter table public.profiles add column if not exists status text default 'active';
alter table public.profiles add column if not exists admin_notes text;
alter table public.profiles add column if not exists assigned_admin uuid;
`.trim();
}
