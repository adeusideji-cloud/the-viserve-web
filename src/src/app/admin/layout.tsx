import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | The ViServe",
  description: "The ViServe Administration Panel",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin has its own layout — no public Navbar/Footer
  return <div className="min-h-screen bg-gray-950">{children}</div>;
}
