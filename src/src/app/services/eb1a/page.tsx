import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const criteria = [
  "Nationally or internationally recognized prizes or awards for excellence",
  "Membership in associations requiring outstanding achievement",
  "Published material about you in major media or professional journals",
  "Participation as a judge of others' work in the same field",
  "Original contributions of major significance to the field",
  "Authorship of scholarly articles in professional journals",
  "Display of work in artistic exhibitions or showcases",
  "Leading or critical role for distinguished organizations",
  "High salary or remuneration compared to others in the field",
  "Commercial success in the performing arts",
];

const benefits = [
  "No employer sponsorship required — self-petition",
  "No PERM labor certification needed",
  "Premium processing available (15 business days)",
  "Spouse and children under 21 may receive green cards",
];

const steps = [
  { step: "1", title: "Gather Evidence", desc: "Compile documentation proving extraordinary ability — awards, publications, citations, salary data, expert letters." },
  { step: "2", title: "File Form I-140", desc: "Submit the I-140 Immigrant Petition for Alien Workers as a self-petition directly to USCIS." },
  { step: "3", title: "USCIS Review", desc: "USCIS applies the two-part test: Objective Evidence then Final Merits Determination." },
  { step: "4", title: "Visa or Adjustment", desc: "Once approved, apply for an immigrant visa abroad or adjust status in the US using Form I-485." },
];

export default function EB1APage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Employment-Based — First Preference</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EB-1A Extraordinary Ability Visa</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            For individuals with sustained national or international acclaim in sciences, arts, education, business, or athletics. No employer or PERM required.
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
          <p className="text-gray-600 mb-6">
            Petitioners must demonstrate extraordinary ability through either a one-time major achievement (Nobel Prize, Academy Award, Olympic Medal) OR at least <strong>3 of the following 10 criteria</strong>:
          </p>
          <div className="space-y-3">
            {criteria.map((c, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#0057A8" }}>{i + 1}</span>
                <p className="text-gray-700 text-sm leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800"><strong>USCIS Two-Part Test:</strong> Even if you meet 3+ criteria, USCIS applies a Final Merits Determination to confirm that the totality of your evidence shows sustained acclaim at the very top of your field.</p>
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Petition for EB-1A?</h2>
          <p className="text-gray-600 mb-8">Our team will help you build a compelling evidence package and navigate the petition process from start to finish.</p>
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
