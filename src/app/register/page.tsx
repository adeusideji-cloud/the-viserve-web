"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Globe, Eye, EyeOff, Loader2, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";

const steps = ["Account", "Personal Info", "Immigration Details", "Done"];

const countries = ["United States","United Kingdom","Canada","Australia","Nigeria","Ghana","India","China","Mexico","Brazil","Philippines","Pakistan","Bangladesh","Germany","France","South Africa","Kenya","Ethiopia","Egypt","Jamaica","Haiti","Colombia","El Salvador","Honduras","Guatemala","Dominican Republic","Cuba","Vietnam","South Korea","Japan","Other"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [userId, setUserId] = useState("");

  const [form, setForm] = useState({
    // Step 1 - Account
    email: "", password: "", confirm_password: "",
    // Step 2 - Personal Info
    full_name: "", date_of_birth: "", gender: "", phone: "",
    nationality: "", country_of_residence: "", address: "", city: "", state: "", zip: "",
    // Step 3 - Immigration
    immigration_goal: "", current_status: "", passport_number: "", passport_expiry: "",
    referral_source: "", additional_notes: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm_password) { setError("Passwords don't match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setError("");
    setStep(1);
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStep(2);
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();

    // Create auth account
    const { data, error: authErr } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.full_name, phone: form.phone, country: form.country_of_residence }
      }
    });

    if (authErr) { setError(authErr.message); setLoading(false); return; }

    // Save full profile to Supabase
    if (data.user) {
      setUserId(data.user.id);
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: form.email,
        full_name: form.full_name,
        phone: form.phone,
        country: form.country_of_residence,
        date_of_birth: form.date_of_birth || null,
        gender: form.gender || null,
        nationality: form.nationality || null,
        address: form.address || null,
        city: form.city || null,
        state_province: form.state || null,
        zip_code: form.zip || null,
        passport_number: form.passport_number || null,
        passport_expiry: form.passport_expiry || null,
        immigration_goal: form.immigration_goal || null,
        current_immigration_status: form.current_status || null,
        referral_source: form.referral_source || null,
        additional_notes: form.additional_notes || null,
        status: "pending",
      });
    }

    setLoading(false);
    setStep(3);
  }

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: "#0057A8" }}>The ViServe</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create Your Client Account</h1>
          <p className="text-gray-500 text-sm mt-1">Start your immigration journey with us</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < step ? "bg-green-500 text-white" : i === step ? "text-white" : "bg-gray-200 text-gray-500"}`}
                style={i === step ? { background: "#0057A8" } : {}}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? "font-semibold text-gray-800" : "text-gray-400"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${i < step ? "bg-green-400" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {error && <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}

          {/* Step 1: Account */}
          {step === 0 && (
            <form onSubmit={handleStep1} className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Account Credentials</h2>
              <div>
                <label className={labelCls}>Email Address *</label>
                <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} className={inputCls} placeholder="your@email.com" />
              </div>
              <div>
                <label className={labelCls}>Password *</label>
                <div className="relative">
                  <input required type={showPw ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} minLength={8} className={inputCls + " pr-12"} placeholder="Min 8 characters" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className={labelCls}>Confirm Password *</label>
                <input required type="password" value={form.confirm_password} onChange={e => set("confirm_password", e.target.value)} className={inputCls} placeholder="Re-enter password" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 font-semibold text-white rounded-xl text-sm" style={{ background: "#0057A8" }}>
                Continue <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-sm text-gray-500">Already have an account? <Link href="/portal/login" className="font-semibold text-blue-600 hover:underline">Sign in</Link></p>
            </form>
          )}

          {/* Step 2: Personal Info */}
          {step === 1 && (
            <form onSubmit={handleStep2} className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Full Legal Name *</label>
                  <input required value={form.full_name} onChange={e => set("full_name", e.target.value)} className={inputCls} placeholder="As it appears on your passport" />
                </div>
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input type="date" value={form.date_of_birth} onChange={e => set("date_of_birth", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Gender</label>
                  <select value={form.gender} onChange={e => set("gender", e.target.value)} className={inputCls}>
                    <option value="">Select...</option>
                    <option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Phone / WhatsApp *</label>
                  <input required value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className={labelCls}>Nationality *</label>
                  <select required value={form.nationality} onChange={e => set("nationality", e.target.value)} className={inputCls}>
                    <option value="">Select country...</option>
                    {countries.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Country of Residence *</label>
                  <select required value={form.country_of_residence} onChange={e => set("country_of_residence", e.target.value)} className={inputCls}>
                    <option value="">Select country...</option>
                    {countries.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>City</label>
                  <input value={form.city} onChange={e => set("city", e.target.value)} className={inputCls} placeholder="Your city" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Street Address</label>
                  <input value={form.address} onChange={e => set("address", e.target.value)} className={inputCls} placeholder="Street address" />
                </div>
                <div>
                  <label className={labelCls}>State / Province</label>
                  <input value={form.state} onChange={e => set("state", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>ZIP / Postal Code</label>
                  <input value={form.zip} onChange={e => set("zip", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(0)} className="flex items-center gap-1 px-5 py-3 border border-gray-300 text-gray-600 rounded-xl text-sm hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 font-semibold text-white rounded-xl text-sm" style={{ background: "#0057A8" }}>
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Immigration Details */}
          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Immigration Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>What is your immigration goal? *</label>
                  <select required value={form.immigration_goal} onChange={e => set("immigration_goal", e.target.value)} className={inputCls}>
                    <option value="">Select your goal...</option>
                    <option>Get a Green Card</option>
                    <option>Become a U.S. Citizen</option>
                    <option>Bring a Family Member</option>
                    <option>Work Visa (H-1B, L-1, etc.)</option>
                    <option>Student Visa (F-1)</option>
                    <option>Asylum or Refugee Status</option>
                    <option>Remove Conditions on Green Card</option>
                    <option>Travel Document</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Current Immigration Status</label>
                  <select value={form.current_status} onChange={e => set("current_status", e.target.value)} className={inputCls}>
                    <option value="">Select status...</option>
                    <option>U.S. Citizen</option>
                    <option>Lawful Permanent Resident (Green Card)</option>
                    <option>H-1B Visa Holder</option>
                    <option>F-1 Student Visa</option>
                    <option>B-1/B-2 Visitor Visa</option>
                    <option>TPS (Temporary Protected Status)</option>
                    <option>DACA Recipient</option>
                    <option>Undocumented / No Current Status</option>
                    <option>Outside the U.S.</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Passport Number</label>
                  <input value={form.passport_number} onChange={e => set("passport_number", e.target.value)} className={inputCls} placeholder="e.g. A12345678" />
                </div>
                <div>
                  <label className={labelCls}>Passport Expiry Date</label>
                  <input type="date" value={form.passport_expiry} onChange={e => set("passport_expiry", e.target.value)} className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>How did you hear about us?</label>
                  <select value={form.referral_source} onChange={e => set("referral_source", e.target.value)} className={inputCls}>
                    <option value="">Select...</option>
                    <option>Google Search</option><option>Social Media</option><option>Friend/Family Referral</option>
                    <option>Attorney Referral</option><option>Community Event</option><option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Additional Notes / Special Circumstances</label>
                  <textarea value={form.additional_notes} onChange={e => set("additional_notes", e.target.value)} rows={3}
                    className={inputCls + " resize-none"} placeholder="Anything else we should know about your situation..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 px-5 py-3 border border-gray-300 text-gray-600 rounded-xl text-sm hover:bg-gray-50">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button disabled={loading} type="submit" className="flex-1 flex items-center justify-center gap-2 py-3 font-semibold text-white rounded-xl text-sm disabled:opacity-70" style={{ background: "#0057A8" }}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : <>Create Account <CheckCircle className="w-4 h-4" /></>}
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-9 h-9 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created! 🎉</h2>
              <p className="text-gray-500 mb-2 text-sm">Please check <strong>{form.email}</strong> to verify your account.</p>
              <p className="text-gray-400 text-xs mb-6">Once verified, you can log in to upload documents and track your case.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/portal/login" className="px-8 py-3 font-semibold text-white rounded-xl text-sm" style={{ background: "#0057A8" }}>
                  Go to Client Login
                </Link>
                <Link href="/" className="px-8 py-3 font-semibold text-gray-600 border border-gray-300 rounded-xl text-sm hover:bg-gray-50">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
