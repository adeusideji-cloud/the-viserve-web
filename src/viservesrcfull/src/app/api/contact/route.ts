import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, phone, subject, message, country } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone: phone || null,
    subject,
    message,
    country: country || null,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
