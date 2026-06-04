import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Essential",
    price: "$79",
    period: "per application",
    description: "Perfect for straightforward cases with all the essentials included.",
    features: [
      "One USCIS form preparation",
      "Document checklist",
      "Filing instructions",
      "Email support",
      "PDF download",
      "30-day access",
    ],
    cta: "Get Started",
    href: "/get-started?plan=essential",
    highlight: false,
    badge: null,
  },
  {
    name: "Complete",
    price: "$149",
    period: "per application",
    description: "Our most popular plan — everything you need from start to filing.",
    features: [
      "All forms for your case",
      "Custom document checklist",
      "Cover letter & affidavits",
      "Filing instructions",
      "Priority email + chat support",
      "Deadline reminder system",
      "90-day access",
      "Satisfaction guarantee",
    ],
    cta: "Start My Application",
    href: "/get-started?plan=complete",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Premium",
    price: "$249",
    period: "per application",
    description: "Full-service support for complex cases, including RFE assistance.",
    features: [
      "Everything in Complete",
      "RFE response support",
      "Document review",
      "Phone + priority support",
      "Attorney consultation (1hr)",
      "180-day access",
      "Full refund guarantee",
      "Dedicated case manager",
    ],
    cta: "Go Premium",
    href: "/get-started?plan=premium",
    highlight: false,
    badge: "Best Value",
  },
];

const faqs = [
  { q: "Is ViServe a law firm?", a: "No. ViServe Inc. is not a law firm and does not provide legal advice. We provide self-help immigration document preparation services only." },
  { q: "What is your refund policy?", a: "If USCIS denies your application and it is due to an error in our preparation, we will refund our service fee in full. See our Refund Policy for full details." },
  { q: "Can I upgrade my plan?", a: "Yes, you can upgrade your plan at any time from within your client dashboard and only pay the difference." },
  { q: "Are government (USCIS) filing fees included?", a: "No. Our fees cover document preparation only. USCIS filing fees are separate and paid directly to USCIS." },
  { q: "How long does the process take?", a: "Our preparation typically takes 30 minutes to a few hours depending on the form. USCIS processing times vary by case type." },
];

export default function PricingPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">No hidden fees. No surprises. Pay only for what you need.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative bg-white rounded-2xl p-8 shadow-sm border card-hover ${plan.highlight ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-100"}`}>
                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-4 py-1 rounded-full ${plan.highlight ? "bg-blue-600" : "bg-green-600"}`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-bold" style={{ color: "#0057A8" }}>{plan.price}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{plan.period}</p>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#00A86B" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href} className={`w-full block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${plan.highlight ? "text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"}`} style={plan.highlight ? { background: "#0057A8" } : {}}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            * USCIS government filing fees are NOT included. Prices are for document preparation services only.
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "#1a1a2e" }}>Our Satisfaction Guarantee</h2>
          <p className="text-gray-600 leading-relaxed">
            If USCIS denies your application due to an error in our preparation, we will refund our full service fee. We stand behind the quality of our work.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: "#1a1a2e" }}>Pricing FAQs</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-700 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Not sure which plan is right for you?</h2>
          <p className="text-blue-100 mb-6">Use our free eligibility checker to get a personalized recommendation.</p>
          <Link href="/tools#eligibility" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl text-blue-900 bg-yellow-400 hover:bg-yellow-300 transition-colors">
            Check My Eligibility <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
