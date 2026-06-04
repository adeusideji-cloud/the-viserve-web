"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", country: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production, this would POST to /api/contact
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
  }

  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Our team is here to help you navigate your immigration journey. Reach out anytime.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", value: "info@theviserve.com", href: "mailto:info@theviserve.com" },
                    { icon: Phone, label: "Phone", value: "+1-800-VISERVE", href: "tel:+18008473783" },
                    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: "https://wa.me/18008473783" },
                    { icon: MapPin, label: "Address", value: "United States (Global Service)", href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#EEF4FF" }}>
                        <Icon className="w-5 h-5" style={{ color: "#0057A8" }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-medium">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm font-medium text-gray-800 hover:text-blue-700">{value}</a>
                        ) : (
                          <p className="text-sm font-medium text-gray-800">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <Clock className="w-5 h-5 mb-2" style={{ color: "#0057A8" }} />
                <h3 className="font-semibold text-gray-900 mb-3">Office Hours</h3>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Monday – Friday</span><span className="font-medium">9:00 AM – 6:00 PM EST</span></div>
                  <div className="flex justify-between"><span>Saturday</span><span className="font-medium">10:00 AM – 3:00 PM EST</span></div>
                  <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-red-500">Closed</span></div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">Need urgent help?</h3>
                <p className="text-sm text-gray-500 mb-3">For time-sensitive immigration matters, use our priority support line.</p>
                <a href="tel:+18008473783" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#0057A8" }}>
                  <Phone className="w-4 h-4" /> Call Priority Support
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-9 h-9 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Message Sent!</h3>
                  <p className="text-gray-500 max-w-sm">We&apos;ve received your message and will respond within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                      <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone / WhatsApp</label>
                      <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                      <input type="text" value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Your country" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                    <select required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">Select a topic...</option>
                      <option>Green Card Application</option>
                      <option>Citizenship / Naturalization</option>
                      <option>Family-Based Immigration</option>
                      <option>Work Visa</option>
                      <option>Student Visa</option>
                      <option>RFE Response</option>
                      <option>Pricing & Plans</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none" placeholder="Tell us about your situation..." />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-8 py-3 font-semibold text-white rounded-xl transition-colors" style={{ background: "#0057A8" }}>
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                  <p className="text-xs text-gray-400 mt-3">By submitting, you agree to our Privacy Policy. We do not share your information with third parties.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: "#1a1a2e" }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How quickly will I receive a response?", a: "We respond to all inquiries within 1 business day. Priority support calls are answered during business hours." },
              { q: "Do you provide legal advice?", a: "No. ViServe is not a law firm. We provide document preparation assistance only. For legal advice, we can refer you to a licensed immigration attorney." },
              { q: "Can I get support in my language?", a: "Yes! We offer support in English, Spanish, French, Portuguese, Mandarin, Hindi, and more. Contact us to request your preferred language." },
              { q: "Is my information secure?", a: "Yes. We use industry-standard encryption and security practices to protect all client data. See our Privacy Policy for full details." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
