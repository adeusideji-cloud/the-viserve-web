"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

type NavChild = { label: string; href: string; section?: string };
type NavLink = { label: string; href: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services", href: "/services",
    children: [
      { label: "Visa & Immigration Pathways", href: "/services", section: "Visa & Immigration Pathways" },
      { label: "EB-1A Extraordinary Ability", href: "/services/eb1a", section: "Visa & Immigration Pathways" },
      { label: "EB-1B Outstanding Professors", href: "/services/eb1b", section: "Visa & Immigration Pathways" },
      { label: "EB-1C Multinational Managers", href: "/services/eb1c", section: "Visa & Immigration Pathways" },
      { label: "EB-2 National Interest Waiver", href: "/services/eb2-niw", section: "Visa & Immigration Pathways" },
      { label: "EB-3 Skilled Workers", href: "/services/eb3", section: "Visa & Immigration Pathways" },
      { label: "EB-4 Religious Workers", href: "/services/eb4", section: "Visa & Immigration Pathways" },
      { label: "EB-5 Investor Visa", href: "/services/eb5", section: "Visa & Immigration Pathways" },
      { label: "F-1 Student Visa", href: "/services/f1", section: "Visa & Immigration Pathways" },
      { label: "Work Visas (H-1B, L-1, O-1)", href: "/services/work-visas", section: "Visa & Immigration Pathways" },
      { label: "Business Registration in the US", href: "/services/us-business", section: "Business Registration in the US" },
      { label: "LLC Formation", href: "/services/us-business/llc", section: "Business Registration in the US" },
      { label: "Corporation (C-Corp & S-Corp)", href: "/services/us-business/corporation", section: "Business Registration in the US" },
      { label: "EIN & Tax Registration", href: "/services/us-business/ein", section: "Business Registration in the US" },
      { label: "Registered Agent", href: "/services/us-business/registered-agent", section: "Business Registration in the US" },
      { label: "Business Licenses & Permits", href: "/services/us-business/licenses", section: "Business Registration in the US" },
      { label: "Annual Compliance & Filings", href: "/services/us-business/compliance", section: "Business Registration in the US" },
      { label: "Business Registration in Nigeria", href: "/services/nigeria-business", section: "Business Registration in Nigeria" },
      { label: "Business Name Registration", href: "/services/nigeria-business/business-name", section: "Business Registration in Nigeria" },
      { label: "LLC Registration (RC Number)", href: "/services/nigeria-business/llc", section: "Business Registration in Nigeria" },
      { label: "Incorporated Trustees (NGO/Church)", href: "/services/nigeria-business/trustees", section: "Business Registration in Nigeria" },
      { label: "TIN Registration", href: "/services/nigeria-business/tin", section: "Business Registration in Nigeria" },
      { label: "Birth Certificate Collection", href: "/services/nigeria-business/birth-certificate", section: "Business Registration in Nigeria" },
      { label: "WAEC Certificate Collection", href: "/services/nigeria-business/waec", section: "Business Registration in Nigeria" },
    ],
  },
  { label: "Immigration Tools", href: "/tools" },
  { label: "Newsletter", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SECTIONS = ["Visa & Immigration Pathways", "Business Registration in the US", "Business Registration in Nigeria"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image src="/logo.svg" alt="The ViServe Logo" width={160} height={48} priority className="h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors"
                    onMouseEnter={() => setDropdown(link.label)}
                    onMouseLeave={() => setDropdown(null)}
                  >
                    {link.label} <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {dropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2"
                      style={{ minWidth: "680px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
                      onMouseEnter={() => setDropdown(link.label)}
                      onMouseLeave={() => setDropdown(null)}
                    >
                      {SECTIONS.map((section) => (
                        <div key={section} className="px-3 pb-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 py-2 border-b border-gray-100 mb-1">
                            {section}
                          </div>
                          {link.children!
                            .filter((c) => c.section === section)
                            .map((child) => {
                              const isOverview = child.href === `/services/${section === "Visa & Immigration Pathways" ? "" : section === "Business Registration in the US" ? "us-business" : "nigeria-business"}`.replace(/\/$/, "") || child.href === "/services";
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block px-2 py-1.5 text-xs rounded transition-colors ${isOverview ? "font-semibold text-blue-700 hover:bg-blue-50" : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md transition-colors">
                  {link.label}
                </Link>
              )
            )}
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
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          <Link href="/" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md" onClick={() => setOpen(false)}>
            Home
          </Link>

          {/* Services mobile accordion */}
          <div>
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-md"
              onClick={() => setMobileSection(mobileSection ? null : "open")}
            >
              Services <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection ? "rotate-180" : ""}`} />
            </button>
            {mobileSection && (
              <div className="ml-3 mt-1 space-y-3">
                {SECTIONS.map((section) => (
                  <div key={section}>
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2 py-1">{section}</div>
                    {navLinks[1].children!
                      .filter((c) => c.section === section)
                      .map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-1.5 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                          onClick={() => { setOpen(false); setMobileSection(null); }}
                        >
                          {child.label}
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(2).map((link) => (
            <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link href="/portal/login" className="px-3 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Client Portal
            </Link>
            <Link href="/get-started" className="px-3 py-2 text-sm font-semibold text-center text-white rounded-lg" style={{ background: "#0057A8" }}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
