import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const subcategories = [
  { title: "Skilled Workers", desc: "Positions requiring at least 2 years of training or work experience not of a temporary or seasonal nature.", examples: "Nurses, technicians, engineers, tradespeople" },
  { title: "Professionals", desc: "Positions requiring a US bachelor's degree or foreign equivalent as a minimum qualification.", examples: "Teachers, accountants, architects, IT professionals" },
  { title: "Other Workers (Unskilled)", desc: "Positions requiring less than 2 years of training or experience, performing unskilled labor.", examples: "Production workers, housekeepers, laborers" },
];

const benefits = [
  "Broad eligibility across many occupations",
  "Employer-sponsored pathway to green card",
  "Covers skilled, professional, and unskilled workers",
  "PERM protects US workers while creating pathway for foreign nationals",
];

const steps = [
  { step: "1", title: "Prevailing Wage Determination", desc: "Employer submits a Prevailing Wage Request to the Department of Labor to determine the wage required for the position." },
  { step: "2", title: "PERM Recruitment & Filing", desc: "Employer conducts mandatory recruitment to demonstrate no qualified US worker is available, then files ETA Form 9089 (PERM) with DOL." },
  { step: "3", title: "I-140 Petition", desc: "Once PERM is certified, employer files Form I-140 with USCIS along with the certified PERM application." },
  { step: "4", title: "Wait for Priority Date", desc: "Check the USCIS Visa Bulletin each month. Your priority date (PERM receipt date) must be current before proceeding." },
  { step: "5", title: "Adjustment or Consular Processing", desc: "Once priority date is current, apply for Adjustment of Status (I-485) or Immigrant Visa at a US consulate." },
];

export default function EB3Page() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Employment-Based — Third Preference</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EB-3 Skilled Workers, Professionals & Other Workers</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            A permanent green card pathway for a wide range of workers. Requires a permanent full-time job offer and PERM labor certification from a US employer.
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

      {/* Subcategories */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Three EB-3 Subcategories</h2>
          <div className="space-y-4">
            {subcategories.map((sc) => (
              <div key={sc.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{sc.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{sc.desc}</p>
                <p className="text-xs text-blue-700 font-medium">Examples: {sc.examples}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800"><strong>Note:</strong> The &quot;Other Workers&quot; subcategory typically has the longest wait times due to high demand and visa backlogs. Check the Visa Bulletin for current priority dates by country of chargeability.</p>
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

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Begin Your EB-3 Green Card Process</h2>
          <p className="text-gray-600 mb-8">We guide employers and employees through every step — from PERM recruitment to final green card approval.</p>
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
