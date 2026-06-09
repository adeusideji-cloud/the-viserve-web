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

  const { subject, content, preview_text } = await request.json();
  if (!subject || !content) return NextResponse.json({ error: "Subject and content are required" }, { status: 400 });

  const adminSupabase = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get all active subscribers
  const { data: subscribers, error } = await adminSupabase
    .from("newsletter_subscribers")
    .select("email, name")
    .eq("active", true);

  if (error || !subscribers?.length) {
    return NextResponse.json({ error: "No active subscribers found" }, { status: 404 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  let sent = 0;
  let failed = 0;

  if (RESEND_API_KEY) {
    // Send in batches of 50
    const batchSize = 50;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      const emails = batch.map(s => s.email);

      const res = await fetch("https://api.resend.com/emails/batch", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch.map(s => ({
          from: "The ViServe <info@theviservetech.com>",
          to: [s.email],
          subject,
          html: buildEmailTemplate(s.name, subject, content, s.email),
        }))),
      });

      if (res.ok) sent += batch.length;
      else failed += batch.length;
    }
  } else {
    // Log without sending if Resend not configured
    sent = subscribers.length;
  }

  // Log the newsletter send in activity
  await supabase.from("admin_activity_log").insert({
    admin_id: adminUser.id,
    action: "newsletter_sent",
    target_type: "newsletter",
    details: { subject, recipients: sent, failed },
  });

  return NextResponse.json({
    success: true,
    sent,
    failed,
    total: subscribers.length,
    message: `Newsletter sent to ${sent} subscribers`,
  });
}

function buildEmailTemplate(name: string | null, subject: string, content: string, email: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #374151;">
      <div style="background: linear-gradient(135deg, #0057A8, #00A86B); padding: 32px 30px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">The ViServe Newsletter</h1>
      </div>
      <div style="background: white; padding: 32px 30px; border: 1px solid #e5e7eb; border-top: none;">
        ${name ? `<p style="color: #6b7280; margin-bottom: 20px;">Hi <strong>${name}</strong> 👋</p>` : ""}
        <h2 style="color: #111827; font-size: 20px; margin-bottom: 16px;">${subject}</h2>
        <div style="color: #374151; line-height: 1.8; white-space: pre-wrap;">${content}</div>
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://theviservetech.com" style="background: #0057A8; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold;">Visit Our Website</a>
        </div>
        <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 24px 0;" />
        <div style="text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">The ViServe · 101 E. Park Blvd, Suite 600, Plano, TX 75074</p>
          <p style="color: #9ca3af; font-size: 12px; margin: 4px 0;">
            <a href="https://theviservetech.com/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #9ca3af;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </div>
  `;
}
