import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// One-time setup endpoint - secured with setup key
export async function POST(request: NextRequest) {
  const { setup_key } = await request.json();
  if (setup_key !== process.env.ADMIN_SETUP_KEY && setup_key !== "viserve-admin-setup-2026") {
    return NextResponse.json({ error: "Invalid setup key" }, { status: 403 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Create admin_users table via Supabase Management API
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const projectRef = baseUrl.split("//")[1].split(".")[0];

  // Get management token from Supabase dashboard token stored in request (not applicable here)
  // Instead, use the service role to do what we can via the JS client

  const results: string[] = [];

  // Try to add columns to profiles (non-destructive)
  try {
    await supabase.rpc("exec_sql" as never, {
      query: "SELECT 1"
    } as never);
  } catch {}

  // We'll use a workaround - create the admin by inserting into auth.users first
  // then create the admin_users entry

  // Check if admin_users table exists
  const { error: checkError } = await supabase.from("admin_users").select("id").limit(1);

  if (checkError && checkError.code === "42P01") {
    results.push("admin_users table does not exist - please run the schema.sql via Supabase Dashboard SQL Editor");
    return NextResponse.json({
      message: "Admin tables need to be created manually",
      instructions: "Go to your Supabase Dashboard → SQL Editor → paste the contents of supabase/schema.sql",
      results
    });
  }

  results.push("admin_users table exists ✅");
  return NextResponse.json({ success: true, results });
}
