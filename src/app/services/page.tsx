import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    id: "green-card",
    emoji: "🇺🇸",
    title: "Green Card Applications",
    subtitle: "Form I-485 & I-130",
    description: "Whether you're applying from inside the U.S. or helping a relative from abroad, our guided process ensures your green card application is accurate and complete.",
    features: ["Form I-485 (Adjustment of Status)", "Form I-130 (Petition for Alien Relative)", "Document checklist generation", "Biometrics appointment guidance", "Interview preparation tips"],
  },
  {
    id: "citizenship",
    emoji: "⭐",
    title: "U.S. Citizenship (N-400)",
    subtitle: "Naturalization Application",
    description: "Become a U.S. citizen with confidence. Our step-by-step naturalization service ensures your Form N-400 is properly prepared and filed.",
    features: ["Form N-400 preparation", "Eligibility verification", "Civics test study guide", "Interview prep materials", "Filing instructions"],
  },
  {
    id: "family",
    emoji: "👨‍👩‍👧",
    title: "Family-Based Immigration",
    subtitle: "Bring Your Family to the U.S.",
    description: "Reunite with your loved ones. We help with petitions for spouses, children, parents, and siblings to obtain permanent resident status.",
    features: ["Spousal visas (IR-1, CR-1)", "K-1 Fiancé visa (I-129F)", "Parent & sibling petitions", "Child immigration support", "Conditional green card removal"],
  },
  {
    id: "work-visa",
    emoji: "💼",
    title: "Employment-Based Visas",
    subtitle: "H-1B, L-1, O-1 & More",
    description: "Support for professionals, executives, and extraordinary ability individuals seeking to live and work in the United States.",
    features: ["H-1B specialty occupation", "L-1 intracompany transfer", "O-1 extraordinary ability", "EB-1, EB-2, EB-3 categories", "Labor certification (PERM)"],
  },
  {
    id: "student",
    emoji: "🎓",
    title: "Student & Exchange Visas",
    subtitle: "F-1, J-1, M-1 Support",
    description: "Pursue your education in the U.S. with proper visa documentation. We help students and exchange visitors prepare accurate visa applications.",
    features: ["F-1 student visa prep", "J-1 exchange visitor support", "SEVIS guidance", "OPT/CPT authorization", "Status change assistance"],
  },
  {
    id: "business",
    emoji: "🏢",
    title: "Business Immigration",
    subtitle: "Entrepreneurs & Investors",
    description: "Comprehensive immigration support for business owners, investors, and corporations navigating employment-based and investor visa categories.",
    features: ["EB-5 investor visa support", "E-2 treaty investor preparation", "Intracompany transfer (L-1)", "Corporate immigration planning", "Multi-employee petition support"],
  },
  {
    id: "nonprofit",
    emoji: "⛪",
    title: "Church & Nonprofit Immigration",
    subtitle: "Religious & Nonprofit Organizations",
    description: "Specialized immigration resources and support for religious workers, missionaries, and nonprofit organizations sponsoring foreign nationals.",
    features: ["R-1 religious worker visa", "Special immigrant religious worker (I-360)", "Nonprofit sponsorship guidance", "Missionary & pastor visa support", "Faith-based organization resources"],
  },
  {
    id: "rfe",
    emoji: "📋",
    title: "RFE Response Support",
    subtitle: "Request for Evidence",
    description: "Received an RFE or NOID? Don't panic. Our experts help you organize a strong, complete response to keep your application moving forward.",
    features: ["RFE/NOID analysis & strategy", "Document organization", "Evidence compilation guide", "Response letter templates", "Attorney referral if needed"],
  },
  {
    id: "document",
    emoji: "📄",
    title: "Document Preparation",
    subtitle: "Complete Document Packages",
    description: "From cover letters to affidavits, we generate all supporting documents your immigration case requires, customized to your specific answers.",
    features: ["Custom cover letters", "Affidavit of support (I-864)", "Personal statements", "Document translation guidance", "Organizational checklists"],
  },
  {
    id: "referrals",
    emoji: "⚖️",
    title: "Attorney Referrals",
    subtitle: "When You Need Legal Counsel",
    description: "For complex cases, we connect you with licensed immigration attorneys in our vetted network who provide legal advice at competitive rates.",
    features: ["Free case assessment", "Vetted attorney network", "Competitive fee structures", "Ongoing case support", "Multiple languages available"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Immigration Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Comprehensive, attorney-reviewed immigration support for individuals, families, businesses, churches, and professionals worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-blue-900 bg-yellow-400 hover:bg-yellow-300 transition-colors">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/tools#eligibility" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors">
              Check Eligibility Free
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} id={service.id} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 card-hover">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{service.emoji}</div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
                      <p className="text-sm font-medium" style={{ color: "#0057A8" }}>{service.subtitle}</p>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                    <ul className="space-y-1.5 mb-5">
                      {service.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#00A86B" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#0057A8" }}>
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
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
