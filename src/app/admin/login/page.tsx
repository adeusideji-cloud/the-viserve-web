"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) { setError(authError.message); setLoading(false); return; }

    // Verify this user is in admin_users table
    const { data: adminUser } = await supabase
      .from("admin_users")
      .select("id, role, is_active, full_name")
      .eq("auth_user_id", data.user.id)
      .single();

    if (!adminUser || !adminUser.is_active) {
      await supabase.auth.signOut();
      setError("Access denied. You are not authorized as an admin.");
      setLoading(false);
      return;
    }

    // Log the login
    await supabase.from("admin_activity_log").insert({
      admin_id: adminUser.id,
      action: "admin_login",
      details: { email },
    });

    // Update last_login
    await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", adminUser.id);

    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">The ViServe — Backend Administration</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
          {error && (
            <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-xl text-sm text-red-300">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Admin Email</label>
              <input
                required type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                placeholder="admin@theviservetech.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  required type={showPw ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12 placeholder-gray-500"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              disabled={loading} type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-opacity"
              style={{ background: "#0057A8" }}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Sign In to Admin"}
            </button>
          </form>
          <p className="text-center text-xs text-gray-600 mt-6">
            This portal is restricted to authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
