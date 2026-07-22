import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Allow any admin to change their own password
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminUser } = await supabase.from("admin_users").select("id,is_active").eq("auth_user_id", user.id).single();
  if (!adminUser?.is_active) return NextResponse.json({ error: "Admin account inactive" }, { status: 403 });

  const { current_password, new_password } = await request.json();
  if (!new_password || new_password.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters" }, { status: 400 });
  }

  // Verify current password
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: current_password,
  });
  if (signInError) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });

  // Update password using admin client
  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: updateError } = await adminSupabase.auth.admin.updateUserById(user.id, {
    password: new_password,
  });

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 400 });

  await supabase.from("admin_activity_log").insert({
    admin_id: adminUser.id,
    action: "password_changed",
    target_type: "admin_user",
    target_id: adminUser.id,
  });

  return NextResponse.json({ success: true, message: "Password updated successfully" });
}
