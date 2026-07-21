import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const criteria = [
  "Receipt of major prizes or awards for outstanding achievement in academic field",
  "Membership in associations requiring outstanding achievement of their members",
  "Published material in professional publications written by others about the person's work",
  "Participation as a judge of the work of others in the same or allied academic field",
  "Original scientific or scholarly research contributions in the field",
  "Authorship of scholarly books or articles in internationally circulated journals",
];

const benefits = [
  "No PERM labor certification required",
  "Employer sponsorship required (no self-petition)",
  "Premium processing available",
  "Often faster than EB-2 or EB-3 categories",
];

const steps = [
  { step: "1", title: "Secure Qualifying Employer", desc: "US university, institution of higher learning, or private research organization with at least 3 full-time researchers." },
  { step: "2", title: "Gather Evidence", desc: "Compile proof of international recognition — awards, citations, peer review records, publication list, expert letters." },
  { step: "3", title: "Employer Files I-140", desc: "The sponsoring employer submits the I-140 petition to USCIS with supporting documentation." },
  { step: "4", title: "USCIS Review", desc: "USCIS evaluates whether at least 2 of the 6 criteria are satisfied and that the petitioner has 3+ years of experience." },
  { step: "5", title: "Visa or Adjustment", desc: "Once approved, proceed with immigrant visa at a consulate abroad or Adjustment of Status (I-485) in the US." },
];

export default function EB1BPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Employment-Based — First Preference</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EB-1B Outstanding Professors & Researchers</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            For internationally recognized academics and researchers with at least 3 years of experience. Employer sponsorship required — no PERM needed.
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
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Eligibility Criteria</h2>
          <p className="text-gray-600 mb-2">Must have <strong>3+ years of teaching or research experience</strong> and meet at least <strong>2 of the following 6 criteria</strong>:</p>
          <div className="space-y-3 mt-6">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#0057A8" }}>{i + 1}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800"><strong>Qualifying Employers:</strong> US universities, institutions of higher education, or private research organizations that employ at least 3 full-time researchers and have documented research achievements.</p>
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Begin Your EB-1B Petition?</h2>
          <p className="text-gray-600 mb-8">We help professors, researchers, and their sponsoring institutions prepare winning EB-1B petitions.</p>
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
