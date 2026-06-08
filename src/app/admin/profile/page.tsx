"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Shield, Save, Key, Loader2, CheckCircle, Eye, EyeOff, User } from "lucide-react";

export default function AdminProfilePage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<{ id: string; full_name: string; role: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [pwForm, setPwForm] = useState({ current: "", new: "", confirm: "" });
  const [showPw, setShowPw] = useState({ current: false, new: false });
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.push("/admin/login"); return; }
      const { data: admin } = await supabase.from("admin_users").select("id,full_name,role,is_active,email").eq("auth_user_id", user.id).single();
      if (!admin?.is_active) { router.push("/admin/login"); return; }
      setAdminUser(admin);
      setLoading(false);
    });
  }, [router]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    if (pwForm.new !== pwForm.confirm) { setResult({ type: "error", msg: "New passwords don't match" }); return; }
    if (pwForm.new.length < 8) { setResult({ type: "error", msg: "Password must be at least 8 characters" }); return; }

    setSaving(true);
    setResult(null);
    const res = await fetch("/api/admin/profile/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current_password: pwForm.current, new_password: pwForm.new }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult({ type: "success", msg: "✅ Password changed successfully!" });
      setPwForm({ current: "", new: "", confirm: "" });
    } else {
      setResult({ type: "error", msg: data.error || "Failed to change password" });
    }
    setSaving(false);
  }

  if (loading || !adminUser) return <div className="min-h-screen bg-gray-950 flex items-center justify-center"><Loader2 className="w-6 h-6 text-blue-400 animate-spin" /></div>;

  const roleColor = adminUser.role === "superadmin" ? "text-yellow-400" : adminUser.role === "admin" ? "text-blue-400" : "text-gray-400";
  const roleBg = adminUser.role === "superadmin" ? "bg-yellow-900/30" : adminUser.role === "admin" ? "bg-blue-900/30" : "bg-gray-800";

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar adminName={adminUser.full_name} adminRole={adminUser.role} />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-8 py-4">
          <h1 className="text-xl font-bold text-white">My Profile</h1>
          <p className="text-gray-500 text-sm">Manage your admin account</p>
        </div>

        <div className="p-8 max-w-2xl">
          {/* Profile Info */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-blue-600/20 border-2 border-blue-600/30 flex items-center justify-center text-blue-400 font-bold text-2xl">
                {adminUser.full_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">{adminUser.full_name}</h2>
                <p className="text-gray-500 text-sm">{adminUser.email}</p>
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1 capitalize ${roleColor} ${roleBg}`}>
                  <Shield className="w-3 h-3" /> {adminUser.role}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-800 rounded-xl">
                <div className="text-gray-500 text-xs mb-0.5">Full Name</div>
                <div className="text-white">{adminUser.full_name}</div>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <div className="text-gray-500 text-xs mb-0.5">Email</div>
                <div className="text-white">{adminUser.email}</div>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <div className="text-gray-500 text-xs mb-0.5">Role</div>
                <div className={`capitalize font-medium ${roleColor}`}>{adminUser.role}</div>
              </div>
              <div className="p-3 bg-gray-800 rounded-xl">
                <div className="text-gray-500 text-xs mb-0.5">Status</div>
                <div className="text-green-400 font-medium">Active</div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h3 className="text-white font-semibold mb-5 flex items-center gap-2">
              <Key className="w-4 h-4 text-blue-400" /> Change Password
            </h3>

            {result && (
              <div className={`mb-4 p-3 rounded-xl text-sm border ${result.type === "success" ? "bg-green-900/40 border-green-700 text-green-300" : "bg-red-900/40 border-red-700 text-red-300"}`}>
                {result.msg}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              {[
                { label: "Current Password", key: "current", show: showPw.current, toggle: () => setShowPw(p => ({ ...p, current: !p.current })) },
                { label: "New Password", key: "new", show: showPw.new, toggle: () => setShowPw(p => ({ ...p, new: !p.new })) },
                { label: "Confirm New Password", key: "confirm", show: showPw.new, toggle: null },
              ].map(({ label, key, show, toggle }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
                  <div className="relative">
                    <input
                      required
                      type={show ? "text" : "password"}
                      value={pwForm[key as keyof typeof pwForm]}
                      onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                      minLength={key !== "current" ? 8 : undefined}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                      placeholder={key === "current" ? "Enter current password" : "Min 8 characters"}
                    />
                    {toggle && (
                      <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button disabled={saving} type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-70"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Update Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
