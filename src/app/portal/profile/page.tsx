"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Globe, ArrowLeft, Save, Loader2, CheckCircle, Key, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState({ current: "", new: "", confirm: "" });

  const [form, setForm] = useState({
    full_name: "", phone: "", nationality: "", country: "",
    date_of_birth: "", gender: "", address: "", city: "", state_province: "", zip_code: "",
    passport_number: "", passport_expiry: "", immigration_goal: "", current_immigration_status: "",
    additional_notes: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/portal/login"); return; }
      setUser({ id: user.id, email: user.email || "" });
      const { data: p } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (p) setForm(prev => ({ ...prev, ...Object.fromEntries(Object.entries(p).filter(([, v]) => v !== null && v !== undefined)) }));
      setLoading(false);
    });
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profiles").update({ ...form, updated_at: new Date().toISOString() }).eq("id", user!.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (pw.new !== pw.confirm) { setPwError("Passwords don't match"); return; }
    if (pw.new.length < 8) { setPwError("Min 8 characters"); return; }
    setPwSaving(true);
    setPwError("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: pw.new });
    if (error) { setPwError(error.message); setPwSaving(false); return; }
    setPw({ current: "", new: "", confirm: "" });
    setPwSaving(false);
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-500 animate-spin" /></div>;

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";
  const labelCls = "block text-sm font-medium text-gray-700 mb-1.5";
  const countries = ["United States","United Kingdom","Canada","Australia","Nigeria","Ghana","India","China","Mexico","Brazil","Philippines","Germany","France","South Africa","Kenya","Jamaica","Haiti","Colombia","Vietnam","South Korea","Japan","Other"];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "#0057A8" }}>The ViServe</span>
          </Link>
          <Link href="/portal" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Portal
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Profile</h1>
        <p className="text-gray-500 text-sm mb-6">Keep your information up to date for accurate processing.</p>

        {/* Profile Form */}
        <form onSubmit={handleSave}>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
            <h2 className="font-semibold text-gray-900 mb-5">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className={labelCls}>Full Legal Name *</label><input required value={form.full_name} onChange={e => set("full_name", e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Date of Birth</label><input type="date" value={form.date_of_birth} onChange={e => set("date_of_birth", e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Gender</label>
                <select value={form.gender} onChange={e => set("gender", e.target.value)} className={inputCls}>
                  <option value="">Select...</option><option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option>
                </select>
              </div>
              <div><label className={labelCls}>Phone / WhatsApp</label><input value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Email</label><input value={user?.email} disabled className={inputCls + " bg-gray-50 cursor-not-allowed text-gray-400"} /></div>
              <div><label className={labelCls}>Nationality</label>
                <select value={form.nationality} onChange={e => set("nationality", e.target.value)} className={inputCls}>
                  <option value="">Select...</option>{countries.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><label className={labelCls}>Country of Residence</label>
                <select value={form.country} onChange={e => set("country", e.target.value)} className={inputCls}>
                  <option value="">Select...</option>{countries.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2"><label className={labelCls}>Street Address</label><input value={form.address} onChange={e => set("address", e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>City</label><input value={form.city} onChange={e => set("city", e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>State / Province</label><input value={form.state_province} onChange={e => set("state_province", e.target.value)} className={inputCls} /></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
            <h2 className="font-semibold text-gray-900 mb-5">Immigration Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className={labelCls}>Immigration Goal</label>
                <select value={form.immigration_goal} onChange={e => set("immigration_goal", e.target.value)} className={inputCls}>
                  <option value="">Select...</option>
                  <option>Get a Green Card</option><option>Become a U.S. Citizen</option><option>Bring a Family Member</option>
                  <option>Work Visa</option><option>Student Visa</option><option>Asylum or Refugee Status</option><option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2"><label className={labelCls}>Current Immigration Status</label>
                <select value={form.current_immigration_status} onChange={e => set("current_immigration_status", e.target.value)} className={inputCls}>
                  <option value="">Select...</option>
                  <option>U.S. Citizen</option><option>Lawful Permanent Resident</option><option>H-1B Visa</option>
                  <option>F-1 Student Visa</option><option>B-1/B-2 Visitor Visa</option><option>No Status</option><option>Other</option>
                </select>
              </div>
              <div><label className={labelCls}>Passport Number</label><input value={form.passport_number} onChange={e => set("passport_number", e.target.value)} className={inputCls} /></div>
              <div><label className={labelCls}>Passport Expiry</label><input type="date" value={form.passport_expiry} onChange={e => set("passport_expiry", e.target.value)} className={inputCls} /></div>
              <div className="sm:col-span-2"><label className={labelCls}>Additional Notes</label>
                <textarea value={form.additional_notes} onChange={e => set("additional_notes", e.target.value)} rows={3} className={inputCls + " resize-none"} /></div>
            </div>
          </div>

          <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3 font-semibold text-white rounded-xl text-sm disabled:opacity-70 mb-6" style={{ background: "#0057A8" }}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : saving ? "Saving..." : "Save Profile"}
          </button>
        </form>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2"><Key className="w-4 h-4 text-blue-500" /> Change Password</h2>
          {pwError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{pwError}</div>}
          {pwSaved && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">✅ Password updated!</div>}
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {[{label:"New Password",key:"new"},{label:"Confirm New Password",key:"confirm"}].map(({label,key}) => (
              <div key={key}>
                <label className={labelCls}>{label}</label>
                <div className="relative">
                  <input required type={showPw ? "text" : "password"} value={pw[key as keyof typeof pw]}
                    onChange={e => setPw(p => ({...p,[key]:e.target.value}))} minLength={8}
                    className={inputCls + " pr-12"} placeholder="Min 8 characters" />
                  {key === "new" && (
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="submit" disabled={pwSaving} className="flex items-center gap-2 px-6 py-2.5 font-semibold text-white rounded-xl text-sm disabled:opacity-70" style={{ background: "#0057A8" }}>
              {pwSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Key className="w-4 h-4" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
