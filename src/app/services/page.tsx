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
    id: "rfe",
    emoji: "📋",
    title: "RFE Response Support",
    subtitle: "Request for Evidence",
    description: "Received an RFE? Don't panic. Our experts help you organize a strong, complete response to keep your application moving forward.",
    features: ["RFE analysis & strategy", "Document organization", "Evidence compilation guide", "Response letter templates", "Attorney referral if needed"],
  },
  {
    id: "referrals",
    emoji: "⚖️",
    title: "Attorney Referrals",
    subtitle: "When You Need Legal Counsel",
    description: "For complex cases, we connect you with licensed immigration attorneys in our vetted network who provide legal advice at competitive rates.",
    features: ["Free case assessment", "Vetted attorney network", "Competitive fee structures", "Ongoing case support", "Multiple languages available"],
  },
  {
    id: "document",
    emoji: "📄",
    title: "Document Preparation",
    subtitle: "Complete Document Packages",
    description: "From cover letters to affidavits, we generate all supporting documents your immigration case requires, customized to your specific answers.",
    features: ["Custom cover letters", "Affidavit of support (I-864)", "Personal statements", "Document translation guidance", "Organizational checklists"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Immigration Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Comprehensive, attorney-reviewed immigration support for individuals, families, and professionals worldwide.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 mt-8 px-8 py-4 font-semibold rounded-xl text-blue-900 bg-yellow-400 hover:bg-yellow-300 transition-colors">
            Check My Eligibility Free <ArrowRight className="w-5 h-5" />
          </Link>
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
                    <Link href={`/contact`} className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#0057A8" }}>
                      Get Started <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
