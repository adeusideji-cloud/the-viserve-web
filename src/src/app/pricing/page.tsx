"use client";
import { useState } from "react";
import { ArrowRight, Bell, CheckCircle, Mail, Globe, Users, Zap, Shield } from "lucide-react";

const benefits = [
  { icon: Bell, title: "Latest Immigration Updates", desc: "New USCIS rules, policy changes, fee updates, and form revisions delivered to your inbox immediately." },
  { icon: Globe, title: "Visa & Green Card News", desc: "Breaking news on visa bulletins, priority dates, lottery results, and processing time changes." },
  { icon: Zap, title: "Action Alerts", desc: "Time-sensitive alerts on application deadlines, USCIS closures, and urgent policy changes." },
  { icon: Users, title: "Client Success Stories", desc: "Inspiring stories from our clients who achieved their immigration goals — to keep you motivated." },
  { icon: Shield, title: "Tips & How-To Guides", desc: "Step-by-step guides, document checklists, and expert tips to strengthen your immigration case." },
  { icon: Mail, title: "Exclusive Resources", desc: "Free templates, checklists, and tools available only to newsletter subscribers." },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json();
    if (res.ok) { setSuccess(true); }
    else { setError(data.error || "Something went wrong. Please try again."); }
    setLoading(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <Bell className="w-4 h-4 text-yellow-300" />
            <span>Free · No spam · Unsubscribe anytime</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Stay Ahead of Every<br /><span className="text-yellow-300">Immigration Update</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of immigrants and families who rely on The ViServe newsletter for the latest news, alerts, and expert guidance — delivered free to your inbox.
          </p>

          {/* Subscription Form */}
          {!success ? (
            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
              {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-400/40 rounded-xl text-sm text-red-200">{error}</div>}
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your first name"
                  className="flex-1 px-4 py-3.5 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3.5 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button disabled={loading} type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 font-bold text-blue-900 bg-yellow-400 hover:bg-yellow-300 rounded-xl text-base transition-colors disabled:opacity-70 shadow-lg">
                {loading ? "Subscribing..." : <><Bell className="w-5 h-5" /> Subscribe Free — Get Instant Updates</>}
              </button>
              <p className="text-xs text-blue-200 mt-3">🔒 100% free. No credit card. Unsubscribe with one click anytime.</p>
            </form>
          ) : (
            <div className="max-w-lg mx-auto bg-white/10 border border-white/20 rounded-2xl p-8">
              <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">You&apos;re In! 🎉</h3>
              <p className="text-blue-100 text-sm">Welcome to The ViServe newsletter, <strong>{name || "friend"}</strong>! Check <strong>{email}</strong> for a confirmation email. You&apos;ll start receiving updates immediately.</p>
            </div>
          )}

          {/* Social Proof */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            {["10,000+ subscribers", "Updates every week", "150+ countries", "Zero spam"].map(t => (
              <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1a1a2e" }}>What You&apos;ll Receive</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">Timely, actionable immigration intelligence — curated by our experts for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm card-hover">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "#EEF4FF" }}>
                  <Icon className="w-5 h-5" style={{ color: "#0057A8" }} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Bell className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update Again</h2>
          <p className="text-blue-100 mb-8">Join over 10,000 immigrants who stay informed and ahead of every change in U.S. immigration law.</p>
          {!success ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none" />
              <button disabled={loading} type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-xl transition-colors whitespace-nowrap disabled:opacity-70">
                <ArrowRight className="w-4 h-4" /> Subscribe Free
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-2 text-green-300 font-semibold">
              <CheckCircle className="w-5 h-5" /> Subscribed successfully!
            </div>
          )}
        </div>
      </section>
    </>
  );
}
