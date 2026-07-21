import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  { emoji: "🏢", title: "LLC Formation", desc: "Form a Limited Liability Company in any US state — flexible structure with personal liability protection and pass-through taxation.", href: "/services/us-business/llc" },
  { emoji: "🏛️", title: "Corporation (C-Corp & S-Corp)", desc: "Incorporate a C-Corp or S-Corp for investor-friendly structure, unlimited growth potential, and clear ownership separation.", href: "/services/us-business/corporation" },
  { emoji: "🔢", title: "EIN & Tax Registration", desc: "Obtain your Employer Identification Number from the IRS and register for state taxes — required to open a business bank account.", href: "/services/us-business/ein" },
  { emoji: "📬", title: "Registered Agent", desc: "Every LLC and corporation needs a registered agent in their state. We ensure your business stays compliant with a reliable agent.", href: "/services/us-business/registered-agent" },
  { emoji: "📋", title: "Business Licenses & Permits", desc: "Identify and obtain the federal, state, and local licenses and permits your business needs to operate legally.", href: "/services/us-business/licenses" },
  { emoji: "📅", title: "Annual Compliance & Filings", desc: "Stay in good standing with annual report filings, franchise tax payments, and beneficial ownership reporting (BOI).", href: "/services/us-business/compliance" },
];

export default function USBusinessPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Registration in the United States</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            We guide you through every step of establishing your business in the U.S. — from choosing the right structure to staying compliant.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Our US Business Services</h2>
            <p className="text-gray-600">Choose the service you need or contact us for a complete business setup package.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
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

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Start Your US Business?</h2>
          <p className="text-gray-600 mb-8">Our team will guide you through the entire process — from choosing the right business structure to maintaining compliance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="px-8 py-4 font-semibold text-white rounded-xl" style={{ background: "#0057A8" }}>
              Get Started
            </Link>
            <Link href="/contact" className="px-8 py-4 font-semibold text-blue-700 rounded-xl border-2 border-blue-700 hover:bg-blue-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
