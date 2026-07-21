import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const responsibilities = [
  "Receive legal documents (lawsuits, subpoenas, summons)",
  "Receive tax notices and correspondence from the IRS and state agencies",
  "Receive annual report reminders and compliance notices from the state",
  "Forward all received documents to the business owner promptly",
  "Be available during normal business hours (9am–5pm, Monday–Friday)",
];

const agentOptions = [
  { type: "Yourself (Owner)", desc: "You can serve as your own registered agent if you have a physical address in the state and can be present during business hours. Not recommended if you work from home or travel frequently.", pros: "Free", cons: "Must be available during business hours, public address disclosure" },
  { type: "Another Individual", desc: "Any adult resident of the state with a physical address can serve as the registered agent. This can be an employee, attorney, or trusted associate.", pros: "Flexible", cons: "Dependent on individual reliability" },
  { type: "Professional Service", desc: "A commercial registered agent service maintains a physical presence in every state and handles all legal correspondence professionally.", pros: "Professional, private, reliable", cons: "Annual fee required" },
];

const steps = [
  { step: "1", title: "Choose Your Registered Agent", desc: "Decide whether to serve as your own agent, appoint another individual, or hire a professional registered agent service." },
  { step: "2", title: "Provide Agent's Name & Address", desc: "Include the registered agent's full name and physical address (no PO Boxes) when filing your Articles of Organization or Incorporation." },
  { step: "3", title: "Ensure Availability", desc: "The registered agent must be available at the listed address during normal business hours on all business days." },
  { step: "4", title: "Update if Agent Changes", desc: "If you change your registered agent, file a Statement of Change of Registered Agent with the state and pay the applicable fee." },
];

export default function RegisteredAgentPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: "#0057A8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-blue-200 font-medium mb-2">US Business Registration</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Registered Agent Services</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
            A registered agent is required for every LLC and corporation in the United States — they receive legal documents and official government correspondence on your behalf.
          </p>
          <Link href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-colors">
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* What is Registered Agent */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>What is a Registered Agent?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            A registered agent (also called a statutory agent or agent for service of process) is a designated individual or company that receives legal documents, tax notices, and government correspondence on behalf of your business.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Every LLC and corporation is required by law to maintain a registered agent in each state where they are registered to do business. The agent must have a physical street address (not a PO Box) in the state.
          </p>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <p className="text-sm text-blue-800"><strong>Important:</strong> Failure to maintain a registered agent can result in your business losing good standing with the state, inability to bring lawsuits, and potential dissolution of your business entity.</p>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Registered Agent Responsibilities</h2>
          <div className="space-y-3">
            {responsibilities.map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0057A8" }} />
                <p className="text-gray-700 text-sm">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>Your Registered Agent Options</h2>
          <div className="space-y-4">
            {agentOptions.map((a) => (
              <div key={a.type} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{a.type}</h3>
                <p className="text-gray-600 text-sm mb-3">{a.desc}</p>
                <div className="flex gap-6 text-xs">
                  <span className="text-green-700"><strong>Pro:</strong> {a.pros}</span>
                  <span className="text-red-600"><strong>Con:</strong> {a.cons}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: "#1a1a2e" }}>How to Set Up a Registered Agent</h2>
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
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Need a Registered Agent?</h2>
          <p className="text-gray-600 mb-8">We can connect you with a reliable registered agent service to keep your business compliant in any US state.</p>
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
