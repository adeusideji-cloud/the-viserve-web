"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Globe, Calendar, FileText, Edit, AlertCircle, Loader2, Save } from "lucide-react";

function ClientDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const editMode = searchParams.get("edit") === "1";

  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [client, setClient] = useState<Record<string, string> | null>(null);
  const [cases, setCases] = useState<Array<Record<string, string>>>([]);
  const [docs, setDocs] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: "", phone: "", country: "", status: "active", admin_notes: "" });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!id) { router.push("/admin/clients"); return; }
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      setAdminUser(admin);

      const [{ data: p }, { data: c }, { data: d }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", id).single(),
        supabase.from("cases").select("*").eq("user_id", id).order("created_at", { ascending: false }),
        supabase.from("documents").select("*").eq("user_id", id).order("created_at", { ascending: false }),
      ]);
      setClient(p as Record<string, string>);
      setCases((c ?? []) as Array<Record<string, string>>);
      setDocs((d ?? []) as Array<Record<string, string>>);
      if (p) setEditForm({ full_name: p.full_name || "", phone: p.phone || "", country: p.country || "", status: p.status || "active", admin_notes: p.admin_notes || "" });
      setLoading(false);
    }
    load();
  }, [id, router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("profiles").update(editForm).eq("id", id!);
    setClient(prev => prev ? { ...prev, ...editForm } : prev);
    setSaveSuccess(true);
    setSaving(false);
    setTimeout(() => { setSaveSuccess(false); router.push(`/admin/clients/detail?id=${id}`); }, 1500);
  }

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>;
  if (!client) return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">Client not found</div>;

  const statusColors: Record<string, string> = { in_progress: "bg-yellow-900/40 text-yellow-400", submitted: "bg-blue-900/40 text-blue-400", approved: "bg-green-900/40 text-green-400", denied: "bg-red-900/40 text-red-400" };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center gap-4">
          <Link href="/admin/clients" className="text-gray-500 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">{client.full_name || client.email}</h1>
            <p className="text-gray-500 text-sm">{editMode ? "Edit Profile" : "Client Profile"}</p>
          </div>
          {!editMode ? (
            <Link href={`/admin/clients/detail?id=${id}&edit=1`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors">
              <Edit className="w-4 h-4" /> Edit
            </Link>
          ) : (
            <Link href={`/admin/clients/detail?id=${id}`} className="px-4 py-2 border border-gray-700 text-gray-400 hover:text-white text-sm rounded-xl transition-colors">
              Cancel
            </Link>
          )}
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card / Edit Form */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            {!editMode ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 border-2 border-blue-600/30 flex items-center justify-center text-blue-400 font-bold text-2xl mx-auto mb-3">
                    {(client.full_name || client.email || "?").charAt(0).toUpperCase()}
                  </div>
                  <h2 className="text-white font-semibold">{client.full_name || "—"}</h2>
                  <span className={`inline-block mt-1 text-xs px-2.5 py-1 rounded-full font-medium ${!client.status || client.status === "active" ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"}`}>
                    {client.status || "active"}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  {[
                    { icon: Mail, label: "Email", value: client.email },
                    { icon: Phone, label: "Phone", value: client.phone || "—" },
                    { icon: Globe, label: "Country", value: client.country || "—" },
                    { icon: Calendar, label: "Joined", value: new Date(client.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 p-3 bg-gray-800 rounded-xl">
                      <Icon className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                      <div><div className="text-gray-500 text-xs">{label}</div><div className="text-gray-200">{value}</div></div>
                    </div>
                  ))}
                </div>
                {client.admin_notes && (
                  <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-xl">
                    <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-medium mb-1"><AlertCircle className="w-3.5 h-3.5" /> Admin Notes</div>
                    <p className="text-gray-300 text-sm">{client.admin_notes}</p>
                  </div>
                )}
              </>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <h3 className="text-white font-semibold mb-4">Edit Profile</h3>
                {saveSuccess && <div className="p-3 bg-green-900/40 border border-green-700 rounded-xl text-sm text-green-300">✅ Saved!</div>}
                {[
                  { label: "Full Name", key: "full_name", type: "text" },
                  { label: "Phone", key: "phone", type: "tel" },
                  { label: "Country", key: "country", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
                    <input type={type} value={editForm[key as keyof typeof editForm]}
                      onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Status</label>
                  <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Admin Notes</label>
                  <textarea value={editForm.admin_notes} rows={3} onChange={e => setEditForm({ ...editForm, admin_notes: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Internal notes..."
                  />
                </div>
                <button disabled={saving} type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl disabled:opacity-70">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
                </button>
              </form>
            )}
          </div>

          {/* Cases & Docs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-gray-900 rounded-2xl border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-white font-semibold flex items-center gap-2"><FileText className="w-4 h-4 text-blue-400" /> Cases ({cases.length})</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {cases.length ? cases.map(c => (
                  <div key={c.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{c.case_number}</div>
                      <div className="text-gray-500 text-xs capitalize">{(c.case_type || "").replace(/-/g, " ")} · {c.form_number || "—"}</div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[c.status] || "bg-gray-800 text-gray-400"}`}>
                      {(c.status || "").replace(/_/g, " ")}
                    </span>
                  </div>
                )) : <div className="px-6 py-8 text-center text-gray-600 text-sm">No cases</div>}
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h3 className="text-white font-semibold">Documents ({docs.length})</h3>
              </div>
              <div className="divide-y divide-gray-800">
                {docs.length ? docs.map(doc => (
                  <div key={doc.id} className="px-6 py-3 flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{doc.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${doc.status === "uploaded" ? "bg-green-900/40 text-green-400" : doc.status === "pending" ? "bg-yellow-900/40 text-yellow-400" : "bg-red-900/40 text-red-400"}`}>{doc.status}</span>
                  </div>
                )) : <div className="px-6 py-6 text-center text-gray-600 text-sm">No documents</div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ClientDetailPage() {
  return <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>}><ClientDetailContent /></Suspense>;
}
