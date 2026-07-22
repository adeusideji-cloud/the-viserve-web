import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Allow both authenticated admin requests AND setup key
  const isSetupKey = body.setup_key === "viserve-init-2026-secure";

  if (!isSetupKey) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id,role,is_active")
      .eq("auth_user_id", user.id)
      .single();

    if (!adminUser?.is_active || adminUser.role !== "superadmin") {
      return NextResponse.json({ error: "Only superadmins can create admin accounts" }, { status: 403 });
    }
  }

  const { full_name, email, password, role = "admin" } = body;
  if (!full_name || !email || !password) {
    return NextResponse.json({ error: "full_name, email, and password are required" }, { status: 400 });
  }

  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Create auth user
  const { data: newUser, error: authError } = await adminSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, is_admin: true },
  });

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

  // Add to admin_users table
  const { data: adminRecord, error: dbError } = await adminSupabase
    .from("admin_users")
    .insert({ auth_user_id: newUser.user.id, email, full_name, role })
    .select()
    .single();

  if (dbError) {
    await adminSupabase.auth.admin.deleteUser(newUser.user.id);
    return NextResponse.json({ error: dbError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, admin: adminRecord });
}
