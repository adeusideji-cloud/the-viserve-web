import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Bell, User, LogOut } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Client";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Client Portal</h1>
            <p className="text-sm text-gray-500">Welcome back, {userName}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/dashboard/profile" className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
              <User className="w-5 h-5" />
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { label: "Active Cases", value: "1", icon: FileText, color: "bg-blue-50 text-blue-600" },
            { label: "Pending Documents", value: "3", icon: Upload, color: "bg-yellow-50 text-yellow-600" },
            { label: "Upcoming Deadlines", value: "2", icon: Clock, color: "bg-orange-50 text-orange-600" },
            { label: "Completed Steps", value: "5", icon: CheckCircle, color: "bg-green-50 text-green-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Case */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Active Case</h2>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-4">
                <div className="text-2xl">🇺🇸</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Green Card Application (I-485)</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Started May 1, 2026 · Case #VS-2026-0042</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">
                      <Clock className="w-3 h-3" /> In Progress
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <h3 className="font-semibold text-sm text-gray-700 mb-3">Case Progress</h3>
              <div className="space-y-3">
                {[
                  { step: "Eligibility Check", done: true },
                  { step: "Form I-485 Preparation", done: true },
                  { step: "Document Collection", done: false, active: true },
                  { step: "Biometrics Appointment", done: false },
                  { step: "USCIS Interview", done: false },
                  { step: "Approval & Card Delivery", done: false },
                ].map(({ step, done, active }) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${done ? "bg-green-500" : active ? "border-2 border-blue-500 bg-blue-50" : "bg-gray-100"}`}>
                      {done && <CheckCircle className="w-4 h-4 text-white" />}
                      {active && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <span className={`text-sm ${done ? "text-gray-400 line-through" : active ? "font-semibold text-blue-700" : "text-gray-500"}`}>{step}</span>
                    {active && <span className="text-xs text-blue-600 font-medium ml-auto">Current</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Document Checklist</h2>
                <Link href="/dashboard/documents" className="text-sm text-blue-600 font-medium hover:underline">View all</Link>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Form I-485 (Completed)", status: "done" },
                  { name: "Passport Copy", status: "done" },
                  { name: "Birth Certificate", status: "pending" },
                  { name: "Affidavit of Support (I-864)", status: "pending" },
                  { name: "Medical Exam (I-693)", status: "missing" },
                ].map(({ name, status }) => (
                  <div key={name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      {status === "done" ? <CheckCircle className="w-4 h-4 text-green-500" /> : status === "pending" ? <Clock className="w-4 h-4 text-yellow-500" /> : <AlertCircle className="w-4 h-4 text-red-500" />}
                      {name}
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${status === "done" ? "bg-green-100 text-green-700" : status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                      {status === "done" ? "Uploaded" : status === "pending" ? "Pending" : "Required"}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
                <Upload className="w-4 h-4" /> Upload Document
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Deadlines */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                {[
                  { date: "Jun 15", label: "Submit remaining documents", urgent: true },
                  { date: "Jul 3", label: "Biometrics appointment", urgent: false },
                ].map(({ date, label, urgent }) => (
                  <div key={label} className={`flex gap-3 p-3 rounded-xl ${urgent ? "bg-red-50 border border-red-100" : "bg-gray-50 border border-gray-100"}`}>
                    <div className={`text-center flex-shrink-0 ${urgent ? "text-red-600" : "text-gray-600"}`}>
                      <div className="text-xs font-medium">{date.split(" ")[0]}</div>
                      <div className="text-lg font-bold leading-none">{date.split(" ")[1]}</div>
                    </div>
                    <p className="text-sm text-gray-700 leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: "View My Forms", href: "/dashboard/forms" },
                  { label: "Contact Support", href: "/contact" },
                  { label: "Immigration Tools", href: "/tools" },
                  { label: "Resources & Guides", href: "/resources" },
                ].map(({ label, href }) => (
                  <Link key={label} href={href} className="flex items-center justify-between px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100">
                    {label}
                    <span>→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-blue-100 mb-4">Our support team is available Mon–Fri, 9AM–6PM EST.</p>
              <Link href="/contact" className="inline-block bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
