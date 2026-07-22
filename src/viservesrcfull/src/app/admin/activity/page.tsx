"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Activity, Clock } from "lucide-react";

export default function AdminActivityPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string } | null>(null);
  const [logs, setLogs] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active").eq("auth_user_id", user.id).single();
      if (!admin?.is_active || admin.role !== "superadmin") { router.push("/admin"); return; }
      setAdminUser(admin);
      const { data } = await supabase.from("admin_activity_log").select("*, admin_users(full_name, email)").order("created_at", { ascending: false }).limit(100);
      setLogs(data ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;

  const actionColors: Record<string, string> = {
    admin_login: "text-green-400 bg-green-900/30",
    admin_created: "text-blue-400 bg-blue-900/30",
    admin_updated: "text-yellow-400 bg-yellow-900/30",
    password_changed: "text-purple-400 bg-purple-900/30",
    client_updated: "text-orange-400 bg-orange-900/30",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-2"><Activity className="w-5 h-5 text-blue-400" /> Activity Log</h1>
          <p className="text-gray-500 text-sm">All admin actions — Superadmin only</p>
        </div>
        <div className="p-8">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 divide-y divide-gray-800">
            {logs.length ? logs.map(log => (
              <div key={log.id as string} className="px-6 py-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`text-xs px-2 py-1 rounded-lg font-medium whitespace-nowrap flex-shrink-0 capitalize ${actionColors[log.action as string] || "text-gray-400 bg-gray-800"}`}>
                    {(log.action as string).replace(/_/g, " ")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-300 text-sm">
                      <span className="text-white font-medium">{(log.admin_users as { full_name?: string })?.full_name || "Unknown"}</span>
                      {" · "}
                      <span className="text-gray-500 text-xs">{(log.admin_users as { email?: string })?.email}</span>
                    </div>
                    {Boolean(log.details) && (
                      <div className="text-gray-600 text-xs mt-0.5 truncate">
                        {JSON.stringify(log.details as Record<string, unknown>).slice(0, 100)}
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-600 flex items-center gap-1 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {new Date(log.created_at as string).toLocaleString()}
                </span>
              </div>
            )) : (
              <div className="px-6 py-12 text-center text-gray-600">No activity logged yet</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
