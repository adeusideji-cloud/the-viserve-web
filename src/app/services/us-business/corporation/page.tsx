import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const corpTypes = [
  {
    type: "C-Corporation (C-Corp)",
    desc: "A C-Corp is a separate legal entity that can have unlimited shareholders, issue multiple classes of stock, and raise capital from venture capitalists and institutional investors. It is the standard choice for startups seeking VC funding or planning an IPO.",
    pros: ["Unlimited shareholders and multiple stock classes", "Ideal for venture capital and IPO", "Employees can receive stock options (ISO)", "Strong liability protection", "Can retain earnings in the company"],
    cons: ["Subject to double taxation (corporate tax + dividend tax)", "More administrative requirements than an LLC"],
  },
  {
    type: "S-Corporation (S-Corp)",
    desc: "An S-Corp offers pass-through taxation (like an LLC) but with corporate structure. It is popular for small to medium businesses where the owners want to avoid self-employment taxes on distributions.",
    pros: ["Pass-through taxation — no double taxation", "Owners can reduce self-employment tax via salary/distributions", "Credibility of a corporation", "Easy transfer of ownership"],
    cons: ["Maximum 100 shareholders", "Shareholders must be US citizens or permanent residents", "Only one class of stock allowed"],
  },
];

const steps = [
  { step: "1", title: "Choose Your State", desc: "Delaware is the most popular state for corporations due to its flexible corporate laws and well-established Court of Chancery. However, you can incorporate in any state." },
  { step: "2", title: "Choose a Corporate Name", desc: "Select a unique name that typically must include 'Corporation', 'Incorporated', 'Company', or an abbreviation (Corp., Inc., Co.)." },
  { step: "3", title: "File Articles of Incorporation", desc: "Submit the Articles of Incorporation to the state Secretary of State. This is the foundational document that creates the corporation." },
  { step: "4", title: "Appoint Directors", desc: "Identify the initial board of directors who will oversee the corporation. Most states require at least one director." },
  { step: "5", title: "Issue Stock", desc: "Authorize and issue shares of stock to the initial shareholders as specified in the Articles of Incorporation." },
  { step: "6", title: "Get Your EIN", desc: "Apply for an Employer Identification Number (EIN) from the IRS — required for taxes, banking, and payroll." },
  { step: "7", title: "Hold Organizational Meeting", desc: "Conduct an organizational meeting of the board of directors to adopt bylaws, elect officers, and issue stock." },
  { step: "8", title: "Create Corporate Bylaws", desc: "Draft bylaws governing the internal management of the corporation — meetings, voting, officer roles, and procedures." },
];

export default function CorporationPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">US Business Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Corporation Formation (C-Corp & S-Corp)</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            Incorporate a C-Corp for maximum investor appeal and growth potential, or an S-Corp for pass-through tax benefits with corporate structure.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* C-Corp vs S-Corp */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>C-Corp vs. S-Corp: Which is Right for You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corpTypes.map((c) => (
              <div key={c.type} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg mb-3">{c.type}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.desc}</p>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-green-700 mb-2">Advantages:</p>
                  <ul className="space-y-1">
                    {c.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-600 mb-2">Limitations:</p>
                  <ul className="space-y-1">
                    {c.cons.map((con) => (
                      <li key={con} className="text-xs text-gray-600">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Step-by-Step Incorporation Process</h2>
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
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Incorporate?</h2>
          <p className="text-gray-600 mb-8">We guide you through the incorporation process from start to finish — choosing the right structure to filing your articles and beyond.</p>
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
