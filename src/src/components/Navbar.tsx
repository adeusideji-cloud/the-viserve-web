"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, ChevronRight, Globe, Building2, DollarSign, FileText, Star, Zap, Users, Lock } from "lucide-react";

const megaColumns = [
  {
    key: "visa",
    label: "Visa & Immigration",
    icon: Globe,
    color: "#0057A8",
    bg: "#EEF4FF",
    sections: [
      {
        flag: "🇺🇸",
        title: "U.S. Immigration Services",
        items: [
          { label: "EB-1A — Extraordinary Ability", href: "/services/eb1a" },
          { label: "EB-1B — Outstanding Professors", href: "/services/eb1b" },
          { label: "EB-1C — Multinational Managers", href: "/services/eb1c" },
          { label: "EB-2 — National Interest Waiver", href: "/services/eb2-niw" },
          { label: "EB-3 — Skilled Workers", href: "/services/eb3" },
          { label: "EB-4 — Religious Workers", href: "/services/eb4" },
          { label: "EB-5 — Investor Visa", href: "/services/eb5" },
          { label: "F-1 Student Visa", href: "/services/f1" },
          { label: "Work Visas (H-1B, L-1, O-1)", href: "/services/work-visas" },
          { label: "Green Card Applications", href: "/services" },
          { label: "U.S. Citizenship (N-400)", href: "/services" },
          { label: "Family-Based Immigration", href: "/services" },
        ],
      },
    ],
    explore: { label: "Explore All Immigration", href: "/services" },
  },
  {
    key: "biz",
    label: "Business Registration",
    icon: Building2,
    color: "#0057A8",
    bg: "#EEF4FF",
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
          { label: "Incorporated Trustees", href: "/services/nigeria-business/trustees" },
          { label: "TIN Registration", href: "/services/nigeria-business/tin" },
          { label: "NIN Registration", href: "/services/nigeria-business/nin" },
          { label: "Birth Certificate Collection", href: "/services/nigeria-business/birth-certificate" },
          { label: "WAEC Certificate Collection", href: "/services/nigeria-business/waec" },
        ],
      },
    ],
    explore: { label: "Explore All Business Services", href: "/services/us-business" },
  },
  {
    key: "tax",
    label: "Tax & Financial Services",
    icon: DollarSign,
    color: "#0057A8",
    bg: "#EEF4FF",
    sections: [
      {
        flag: "🇺🇸",
        title: "United States",
        items: [
          { label: "Personal Tax Filing (ITIN)", href: "/services" },
          { label: "Business Tax Filing", href: "/services" },
          { label: "Sales Tax Registration", href: "/services" },
          { label: "Payroll Services", href: "/services" },
          { label: "Bookkeeping & Accounting", href: "/services" },
          { label: "Tax Planning & Advisory", href: "/services" },
        ],
      },
      {
        flag: "🇳🇬",
        title: "Nigeria",
        items: [
          { label: "Personal Tax Filing", href: "/services" },
          { label: "Company Tax Returns", href: "/services" },
          { label: "VAT Registration & Filing", href: "/services" },
          { label: "Payroll & PAYE", href: "/services" },
          { label: "Tax Advisory & Planning", href: "/services" },
        ],
      },
    ],
    explore: { label: "Explore Tax Services", href: "/services" },
  },
  {
    key: "legal",
    label: "Legal & Document Services",
    icon: FileText,
    color: "#00A86B",
    bg: "#EDFBF4",
    sections: [
      {
        flag: "",
        title: "Document Services",
        items: [
          { label: "Contract Drafting & Review", href: "/services" },
          { label: "Power of Attorney", href: "/services" },
          { label: "Affidavit & Notarization", href: "/services" },
          { label: "Legal Translation", href: "/services" },
          { label: "Document Authentication", href: "/services" },
          { label: "Apostille & Attestation", href: "/services" },
          { label: "RFE Response Support", href: "/services" },
          { label: "Affidavit of Support (I-864)", href: "/services" },
          { label: "Personal Statements", href: "/services" },
          { label: "Attorney Referrals", href: "/services" },
        ],
      },
    ],
    explore: { label: "Explore Document Services", href: "/services" },
  },
];

const trustBadges = [
  { icon: Star, label: "Trusted Experts", desc: "Years of experience delivering reliable solutions." },
  { icon: Zap, label: "Fast & Efficient", desc: "We value your time and deliver on schedule." },
  { icon: Users, label: "Client Focused", desc: "Your success is our number one priority." },
  { icon: Lock, label: "Secure & Confidential", desc: "Your information is always protected." },
];

const navLinks = [
  { label: "Immigration Tools", href: "/tools" },
  { label: "Newsletter", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive("services");
  }
  function handleLeave() {
    timeoutRef.current = setTimeout(() => setActive(null), 150);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.svg" alt="The ViServe" width={160} height={48} priority className="h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors">Home</Link>

            <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors">
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform ${active === "services" ? "rotate-180" : ""}`} />
              </button>

              {active === "services" && (
                <div
                  className="absolute top-full mt-1 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  style={{ width: "1100px", left: "50%", transform: "translateX(-50%)" }}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                >
                  {/* Header bar */}
                  <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <p className="text-sm font-semibold text-gray-700">Immigration, Business, Tax & Document Services</p>
                    <Link href="/services" className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1">
                      View All Services <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* 4 columns */}
                  <div className="grid grid-cols-4 divide-x divide-gray-100">
                    {megaColumns.map((col) => {
                      const Icon = col.icon;
                      return (
                        <div key={col.key} className="p-4 flex flex-col">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: col.bg }}>
                              <Icon className="w-3.5 h-3.5" style={{ color: col.color }} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: col.color }}>{col.label}</span>
                          </div>

                          {col.sections.map((sec) => (
                            <div key={sec.title} className="mb-3">
                              {sec.title && (
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  {sec.flag && <span className="text-sm leading-none">{sec.flag}</span>}
                                  <span className="text-xs font-semibold text-gray-500">{sec.title}</span>
                                </div>
                              )}
                              <div className="space-y-0.5">
                                {sec.items.map((item) => (
                                  <Link key={item.href + item.label} href={item.href}
                                    className="block px-2 py-1 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors">
                                    {item.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}

                          <div className="mt-auto pt-3 border-t border-gray-100">
                            <Link href={col.explore.href}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline">
                              {col.explore.label} <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Trust badges footer */}
                  <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 grid grid-cols-4 gap-4">
                    {trustBadges.map(({ icon: Icon, label, desc }) => (
                      <div key={label} className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-blue-700" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-800">{label}</div>
                          <div className="text-xs text-gray-500 leading-tight">{desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/portal/login" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">Client Portal</Link>
            <Link href="/get-started" className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors" style={{ background: "#0057A8" }}>
              Get Started
            </Link>
          </div>

          <button className="lg:hidden p-2 rounded-md text-gray-700" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md" onClick={() => setOpen(false)}>Home</Link>

          <div>
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md"
              onClick={() => setMobileSection(mobileSection ? null : "open")}
            >
              Services <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection ? "rotate-180" : ""}`} />
            </button>
            {mobileSection && (
              <div className="ml-3 mt-1 space-y-4">
                {megaColumns.map((col) => (
                  <div key={col.key}>
                    <div className="text-xs font-bold uppercase tracking-wider px-2 py-1" style={{ color: col.color }}>{col.label}</div>
                    {col.sections.map((sec) => (
                      <div key={sec.title}>
                        {sec.title && <div className="text-xs font-semibold text-gray-400 px-2 py-1">{sec.flag} {sec.title}</div>}
                        {sec.items.map((item) => (
                          <Link key={item.label} href={item.href}
                            className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                            onClick={() => { setOpen(false); setMobileSection(null); }}>
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
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
