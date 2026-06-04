"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services", href: "/services",
    children: [
      { label: "Eligibility Assessment", href: "/services#eligibility" },
      { label: "Form Preparation", href: "/services#forms" },
      { label: "Document Checklists", href: "/services#documents" },
      { label: "RFE Support", href: "/services#rfe" },
      { label: "Attorney Referrals", href: "/services#referrals" },
    ],
  },
  { label: "Immigration Tools", href: "/tools" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold" style={{ color: "#0057A8" }}>ViServe</span>
              <span className="text-xs block leading-none text-gray-500 -mt-0.5">Immigration Services</span>
            </div>
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
                      className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                      onMouseEnter={() => setDropdown(link.label)}
                      onMouseLeave={() => setDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700">
                          {child.label}
                        </Link>
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
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors">
              Sign In
            </Link>
            <Link href="/get-started" className="px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors" style={{ background: "#0057A8" }}>
              Get Started Free
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
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md" onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link href="/login" className="px-3 py-2 text-sm font-medium text-center border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Sign In
            </Link>
            <Link href="/get-started" className="px-3 py-2 text-sm font-semibold text-center text-white rounded-lg" style={{ background: "#0057A8" }}>
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
