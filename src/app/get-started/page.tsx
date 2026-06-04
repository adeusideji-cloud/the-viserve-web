import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1a1a2e" }}>Let&apos;s Get You Started</h1>
        <p className="text-gray-600 mb-10">Create a free account to access all ViServe tools, track your case, and get expert immigration support.</p>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">Your free account includes:</h2>
          <ul className="space-y-3 text-left mb-8">
            {["Free eligibility checker", "Immigration tools & calculators", "Document checklists", "Deadline reminders", "Case progress tracking", "Access to all resources & guides"].map(f => (
              <li key={f} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#00A86B" }} />
                {f}
              </li>
            ))}
          </ul>
          <Link href="/signup" className="inline-flex items-center gap-2 w-full justify-center py-4 px-8 font-semibold text-white rounded-xl text-base" style={{ background: "#0057A8" }}>
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-gray-400 mt-3 text-center">No credit card required. Free forever for basic tools.</p>
        </div>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}
