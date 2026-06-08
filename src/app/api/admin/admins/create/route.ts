import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify superadmin
  const { data: adminUser } = await supabase.from("admin_users").select("id,role,is_active").eq("auth_user_id", user.id).single();
  if (!adminUser?.is_active || adminUser.role !== "superadmin") {
    return NextResponse.json({ error: "Only superadmins can create admin accounts" }, { status: 403 });
  }

  const { full_name, email, password, role } = await request.json();
  if (!full_name || !email || !password || !role) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Use service role to create user
  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Create auth user
  const { data: newUser, error: authError } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role: "admin" },
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

  // Add to admin_users table
  const { error: dbError } = await adminSupabase.from("admin_users").insert({
    auth_user_id: newUser.user.id,
    email,
    full_name,
    role,
    created_by: adminUser.id,
  });

  if (dbError) {
    await adminSupabase.auth.admin.deleteUser(newUser.user.id);
    return NextResponse.json({ error: dbError.message }, { status: 400 });
  }

  // Log activity
  await supabase.from("admin_activity_log").insert({
    admin_id: adminUser.id,
    action: "admin_created",
    target_type: "admin_user",
    target_id: newUser.user.id,
    details: { email, role, full_name },
  });

  return NextResponse.json({ success: true, message: `Admin ${full_name} created` });
}
