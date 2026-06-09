"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Mail, Send, Users, CheckCircle, Loader2, Bell, Download, Eye } from "lucide-react";

export default function AdminNewsletterPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [subscribers, setSubscribers] = useState<Array<{ id: string; email: string; name: string; subscribed_at: string; active: boolean }>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [form, setForm] = useState({ subject: "", content: "" });
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      setAdminUser(admin);
      const { data } = await supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false });
      setSubscribers(data ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setResult(null);
    const res = await fetch("/api/newsletter/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setResult({ type: "success", msg: `✅ Newsletter saved and recorded for ${data.sent} subscribers. Download the list below to send via your email client.` });
    } else {
      setResult({ type: "error", msg: data.error || "Failed to save newsletter." });
    }
    setSaving(false);
  }

  async function toggleSubscriber(id: string, active: boolean) {
    const supabase = createClient();
    await supabase.from("newsletter_subscribers").update({ active: !active }).eq("id", id);
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, active: !active } : s));
  }

  function exportCSV() {
    const active = subscribers.filter(s => s.active);
    const csv = ["Name,Email,Subscribed At", ...active.map(s =>
      `"${s.name || ""}","${s.email}","${new Date(s.subscribed_at).toLocaleDateString()}"`
    )].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `viserve-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>;

  const activeCount = subscribers.filter(s => s.active).length;

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-2"><Bell className="w-5 h-5 text-blue-400" /> Newsletter</h1>
          <p className="text-gray-500 text-sm">{activeCount} active subscribers</p>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compose + Stats */}
          <div className="lg:col-span-2 space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Subscribers", value: subscribers.length, icon: Users, color: "text-blue-400 bg-blue-900/30" },
                { label: "Active", value: activeCount, icon: CheckCircle, color: "text-green-400 bg-green-900/30" },
                { label: "Unsubscribed", value: subscribers.length - activeCount, icon: Mail, color: "text-gray-400 bg-gray-800" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}><Icon className="w-4 h-4" /></div>
                  <div><div className="text-xl font-bold text-white">{value}</div><div className="text-xs text-gray-500">{label}</div></div>
                </div>
              ))}
            </div>

            {/* Export */}
            <div className="bg-blue-900/20 border border-blue-800/40 rounded-2xl p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-blue-300 text-sm font-medium">Export Subscriber List</p>
                <p className="text-blue-400/70 text-xs mt-0.5">Download all {activeCount} active subscribers as a CSV to send newsletters from your email client (Gmail, Outlook, etc.)</p>
              </div>
              <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap flex-shrink-0">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            {/* Compose Form */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-semibold flex items-center gap-2"><Send className="w-4 h-4 text-blue-400" /> Compose Newsletter</h2>
                <button onClick={() => setPreview(!preview)} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> {preview ? "Edit" : "Preview"}
                </button>
              </div>

              {result && (
                <div className={`mb-4 p-4 rounded-xl text-sm border ${result.type === "success" ? "bg-green-900/40 border-green-700 text-green-300" : "bg-red-900/40 border-red-700 text-red-300"}`}>
                  {result.msg}
                </div>
              )}

              {preview ? (
                <div className="bg-white rounded-xl p-6 text-gray-800">
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <p className="text-xs text-gray-500 mb-1">Subject:</p>
                    <h2 className="text-lg font-bold">{form.subject || "No subject"}</h2>
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{form.content || "No content yet..."}</div>
                  <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-400">The ViServe · 101 E. Park Blvd, Suite 600, Plano, TX 75074</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Subject Line *</label>
                    <input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Important USCIS Update — New Processing Times" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Newsletter Content *</label>
                    <textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                      rows={12} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Write your newsletter here...&#10;&#10;You can write plainly — paragraphs, bullet points, headlines.&#10;&#10;Example:&#10;USCIS has announced new processing times effective this month...&#10;&#10;Key changes:&#10;- Form I-485: 12-18 months&#10;- Form N-400: 8-12 months&#10;&#10;For more details, visit theviservetech.com" />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-gray-500">Saves newsletter for <strong className="text-gray-300">{activeCount} subscribers</strong></p>
                    <button disabled={saving} type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-70">
                      {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Send className="w-4 h-4" /> Save Newsletter</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Subscriber List */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 flex flex-col" style={{ maxHeight: "calc(100vh - 140px)" }}>
            <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between flex-shrink-0">
              <h2 className="text-white font-semibold text-sm">Subscribers ({subscribers.length})</h2>
              <button onClick={exportCSV} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <Download className="w-3 h-3" /> CSV
              </button>
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-gray-800">
              {subscribers.length ? subscribers.map(s => (
                <div key={s.id} className="px-5 py-3 flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    {s.name && <div className="text-white text-xs font-medium truncate">{s.name}</div>}
                    <div className="text-gray-400 text-xs truncate">{s.email}</div>
                    <div className="text-gray-600 text-xs">{new Date(s.subscribed_at).toLocaleDateString()}</div>
                  </div>
                  <button onClick={() => toggleSubscriber(s.id, s.active)}
                    className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 transition-colors cursor-pointer ${s.active ? "bg-green-900/40 text-green-400 hover:bg-red-900/40 hover:text-red-400" : "bg-gray-800 text-gray-500 hover:bg-green-900/40 hover:text-green-400"}`}>
                    {s.active ? "active" : "unsub"}
                  </button>
                </div>
              )) : (
                <div className="p-8 text-center text-gray-600 text-sm">No subscribers yet</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
