import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const dhanasar = [
  { prong: "1", title: "Substantial Merit & National Importance", desc: "The proposed endeavor must have substantial merit and national importance to the United States." },
  { prong: "2", title: "Well Positioned to Advance", desc: "The petitioner must be well positioned to advance the proposed endeavor based on education, skills, and record." },
  { prong: "3", title: "Beneficial to Waive Requirements", desc: "It must benefit the United States to waive the job offer and labor certification requirements." },
];

const qualifications = [
  "Advanced degree (master's, PhD) or a bachelor's degree plus 5 years of progressive experience",
  "Exceptional ability: a degree of expertise significantly above that ordinarily encountered in sciences, arts, or business",
  "Entrepreneurs, researchers, physicians, scientists, and innovators are ideal candidates",
  "No employer or job offer required — self-petition is allowed",
];

const benefits = [
  "Self-petition — no employer needed",
  "No PERM labor certification required",
  "Ideal for entrepreneurs and researchers",
  "Premium processing available",
];

const steps = [
  { step: "1", title: "Assess Eligibility", desc: "Determine whether your proposed endeavor qualifies under the three-prong Dhanasar framework." },
  { step: "2", title: "Prepare Evidence Package", desc: "Compile documentation: publications, citations, expert letters, business plans, evidence of impact and recognition." },
  { step: "3", title: "File I-140 with NIW Request", desc: "Submit Form I-140 with a cover letter specifically requesting the National Interest Waiver and detailed argumentation." },
  { step: "4", title: "USCIS Review", desc: "USCIS evaluates your petition under all three Dhanasar prongs and the totality of the evidence." },
  { step: "5", title: "Visa or Adjustment of Status", desc: "Upon approval, apply for an immigrant visa abroad or adjust status to permanent resident using Form I-485." },
];

export default function EB2NIWPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Employment-Based — Second Preference</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EB-2 National Interest Waiver (NIW)</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            For professionals with advanced degrees or exceptional ability whose work serves the national interest of the United States. Self-petition available — no employer or PERM required.
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

      {/* Dhanasar Test */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>The Three-Prong Dhanasar Test</h2>
          <p className="text-gray-600 mb-8">USCIS evaluates all NIW petitions under the <em>Matter of Dhanasar</em> framework. You must satisfy all three prongs:</p>
          <div className="space-y-4">
            {dhanasar.map((d) => (
              <div key={d.prong} className="flex gap-4 bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg" style={{ background: "#0057A8" }}>{d.prong}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{d.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Who Qualifies?</h2>
          <div className="space-y-3">
            {qualifications.map((q, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-gray-700 text-sm leading-relaxed">{q}</p>
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Start Your NIW Journey Today</h2>
          <p className="text-gray-600 mb-8">Our experts will help you craft a compelling NIW argument and build a petition that satisfies all three Dhanasar prongs.</p>
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
