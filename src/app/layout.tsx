import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The ViServe | Global Immigration & Visa Services",
  description: "The The ViServe provides expert immigration guidance, visa processing support, and document preparation services for individuals and families worldwide.",
  keywords: "immigration, visa, green card, citizenship, work permit, ViServe",
  openGraph: {
    title: "The ViServe | Global Immigration & Visa Services",
    description: "Expert immigration support for individuals and families worldwide.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
