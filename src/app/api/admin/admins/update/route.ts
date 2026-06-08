import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Update or delete an admin (superadmin only) - pass id in body
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminUser } = await supabase.from("admin_users").select("id,role,is_active").eq("auth_user_id", user.id).single();
  if (!adminUser?.is_active || adminUser.role !== "superadmin") return NextResponse.json({ error: "Superadmin only" }, { status: 403 });

  const body = await request.json();
  const { target_id, action, ...updates } = body;
  if (!target_id) return NextResponse.json({ error: "target_id required" }, { status: 400 });

  const adminSupabase = createAdminClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  if (action === "delete") {
    if (adminUser.id === target_id) return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
    const { data: targetAdmin } = await adminSupabase.from("admin_users").select("auth_user_id").eq("id", target_id).single();
    if (targetAdmin) await adminSupabase.auth.admin.deleteUser(targetAdmin.auth_user_id);
    await adminSupabase.from("admin_users").delete().eq("id", target_id);

    await supabase.from("admin_activity_log").insert({ admin_id: adminUser.id, action: "admin_deleted", target_id });
    return NextResponse.json({ success: true });
  }

  // Update: role, is_active, etc.
  const allowedUpdates: Record<string, unknown> = {};
  if (updates.is_active !== undefined) allowedUpdates.is_active = updates.is_active;
  if (updates.role !== undefined) allowedUpdates.role = updates.role;

  const { data, error } = await adminSupabase.from("admin_users").update(allowedUpdates).eq("id", target_id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await supabase.from("admin_activity_log").insert({
    admin_id: adminUser.id, action: "admin_updated", target_id, details: allowedUpdates,
  });

  return NextResponse.json({ success: true, admin: data });
}
