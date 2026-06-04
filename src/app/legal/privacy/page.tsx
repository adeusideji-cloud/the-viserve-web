export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: June 3, 2026</p>
      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
          <p className="mb-2">We collect information you provide directly, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name, email address, and contact information</li>
            <li>Immigration-related information you enter when using our services</li>
            <li>Payment information (processed securely via third-party providers)</li>
            <li>Communications with our support team</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p>We use your information to: provide and improve our services; communicate with you; process payments; send important updates; and comply with legal obligations. We do not sell your personal information to third parties.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Data Security</h2>
          <p>We implement industry-standard security measures including SSL encryption, secure data storage, and access controls to protect your personal information. However, no system is 100% secure.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Retention</h2>
          <p>We retain your data as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights (GDPR/CCPA)</h2>
          <p>Depending on your location, you may have the right to access, correct, delete, or port your personal data. Contact us at <a href="mailto:privacy@theviserve.com" className="text-blue-600 underline">privacy@theviserve.com</a> to exercise these rights.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies</h2>
          <p>We use cookies to enhance your experience and analyze site usage. You may disable cookies in your browser settings, though some features may not function properly.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact</h2>
          <p>For privacy concerns: <a href="mailto:privacy@theviserve.com" className="text-blue-600 underline">privacy@theviserve.com</a></p>
        </section>
      </div>
    </div>
  );
}
