"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, Users, FileText, MessageSquare, UserCog,
  LogOut, Shield, Bell, Activity, ChevronRight, User, Key
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", superadminOnly: false },
  { icon: Users, label: "Clients", href: "/admin/clients", superadminOnly: false },
  { icon: FileText, label: "Cases", href: "/admin/cases", superadminOnly: false },
  { icon: MessageSquare, label: "Contacts", href: "/admin/contacts", superadminOnly: false },
  { icon: UserCog, label: "Admin Users", href: "/admin/admins", superadminOnly: true },
  { icon: Activity, label: "Activity Log", href: "/admin/activity", superadminOnly: true },
];

export default function AdminSidebar({ adminName, adminRole }: { adminName: string; adminRole: string }) {
  const pathname = usePathname();
  const isSuperAdmin = adminRole === "superadmin";
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const roleColor = adminRole === "superadmin" ? "text-yellow-400" : adminRole === "admin" ? "text-blue-400" : "text-gray-400";

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none">The ViServe</div>
            <div className="text-gray-500 text-xs mt-0.5">Admin Portal</div>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">{adminName}</div>
            <div className={`text-xs capitalize ${roleColor}`}>{adminRole}</div>
          </div>
          <Bell className="w-4 h-4 text-gray-500 flex-shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.filter(item => !item.superadminOnly || isSuperAdmin).map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group ${
                active ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-white" : "text-gray-500 group-hover:text-white"}`} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}

        <div className="pt-2 mt-2 border-t border-gray-800">
          <Link href="/admin/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group ${
              pathname === "/admin/profile" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <User className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-white" />
            My Profile
          </Link>
          <Link href="/admin/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors group"
          >
            <Key className="w-4 h-4 flex-shrink-0 text-gray-500 group-hover:text-white" />
            Change Password
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-800">
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
