import type { Metadata, Viewport } from "next";
import { Heebo, Poppins } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/behaviour/SmoothScroll";
import ScrollReveal from "@/components/behaviour/ScrollReveal";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MEL Recruitment | Find a job that fits your career goals",
    template: "%s | MEL Recruitment",
  },
  description:
    "MEL connects candidates with employers across the UK in facilities, healthcare, logistics, hospitality and security. Register free and apply in minutes.",
  icons: { icon: "/images/logo.png" },
};

export const viewport: Viewport = {
  themeColor: "#2a367a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${poppins.variable} ${heebo.variable}`}>
      <body>
        <a
          href="#main"
          className="absolute -top-15 left-3 z-100 rounded-sm bg-navy px-4 py-2 text-white transition-[top] duration-200 focus:top-3"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <ScrollReveal />
      </body>
    </html>
  );
}
