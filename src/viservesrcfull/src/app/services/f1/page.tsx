import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const highlights = [
  "Full-time enrollment at USCIS/DHS-approved SEVP institutions",
  "On-campus work up to 20 hours/week during the semester",
  "OPT (Optional Practical Training) for work after graduation",
  "CPT (Curricular Practical Training) for internships during studies",
];

const documents = [
  "Valid passport (must be valid at least 6 months beyond intended stay)",
  "Form I-20 from your SEVP-certified school",
  "DS-160 online nonimmigrant visa application confirmation",
  "SEVIS I-901 fee payment receipt ($350)",
  "MRV visa application fee receipt ($185)",
  "Financial evidence showing ability to cover 1 year of tuition plus living expenses",
  "Academic transcripts, test scores, and other educational records",
];

const steps = [
  { step: "1", title: "Find & Apply to SEVP School", desc: "Search for SEVP-certified schools at studyinthestates.dhs.gov. Apply and receive an acceptance letter." },
  { step: "2", title: "Pay SEVIS I-901 Fee", desc: "Pay the $350 SEVIS fee at fmjfee.com. Keep the receipt — you'll need it at the visa interview." },
  { step: "3", title: "Complete DS-160 Application", desc: "Fill out the DS-160 online nonimmigrant visa application at ceac.state.gov and save your confirmation barcode." },
  { step: "4", title: "Pay Visa Application Fee", desc: "Pay the $185 MRV (Machine Readable Visa) fee at the designated payment location for your country." },
  { step: "5", title: "Schedule Visa Interview", desc: "Book your interview at the nearest US embassy or consulate. Schedule 2–3 months early, especially during peak seasons." },
  { step: "6", title: "Prepare Documents", desc: "Gather all required documents: passport, I-20, DS-160 confirmation, SEVIS receipt, financial proof, academic records." },
  { step: "7", title: "Attend Visa Interview", desc: "Attend your interview. Most F-1 interviews are 2–5 minutes. Be prepared to explain your study plans and intent to return home." },
  { step: "8", title: "Receive Visa & Enter US", desc: "Once approved, your visa is stamped in your passport. Enter the US no earlier than 30 days before your I-20 start date." },
];

export default function F1Page() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Student Visa</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">F-1 Student Visa</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Study at accredited US universities, colleges, high schools, and English language programs. The most common student visa for academic studies in the United States.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="bg-blue-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-sm text-gray-700">{b}</p>
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

      {/* Key Documents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Key Documents Required</h2>
          <div className="space-y-3">
            {documents.map((d, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-gray-700 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Study in the United States?</h2>
          <p className="text-gray-600 mb-8">We guide international students through every step of the F-1 visa application process.</p>
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
