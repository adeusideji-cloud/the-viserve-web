"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Mail, Clock, CheckCircle, MessageSquare } from "lucide-react";

type Contact = { id: string; name: string; email: string; phone: string; subject: string; message: string; country: string; status: string; created_at: string };

export default function AdminContactsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      setAdminUser(admin);
      const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      setContacts(data ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("contact_submissions").update({ status }).eq("id", id);
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  }

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  const stats = { new: contacts.filter(c => c.status === "new").length, read: contacts.filter(c => c.status === "read").length, responded: contacts.filter(c => c.status === "responded").length };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold text-white">Contact Submissions</h1>
          <p className="text-gray-500 text-sm">{contacts.length} total inquiries</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "New", count: stats.new, icon: MessageSquare, color: "text-yellow-400 bg-yellow-900/30" },
              { label: "Read", count: stats.read, icon: Mail, color: "text-blue-400 bg-blue-900/30" },
              { label: "Responded", count: stats.responded, icon: CheckCircle, color: "text-green-400 bg-green-900/30" },
            ].map(({ label, count, icon: Icon, color }) => (
              <div key={label} className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}><Icon className="w-4 h-4" /></div>
                <div><div className="text-xl font-bold text-white">{count}</div><div className="text-xs text-gray-500">{label}</div></div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 divide-y divide-gray-800">
            {contacts.length ? contacts.map(c => (
              <div key={c.id} className="p-5 hover:bg-gray-800/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">{c.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "new" ? "bg-yellow-900/40 text-yellow-400" : c.status === "read" ? "bg-blue-900/40 text-blue-400" : "bg-green-900/40 text-green-400"}`}>{c.status}</span>
                      {c.country && <span className="text-xs text-gray-600">· {c.country}</span>}
                    </div>
                    <div className="text-gray-400 text-xs mb-2 flex items-center gap-3">
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>
                      {c.phone && <span>{c.phone}</span>}
                    </div>
                    <div className="font-medium text-gray-200 text-sm mb-1">{c.subject}</div>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{c.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-600 flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(c.created_at).toLocaleDateString()}</span>
                    {c.status !== "responded" && (
                      <button onClick={() => updateStatus(c.id, c.status === "new" ? "read" : "responded")}
                        className="text-xs px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600/40 rounded-lg transition-colors">
                        Mark as {c.status === "new" ? "read" : "responded"}
                      </button>
                    )}
                    {c.status === "responded" && <span className="text-xs text-green-400">✓ Resolved</span>}
                  </div>
                </div>
              </div>
            )) : <div className="p-12 text-center text-gray-600">No contact submissions yet</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
