import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const visas = [
  {
    code: "H-1B",
    title: "Specialty Occupations",
    desc: "For professionals in specialty occupations requiring at least a bachelor's degree or equivalent. Covers STEM, finance, architecture, healthcare, and more.",
    details: ["Bachelor's degree or equivalent required", "Initial 3-year period, extendable to 6 years", "Annual cap-subject lottery (regular + advanced degree)", "Dual intent — may pursue green card while on H-1B", "Common pathway to EB-2 or EB-3 green card"],
  },
  {
    code: "L-1A / L-1B",
    title: "Intracompany Transferees",
    desc: "For employees transferred from a foreign affiliate to a US entity. L-1A for managers/executives; L-1B for specialized knowledge workers.",
    details: ["Must have worked abroad 1 year in last 3 years", "L-1A: managers/executives — up to 7 years total", "L-1B: specialized knowledge — up to 5 years total", "Dual intent, no cap", "L-1A is a strong pathway to EB-1C green card"],
  },
  {
    code: "O-1",
    title: "Extraordinary Ability",
    desc: "For individuals with extraordinary ability in sciences, arts, education, business, or athletics. Similar to EB-1A criteria but temporary status.",
    details: ["Extraordinary ability in sciences, arts, education, business, or athletics", "Initial 3-year period, unlimited 1-year extensions", "No annual cap", "Dual intent", "Strong pathway to EB-1A or EB-2 NIW green card"],
  },
  {
    code: "TN",
    title: "USMCA Professionals",
    desc: "For Canadian and Mexican citizens who are professionals listed in the USMCA (formerly NAFTA) schedule of qualifying occupations.",
    details: ["Available only to Canadian and Mexican citizens", "Initial 3-year period, renewable indefinitely", "Must work in a USMCA-listed occupation", "No annual cap, no lottery", "No dual intent — not a direct green card pathway"],
  },
  {
    code: "E-1 / E-2",
    title: "Treaty Traders & Investors",
    desc: "For nationals of countries with a qualifying treaty with the United States. E-1 for substantial trade; E-2 for investment in a US enterprise.",
    details: ["Must be a national of a treaty country", "Initial 2-year period, renewable indefinitely", "E-1: substantial trade in goods/services between treaty country and US", "E-2: substantial investment in a bona fide US enterprise", "Renewable indefinitely; no direct green card pathway for E-2"],
  },
  {
    code: "R-1",
    title: "Religious Workers (Temporary)",
    desc: "For ministers and other religious workers coming to the US temporarily to work for a qualifying nonprofit religious organization.",
    details: ["Initial 30-month period, extendable to 5 years total", "Must have been member of denomination for 2+ years", "Full-time religious work required", "Pathway to EB-4 permanent religious worker visa", "Petitioned by US religious organization (Form I-129)"],
  },
  {
    code: "H-2A / H-2B",
    title: "Seasonal Workers",
    desc: "For temporary agricultural (H-2A) and non-agricultural (H-2B) seasonal workers when US workers are unavailable.",
    details: ["H-2A: agricultural — unlimited visas, no cap", "H-2B: non-agricultural — subject to 66,000 annual cap", "Initial 1-year period, extendable up to 3 years", "Employer must obtain DOL labor certification", "Typically from H-2A/H-2B designated countries"],
  },
  {
    code: "J-1",
    title: "Exchange Visitors",
    desc: "For participants in exchange visitor programs: researchers, scholars, trainees, teachers, students, au pairs, and more.",
    details: ["Multiple program categories (research scholar, trainee, teacher, student, etc.)", "Duration varies by program category", "Some J-1 holders subject to 2-year home residence requirement", "2-year bar can be waived in some circumstances", "Sponsored by DOS-designated exchange visitor programs"],
  },
];

const pathways = [
  { from: "H-1B", to: "EB-2 / EB-3", note: "Most common green card pathway for specialty occupation workers" },
  { from: "L-1A", to: "EB-1C", note: "Direct pathway for multinational managers and executives" },
  { from: "O-1", to: "EB-1A", note: "Extraordinary ability temporary to permanent residency" },
  { from: "R-1", to: "EB-4", note: "Religious worker temporary to special immigrant permanent" },
];

export default function WorkVisasPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">Nonimmigrant Visas</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Temporary Work Visas</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Explore all major US nonimmigrant work visa categories — from H-1B specialty occupations to O-1 extraordinary ability, L-1 intracompany transfers, and more.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Visa Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Major Work Visa Categories</h2>
          <div className="space-y-6">
            {visas.map((v) => (
              <div key={v.code} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 px-3 py-1 rounded-lg font-bold text-white text-sm" style={{ background: "#0057A8" }}>{v.code}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{v.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{v.desc}</p>
                    <ul className="space-y-1.5">
                      {v.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition Pathways */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Transition Pathways to Green Card</h2>
          <p className="text-gray-600 mb-8">Many temporary work visas are stepping stones to permanent residence. Here are the most common pathways:</p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden">
              <thead>
                <tr style={{ background: "#0057A8" }}>
                  <th className="text-left px-6 py-4 text-white font-semibold text-sm">Temporary Visa</th>
                  <th className="text-left px-6 py-4 text-white font-semibold text-sm">Green Card Category</th>
                  <th className="text-left px-6 py-4 text-white font-semibold text-sm">Notes</th>
                </tr>
              </thead>
              <tbody>
                {pathways.map((p, i) => (
                  <tr key={p.from} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 font-bold text-sm" style={{ color: "#0057A8" }}>{p.from}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-sm">{p.to}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Not Sure Which Work Visa Is Right for You?</h2>
          <p className="text-gray-600 mb-8">Our team will assess your background and goals to identify the best visa pathway for your situation.</p>
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
