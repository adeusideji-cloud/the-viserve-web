"use client";
import { useState } from "react";
import { CheckCircle, Globe, Calculator, BookOpen, Clock, Search } from "lucide-react";

const glossaryTerms = [
  { term: "Adjustment of Status", def: "The process of applying for a green card while already in the United States." },
  { term: "Alien", def: "A legal term for a person who is not a U.S. citizen or national." },
  { term: "Asylum", def: "Protection granted to foreign nationals who meet the legal definition of a refugee." },
  { term: "Beneficiary", def: "The person on whose behalf an immigration petition is filed." },
  { term: "Biometrics", def: "Fingerprints, photo, and signature collected by USCIS for identity verification." },
  { term: "Consular Processing", def: "Applying for a visa or green card through a U.S. embassy or consulate abroad." },
  { term: "EAD", def: "Employment Authorization Document — a work permit issued by USCIS." },
  { term: "Green Card", def: "A Permanent Resident Card (Form I-551) that allows a foreign national to live and work in the U.S." },
  { term: "I-94", def: "Arrival/Departure Record — records the authorized period of stay for nonimmigrants." },
  { term: "Naturalization", def: "The process by which a non-U.S. citizen acquires U.S. citizenship." },
  { term: "Petitioner", def: "The U.S. citizen or lawful permanent resident who files an immigration petition on behalf of a relative." },
  { term: "Priority Date", def: "The date a petition is properly filed with USCIS; determines place in line for immigrant visas." },
  { term: "RFE", def: "Request for Evidence — a notice from USCIS asking for additional documentation." },
  { term: "USCIS", def: "U.S. Citizenship and Immigration Services — the agency that processes immigration applications." },
  { term: "Visa Bulletin", def: "A monthly publication from the State Department showing which immigrant visa numbers are available." },
];

const fees = [
  { form: "I-485 (Green Card)", fee: "$1,440", notes: "Includes biometrics for applicants 14–78" },
  { form: "N-400 (Citizenship)", fee: "$760", notes: "Reduced fee available for low-income applicants" },
  { form: "I-130 (Relative Petition)", fee: "$535", notes: "Per beneficiary" },
  { form: "I-129F (Fiancé Visa)", fee: "$535", notes: "K-1 visa petition" },
  { form: "I-765 (Work Permit)", fee: "$520", notes: "Employment Authorization Document" },
  { form: "I-131 (Advance Parole)", fee: "$630", notes: "Travel document for green card applicants" },
  { form: "N-600 (Certificate of Citizenship)", fee: "$1,170", notes: "For those born abroad to U.S. citizens" },
  { form: "I-751 (Remove Conditions)", fee: "$750", notes: "Removes 2-year conditional status" },
];

const eligibilityQuestions = [
  { id: "status", question: "What is your current immigration status in the U.S.?", options: ["U.S. Citizen", "Lawful Permanent Resident (Green Card)", "Nonimmigrant Visa Holder (F-1, H-1B, etc.)", "Undocumented / No Status", "Abroad (Not currently in the U.S.)"] },
  { id: "goal", question: "What is your immigration goal?", options: ["Get a Green Card", "Become a U.S. Citizen", "Bring a Family Member", "Get a Work Visa", "Get a Student Visa", "Travel Authorization"] },
];

export default function ToolsPage() {
  const [glossarySearch, setGlossarySearch] = useState("");
  const [eligStep, setEligStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const filteredTerms = glossaryTerms.filter(t =>
    t.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    t.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  function handleEligAnswer(id: string, answer: string) {
    const newAnswers = { ...answers, [id]: answer };
    setAnswers(newAnswers);
    if (eligStep < eligibilityQuestions.length - 1) {
      setEligStep(eligStep + 1);
    } else {
      const goal = newAnswers.goal || answer;
      const status = newAnswers.status || answers.status;
      let recommendation = "Based on your answers, we recommend ";
      if (goal === "Get a Green Card") recommendation += "filing Form I-485 (Adjustment of Status) if you are currently in the U.S., or pursuing consular processing if abroad.";
      else if (goal === "Become a U.S. Citizen") recommendation += "filing Form N-400 (Application for Naturalization). You typically need 5 years as a permanent resident (3 years if married to a U.S. citizen).";
      else if (goal === "Bring a Family Member") recommendation += "filing Form I-130 (Petition for Alien Relative) to start the process for your family member.";
      else if (goal === "Get a Work Visa") recommendation += "exploring H-1B, L-1, or O-1 visa categories depending on your profession and qualifications.";
      else if (goal === "Get a Student Visa") recommendation += "applying for an F-1 student visa after receiving an I-20 from your school.";
      else recommendation += "consulting our services page to find the best option for your situation.";
      setResult(recommendation);
    }
  }

  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Immigration Tools</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Powerful tools to help you understand, plan, and navigate your immigration journey.</p>
        </div>
      </section>

      {/* Tool Navigation */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {[
              { id: "eligibility", icon: CheckCircle, label: "Eligibility Checker" },
              { id: "fees", icon: Calculator, label: "Fee Calculator" },
              { id: "glossary", icon: BookOpen, label: "Glossary" },
              { id: "deadlines", icon: Clock, label: "Key Deadlines" },
            ].map(({ id, icon: Icon, label }) => (
              <a key={id} href={`#${id}`} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 rounded-lg hover:bg-blue-50 whitespace-nowrap transition-colors">
                <Icon className="w-4 h-4" /> {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Checker */}
      <section id="eligibility" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Eligibility Checker</h2>
            <p className="text-gray-600">Answer a few questions to find your best immigration path.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {result ? (
              <div>
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4" style={{ color: "#1a1a2e" }}>Your Recommendation</h3>
                <p className="text-gray-600 text-center leading-relaxed mb-6">{result}</p>
                <div className="flex flex-col gap-3">
                  <a href="/services" className="block text-center py-3 px-6 rounded-xl font-semibold text-white" style={{ background: "#0057A8" }}>Explore Services</a>
                  <button onClick={() => { setAnswers({}); setEligStep(0); setResult(null); }} className="block text-center py-3 px-6 rounded-xl font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">Start Over</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2 mb-6">
                  {eligibilityQuestions.map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= eligStep ? "bg-blue-600" : "bg-gray-200"}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-right mb-4">Step {eligStep + 1} of {eligibilityQuestions.length}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-5">{eligibilityQuestions[eligStep].question}</h3>
                <div className="space-y-3">
                  {eligibilityQuestions[eligStep].options.map(opt => (
                    <button key={opt} onClick={() => handleEligAnswer(eligibilityQuestions[eligStep].id, opt)} className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fee Calculator */}
      <section id="fees" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Calculator className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>USCIS Fee Calculator</h2>
            <p className="text-gray-600">Current USCIS filing fees for common immigration forms.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wide px-6 py-3">
              <span>Form / Service</span>
              <span className="text-center">USCIS Fee</span>
              <span>Notes</span>
            </div>
            {fees.map(({ form, fee, notes }, i) => (
              <div key={form} className={`grid grid-cols-3 px-6 py-4 border-b border-gray-100 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <span className="font-medium text-gray-900">{form}</span>
                <span className="text-center font-bold" style={{ color: "#0057A8" }}>{fee}</span>
                <span className="text-gray-500 text-xs">{notes}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">Fees are approximate and subject to change. Always verify current fees at uscis.gov before filing.</p>
        </div>
      </section>

      {/* Glossary */}
      <section id="glossary" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Immigration Glossary</h2>
            <p className="text-gray-600">Plain-English definitions of immigration terms.</p>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms..."
              value={glossarySearch}
              onChange={e => setGlossarySearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            />
          </div>
          <div className="space-y-3">
            {filteredTerms.map(({ term, def }) => (
              <div key={term} className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">{term}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{def}</p>
              </div>
            ))}
            {filteredTerms.length === 0 && <p className="text-center text-gray-400 py-8">No terms found for &quot;{glossarySearch}&quot;</p>}
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section id="deadlines" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Clock className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Key Immigration Deadlines</h2>
            <p className="text-gray-600">Critical timeframes you must know to keep your immigration status.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Conditional Green Card (I-751)", deadline: "File 90 days before 2-year expiration", urgency: "high" },
              { title: "Employment Authorization (I-765)", deadline: "File 180 days before EAD expiration", urgency: "medium" },
              { title: "Advance Parole (I-131)", deadline: "Apply before leaving the U.S. if adjustment pending", urgency: "high" },
              { title: "Naturalization (N-400)", deadline: "Eligible after 5 years (3 if married to U.S. citizen)", urgency: "low" },
              { title: "Address Change (AR-11)", deadline: "Report within 10 days of moving", urgency: "high" },
              { title: "Green Card Renewal (I-90)", deadline: "File 6 months before expiration", urgency: "medium" },
            ].map(({ title, deadline, urgency }) => (
              <div key={title} className={`rounded-xl p-5 border ${urgency === "high" ? "border-red-200 bg-red-50" : urgency === "medium" ? "border-yellow-200 bg-yellow-50" : "border-green-200 bg-green-50"}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${urgency === "high" ? "bg-red-500" : urgency === "medium" ? "bg-yellow-500" : "bg-green-500"}`} />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{deadline}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">These are general guidelines. Your specific deadlines may vary. Always consult official USCIS guidance or an attorney for your situation.</p>
        </div>
      </section>
    </>
  );
}
