import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, name } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, active")
    .eq("email", email)
    .single();

  if (existing) {
    if (existing.active) {
      return NextResponse.json({ error: "This email is already subscribed!" }, { status: 400 });
    }
    // Re-activate
    await supabase.from("newsletter_subscribers").update({ active: true, name: name || null }).eq("email", email);
  } else {
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      name: name || null,
      active: true,
      subscribed_at: new Date().toISOString(),
    });
    if (error) return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }

  // Send welcome email via Resend (if API key is configured)
  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The ViServe <info@theviservetech.com>",
        to: [email],
        subject: "Welcome to The ViServe Newsletter! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0057A8, #00A86B); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to The ViServe! 🌟</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Your immigration news source</p>
            </div>
            <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <p style="color: #374151; font-size: 16px;">Hi ${name || "there"}! 👋</p>
              <p style="color: #6b7280;">Thank you for subscribing to <strong>The ViServe Newsletter</strong>. You're now part of a community of <strong>10,000+ immigrants</strong> who stay ahead of every immigration update.</p>
              <p style="color: #6b7280;"><strong>What to expect:</strong></p>
              <ul style="color: #6b7280;">
                <li>✅ Latest USCIS policy changes and announcements</li>
                <li>✅ Visa bulletin updates and priority date movements</li>
                <li>✅ Urgent action alerts and deadline reminders</li>
                <li>✅ Expert tips and how-to guides</li>
                <li>✅ Success stories from our clients</li>
              </ul>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://theviservetech.com" style="background: #0057A8; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 15px;">Visit Our Website →</a>
              </div>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
              <p style="color: #9ca3af; font-size: 12px; text-align: center;">
                101 E. Park Blvd, Suite 600, Plano, TX 75074 | +1 (737) 344-5599<br/>
                <a href="https://theviservetech.com/newsletter/unsubscribe?email=${encodeURIComponent(email)}" style="color: #9ca3af;">Unsubscribe</a>
              </p>
            </div>
          </div>
        `,
      }),
    }).catch(() => {}); // Silently fail if Resend not configured
  }

  return NextResponse.json({ success: true, message: "Successfully subscribed!" });
}
