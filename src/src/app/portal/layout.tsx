import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal | The ViServe",
  description: "Manage your immigration case, upload documents, and track your progress.",
};

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  // Portal has its own nav — no public Navbar/Footer
  return <div>{children}</div>;
}
