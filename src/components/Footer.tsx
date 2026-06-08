import Link from "next/link";
import { Globe, Mail, Phone, MapPin, Share2, MessageCircle, Rss, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">The ViServe</span>
            </Link>
            <p className="text-sm text-gray-400 mb-5 max-w-xs leading-relaxed">
              Empowering immigrants worldwide with affordable, accurate, and accessible immigration support services.
            </p>
            <div className="flex gap-3">
              {[Share2, MessageCircle, Rss, Video].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-sm text-gray-400">
              <a href="mailto:info@theviserve.com" className="flex items-center gap-2 hover:text-white"><Mail className="w-4 h-4" /> info@theviserve.com</a>
              <a href="tel:+1-800-VISERVE" className="flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4" /> +1-800-VISERVE</a>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> United States (Global Service)</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {["Green Card Applications","Visa Petitions","Citizenship (N-400)","Family Immigration","Employment Visas","Student Visas","RFE Support","Attorney Referrals"].map(s => (
                <li key={s}><Link href="/services" className="hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-4">Immigration Tools</h3>
            <ul className="space-y-2 text-sm">
              {["Eligibility Checker","Visa Finder","Document Generator","Fee Calculator","Deadline Tracker","RFE Organizer","Immigration Glossary","Case Status Lookup"].map(t => (
                <li key={t}><Link href="/tools" className="hover:text-white transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {[["About Us","/about"],["Pricing","/pricing"],["Resources","/resources"],["Contact","/contact"],["Client Portal","/dashboard"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
            <h3 className="text-white font-semibold mt-6 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {[["Terms of Use","/legal/terms"],["Privacy Policy","/legal/privacy"],["Disclaimer","/legal/disclaimer"],["Refund Policy","/legal/refund"]].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} The ViServe All rights reserved.</p>
          <p className="text-center text-xs">
            ⚠️ The The The ViServe is not a law firm. We provide self-help document preparation services only. We are not attorneys and do not provide legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
