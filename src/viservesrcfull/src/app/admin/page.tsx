"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Users, FileText, MessageSquare, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [stats, setStats] = useState({ clients: 0, activeCases: 0, pendingContacts: 0, totalCases: 0 });
  const [recentClients, setRecentClients] = useState<Array<{ id: string; full_name: string; email: string; country: string; status: string; created_at: string }>>([]);
  const [recentContacts, setRecentContacts] = useState<Array<{ id: string; name: string; subject: string; status: string }>>([]);
  const [recentActivity, setRecentActivity] = useState<Array<{ id: string; action: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }

      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      setAdminUser(admin);

      const [
        { count: clients },
        { count: activeCases },
        { count: pendingContacts },
        { count: totalCases },
        { data: rc },
        { data: rContacts },
        { data: rActivity },
      ] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("cases").select("*", { count: "exact", head: true }).eq("status", "in_progress"),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("cases").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("id,full_name,email,country,status,created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("contact_submissions").select("id,name,subject,status").order("created_at", { ascending: false }).limit(4),
        supabase.from("admin_activity_log").select("id,action,created_at").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({ clients: clients ?? 0, activeCases: activeCases ?? 0, pendingContacts: pendingContacts ?? 0, totalCases: totalCases ?? 0 });
      setRecentClients(rc ?? []);
      setRecentContacts(rContacts ?? []);
      setRecentActivity(rActivity ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading || !adminUser) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const statCards = [
    { label: "Total Clients", value: stats.clients, icon: Users, color: "bg-blue-500/10 text-blue-400" },
    { label: "Active Cases", value: stats.activeCases, icon: FileText, color: "bg-green-500/10 text-green-400" },
    { label: "Pending Inquiries", value: stats.pendingContacts, icon: MessageSquare, color: "bg-yellow-500/10 text-yellow-400" },
    { label: "Total Cases", value: stats.totalCases, icon: TrendingUp, color: "bg-purple-500/10 text-purple-400" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-500 text-sm">Welcome back, {adminUser.full_name}</p>
          </div>
          <div className="text-xs text-gray-500 bg-gray-800 px-3 py-1.5 rounded-lg">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </div>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statCards.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-white mb-0.5">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Clients */}
            <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-white font-semibold">Recent Clients</h2>
                <a href="/admin/clients" className="text-xs text-blue-400 hover:text-blue-300">View all →</a>
              </div>
              <div className="divide-y divide-gray-800">
                {recentClients.length ? recentClients.map(client => (
                  <div key={client.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400 font-semibold text-sm">
                        {(client.full_name || client.email || "?").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{client.full_name || "—"}</div>
                        <div className="text-gray-500 text-xs">{client.email} · {client.country || "—"}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${client.status === "active" || !client.status ? "bg-green-900/40 text-green-400" : "bg-yellow-900/40 text-yellow-400"}`}>
                        {client.status || "active"}
                      </span>
                      <span className="text-xs text-gray-600">{new Date(client.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                )) : <div className="px-6 py-8 text-center text-gray-600 text-sm">No clients yet</div>}
              </div>
            </div>

            {/* Right panel */}
            <div className="space-y-5">
              <div className="bg-gray-900 rounded-2xl border border-gray-800">
                <div className="px-5 py-4 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="text-white font-semibold text-sm">New Inquiries</h2>
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">{stats.pendingContacts} new</span>
                </div>
                <div className="divide-y divide-gray-800">
                  {recentContacts.length ? recentContacts.map(c => (
                    <div key={c.id} className="px-5 py-3 flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-xs font-medium truncate">{c.name}</div>
                        <div className="text-gray-500 text-xs truncate">{c.subject}</div>
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${c.status === "new" ? "bg-yellow-900/40 text-yellow-400" : "bg-gray-800 text-gray-500"}`}>{c.status}</span>
                    </div>
                  )) : <div className="px-5 py-6 text-center text-gray-600 text-xs">No inquiries</div>}
                </div>
                <div className="px-5 py-3 border-t border-gray-800">
                  <a href="/admin/contacts" className="text-xs text-blue-400 hover:text-blue-300">View all →</a>
                </div>
              </div>

              <div className="bg-gray-900 rounded-2xl border border-gray-800">
                <div className="px-5 py-4 border-b border-gray-800">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-blue-400" /> Activity</h2>
                </div>
                <div className="p-3 space-y-2">
                  {recentActivity.length ? recentActivity.map(log => (
                    <div key={log.id} className="flex items-start gap-2 p-2">
                      <div className="w-5 h-5 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Activity className="w-2.5 h-2.5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-gray-300 text-xs capitalize">{log.action.replace(/_/g, " ")}</div>
                        <div className="text-gray-600 text-xs">{new Date(log.created_at).toLocaleString()}</div>
                      </div>
                    </div>
                  )) : <div className="text-center text-gray-600 text-xs py-4">No activity yet</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
