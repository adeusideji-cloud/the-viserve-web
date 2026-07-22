"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services", href: "/services",
    children: [
      { label: "EB-1A Extraordinary Ability", href: "/services/eb1a" },
      { label: "EB-1B Outstanding Professors", href: "/services/eb1b" },
      { label: "EB-1C Multinational Managers", href: "/services/eb1c" },
      { label: "EB-2 National Interest Waiver", href: "/services/eb2-niw" },
      { label: "EB-3 Skilled Workers", href: "/services/eb3" },
      { label: "EB-4 Religious Workers", href: "/services/eb4" },
      { label: "EB-5 Investor Visa", href: "/services/eb5" },
      { label: "F-1 Student Visa", href: "/services/f1" },
      { label: "Work Visas (H-1B, L-1, O-1)", href: "/services/work-visas" },
      { label: "All Services", href: "/services" },
    ],
  },
  { label: "Immigration Tools", href: "/tools" },
  { label: "Newsletter", href: "/pricing" },
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
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
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
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
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
