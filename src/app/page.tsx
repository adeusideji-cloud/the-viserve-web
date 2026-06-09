import Link from "next/link";
import { CheckCircle, Star, Shield, Globe, Users, Award, ArrowRight, FileText, Calculator, BookOpen, Clock, Lock, Headphones, Zap } from "lucide-react";

const services = [
  { title: "Green Card Application", description: "Prepare Form I-485 to apply for a green card from inside the United States.", icon: "🇺🇸", href: "/services#green-card" },
  { title: "Family Petition (I-130)", description: "Help your relative get a green card with a properly prepared petition.", icon: "👨‍👩‍👧", href: "/services#family" },
  { title: "Citizenship (N-400)", description: "Prepare your naturalization application to become a U.S. citizen.", icon: "⭐", href: "/services#citizenship" },
  { title: "Work Visa Support", description: "H-1B, L-1, O-1 and other employment-based visa preparation assistance.", icon: "💼", href: "/services#work-visa" },
  { title: "Business Immigration", description: "Support for entrepreneurs, investors, and corporate immigration needs.", icon: "🏢", href: "/services#business" },
  { title: "Church & Nonprofit Support", description: "Specialized immigration resources for religious workers and nonprofits.", icon: "⛪", href: "/services#nonprofit" },
];

const stats = [
  { value: "10,000+", label: "Clients Served" },
  { value: "98%", label: "Approval Rate" },
  { value: "150+", label: "Countries Served" },
  { value: "4.9/5", label: "Average Rating" },
];

const features = [
  { icon: Shield, title: "Attorney-Reviewed Process", desc: "Every service is designed and reviewed by licensed immigration attorneys." },
  { icon: FileText, title: "Accurate USCIS Forms", desc: "We prepare only the latest editions of official USCIS forms, ready to sign and file." },
  { icon: Globe, title: "Global Support", desc: "Our team supports clients in 150+ countries in multiple languages." },
  { icon: Clock, title: "Deadline Reminders", desc: "Never miss a critical immigration deadline with our smart reminder system." },
  { icon: Headphones, title: "Live Expert Support", desc: "Real humans ready to answer your questions via chat, email, or phone." },
  { icon: Award, title: "Satisfaction Guarantee", desc: "We work with you until your case is complete — your success is our mission." },
];

const steps = [
  { step: "1", title: "Check Eligibility", desc: "Use our free tool to discover your best immigration options in minutes." },
  { step: "2", title: "Choose Your Service", desc: "Select the service that fits your needs. No hidden fees, no surprises." },
  { step: "3", title: "Complete Your Forms", desc: "Answer simple questions; we prepare your USCIS forms accurately." },
  { step: "4", title: "File with Confidence", desc: "Receive custom filing instructions and submit your application." },
];

const testimonials = [
  { name: "Maria G.", country: "🇲🇽 Mexico", text: "The ViServe made my green card application so simple. The step-by-step guidance was exactly what I needed. Approved in 8 months!", rating: 5 },
  { name: "Emmanuel O.", country: "🇳🇬 Nigeria", text: "I was nervous about the process but the document checklist and support team kept me on track. Highly recommend!", rating: 5 },
  { name: "Priya S.", country: "🇮🇳 India", text: "The fee calculator and deadline tracker saved me from missing important dates. This platform is a game changer.", rating: 5 },
  { name: "Carlos M.", country: "🇧🇷 Brazil", text: "Professional, affordable, and incredibly easy to use. My entire family used The ViServe for our citizenship applications.", rating: 5 },
];

const tools = [
  { icon: CheckCircle, label: "Eligibility Checker", href: "/tools#eligibility", desc: "Find out which visa or path is right for you" },
  { icon: Globe, label: "Visa Finder", href: "/tools#visa-finder", desc: "Discover the best visa category for your situation" },
  { icon: Calculator, label: "Fee Calculator", href: "/tools#fees", desc: "Get accurate USCIS filing fee estimates" },
  { icon: BookOpen, label: "Immigration Glossary", href: "/tools#glossary", desc: "Plain-English explanations of immigration terms" },
];

const trustBadges = [
  { icon: Lock, text: "SSL Secured" },
  { icon: Shield, text: "Attorney-Reviewed" },
  { icon: Zap, text: "USCIS Compliant" },
  { icon: Users, text: "10,000+ Clients" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>Trusted by 10,000+ immigrants worldwide</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Navigate Your Immigration Journey With <span className="text-yellow-300">Clarity, Confidence,</span> and Independence.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              The ViServe guides individuals, families, and businesses through every step of the immigration process — from visa applications to citizenship — with expert support and attorney-reviewed tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Link href="/get-started" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-blue-900 bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-lg">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/tools#eligibility" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors">
                Check Eligibility Free
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors">
                Book a Consultation
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-blue-100">
              {["✓ No hidden fees", "✓ Attorney-reviewed", "✓ 150+ countries served", "✓ Secure & confidential"].map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                <Icon className="w-4 h-4 text-green-600" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold" style={{ color: "#0057A8" }}>{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Our Immigration Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Comprehensive immigration support for individuals, families, businesses, and organizations worldwide.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="text-4xl mb-4">{svc.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{svc.description}</p>
                <Link href={svc.href} className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all" style={{ color: "#0057A8" }}>
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Free Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Free Immigration Tools</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">Use our tools to prepare, plan, and navigate your immigration journey with confidence.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map(({ icon: Icon, label, href, desc }) => (
              <Link key={label} href={href} className="group bg-blue-50 rounded-xl p-6 border border-blue-100 hover:bg-blue-600 transition-colors card-hover">
                <div className="w-10 h-10 rounded-lg bg-blue-600 group-hover:bg-white flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-white mb-1 transition-colors">{label}</h3>
                <p className="text-sm text-gray-500 group-hover:text-blue-100 transition-colors">{desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tools" className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline">
              Explore All Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1a1a2e" }}>How The ViServe Works</h2>
            <p className="text-gray-600 text-lg">Simple steps. Clear guidance. Accurate results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold shadow-lg" style={{ background: "linear-gradient(135deg, #0057A8, #00A86B)" }}>
                  {step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Why Choose The ViServe?</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">Everything you need to navigate immigration successfully, all in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }) => (
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

      {/* Testimonials */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <div className="flex items-center justify-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-blue-100 ml-2">4.9 average · 10,000+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map(({ name, country, text, rating }) => (
              <div key={name} className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20">
                <div className="flex mb-3">
                  {Array.from({ length: rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-blue-100 leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-sm">{name}</div>
                  <div className="text-xs text-blue-200">{country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Ready to Start Your Journey?</h2>
          <p className="text-gray-600 text-lg mb-8">Join thousands of families who trusted The ViServe to navigate their immigration process successfully.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started" className="px-8 py-4 font-semibold text-white rounded-xl transition-colors shadow-lg text-base" style={{ background: "#0057A8" }}>
              Get Started Today
            </Link>
            <Link href="/contact" className="px-8 py-4 font-semibold text-blue-700 rounded-xl border-2 border-blue-700 hover:bg-blue-50 transition-colors text-base">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
