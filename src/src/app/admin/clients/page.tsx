"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Search, Eye, Edit } from "lucide-react";

type Client = { id: string; full_name: string; email: string; phone: string; country: string; status: string; created_at: string; caseCount: number; activeCases: number };

export default function AdminClientsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [filtered, setFiltered] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      setAdminUser(admin);

      const [{ data: profilesData }, { data: casesData }] = await Promise.all([
        supabase.from("profiles").select("id,full_name,email,phone,country,status,created_at").order("created_at", { ascending: false }),
        supabase.from("cases").select("user_id,status"),
      ]);

      const withCases = (profilesData ?? []).map(p => ({
        ...p,
        caseCount: casesData?.filter(c => c.user_id === p.id).length ?? 0,
        activeCases: casesData?.filter(c => c.user_id === p.id && c.status === "in_progress").length ?? 0,
      }));
      setClients(withCases);
      setFiltered(withCases);
      setLoading(false);
    }
    load();
  }, [router]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(clients.filter(c =>
      (c.full_name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.country || "").toLowerCase().includes(q)
    ));
  }, [search, clients]);

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold text-white">Clients</h1>
          <p className="text-gray-500 text-sm">{filtered.length} of {clients.length} clients</p>
        </div>
        <div className="p-8">
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search clients by name, email or country..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {["Client","Country","Cases","Status","Joined","Actions"].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.length ? filtered.map(client => (
                  <tr key={client.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center text-blue-400 font-semibold text-sm flex-shrink-0">
                          {(client.full_name || client.email || "?").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{client.full_name || "—"}</div>
                          <div className="text-gray-500 text-xs">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{client.country || "—"}</td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{client.caseCount} total</div>
                      {client.activeCases > 0 && <div className="text-green-400 text-xs">{client.activeCases} active</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${!client.status || client.status === "active" ? "bg-green-900/40 text-green-400" : client.status === "pending" ? "bg-yellow-900/40 text-yellow-400" : "bg-red-900/40 text-red-400"}`}>
                        {client.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(client.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/clients/detail?id=${client.id}`} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 transition-colors"><Eye className="w-4 h-4" /></Link>
                        <Link href={`/admin/clients/detail?id=${client.id}&edit=1`} className="p-1.5 rounded-lg text-gray-500 hover:text-green-400 hover:bg-green-900/20 transition-colors"><Edit className="w-4 h-4" /></Link>
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-600">No clients found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
