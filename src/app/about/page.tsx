import { Shield, Globe, Heart, Award, Users, Target, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const values = [
  { icon: Shield, title: "Integrity", desc: "We operate with full transparency. No hidden fees, no false promises — ever." },
  { icon: Globe, title: "Accessibility", desc: "Immigration help should be available to everyone, regardless of income or location." },
  { icon: Heart, title: "Compassion", desc: "We understand the emotional weight of immigration and treat every client with care." },
  { icon: Award, title: "Excellence", desc: "Attorney-reviewed processes and cutting-edge tools ensure the highest quality." },
  { icon: Users, title: "Community", desc: "We build bridges between immigrants and the resources they need to thrive." },
  { icon: Target, title: "Accuracy", desc: "Every form, checklist, and instruction is verified for accuracy before delivery." },
];

const commitments = [
  "We follow USCIS guidelines to ensure every form is accurate and up-to-date.",
  "We protect your sensitive personal information with bank-grade security.",
  "We are committed to transparency — you will never be surprised by hidden fees.",
  "We only refer clients to vetted, licensed immigration attorneys when legal advice is needed.",
  "We are committed to compliance, ethical service, and respect for every client.",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About The ViServe</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            A trusted immigration technology and support platform helping immigrants understand, prepare, organize, and manage immigration processes with clarity and confidence.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The ViServe was founded with one clear purpose: to eliminate the confusion, fear, and financial burden that too many immigrants face when navigating the immigration system.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our founder, Ayo Adeusi, experienced firsthand how overwhelming immigration paperwork can be — and how expensive professional legal help is. The ViServe bridges this gap by providing attorney-reviewed, step-by-step guidance at a fraction of the cost, empowering individuals and families to navigate the process with independence and confidence.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Based in Plano, Texas, we serve clients in over 150 countries, helping families reunite, professionals advance their careers, and students pursue their dreams in the United States and beyond.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                The ViServe is committed to combining expert human guidance with cutting-edge technology — making immigration accessible to everyone, everywhere.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl" style={{ background: "#0057A8" }}>
                Explore Our Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10,000+", label: "Clients Served" },
                { value: "150+", label: "Countries" },
                { value: "98%", label: "Approval Rate" },
                { value: "4.9/5", label: "Client Rating" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-blue-50 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: "#0057A8" }}>{value}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#EEF4FF" }}>
                <Target className="w-6 h-6" style={{ color: "#0057A8" }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "#1a1a2e" }}>Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower immigrants worldwide with accessible, accurate, and affordable immigration support — using technology and human expertise to simplify the path to a new life. We help immigrants understand, prepare, organize, and manage immigration processes with clarity, confidence, and independence.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#EDFBF4" }}>
                <Globe className="w-6 h-6" style={{ color: "#00A86B" }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "#1a1a2e" }}>Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where every person, regardless of background or income, has equal access to the tools and guidance needed to successfully navigate immigration systems globally. We envision an AI-powered platform that serves as every immigrant&apos;s trusted guide from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Our Core Values</h2>
            <p className="text-gray-600">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#EEF4FF" }}>
                  <Icon className="w-6 h-6" style={{ color: "#0057A8" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Founder &amp; Leadership</h2>
            <p className="text-gray-600">Built by people who understand the immigration journey firsthand.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 rounded-full flex-shrink-0 flex items-center justify-center text-5xl font-bold text-white shadow-lg" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
              A
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Ayo Adeusi</h3>
              <p className="font-semibold mb-4" style={{ color: "#0057A8" }}>Founder &amp; CEO — The ViServe</p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ayo Adeusi founded The ViServe with a clear mission: to make immigration accessible, transparent, and stress-free for everyone. With deep experience in immigration support and a passion for helping families and individuals achieve their goals, The ViServe was built to combine expert guidance with cutting-edge technology.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ayo believes every immigrant deserves access to quality, affordable support — and that no one should have to face the immigration system alone. Through The ViServe, that vision is becoming a reality for thousands of clients across 150+ countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Our Commitment to You</h2>
            <p className="text-gray-600">Compliance, transparency, and respect in everything we do.</p>
          </div>
          <div className="space-y-4">
            {commitments.map((c, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#00A86B" }} />
                <p className="text-gray-700 text-sm leading-relaxed">{c}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <p className="text-sm text-blue-800 leading-relaxed">
              <strong>Important Notice:</strong> The ViServe is not a law firm and does not provide legal advice unless services are provided through a licensed attorney or authorized representative. Information on this website is for educational and document-preparation support purposes only. Use of this website does not create an attorney-client relationship.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Work With Us?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="px-8 py-4 font-semibold text-white rounded-xl text-base" style={{ background: "#0057A8" }}>
              Get Started Today
            </Link>
            <Link href="/contact" className="px-8 py-4 font-semibold text-blue-700 rounded-xl border-2 border-blue-700 hover:bg-blue-50 transition-colors text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
