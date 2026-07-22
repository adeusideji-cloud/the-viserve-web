import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const requirements = [
  { title: "Annual Reports", desc: "Most states require LLCs and corporations to file an annual report (or biennial report) with the Secretary of State. Deadlines vary by state." },
  { title: "Franchise Tax Filings", desc: "Many states charge a franchise tax or annual fee for the privilege of doing business in the state — separate from income tax." },
  { title: "Registered Agent Updates", desc: "If your registered agent changes, you must file a Statement of Change with the state promptly to maintain compliance." },
  { title: "Meeting Minutes (Corporations)", desc: "Corporations must hold annual meetings of the board of directors and shareholders, and maintain written minutes of those meetings." },
  { title: "Beneficial Ownership Information (BOI)", desc: "Under the Corporate Transparency Act, most small businesses must file a BOI report with FinCEN disclosing beneficial owners." },
];

const consequences = [
  "Late filing fees and penalties from the state",
  "Loss of good standing with the state",
  "Inability to obtain a Certificate of Good Standing",
  "Personal liability exposure for owners (piercing the corporate veil)",
  "Administrative dissolution of your business entity",
  "Difficulty opening bank accounts or securing financing",
];

const steps = [
  { step: "1", title: "Track Annual Report Deadlines", desc: "Note your state&apos;s annual report due date — it varies by state and may be based on your formation date or a fixed calendar date." },
  { step: "2", title: "File Annual Reports on Time", desc: "Submit your annual report to the Secretary of State by the deadline. Most states allow online filing." },
  { step: "3", title: "Pay Franchise Taxes", desc: "Pay any required franchise taxes or minimum annual fees by the state deadline to maintain good standing." },
  { step: "4", title: "Update Registered Agent", desc: "If your registered agent changes, file the appropriate change form with the state within the required timeframe." },
  { step: "5", title: "File BOI Report with FinCEN", desc: "New businesses must file a Beneficial Ownership Information (BOI) report within 90 days of formation. Existing businesses had a 2024 deadline. File at fincen.gov." },
];

export default function CompliancePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">US Business Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Annual Compliance & Filings</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Keeping your business in good standing requires ongoing compliance — annual reports, franchise taxes, and regulatory filings that must be maintained every year.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Annual Compliance Requirements</h2>
          <div className="space-y-4">
            {requirements.map((r) => (
              <div key={r.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consequences */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Consequences of Non-Compliance</h2>
          <div className="space-y-3">
            {consequences.map((c, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-red-100">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white bg-red-500 mt-0.5">!</span>
                <p className="text-gray-700 text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Staying Compliant: Step by Step</h2>
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
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800"><strong>BOI Reporting:</strong> The Corporate Transparency Act requires most US businesses to file Beneficial Ownership Information (BOI) reports with FinCEN. New businesses formed in 2024 or later must file within 90 days of formation. Failure to file can result in civil and criminal penalties.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Stay Compliant — We&apos;ll Handle the Filings</h2>
          <p className="text-gray-600 mb-8">We track your compliance deadlines and handle annual report filings, franchise tax payments, and BOI reports on your behalf.</p>
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
