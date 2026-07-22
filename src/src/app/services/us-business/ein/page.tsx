import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const whoNeeds = [
  "All corporations (C-Corp and S-Corp)",
  "LLCs with employees",
  "Multi-member LLCs (even without employees)",
  "Sole proprietors with employees",
  "Any business that files employment, excise, or alcohol/tobacco/firearms tax returns",
  "Non-profit organizations",
];

const requiredFor = [
  "Opening a business bank account",
  "Hiring employees and running payroll",
  "Filing federal and state tax returns",
  "Applying for business licenses and permits",
  "Establishing business credit",
  "Working with vendors who require a W-9",
];

const steps = [
  { step: "1", title: "Determine Eligibility", desc: "You must have a valid Taxpayer Identification Number (SSN, ITIN, or existing EIN) to apply. The responsible party must be an individual, not an entity." },
  { step: "2", title: "Apply Online at IRS.gov", desc: "Visit IRS.gov and use the free EIN Online Assistant. The online application is available Monday–Friday, 7am–10pm ET." },
  { step: "3", title: "Receive EIN Immediately", desc: "Upon completing the online application, you receive your EIN immediately. Download and save the confirmation letter (CP 575)." },
  { step: "4", title: "Register for State Tax ID", desc: "Most states require a separate state tax ID number for income tax withholding, sales tax, and unemployment insurance. Apply through your state&apos;s revenue department." },
];

export default function EINPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">US Business Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EIN & Tax Registration</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            An Employer Identification Number (EIN) is like a Social Security Number for your business — required for taxes, banking, and hiring employees.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* What is EIN */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>What is an EIN?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            An Employer Identification Number (EIN), also called a Federal Tax Identification Number, is a unique 9-digit number assigned by the IRS to identify your business for tax purposes. It works like a Social Security Number, but for your business entity.
          </p>
          <p className="text-gray-600 leading-relaxed">
            The EIN is free to obtain and can be applied for online directly through the IRS website. Most businesses receive their EIN immediately upon completing the online application.
          </p>
        </div>
      </section>

      {/* Who Needs It */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Who Needs an EIN?</h2>
              <div className="space-y-3">
                {whoNeeds.map((w, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                    <p className="text-gray-700 text-sm">{w}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Required For</h2>
              <div className="space-y-3">
                {requiredFor.map((r, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                    <p className="text-gray-700 text-sm">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>How to Get Your EIN</h2>
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Need Help Getting Your EIN?</h2>
          <p className="text-gray-600 mb-8">We assist with EIN applications and state tax registrations so you can start operating your business quickly.</p>
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
