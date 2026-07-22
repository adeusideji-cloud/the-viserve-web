import Link from "next/link";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    id: "visa",
    emoji: "🌐",
    title: "Visa & Immigration Pathways",
    subtitle: "Comprehensive U.S. immigration support for individuals, families, and professionals.",
    color: "#0057A8",
    bg: "bg-white",
    services: [
      { emoji: "🏆", title: "EB-1A — Extraordinary Ability", desc: "Self-petition for individuals with extraordinary ability. No employer or PERM required.", href: "/services/eb1a" },
      { emoji: "🎓", title: "EB-1B — Outstanding Professors", desc: "International academic recognition with 3+ years of teaching or research experience.", href: "/services/eb1b" },
      { emoji: "🏢", title: "EB-1C — Multinational Managers", desc: "Green card for senior managers transferred from a qualifying foreign affiliate.", href: "/services/eb1c" },
      { emoji: "🔬", title: "EB-2 — National Interest Waiver", desc: "Self-petition for professionals whose work is in the national interest. No PERM required.", href: "/services/eb2-niw" },
      { emoji: "💼", title: "EB-3 — Skilled Workers", desc: "Employer-sponsored green card for skilled workers and professionals.", href: "/services/eb3" },
      { emoji: "⛪", title: "EB-4 — Religious Workers", desc: "For ministers and religious workers employed by qualifying U.S. nonprofit organizations.", href: "/services/eb4" },
      { emoji: "💰", title: "EB-5 — Investor Visa", desc: "Green card through capital investment ($800K–$1M+) creating at least 10 full-time jobs.", href: "/services/eb5" },
      { emoji: "🎒", title: "F-1 — Student Visa", desc: "Study at U.S. universities with work authorization through OPT and CPT.", href: "/services/f1" },
      { emoji: "🛂", title: "Work Visas — H-1B, L-1, O-1", desc: "Temporary work visas for specialty occupations, intracompany transfers, and more.", href: "/services/work-visas" },
      { emoji: "🇺🇸", title: "Green Card Applications", desc: "Form I-485 adjustment of status and I-130 petition for alien relative.", href: "/services" },
      { emoji: "⭐", title: "U.S. Citizenship (N-400)", desc: "Step-by-step naturalization service to become a U.S. citizen with confidence.", href: "/services" },
      { emoji: "👨‍👩‍👧", title: "Family-Based Immigration", desc: "Reunite with spouses, children, parents, and siblings through family petitions.", href: "/services" },
    ],
  },
  {
    id: "us-biz",
    emoji: "🏛️",
    title: "Business Registration in the United States",
    subtitle: "Everything you need to establish and maintain a legal business presence in the U.S.",
    color: "#0057A8",
    bg: "bg-gray-50",
    services: [
      { emoji: "🏢", title: "LLC Formation", desc: "Form a Limited Liability Company in any U.S. state with personal liability protection.", href: "/services/us-business/llc" },
      { emoji: "🏛️", title: "Corporation (C-Corp & S-Corp)", desc: "Incorporate for investor-friendly structure and unlimited growth potential.", href: "/services/us-business/corporation" },
      { emoji: "🔢", title: "EIN & Tax Registration", desc: "Obtain your Employer Identification Number from the IRS and register for state taxes.", href: "/services/us-business/ein" },
      { emoji: "📬", title: "Registered Agent", desc: "Stay compliant with a reliable registered agent in your state.", href: "/services/us-business/registered-agent" },
      { emoji: "📋", title: "Business Licenses & Permits", desc: "Identify and obtain federal, state, and local licenses to operate legally.", href: "/services/us-business/licenses" },
      { emoji: "📅", title: "Annual Compliance & Filings", desc: "Stay in good standing with annual reports, franchise tax, and BOI filings.", href: "/services/us-business/compliance" },
    ],
  },
  {
    id: "ng-biz",
    emoji: "🇳🇬",
    title: "Business Registration & Documents in Nigeria",
    subtitle: "CAC registration, government documents, and official certificate collection for Nigerians at home and abroad.",
    color: "#00A86B",
    bg: "bg-white",
    services: [
      { emoji: "📝", title: "Business Name Registration", desc: "Register your sole trader or partnership business name with the CAC.", href: "/services/nigeria-business/business-name" },
      { emoji: "🏢", title: "LLC Registration (RC Number)", desc: "Full CAC incorporation for a Limited Liability Company — get your RC number.", href: "/services/nigeria-business/llc" },
      { emoji: "⛪", title: "Incorporated Trustees (NGO/Church)", desc: "Register your NGO, church, or association as Incorporated Trustees with the CAC.", href: "/services/nigeria-business/trustees" },
      { emoji: "🔢", title: "TIN Registration", desc: "Obtain a Tax Identification Number from FIRS — required for all business activities.", href: "/services/nigeria-business/tin" },
      { emoji: "🪪", title: "NIN Registration", desc: "National Identity Number registration and verification services for Nigerians.", href: "/services/nigeria-business/nin" },
      { emoji: "📄", title: "Birth Certificate Collection", desc: "We liaise with NPC to obtain your official Nigerian birth certificate.", href: "/services/nigeria-business/birth-certificate" },
      { emoji: "🎓", title: "WAEC Certificate Collection", desc: "We process collection and verification of your WAEC certificate on your behalf.", href: "/services/nigeria-business/waec" },
    ],
  },
  {
    id: "tax",
    emoji: "💵",
    title: "Tax & Financial Services",
    subtitle: "Personal and business tax filing, bookkeeping, and financial planning in the U.S. and Nigeria.",
    color: "#0057A8",
    bg: "bg-gray-50",
    services: [
      { emoji: "🧾", title: "Personal Tax Filing (ITIN)", desc: "File your U.S. personal taxes accurately and on time, including ITIN applications.", href: "/services" },
      { emoji: "🏢", title: "Business Tax Filing", desc: "Complete business tax preparation and filing for LLCs, corporations, and partnerships.", href: "/services" },
      { emoji: "💳", title: "Sales Tax Registration", desc: "Register for state sales tax and stay compliant with nexus requirements.", href: "/services" },
      { emoji: "👥", title: "Payroll Services", desc: "Full-service payroll processing, tax withholding, and compliance for your business.", href: "/services" },
      { emoji: "📊", title: "Bookkeeping & Accounting", desc: "Monthly bookkeeping, financial statements, and reporting for your business.", href: "/services" },
      { emoji: "📈", title: "Tax Planning & Advisory", desc: "Strategic tax planning to minimize liabilities and maximize your financial position.", href: "/services" },
      { emoji: "🇳🇬", title: "Nigeria Tax Services", desc: "Personal and company tax returns, VAT registration, and PAYE processing in Nigeria.", href: "/services" },
    ],
  },
  {
    id: "legal",
    emoji: "⚖️",
    title: "Legal & Document Services",
    subtitle: "Professional document preparation, authentication, and legal support services.",
    color: "#00A86B",
    bg: "bg-white",
    services: [
      { emoji: "📝", title: "Contract Drafting & Review", desc: "Professional drafting and review of business contracts, agreements, and MOUs.", href: "/services" },
      { emoji: "📜", title: "Power of Attorney", desc: "Prepare and authenticate power of attorney documents for local and international use.", href: "/services" },
      { emoji: "🔏", title: "Affidavit & Notarization", desc: "Sworn affidavits and notarization services for legal and immigration purposes.", href: "/services" },
      { emoji: "🌐", title: "Legal Translation", desc: "Certified translation of legal documents for immigration and business use.", href: "/services" },
      { emoji: "✅", title: "Document Authentication", desc: "Authentication of documents for use in foreign countries and government agencies.", href: "/services" },
      { emoji: "🏛️", title: "Apostille & Attestation", desc: "Apostille certification for documents to be used in Hague Convention countries.", href: "/services" },
      { emoji: "📋", title: "RFE Response Support", desc: "Expert help organizing a strong response to USCIS Requests for Evidence.", href: "/services" },
      { emoji: "⚖️", title: "Attorney Referrals", desc: "Connect with vetted, licensed immigration attorneys for complex legal cases.", href: "/services" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Immigration, business registration, tax, and document services — everything you need in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-blue-900 bg-yellow-400 hover:bg-yellow-300 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                className="flex-shrink-0 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap">
                {s.emoji} {s.title.split(" ").slice(0, 2).join(" ")}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {sections.map((section) => (
        <section key={section.id} id={section.id} className={`py-20 ${section.bg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{section.emoji}</span>
                <h2 className="text-3xl font-bold" style={{ color: "#1a1a2e" }}>{section.title}</h2>
              </div>
              <p className="text-gray-600 max-w-2xl">{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.services.map((s) => (
                <Link key={s.title} href={s.href}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col hover:border-blue-300 hover:shadow-md transition-all group">
                  <div className="text-3xl mb-3">{s.emoji}</div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: section.color }}>
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-blue-100 text-lg mb-8">Use our free eligibility checker to find the right path — it only takes 2 minutes.</p>
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
