"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AddAdminForm from "./AddAdminForm";
import { Shield, Crown, Eye, UserX } from "lucide-react";

type AdminUser = { id: string; email: string; full_name: string; role: string; is_active: boolean; last_login: string; created_at: string };

export default function AdminUsersPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      if (admin.role !== "superadmin") { router.push("/admin"); return; }
      setAdminUser(admin);
      const { data } = await supabase.from("admin_users").select("*").order("created_at", { ascending: true });
      setAdmins(data ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  async function toggleAdmin(id: string, currentActive: boolean) {
    const supabase = createClient();
        setAdmins(prev => prev.map(a => a.id === id ? { ...a, is_active: !currentActive } : a));
  }

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  const roleIcon = (role: string) => role === "superadmin" ? <Crown className="w-3.5 h-3.5 text-yellow-400" /> : role === "admin" ? <Shield className="w-3.5 h-3.5 text-blue-400" /> : <Eye className="w-3.5 h-3.5 text-gray-400" />;
  const roleColor = (role: string) => role === "superadmin" ? "text-yellow-400 bg-yellow-900/30" : role === "admin" ? "text-blue-400 bg-blue-900/30" : "text-gray-400 bg-gray-800";

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold text-white">Admin Users</h1>
          <p className="text-gray-500 text-sm">Manage admin access — Superadmin only</p>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-800">
              <h2 className="text-white font-semibold">Current Admins ({admins.length})</h2>
            </div>
            <table className="w-full">
              <thead><tr className="border-b border-gray-800">{["Admin","Role","Status","Last Login","Actions"].map(h => <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-gray-800">
                {admins.map(admin => (
                  <tr key={admin.id} className="hover:bg-gray-800/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-semibold text-sm">{admin.full_name.charAt(0).toUpperCase()}</div>
                        <div>
                          <div className="text-white text-sm font-medium flex items-center gap-1.5">{admin.full_name}{admin.id === adminUser.id && <span className="text-xs text-gray-600">(you)</span>}</div>
                          <div className="text-gray-500 text-xs">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full capitalize ${roleColor(admin.role)}`}>{roleIcon(admin.role)} {admin.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${admin.is_active ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}>
                        {admin.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{admin.last_login ? new Date(admin.last_login).toLocaleString() : "Never"}</td>
                    <td className="px-6 py-4">
                      {admin.id !== adminUser.id && (
                        <button onClick={() => toggleAdmin(admin.id, admin.is_active)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-colors">
                          <UserX className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AddAdminForm currentAdminId={adminUser.id} />
        </div>
      </main>
    </div>
  );
}
