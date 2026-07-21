import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const requirements = [
  "Foreign company and US company must have a qualifying relationship: parent, subsidiary, affiliate, or branch",
  "Both companies must have been doing business for at least 1 continuous year",
  "Employee must have worked abroad for the foreign entity for at least 1 continuous year within the last 3 years",
  "Employee must be coming to the US to work in a managerial or executive capacity",
  "No PERM labor certification required",
];

const benefits = [
  "No PERM labor certification required",
  "Direct path to permanent residency",
  "Spouse and children under 21 eligible",
  "Similar to L-1A but leads to a green card",
];

const steps = [
  { step: "1", title: "Verify Corporate Relationship", desc: "Confirm the qualifying corporate relationship (parent, subsidiary, affiliate, or branch) between the US and foreign entities." },
  { step: "2", title: "Gather Documentation", desc: "Collect corporate structure documents, employment history, organizational charts, and evidence of managerial/executive duties." },
  { step: "3", title: "US Employer Files I-140", desc: "The sponsoring US employer submits Form I-140 to USCIS on behalf of the transferee." },
  { step: "4", title: "USCIS Review", desc: "USCIS evaluates the qualifying relationship, the employee's capacity, and the company's business operations." },
  { step: "5", title: "Visa or Adjustment of Status", desc: "Once approved, apply for an immigrant visa (DS-260) or adjust status in the US using Form I-485." },
];

export default function EB1CPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Employment-Based — First Preference</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EB-1C Multinational Managers & Executives</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            For senior managers and executives being transferred from a foreign affiliate to a US company. No PERM required — a direct green card pathway.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="bg-blue-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-sm text-gray-700">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Eligibility Requirements</h2>
          <div className="space-y-3">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800"><strong>EB-1C vs. L-1A:</strong> The EB-1C category is analogous to the L-1A intracompany transfer visa but leads directly to a permanent green card rather than a temporary work authorization. L-1A holders are strong candidates for EB-1C.</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Step-by-Step Process</h2>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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

      {/* Fees & Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Fees & Timeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: "#0057A8" }}>$715</div>
              <div className="text-sm text-gray-500">I-140 Filing Fee</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: "#0057A8" }}>$2,805</div>
              <div className="text-sm text-gray-500">Premium Processing Fee</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center">
              <div className="text-2xl font-bold mb-1" style={{ color: "#0057A8" }}>$1,440</div>
              <div className="text-sm text-gray-500">I-485 Fee (if adjusting status)</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Fees subject to change — verify at uscis.gov before filing.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Transfer to the US Permanently?</h2>
          <p className="text-gray-600 mb-8">We guide multinational companies and executives through every step of the EB-1C green card process.</p>
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
