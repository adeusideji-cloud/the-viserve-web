"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe, Building2, FileText, ChevronRight } from "lucide-react";

const megaMenu = [
  {
    key: "visa",
    label: "Visa & Immigration",
    icon: Globe,
    color: "#0057A8",
    bg: "#EEF4FF",
    href: "/services",
    items: [
      { label: "EB-1A — Extraordinary Ability", href: "/services/eb1a" },
      { label: "EB-1B — Outstanding Professors", href: "/services/eb1b" },
      { label: "EB-1C — Multinational Managers", href: "/services/eb1c" },
      { label: "EB-2 — National Interest Waiver", href: "/services/eb2-niw" },
      { label: "EB-3 — Skilled Workers", href: "/services/eb3" },
      { label: "EB-4 — Religious Workers", href: "/services/eb4" },
      { label: "EB-5 — Investor Visa", href: "/services/eb5" },
      { label: "F-1 — Student Visa", href: "/services/f1" },
      { label: "Work Visas (H-1B, L-1, O-1)", href: "/services/work-visas" },
      { label: "Green Card Applications", href: "/services" },
      { label: "U.S. Citizenship (N-400)", href: "/services" },
      { label: "Family-Based Immigration", href: "/services" },
    ],
    explore: { label: "Explore All Immigration", href: "/services" },
  },
  {
    key: "us-biz",
    label: "Business Registration & Setup",
    icon: Building2,
    color: "#0057A8",
    bg: "#EEF4FF",
    href: "/services/us-business",
    sections: [
      {
        flag: "🇺🇸",
        title: "In the United States",
        items: [
          { label: "LLC Formation", href: "/services/us-business/llc" },
          { label: "Corporation (C-Corp & S-Corp)", href: "/services/us-business/corporation" },
          { label: "EIN & Tax Registration", href: "/services/us-business/ein" },
          { label: "Registered Agent Service", href: "/services/us-business/registered-agent" },
          { label: "Business Licenses & Permits", href: "/services/us-business/licenses" },
          { label: "Annual Compliance & Filings", href: "/services/us-business/compliance" },
        ],
      },
      {
        flag: "🇳🇬",
        title: "In Nigeria",
        items: [
          { label: "Business Name Registration", href: "/services/nigeria-business/business-name" },
          { label: "CAC Registration (RC, LTD, NGO)", href: "/services/nigeria-business/llc" },
          { label: "Incorporated Trustees (NGO/Church)", href: "/services/nigeria-business/trustees" },
          { label: "TIN Registration", href: "/services/nigeria-business/tin" },
          { label: "Birth Certificate Collection", href: "/services/nigeria-business/birth-certificate" },
          { label: "WAEC Certificate Collection", href: "/services/nigeria-business/waec" },
        ],
      },
    ],
    explore: { label: "Explore All Business Services", href: "/services/us-business" },
  },
  {
    key: "docs",
    label: "Document & Legal Services",
    icon: FileText,
    color: "#00A86B",
    bg: "#EDFBF4",
    href: "/services",
    items: [
      { label: "RFE Response Support", href: "/services" },
      { label: "Document Preparation", href: "/services" },
      { label: "Affidavit of Support (I-864)", href: "/services" },
      { label: "Personal Statements", href: "/services" },
      { label: "Attorney Referrals", href: "/services" },
      { label: "Document Translation", href: "/services" },
    ],
    explore: { label: "Explore All Services", href: "/services" },
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Immigration Tools", href: "/tools" },
  { label: "Newsletter", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter(key: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(key);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setActive(null), 120);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.svg" alt="The ViServe" width={160} height={48} priority className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors">Home</Link>

            {/* Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={() => handleEnter("services")}
              onMouseLeave={handleLeave}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors">
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform ${active === "services" ? "rotate-180" : ""}`} />
              </button>

              {active === "services" && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100"
                  style={{ width: "860px" }}
                  onMouseEnter={() => handleEnter("services")}
                  onMouseLeave={handleLeave}
                >
                  {/* Top banner */}
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-800">Immigration, Business & Document Services</p>
                    <Link href="/services" className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1">
                      View All Services <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 divide-x divide-gray-100">
                    {megaMenu.map((col) => {
                      const Icon = col.icon;
                      return (
                        <div key={col.key} className="p-5">
                          {/* Column header */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: col.bg }}>
                              <Icon className="w-4 h-4" style={{ color: col.color }} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: col.color }}>{col.label}</span>
                          </div>

                          {/* Items */}
                          {"sections" in col ? (
                            col.sections!.map((sec) => (
                              <div key={sec.title} className="mb-4">
                                <div className="flex items-center gap-1.5 mb-2">
                                  <span className="text-base leading-none">{sec.flag}</span>
                                  <span className="text-xs font-semibold text-gray-500">{sec.title}</span>
                                </div>
                                <ul className="space-y-1">
                                  {sec.items.map((item) => (
                                    <li key={item.href + item.label}>
                                      <Link href={item.href} className="flex items-center justify-between group text-xs text-gray-600 hover:text-blue-700 py-1 px-2 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => setActive(null)}>
                                        {item.label}
                                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))
                          ) : (
                            <ul className="space-y-1 mb-4">
                              {col.items!.map((item) => (
                                <li key={item.href + item.label}>
                                  <Link href={item.href} className="flex items-center justify-between group text-xs text-gray-600 hover:text-blue-700 py-1 px-2 rounded-lg hover:bg-blue-50 transition-colors" onClick={() => setActive(null)}>
                                    {item.label}
                                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Explore button */}
                          <Link
                            href={col.explore.href}
                            className="mt-2 w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl border-2 transition-colors hover:bg-blue-50"
                            style={{ borderColor: col.color, color: col.color }}
                            onClick={() => setActive(null)}
                          >
                            {col.explore.label} <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/portal/login" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
              Client Portal
            </Link>
            <Link href="/get-started" className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors" style={{ background: "#0057A8" }}>
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 rounded-md text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md mb-1" onClick={() => setOpen(false)}>Home</Link>

          {megaMenu.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.key} className="mb-1">
                <button
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md"
                  onClick={() => setMobileOpen(mobileOpen === col.key ? null : col.key)}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: col.color }} />
                    {col.label}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpen === col.key ? "rotate-180" : ""}`} />
                </button>
                {mobileOpen === col.key && (
                  <div className="ml-4 mt-1 space-y-1">
                    {"sections" in col
                      ? col.sections!.flatMap((s) => s.items).map((item) => (
                          <Link key={item.href + item.label} href={item.href} className="block px-3 py-1.5 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md" onClick={() => { setOpen(false); setMobileOpen(null); }}>
                            {item.label}
                          </Link>
                        ))
                      : col.items!.map((item) => (
                          <Link key={item.href + item.label} href={item.href} className="block px-3 py-1.5 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md" onClick={() => { setOpen(false); setMobileOpen(null); }}>
                            {item.label}
                          </Link>
                        ))
                    }
                  </div>
                )}
              </div>
            );
          })}

          {navLinks.slice(1).map((link) => (
            <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2 mt-2">
            <Link href="/portal/login" className="px-3 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg text-gray-700">Client Portal</Link>
            <Link href="/get-started" className="px-3 py-2 text-sm font-semibold text-center text-white rounded-lg" style={{ background: "#0057A8" }}>Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
