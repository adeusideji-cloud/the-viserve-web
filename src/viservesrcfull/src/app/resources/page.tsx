import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const articles = [
  { slug: "green-card-through-marriage", title: "How to Get a Green Card Through Marriage: A Complete Guide", category: "Green Card", readTime: "8 min", date: "May 28, 2026", excerpt: "Getting a green card through marriage is one of the most common immigration paths. Here's everything you need to know about the process, forms, timelines, and requirements." },
  { slug: "common-uscis-mistakes", title: "10 Common USCIS Application Mistakes That Lead to Rejection", category: "Tips & Advice", readTime: "6 min", date: "May 20, 2026", excerpt: "USCIS rejected nearly 2.6 million forms last year. Learn the most common mistakes applicants make and how to avoid them to give your application the best chance of approval." },
  { slug: "h1b-visa-guide", title: "The H-1B Visa: Eligibility, Process, and What to Expect", category: "Work Visas", readTime: "10 min", date: "May 15, 2026", excerpt: "The H-1B visa allows U.S. companies to employ foreign workers in specialty occupations. This guide breaks down who qualifies, the lottery process, and how to prepare." },
  { slug: "citizenship-test-preparation", title: "How to Prepare for the U.S. Citizenship Test and Interview", category: "Citizenship", readTime: "7 min", date: "May 10, 2026", excerpt: "The naturalization process includes a civics test and an English test. We cover exactly what to study, what to expect, and tips for success." },
  { slug: "rfe-response-guide", title: "Received an RFE? Here's How to Respond Successfully", category: "RFE Support", readTime: "9 min", date: "May 5, 2026", excerpt: "A Request for Evidence (RFE) can feel alarming, but it's not a denial. This guide walks you through how to craft a strong RFE response that keeps your case moving." },
  { slug: "f1-to-green-card", title: "Student to Permanent Resident: Pathways from F-1 Visa to Green Card", category: "Student Visas", readTime: "11 min", date: "April 28, 2026", excerpt: "International students often wonder if they can stay in the U.S. permanently. This article covers the various pathways from an F-1 student visa to permanent residency." },
  { slug: "i-485-checklist", title: "Complete I-485 Document Checklist for 2026", category: "Green Card", readTime: "5 min", date: "April 20, 2026", excerpt: "Filing Form I-485 requires a specific set of supporting documents. Use this checklist to ensure you have everything USCIS needs before you submit your application." },
  { slug: "immigration-fees-2026", title: "Complete Guide to USCIS Filing Fees for 2026", category: "Filing Fees", readTime: "4 min", date: "April 15, 2026", excerpt: "USCIS updated its fee schedule in 2024. Here is a complete breakdown of current filing fees for the most common immigration forms and petitions." },
];

const categories = ["All", "Green Card", "Citizenship", "Work Visas", "Student Visas", "RFE Support", "Tips & Advice", "Filing Fees"];

const categoryColors: Record<string, string> = {
  "Green Card": "bg-blue-100 text-blue-700",
  "Citizenship": "bg-purple-100 text-purple-700",
  "Work Visas": "bg-orange-100 text-orange-700",
  "Student Visas": "bg-green-100 text-green-700",
  "RFE Support": "bg-red-100 text-red-700",
  "Tips & Advice": "bg-yellow-100 text-yellow-700",
  "Filing Fees": "bg-gray-100 text-gray-700",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Immigration Resources</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Expert guides, tips, and articles to help you understand and navigate the immigration process.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === "All" ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`} style={cat === "All" ? { background: "#0057A8" } : {}}>
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(({ slug, title, category, readTime, date, excerpt }) => (
              <article key={slug} className="bg-white rounded-2xl border border-gray-100 shadow-sm card-hover overflow-hidden flex flex-col">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-40 flex items-center justify-center text-5xl">
                  {category === "Green Card" ? "🇺🇸" : category === "Citizenship" ? "⭐" : category === "Work Visas" ? "💼" : category === "Student Visas" ? "🎓" : category === "RFE Support" ? "📋" : "📚"}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[category] || "bg-gray-100 text-gray-700"}`}>{category}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400"><Clock className="w-3 h-3" />{readTime}</span>
                  </div>
                  <h2 className="font-bold text-gray-900 mb-2 leading-snug text-lg">{title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{date}</span>
                    <Link href={`/resources/${slug}`} className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#0057A8" }}>
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Updated on Immigration News</h2>
          <p className="text-blue-100 mb-6 text-sm">Get the latest immigration policy updates, tips, and guides delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <button type="submit" className="px-6 py-3 font-semibold rounded-xl text-blue-900 bg-yellow-400 hover:bg-yellow-300 transition-colors whitespace-nowrap text-sm">
              Subscribe Free
            </button>
          </form>
          <p className="text-xs text-blue-200 mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
