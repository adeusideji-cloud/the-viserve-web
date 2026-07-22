import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const requirements = [
  "Must be a member of the same religious denomination as the petitioning organization for at least 2 years immediately preceding the filing",
  "Must have been carrying on the religious vocation, professional work, or occupation continuously for at least 2 years",
  "Must be coming to the US to work in a full-time (at least 35 hours/week) religious vocation or occupation",
  "The petitioning organization must be a US nonprofit religious organization or a tax-exempt organization affiliated with a religious denomination",
];

const roles = [
  { type: "Religious Vocation", examples: "Ministers, missionaries, nuns, monks, religious brothers and sisters", desc: "A calling to religious life evidenced by a lifetime commitment through vows, investiture, or other ceremony." },
  { type: "Religious Occupation", examples: "Cantors, religious broadcasters, religious translators, religious instructors, religious counselors", desc: "An occupation with religious duties not classified as a vocation but relating directly to and required by the denomination." },
];

const benefits = [
  "No PERM labor certification required",
  "Distinct from R-1 temporary visa — leads to green card",
  "Spouse and children under 21 may receive green cards",
  "Priority date established on I-360 receipt",
];

const steps = [
  { step: "1", title: "Organization Selects Candidate", desc: "The US nonprofit religious organization identifies the foreign national and confirms eligibility under EB-4 requirements." },
  { step: "2", title: "File Form I-360", desc: "The organization (or self-petitioner if eligible) files Form I-360 (Petition for Amerasian, Widow(er), or Special Immigrant) with USCIS." },
  { step: "3", title: "Wait for Approval & Visa Availability", desc: "Priority date is set when I-360 is received. Monitor the Visa Bulletin — non-minister religious workers may experience backlog." },
  { step: "4", title: "Consular Processing or Adjustment of Status", desc: "Once priority date is current and I-360 is approved, apply for immigrant visa at a US consulate or adjust status with I-485." },
];

export default function EB4Page() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Employment-Based — Fourth Preference</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EB-4 Special Immigrant Religious Workers</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            A green card pathway for ministers and other religious workers employed full-time by qualifying US nonprofit religious organizations.
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

      {/* Eligible Roles */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Eligible Religious Roles</h2>
          <div className="space-y-4">
            {roles.map((r) => (
              <div key={r.type} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">{r.type}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-2">{r.desc}</p>
                <p className="text-xs text-blue-700 font-medium">Includes: {r.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Eligibility Requirements</h2>
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
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800"><strong>Important:</strong> Non-minister religious workers (those not ordained) may experience retrogression or backlog in the EB-4 category. Ministers generally have current priority dates. Monitor the monthly Visa Bulletin closely.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Help Your Religious Worker Achieve Permanent Residency</h2>
          <p className="text-gray-600 mb-8">We specialize in supporting churches, faith communities, and religious workers through the EB-4 green card process.</p>
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
