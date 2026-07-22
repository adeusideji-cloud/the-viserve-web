import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Personal liability protection — your personal assets are shielded from business debts",
  "Flexible management structure — member-managed or manager-managed",
  "Pass-through taxation — profits and losses flow to your personal tax return",
  "Less paperwork and formality compared to a corporation",
];

const steps = [
  { step: "1", title: "Choose Your State", desc: "Decide where to form your LLC. Delaware, Wyoming, Florida, and Texas are popular for their favorable laws, but you can form in any state." },
  { step: "2", title: "Choose Your LLC Name", desc: "Pick a unique name that includes 'LLC' or 'Limited Liability Company'. Check availability on the state's business name database." },
  { step: "3", title: "File Articles of Organization", desc: "Submit the Articles of Organization (or Certificate of Formation) to the state agency, typically the Secretary of State." },
  { step: "4", title: "Get Your EIN", desc: "Apply for an Employer Identification Number (EIN) from the IRS — free and instant online. Required for taxes and bank accounts." },
  { step: "5", title: "Open a Business Bank Account", desc: "Keep personal and business finances separate by opening a dedicated business checking account." },
  { step: "6", title: "Create an Operating Agreement", desc: "Draft an operating agreement outlining ownership, management, profit sharing, and decision-making procedures." },
  { step: "7", title: "Register for State Taxes", desc: "Depending on your state and business type, register for state income tax, sales tax, and payroll taxes as applicable." },
];

const requirements = [
  "Name must include 'LLC' or 'Limited Liability Company'",
  "A registered agent with a physical address in the state is required",
  "Most states require annual reports and associated filing fees",
  "Some states impose a franchise tax or minimum annual fee on LLCs",
];

const popularStates = [
  { state: "Delaware", reason: "Flexible laws, well-established case law, no sales tax, popular with startups and investors" },
  { state: "Wyoming", reason: "Low fees, strong privacy protections, no state income tax, favorable charging order protections" },
  { state: "Florida", reason: "No personal income tax, large economy, straightforward LLC process" },
  { state: "Texas", reason: "No personal income tax, business-friendly environment, large market" },
];

export default function LLCPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">US Business Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">LLC Formation in the United States</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            A Limited Liability Company (LLC) is the most popular business structure in the US — flexible, protects your personal assets, and simple to maintain.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="bg-blue-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-sm text-gray-700">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is an LLC */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>What is an LLC?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            A Limited Liability Company (LLC) is a business structure that combines the liability protection of a corporation with the simplicity and tax flexibility of a partnership. It is the most popular choice for small businesses, startups, and entrepreneurs in the United States.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Unlike a corporation, an LLC does not pay federal income taxes at the entity level — profits and losses pass through directly to the members&apos; personal tax returns (pass-through taxation), avoiding double taxation.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Step-by-Step LLC Formation Process</h2>
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

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Key Requirements</h2>
          <div className="space-y-3">
            {requirements.map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-gray-700 text-sm leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular States */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Popular States for LLC Formation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularStates.map((s) => (
              <div key={s.state} className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-1">{s.state}</h3>
                <p className="text-gray-600 text-sm">{s.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Form Your LLC?</h2>
          <p className="text-gray-600 mb-8">We handle the entire LLC formation process for you — from name search to filing — so you can focus on building your business.</p>
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
