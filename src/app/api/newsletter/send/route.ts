import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("id, role, is_active, full_name")
    .eq("auth_user_id", user.id)
    .single();

  if (!adminUser?.is_active || !["superadmin", "admin"].includes(adminUser.role)) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const { subject, content } = await request.json();
  if (!subject || !content) return NextResponse.json({ error: "Subject and content are required" }, { status: 400 });

  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get all active subscribers
  const { data: subscribers, error } = await adminSupabase
    .from("newsletter_subscribers")
    .select("id, email, name")
    .eq("active", true);

  if (error) return NextResponse.json({ error: "Could not fetch subscribers." }, { status: 500 });
  if (!subscribers?.length) return NextResponse.json({ error: "No active subscribers found." }, { status: 404 });

  // Log the newsletter for record keeping (non-blocking)
  try {
    await adminSupabase.from("admin_activity_log").insert({
      admin_id: adminUser.id,
      action: "newsletter_composed",
      target_type: "newsletter",
      details: { subject, recipients: subscribers.length, preview: content.slice(0, 100) },
    });
  } catch { /* non-blocking */ }

  return NextResponse.json({
    success: true,
    sent: subscribers.length,
    message: `Newsletter recorded for ${subscribers.length} subscribers.`,
    subscribers: subscribers.map(s => ({ email: s.email, name: s.name })),
  });
}
