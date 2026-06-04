export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Legal Disclaimer</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: June 3, 2026</p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
        <p className="text-yellow-800 font-semibold">ViServe Inc. is NOT a law firm and does NOT provide legal advice.</p>
      </div>
      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Not a Law Firm</h2>
          <p>ViServe Inc. is a technology company that provides self-help immigration document preparation services. We are not attorneys and cannot provide legal advice. Nothing on this website constitutes legal advice.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">No Attorney-Client Relationship</h2>
          <p>Your use of ViServe services does not create an attorney-client relationship between you and ViServe Inc. or any of its employees, contractors, or affiliates.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Limitation of Services</h2>
          <p>Our services are limited to: helping you prepare immigration forms based on information you provide; providing educational resources about immigration processes; and connecting you with licensed attorneys for legal matters.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">When to Consult an Attorney</h2>
          <p>We strongly recommend consulting a licensed immigration attorney if: you have a criminal history; you have previously been deported or removed; you have previously overstayed a visa; your case involves complex legal issues; or you receive any adverse action from USCIS.</p>
        </section>
      </div>
    </div>
  );
}
