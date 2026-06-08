"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function AdminCasesPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [cases, setCases] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      setAdminUser(admin);
      const { data } = await supabase.from("cases").select("*, profiles(full_name,email)").order("created_at", { ascending: false });
      setCases(data ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  const statusColors: Record<string, string> = { in_progress: "bg-yellow-900/40 text-yellow-400", submitted: "bg-blue-900/40 text-blue-400", approved: "bg-green-900/40 text-green-400", denied: "bg-red-900/40 text-red-400" };
  const stats = { total: cases.length, active: cases.filter(c => c.status === "in_progress").length, submitted: cases.filter(c => c.status === "submitted").length, approved: cases.filter(c => c.status === "approved").length };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold text-white">All Cases</h1>
          <p className="text-gray-500 text-sm">{stats.total} total cases</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[["Total", stats.total, "text-gray-300"], ["In Progress", stats.active, "text-yellow-400"], ["Submitted", stats.submitted, "text-blue-400"], ["Approved", stats.approved, "text-green-400"]].map(([label, count, color]) => (
              <div key={label as string} className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
                <div className={`text-2xl font-bold ${color}`}>{count as number}</div>
                <div className="text-xs text-gray-500 mt-0.5">{label as string}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead><tr className="border-b border-gray-800">{["Case #","Client","Type","Status","Created",""].map(h => <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-800">
                {cases.length ? cases.map(c => (
                  <tr key={c.id as string} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4"><div className="text-white text-sm font-medium">{c.case_number as string}</div><div className="text-gray-600 text-xs">{c.form_number as string || "—"}</div></td>
                    <td className="px-6 py-4"><div className="text-gray-300 text-sm">{(c.profiles as { full_name?: string })?.full_name || "—"}</div><div className="text-gray-600 text-xs">{(c.profiles as { email?: string })?.email}</div></td>
                    <td className="px-6 py-4 text-gray-400 text-sm capitalize">{(c.case_type as string || "").replace(/-/g, " ")}</td>
                    <td className="px-6 py-4"><span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[c.status as string] || "bg-gray-800 text-gray-400"}`}>{(c.status as string || "").replace(/_/g, " ")}</span></td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(c.created_at as string).toLocaleDateString()}</td>
                    <td className="px-6 py-4"><Link href={`/admin/clients/${c.user_id}`} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-900/20 transition-colors inline-flex"><Eye className="w-4 h-4" /></Link></td>
                  </tr>
                )) : <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-600">No cases yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
