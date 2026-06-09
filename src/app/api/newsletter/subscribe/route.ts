import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, name } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, active")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (existing) {
    if (existing.active) {
      return NextResponse.json({ error: "This email is already subscribed! Check your inbox for our latest updates." }, { status: 400 });
    }
    // Re-activate unsubscribed user
    await supabase.from("newsletter_subscribers")
      .update({ active: true, name: name || null, subscribed_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email: email.toLowerCase().trim(),
      name: name?.trim() || null,
      active: true,
      subscribed_at: new Date().toISOString(),
    });
    if (error) return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
