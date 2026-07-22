import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const licenseTypes = [
  { type: "Federal Licenses", desc: "Required for businesses in federally regulated industries.", examples: "Aviation (FAA), alcohol/firearms (ATF), broadcasting (FCC), investment advice (SEC), interstate trucking (DOT)" },
  { type: "State Licenses", desc: "Issued by state agencies — requirements vary significantly by state and business type.", examples: "State business license, contractor license, real estate license, insurance license, healthcare facility license" },
  { type: "Local Permits", desc: "County and city-level permits required for operating in a specific location.", examples: "General business license, zoning/land use permit, building permit, signage permit, home occupation permit" },
  { type: "Professional Licenses", desc: "Required for licensed professions regardless of business structure.", examples: "Medical license, law license, CPA license, contractor license, cosmetology license, electrician license" },
];

const commonLicenses = [
  "General business license (required by most cities and counties)",
  "Sales tax permit / seller&apos;s permit (required to collect sales tax)",
  "Zoning and land use permit (to operate at a physical location)",
  "Health department permit (for food service, restaurants, etc.)",
  "Professional license (doctors, lawyers, engineers, contractors, etc.)",
  "Employer identification (state payroll tax registration)",
  "Environmental permits (for businesses with environmental impact)",
];

const steps = [
  { step: "1", title: "Identify Required Licenses", desc: "Research your industry, state, and local requirements. The SBA Business License & Permit tool and your state&apos;s business portal are good starting points." },
  { step: "2", title: "Apply at Each Level", desc: "Apply for licenses at the federal, state, and local level as applicable. Each agency has its own application process, requirements, and fees." },
  { step: "3", title: "Renew Annually", desc: "Most licenses and permits must be renewed annually. Set up reminders to avoid lapsing — operating without a valid license can result in fines or forced closure." },
];

export default function LicensesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">US Business Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Licenses & Permits</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Most businesses need one or more licenses or permits to operate legally in the United States. Requirements vary by industry, state, and locality.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* License Types */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Types of Business Licenses & Permits</h2>
          <div className="space-y-4">
            {licenseTypes.map((l) => (
              <div key={l.type} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{l.type}</h3>
                <p className="text-gray-600 text-sm mb-2">{l.desc}</p>
                <p className="text-xs text-blue-700 font-medium">Examples: {l.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Licenses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Most Common Business Licenses</h2>
          <div className="space-y-3">
            {commonLicenses.map((l, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-gray-700 text-sm">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>How to Get Licensed</h2>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-4 bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg" style={{ background: "#0057A8" }}>{s.step}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Need Help Identifying Your Business Licenses?</h2>
          <p className="text-gray-600 mb-8">We help you identify every license and permit your business needs and guide you through the application process.</p>
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
