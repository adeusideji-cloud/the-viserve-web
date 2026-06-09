"use client";
import { useState } from "react";
import { CheckCircle, Globe, Calculator, BookOpen, Clock, Search, FileText, AlertCircle, ArrowRight, List } from "lucide-react";

const glossaryTerms = [
  { term: "Adjustment of Status", def: "The process of applying for a green card while already in the United States." },
  { term: "Alien", def: "A legal term for a person who is not a U.S. citizen or national." },
  { term: "Asylum", def: "Protection granted to foreign nationals who meet the legal definition of a refugee." },
  { term: "Beneficiary", def: "The person on whose behalf an immigration petition is filed." },
  { term: "Biometrics", def: "Fingerprints, photo, and signature collected by USCIS for identity verification." },
  { term: "Consular Processing", def: "Applying for a visa or green card through a U.S. embassy or consulate abroad." },
  { term: "EAD", def: "Employment Authorization Document — a work permit issued by USCIS." },
  { term: "Green Card", def: "A Permanent Resident Card (Form I-551) that allows a foreign national to live and work in the U.S. permanently." },
  { term: "I-94", def: "Arrival/Departure Record — records the authorized period of stay for nonimmigrants." },
  { term: "Naturalization", def: "The process by which a non-U.S. citizen acquires U.S. citizenship." },
  { term: "NOID", def: "Notice of Intent to Deny — a warning from USCIS before officially denying an application." },
  { term: "Petitioner", def: "The U.S. citizen or lawful permanent resident who files an immigration petition on behalf of a relative." },
  { term: "Priority Date", def: "The date a petition is properly filed with USCIS; determines place in line for immigrant visas." },
  { term: "RFE", def: "Request for Evidence — a notice from USCIS asking for additional documentation to continue processing." },
  { term: "SEVIS", def: "Student and Exchange Visitor Information System — the database that tracks F-1 and J-1 visa holders." },
  { term: "Status Violation", def: "Failure to maintain the conditions of your visa or immigration status." },
  { term: "USCIS", def: "U.S. Citizenship and Immigration Services — the agency that processes immigration applications." },
  { term: "Visa Bulletin", def: "A monthly publication from the State Department showing which immigrant visa numbers are available." },
  { term: "Visa Overstay", def: "Remaining in the U.S. beyond the authorized period of admission on your visa." },
  { term: "Unlawful Presence", def: "Time spent in the U.S. without lawful immigration status; triggers bars on re-entry." },
];

const fees = [
  { form: "I-485 (Green Card)", fee: "$1,440", notes: "Includes biometrics for applicants 14–78" },
  { form: "N-400 (Citizenship)", fee: "$760", notes: "Reduced fee available for low-income applicants" },
  { form: "I-130 (Relative Petition)", fee: "$535", notes: "Per beneficiary" },
  { form: "I-129F (Fiancé Visa)", fee: "$535", notes: "K-1 visa petition" },
  { form: "I-765 (Work Permit / EAD)", fee: "$520", notes: "Employment Authorization Document" },
  { form: "I-131 (Advance Parole)", fee: "$630", notes: "Travel document for green card applicants" },
  { form: "I-751 (Remove Conditions)", fee: "$750", notes: "Removes 2-year conditional status" },
  { form: "N-600 (Certificate of Citizenship)", fee: "$1,170", notes: "For those born abroad to U.S. citizens" },
  { form: "I-90 (Green Card Renewal)", fee: "$540", notes: "Renew or replace permanent resident card" },
  { form: "I-360 (Religious Worker)", fee: "$435", notes: "Special immigrant religious worker petition" },
];

const eligibilityQuestions = [
  { id: "status", question: "What is your current immigration status in the U.S.?", options: ["U.S. Citizen", "Lawful Permanent Resident (Green Card)", "Nonimmigrant Visa Holder (F-1, H-1B, etc.)", "Undocumented / No Status", "Abroad (Not currently in the U.S.)"] },
  { id: "goal", question: "What is your immigration goal?", options: ["Get a Green Card", "Become a U.S. Citizen", "Bring a Family Member", "Get a Work Visa", "Get a Student Visa", "Business / Investor Visa", "Religious Worker Visa"] },
];

const documentChecklists: Record<string, string[]> = {
  "I-485 Green Card": ["Form I-485 (completed)", "Form I-864 (Affidavit of Support)", "Passport (all pages)", "Birth certificate (translated)", "Passport-style photos (x2)", "Medical exam (Form I-693)", "Police clearance (if applicable)", "Tax returns (3 years)", "Proof of lawful entry (I-94 record)", "Filing fee payment"],
  "N-400 Citizenship": ["Form N-400 (completed)", "Permanent Resident Card (Green Card)", "Passport (all pages)", "Passport-style photos (x2)", "Tax returns (5 years)", "Travel history records", "Proof of marriage (if applicable)", "Filing fee payment"],
  "I-130 Family Petition": ["Form I-130 (completed)", "Proof of petitioner's U.S. citizenship or green card", "Birth certificates (petitioner & beneficiary)", "Proof of relationship (marriage cert, adoption records, etc.)", "Passport copies", "Filing fee payment"],
  "K-1 Fiancé Visa": ["Form I-129F (completed)", "Proof of U.S. citizenship", "Evidence of relationship (photos, messages, call records)", "Proof of meeting in person within 2 years", "Financial evidence (I-134)", "Passport copies", "Filing fee payment"],
};

const rfeTips = [
  { title: "Read carefully", desc: "Identify exactly what USCIS is asking for — each RFE is different. Note the response deadline." },
  { title: "Organize your evidence", desc: "Group supporting documents by the specific issues raised in the RFE." },
  { title: "Write a cover letter", desc: "Address each RFE point directly with references to your supporting evidence." },
  { title: "Use clear labels", desc: "Label exhibits (Exhibit A, Exhibit B, etc.) and reference them in your cover letter." },
  { title: "Meet the deadline", desc: "RFE responses typically must be received within 87 days. Do not miss this deadline." },
  { title: "Consider attorney review", desc: "For complex RFEs, a licensed immigration attorney can significantly improve your response." },
];

export default function ToolsPage() {
  const [glossarySearch, setGlossarySearch] = useState("");
  const [eligStep, setEligStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [selectedChecklist, setSelectedChecklist] = useState("I-485 Green Card");

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
      let recommendation = "";
      if (goal === "Get a Green Card") recommendation = "We recommend filing Form I-485 (Adjustment of Status) if you are currently in the U.S., or pursuing consular processing if abroad.";
      else if (goal === "Become a U.S. Citizen") recommendation = "We recommend filing Form N-400. You typically need 5 years as a permanent resident (3 years if married to a U.S. citizen).";
      else if (goal === "Bring a Family Member") recommendation = "We recommend filing Form I-130 (Petition for Alien Relative) to start the process for your family member.";
      else if (goal === "Get a Work Visa") recommendation = "Explore H-1B, L-1, or O-1 visa categories depending on your profession and qualifications.";
      else if (goal === "Get a Student Visa") recommendation = "Apply for an F-1 student visa after receiving an I-20 from your school.";
      else if (goal === "Business / Investor Visa") recommendation = "Explore E-2 Treaty Investor or EB-5 Immigrant Investor visa options depending on your investment amount and country.";
      else if (goal === "Religious Worker Visa") recommendation = "Explore the R-1 Religious Worker visa or the Special Immigrant Religious Worker category (I-360).";
      else recommendation = "Please visit our services page to find the best option for your situation.";
      setResult(recommendation);
    }
  }

  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Immigration Tools</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Powerful, free tools to help you understand, plan, and successfully navigate your immigration journey.</p>
        </div>
      </section>

      {/* Tool Navigation */}
      <section className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {[
              { id: "eligibility", icon: CheckCircle, label: "Eligibility Checker" },
              { id: "visa-finder", icon: Globe, label: "Visa Finder" },
              { id: "checklist", icon: List, label: "Document Checklist" },
              { id: "fees", icon: Calculator, label: "Fee Calculator" },
              { id: "rfe", icon: AlertCircle, label: "RFE Guide" },
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
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Your Recommendation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{result}</p>
                <div className="flex flex-col gap-3">
                  <a href="/services" className="block text-center py-3 px-6 rounded-xl font-semibold text-white" style={{ background: "#0057A8" }}>Explore Services</a>
                  <a href="/contact" className="block text-center py-3 px-6 rounded-xl font-semibold text-white" style={{ background: "#00A86B" }}>Book a Consultation</a>
                  <button onClick={() => { setAnswers({}); setEligStep(0); setResult(null); }} className="py-3 px-6 rounded-xl font-medium text-gray-600 border border-gray-200 hover:bg-gray-50">Start Over</button>
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

      {/* Visa Finder */}
      <section id="visa-finder" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <Globe className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Visa Category Finder</h2>
            <p className="text-gray-600">Discover the visa categories available for your situation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { category: "Family-Based", visas: ["IR-1/CR-1 (Spouse)", "K-1 (Fiancé)", "IR-2 (Child)", "F-2A/F-2B (LPR Relative)", "IR-5 (Parent)"], color: "blue" },
              { category: "Employment-Based", visas: ["H-1B (Specialty Occupation)", "L-1 (Intracompany Transfer)", "O-1 (Extraordinary Ability)", "EB-1, EB-2, EB-3 (Green Card)", "TN (Canada/Mexico)"], color: "green" },
              { category: "Student & Exchange", visas: ["F-1 (Academic Student)", "M-1 (Vocational Student)", "J-1 (Exchange Visitor)", "OPT/CPT (Work Authorization)", "SEVIS Registration"], color: "purple" },
              { category: "Business & Investor", visas: ["E-2 (Treaty Investor)", "EB-5 (Immigrant Investor)", "B-1 (Business Visitor)", "L-1A (Managers/Executives)", "E-1 (Treaty Trader)"], color: "orange" },
              { category: "Humanitarian", visas: ["Asylum (Form I-589)", "Refugee Status", "DACA (Deferred Action)", "TPS (Temporary Protected Status)", "U Visa (Crime Victims)"], color: "red" },
              { category: "Religious & Nonprofit", visas: ["R-1 (Religious Worker)", "Special Immigrant (I-360)", "G-4 (International Org)", "A-1/A-2 (Diplomatic)", "NATO Status"], color: "teal" },
            ].map(({ category, visas, color }) => (
              <div key={category} className={`bg-gray-50 rounded-2xl p-6 border border-gray-100`}>
                <h3 className="font-bold text-gray-900 mb-3">{category}</h3>
                <ul className="space-y-1.5">
                  {visas.map(v => (
                    <li key={v} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#0057A8" }} />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Checklist */}
      <section id="checklist" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <List className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Document Checklist Generator</h2>
            <p className="text-gray-600">Select your application type to see the required documents.</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {Object.keys(documentChecklists).map(key => (
              <button key={key} onClick={() => setSelectedChecklist(key)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedChecklist === key ? "text-white shadow-sm" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-400"}`} style={selectedChecklist === key ? { background: "#0057A8" } : {}}>
                {key}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" style={{ color: "#0057A8" }} /> {selectedChecklist} — Required Documents
            </h3>
            <div className="space-y-3">
              {documentChecklists[selectedChecklist].map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                  <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">This is a general checklist. Your specific case may require additional documents. Always verify with a qualified professional.</p>
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

      {/* RFE Guide */}
      <section id="rfe" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <AlertCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>RFE Response Guide</h2>
            <p className="text-gray-600">Received a Request for Evidence? Here&apos;s how to respond effectively.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {rfeTips.map(({ title, desc }, i) => (
              <div key={title} className="bg-white rounded-xl p-5 border border-gray-100 flex gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: "#0057A8" }}>
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-blue-800 text-sm mb-4">Need help with your RFE? Our team can review your notice and help you organize a strong response.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl text-sm" style={{ background: "#0057A8" }}>
              Get RFE Help <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Glossary */}
      <section id="glossary" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Immigration Glossary</h2>
            <p className="text-gray-600">Plain-English definitions for {glossaryTerms.length} immigration terms.</p>
          </div>
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search immigration terms..." value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" />
          </div>
          <div className="space-y-3">
            {filteredTerms.map(({ term, def }) => (
              <div key={term} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-1">{term}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{def}</p>
              </div>
            ))}
            {filteredTerms.length === 0 && <p className="text-center text-gray-400 py-8">No terms found for &quot;{glossarySearch}&quot;</p>}
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section id="deadlines" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Clock className="w-12 h-12 mx-auto mb-3" style={{ color: "#0057A8" }} />
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Key Immigration Deadlines</h2>
            <p className="text-gray-600">Critical timeframes you must know to protect your immigration status.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Conditional Green Card (I-751)", deadline: "File 90 days before 2-year expiration", urgency: "high" },
              { title: "Employment Authorization (I-765)", deadline: "File 180 days before EAD expiration", urgency: "medium" },
              { title: "Advance Parole (I-131)", deadline: "Apply before leaving the U.S. if adjustment pending", urgency: "high" },
              { title: "Address Change (AR-11)", deadline: "Report within 10 days of moving", urgency: "high" },
              { title: "Green Card Renewal (I-90)", deadline: "File 6 months before expiration", urgency: "medium" },
              { title: "Naturalization (N-400)", deadline: "Eligible after 5 years (3 if married to U.S. citizen)", urgency: "low" },
              { title: "F-1 OPT Application", deadline: "Apply up to 90 days before graduation", urgency: "medium" },
              { title: "RFE Response Deadline", deadline: "Typically 87 days from notice date", urgency: "high" },
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
