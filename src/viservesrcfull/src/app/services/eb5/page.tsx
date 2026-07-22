import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const routes = [
  { title: "Direct Investment", desc: "Investor directly invests in and manages a new commercial enterprise. Must create at least 10 full-time direct jobs for qualifying US workers.", pros: "Full control of business, no regional center dependency" },
  { title: "Regional Center (EB-5RC)", desc: "Investor pools capital with other investors through a USCIS-designated regional center. Counts both direct and indirect job creation.", pros: "Passive investment, no day-to-day management required" },
];

const requirements = [
  "Minimum investment of $1,050,000 (standard) OR $800,000 in a Targeted Employment Area (TEA — rural or high unemployment area)",
  "Must create or preserve at least 10 full-time jobs for qualifying US workers",
  "Investment must be 'at risk' — no guaranteed return of capital permitted",
  "Investor must be actively engaged in managing the enterprise (direct route) or be a limited partner/manager through a regional center",
  "Good moral character and admissibility requirements must be met",
];

const benefits = [
  "Investor, spouse, and children under 21 all eligible",
  "No employer sponsorship required",
  "Regional center route allows passive investment",
  "Lower investment in Targeted Employment Areas",
];

const steps = [
  { step: "1", title: "Determine Investment Strategy", desc: "Decide between direct investment or regional center route based on your goals, risk tolerance, and timeline." },
  { step: "2", title: "Conduct Due Diligence", desc: "Thoroughly vet the investment opportunity, business plan, project, and regional center (if applicable)." },
  { step: "3", title: "File I-526 or I-526E", desc: "Submit Form I-526 (direct) or I-526E (regional center) to USCIS with business plan and proof of lawful source of funds." },
  { step: "4", title: "Wait for Visa Availability", desc: "Monitor the Visa Bulletin for your priority date. Processing times vary; some countries face significant backlogs." },
  { step: "5", title: "Adjustment or Consular Processing", desc: "Apply for immigrant visa or adjust status (I-485). Receive conditional green card (2 years)." },
  { step: "6", title: "Remove Conditions with I-829", desc: "After 2 years, file Form I-829 to remove conditions and receive a permanent green card. Must show investment is still at risk and jobs created." },
];

export default function EB5Page() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Employment-Based — Fifth Preference</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EB-5 Immigrant Investor Visa</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            A green card pathway for investors who create US jobs through capital investment. Entire family may receive permanent residence.
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

      {/* Investment Routes */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Two Investment Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((r) => (
              <div key={r.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{r.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{r.desc}</p>
                <p className="text-xs text-blue-700 font-medium">Advantage: {r.pros}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Investment Requirements</h2>
          <div className="space-y-3">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Step-by-Step Process</h2>
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
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Invest in Your Future in the United States</h2>
          <p className="text-gray-600 mb-8">Our team guides EB-5 investors through due diligence, petition preparation, and all steps to permanent residency.</p>
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
