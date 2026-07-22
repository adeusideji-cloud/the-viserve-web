import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const visaPathways = [
  { emoji: "🏆", title: "EB-1A — Extraordinary Ability", desc: "Self-petition for individuals with extraordinary ability in sciences, arts, education, business, or athletics. No employer or PERM required.", href: "/services/eb1a" },
  { emoji: "🎓", title: "EB-1B — Outstanding Professors & Researchers", desc: "International academic recognition with 3+ years of teaching or research experience. Employer sponsorship required, no PERM.", href: "/services/eb1b" },
  { emoji: "🏢", title: "EB-1C — Multinational Managers & Executives", desc: "Green card for senior managers and executives transferred from a qualifying foreign affiliate or subsidiary.", href: "/services/eb1c" },
  { emoji: "🔬", title: "EB-2 — National Interest Waiver (NIW)", desc: "Self-petition for professionals whose work is in the national interest of the United States. No employer or PERM required.", href: "/services/eb2-niw" },
  { emoji: "💼", title: "EB-3 — Skilled Workers & Professionals", desc: "Employer-sponsored green card for skilled workers (2+ yrs experience), professionals (bachelor's degree), and other workers.", href: "/services/eb3" },
  { emoji: "⛪", title: "EB-4 — Religious & Special Immigrants", desc: "For ministers and religious workers employed full-time by qualifying U.S. nonprofit religious organizations.", href: "/services/eb4" },
  { emoji: "💰", title: "EB-5 — Investor Visa", desc: "Green card through capital investment ($800K–$1M+) in a U.S. enterprise that creates at least 10 full-time jobs.", href: "/services/eb5" },
  { emoji: "🎒", title: "F-1 — Student Visa", desc: "Study at accredited U.S. universities, colleges, and schools with work authorization through OPT and CPT.", href: "/services/f1" },
  { emoji: "🛂", title: "Work Visas — H-1B, L-1, O-1 & More", desc: "Temporary work visas for specialty occupations, intracompany transfers, extraordinary ability, TN, E-1/E-2, R-1, J-1 and more.", href: "/services/work-visas" },
];

const otherServices = [
  {
    emoji: "🇺🇸",
    title: "Green Card Applications",
    subtitle: "Form I-485 & I-130",
    desc: "Whether applying from inside the U.S. or helping a relative from abroad, our guided process ensures your green card application is accurate and complete.",
    features: ["Form I-485 (Adjustment of Status)", "Form I-130 (Petition for Alien Relative)", "Document checklist generation", "Biometrics appointment guidance", "Interview preparation tips"],
  },
  {
    emoji: "⭐",
    title: "U.S. Citizenship (N-400)",
    subtitle: "Naturalization Application",
    desc: "Become a U.S. citizen with confidence. Our step-by-step naturalization service ensures your Form N-400 is properly prepared and filed.",
    features: ["Form N-400 preparation", "Eligibility verification", "Civics test study guide", "Interview prep materials", "Filing instructions"],
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Family-Based Immigration",
    subtitle: "Bring Your Family to the U.S.",
    desc: "Reunite with your loved ones. We help with petitions for spouses, children, parents, and siblings to obtain permanent resident status.",
    features: ["Spousal visas (IR-1, CR-1)", "K-1 Fiancé visa (I-129F)", "Parent & sibling petitions", "Child immigration support", "Conditional green card removal"],
  },
  {
    emoji: "🏢",
    title: "Business Immigration",
    subtitle: "Entrepreneurs & Investors",
    desc: "Comprehensive immigration support for business owners, investors, and corporations navigating employment-based and investor visa categories.",
    features: ["EB-5 investor visa support", "E-2 treaty investor preparation", "Intracompany transfer (L-1)", "Corporate immigration planning", "Multi-employee petition support"],
  },
  {
    emoji: "⛪",
    title: "Church & Nonprofit Immigration",
    subtitle: "Religious & Nonprofit Organizations",
    desc: "Specialized immigration resources and support for religious workers, missionaries, and nonprofit organizations sponsoring foreign nationals.",
    features: ["R-1 religious worker visa", "Special immigrant religious worker (I-360)", "Nonprofit sponsorship guidance", "Missionary & pastor visa support", "Faith-based organization resources"],
  },
  {
    emoji: "📋",
    title: "RFE Response Support",
    subtitle: "Request for Evidence",
    desc: "Received an RFE or NOID? Don't panic. Our experts help you organize a strong, complete response to keep your application moving forward.",
    features: ["RFE/NOID analysis & strategy", "Document organization", "Evidence compilation guide", "Response letter templates", "Attorney referral if needed"],
  },
  {
    emoji: "📄",
    title: "Document Preparation",
    subtitle: "Complete Document Packages",
    desc: "From cover letters to affidavits, we generate all supporting documents your immigration case requires, customized to your specific answers.",
    features: ["Custom cover letters", "Affidavit of support (I-864)", "Personal statements", "Document translation guidance", "Organizational checklists"],
  },
  {
    emoji: "⚖️",
    title: "Attorney Referrals",
    subtitle: "Licensed Immigration Attorneys",
    desc: "For complex cases requiring legal advice, we connect you with vetted, licensed immigration attorneys who specialize in your specific situation.",
    features: ["Vetted attorney network", "Case complexity assessment", "Warm referral process", "Specialized attorney matching", "Follow-up support"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Visa & Immigration Pathways</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Find the right immigration path for your goals — from employment-based green cards and investor visas to student and work visas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-blue-900 bg-yellow-400 hover:bg-yellow-300 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/tools#eligibility" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors">
              Check Eligibility Free
            </Link>
          </div>
        </div>
      </section>

      {/* Visa & Immigration Pathways */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Employment-Based & Visa Pathways</h2>
            <p className="text-gray-600">Detailed guides and step-by-step support for every employment-based immigration category.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visaPathways.map((s) => (
              <Link key={s.href} href={s.href} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#0057A8" }}>
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Additional Immigration Services</h2>
            <p className="text-gray-600">Full support across family immigration, citizenship, document preparation, and more.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherServices.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col">
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: "#0057A8" }}>{s.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/get-started" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#0057A8" }}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-blue-100 text-lg mb-8">Use our free eligibility checker to find the right path for your situation — it only takes 2 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools#eligibility" className="px-8 py-4 font-semibold bg-yellow-400 text-blue-900 hover:bg-yellow-300 rounded-xl transition-colors">
              Check My Eligibility
            </Link>
            <Link href="/contact" className="px-8 py-4 font-semibold border-2 border-white/50 hover:border-white hover:bg-white/10 rounded-xl transition-colors">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
