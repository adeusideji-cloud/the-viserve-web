"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserPlus, Loader2 } from "lucide-react";

export default function AddAdminForm({ currentAdminId }: { currentAdminId: string }) {
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "admin" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const res = await fetch("/api/admin/admins/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) { setError(data.error || "Failed to create admin"); setLoading(false); return; }

    setSuccess(`✅ Admin "${form.full_name}" created successfully! They can now log in.`);
    setForm({ full_name: "", email: "", password: "", role: "admin" });
    setLoading(false);
    setTimeout(() => window.location.reload(), 2000);
  }

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
      <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
        <UserPlus className="w-4 h-4 text-blue-400" /> Add New Admin
      </h2>

      {error && <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-xl text-sm text-red-300">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-900/40 border border-green-700 rounded-xl text-sm text-green-300">{success}</div>}

      <form onSubmit={handleAdd} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
          <input required value={form.full_name} onChange={e => setForm({...form, full_name: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@theviservetech.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Password *</label>
          <input required type="password" minLength={8} value={form.password} onChange={e => setForm({...form, password: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Min 8 characters"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Role *</label>
          <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="viewer">Viewer — Read only</option>
            <option value="admin">Admin — Full access</option>
            <option value="superadmin">Super Admin — Manage admins</option>
          </select>
        </div>
        <button disabled={loading} type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
          Create Admin Account
        </button>
      </form>

      <div className="mt-4 p-3 bg-gray-800 rounded-xl">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-400">Roles:</strong><br />
          • <span className="text-gray-400">Viewer</span> — View clients, cases & contacts only<br />
          • <span className="text-blue-400">Admin</span> — Full client/case management<br />
          • <span className="text-yellow-400">Super Admin</span> — Can also manage other admins
        </p>
      </div>
    </div>
  );
}
