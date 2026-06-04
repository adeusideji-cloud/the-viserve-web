export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Refund Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: June 3, 2026</p>
      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Our Guarantee</h2>
          <p>ViServe stands behind the quality of our document preparation services. If your application is denied by USCIS due to an error in our preparation, we will refund our service fee in full.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Eligibility for Refund</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>USCIS denied the application due to a preparation error by ViServe</li>
            <li>You followed all filing instructions we provided</li>
            <li>You provided accurate and complete information</li>
            <li>Request submitted within 30 days of USCIS denial notice</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Refunds Not Covered</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>USCIS government filing fees (non-refundable by USCIS)</li>
            <li>Denials due to inaccurate information provided by the client</li>
            <li>Denials based on changes in law or policy after preparation</li>
            <li>Cases where the client did not follow our filing instructions</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">How to Request a Refund</h2>
          <p>Email <a href="mailto:refunds@theviserve.com" className="text-blue-600 underline">refunds@theviserve.com</a> with your case number, denial notice, and a description of the error. We will review and respond within 5 business days.</p>
        </section>
      </div>
    </div>
  );
}
