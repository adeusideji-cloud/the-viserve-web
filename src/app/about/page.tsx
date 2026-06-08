import { Shield, Globe, Heart, Award, Users, Target } from "lucide-react";
import Link from "next/link";

const values = [
  { icon: Shield, title: "Integrity", desc: "We operate with full transparency. No hidden fees, no false promises — ever." },
  { icon: Globe, title: "Accessibility", desc: "Immigration help should be available to everyone, regardless of income or location." },
  { icon: Heart, title: "Compassion", desc: "We understand the emotional weight of immigration and treat every client with care." },
  { icon: Award, title: "Excellence", desc: "Attorney-reviewed processes and cutting-edge tools ensure the highest quality." },
  { icon: Users, title: "Community", desc: "We build bridges between immigrants and the resources they need to thrive." },
  { icon: Target, title: "Accuracy", desc: "Every form, checklist, and instruction is verified for accuracy before delivery." },
];

const team = [
  { name: "Dr. Adaeze Ideji", role: "Founder & CEO", bio: "Immigration technology expert with 15+ years helping immigrants navigate complex systems worldwide.", initials: "AI" },
  { name: "James Okonkwo", role: "Head of Immigration Services", bio: "Former USCIS officer with deep knowledge of immigration law and form processing.", initials: "JO" },
  { name: "Sofia Ramirez", role: "Director of Client Success", bio: "Dedicated to ensuring every client receives personalized, compassionate support.", initials: "SR" },
  { name: "David Chen", role: "Chief Technology Officer", bio: "Builds secure, accessible platforms that make immigration tools easy to use globally.", initials: "DC" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About The ViServe</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            We are a global immigration technology company on a mission to make the immigration process accessible, affordable, and stress-free for everyone.
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
                The The ViServe was founded with one clear purpose: to eliminate the confusion, fear, and financial burden that too many immigrants face when navigating the immigration system.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our founder experienced firsthand how overwhelming immigration paperwork can be — and how expensive professional legal help is. ViServe bridges this gap by providing attorney-reviewed, step-by-step guidance at a fraction of the cost.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, we serve clients in over 150 countries, helping families reunite, professionals advance their careers, and students pursue their dreams in the United States and beyond.
              </p>
              <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl" style={{ background: "#0057A8" }}>
                Explore Our Services
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2015", label: "Founded" },
                { value: "50K+", label: "Clients Served" },
                { value: "150+", label: "Countries" },
                { value: "98%", label: "Approval Rate" },
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
                To empower immigrants worldwide with accessible, accurate, and affordable immigration support — using technology and human expertise to simplify the path to a new life.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#EDFBF4" }}>
                <Globe className="w-6 h-6" style={{ color: "#00A86B" }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: "#1a1a2e" }}>Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where every person, regardless of background or income, has equal access to the tools and guidance needed to successfully navigate immigration systems globally.
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

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Meet Our Team</h2>
            <p className="text-gray-600">Experts in immigration, technology, and client success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(({ name, role, bio, initials }) => (
              <div key={name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center card-hover">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
                  {initials}
                </div>
                <h3 className="font-bold text-gray-900 mb-0.5">{name}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: "#0057A8" }}>{role}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-yellow-50 border-y border-yellow-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-yellow-800 leading-relaxed">
            <strong>Important Notice:</strong> The The The ViServe is not a law firm and does not provide legal advice. We provide self-help immigration document preparation services only. For legal advice, please consult a licensed immigration attorney.
          </p>
        </div>
      </section>
    </>
  );
}
