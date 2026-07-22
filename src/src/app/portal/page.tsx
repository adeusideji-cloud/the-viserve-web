"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { FileText, Upload, CheckCircle, Clock, AlertCircle, User, LogOut, Bell, Globe, ChevronRight, Shield } from "lucide-react";

export default function PortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [profile, setProfile] = useState<Record<string, string> | null>(null);
  const [cases, setCases] = useState<Array<Record<string, string>>>([]);
  const [docs, setDocs] = useState<Array<Record<string, string>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/portal/login"); return; }
      setUser(user as unknown as Record<string, unknown>);

      const [{ data: p }, { data: c }, { data: d }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("cases").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("documents").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      setProfile(p as Record<string, string>);
      setCases((c ?? []) as Array<Record<string, string>>);
      setDocs((d ?? []) as Array<Record<string, string>>);
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500 text-sm">Loading your portal...</p>
      </div>
    </div>
  );

  const name = profile?.full_name || (user?.email as string)?.split("@")[0] || "Client";
  const statusColors: Record<string, string> = {
    in_progress: "bg-yellow-100 text-yellow-700",
    submitted: "bg-blue-100 text-blue-700",
    approved: "bg-green-100 text-green-700",
    denied: "bg-red-100 text-red-700",
  };

  const docsUploaded = docs.filter(d => d.status === "uploaded").length;
  const docsPending = docs.filter(d => d.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm" style={{ color: "#0057A8" }}>The ViServe</span>
          </Link>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <span className="hidden sm:block">Client Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/portal/profile" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {name.charAt(0).toUpperCase()}
            </Link>
            <button onClick={handleLogout} className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {name.split(" ")[0]}! 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here's an overview of your immigration journey.</p>
        </div>

        {/* Profile Completion Alert */}
        {profile && (!profile.passport_number || !profile.immigration_goal) && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">Complete your profile</p>
              <p className="text-xs text-yellow-600">Add your passport details and immigration goal to get started.</p>
            </div>
            <Link href="/portal/profile" className="text-xs font-semibold text-yellow-700 hover:underline whitespace-nowrap">Complete →</Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Cases", value: cases.filter(c => c.status === "in_progress").length, icon: FileText, color: "text-blue-600 bg-blue-50" },
            { label: "Documents Uploaded", value: docsUploaded, icon: CheckCircle, color: "text-green-600 bg-green-50" },
            { label: "Pending Documents", value: docsPending, icon: Clock, color: "text-yellow-600 bg-yellow-50" },
            { label: "Total Cases", value: cases.length, icon: Shield, color: "text-purple-600 bg-purple-50" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cases */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">My Cases</h2>
                <Link href="/portal/documents" className="text-xs text-blue-600 hover:underline">Upload Documents →</Link>
              </div>
              {cases.length ? (
                <div className="divide-y divide-gray-50">
                  {cases.map(c => (
                    <div key={c.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{c.case_number}</div>
                        <div className="text-gray-500 text-xs capitalize">{(c.case_type || "").replace(/-/g, " ")} · {c.form_number || "—"}</div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[c.status] || "bg-gray-100 text-gray-600"}`}>
                        {(c.status || "").replace(/_/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-10 text-center">
                  <FileText className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm font-medium">No cases yet</p>
                  <p className="text-gray-400 text-xs mt-1">Our team will create your case after reviewing your documents.</p>
                  <Link href="/contact" className="mt-4 inline-block text-sm text-blue-600 font-medium hover:underline">Contact us to get started →</Link>
                </div>
              )}
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">My Documents</h2>
                <Link href="/portal/documents" className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Upload New
                </Link>
              </div>
              {docs.length ? (
                <div className="divide-y divide-gray-50">
                  {docs.slice(0, 5).map(doc => (
                    <div key={doc.id} className="px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {doc.status === "uploaded" ? <CheckCircle className="w-4 h-4 text-green-500" /> :
                         doc.status === "pending" ? <Clock className="w-4 h-4 text-yellow-500" /> :
                         <AlertCircle className="w-4 h-4 text-red-500" />}
                        <span className="text-sm text-gray-700">{doc.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${doc.status === "uploaded" ? "bg-green-100 text-green-700" : doc.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-10 text-center">
                  <Upload className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm font-medium">No documents uploaded yet</p>
                  <Link href="/portal/documents" className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl" style={{ background: "#0057A8" }}>
                    <Upload className="w-4 h-4" /> Upload Documents
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-5">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Upload Documents", href: "/portal/documents", icon: Upload, color: "text-blue-600" },
                  { label: "Edit My Profile", href: "/portal/profile", icon: User, color: "text-green-600" },
                  { label: "Contact Support", href: "/contact", icon: Bell, color: "text-orange-600" },
                  { label: "Immigration Tools", href: "/tools", icon: Shield, color: "text-purple-600" },
                ].map(({ label, href, icon: Icon, color }) => (
                  <Link key={label} href={href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 border border-gray-100 transition-colors">
                    <Icon className={`w-4 h-4 ${color}`} />
                    {label}
                    <ChevronRight className="w-3 h-3 ml-auto text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">My Profile</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Name", value: profile?.full_name },
                  { label: "Email", value: user?.email as string },
                  { label: "Phone", value: profile?.phone },
                  { label: "Country", value: profile?.country },
                  { label: "Goal", value: profile?.immigration_goal },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-gray-700 text-right max-w-36 truncate">{value}</span>
                  </div>
                ) : null)}
              </div>
              <Link href="/portal/profile" className="mt-4 block text-center text-xs text-blue-600 hover:underline font-medium">
                Edit Profile →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
