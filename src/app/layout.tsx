import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#008fb4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bloomdesk.in"),
  title: "BloomDesk | Premium Coworking & Shared Office Spaces in Mumbai (Borivali & Kandivali)",
  description:
    "Discover inspiring, flexible coworking spaces, private office cabins, dedicated desks, and meeting rooms across Mumbai's western suburbs in Borivali and Kandivali. 100% power backup, high-speed fiber, and vibrant community.",
  keywords: [
    "coworking space Borivali",
    "coworking space Kandivali",
    "shared office space Mumbai",
    "private office cabin Borivali West",
    "meeting room Borivali East",
    "BloomDesk",
    "office on lease Borivali",
    "flexible workspace Western Express Highway",
  ],
  authors: [{ name: "BloomDesk Coworking" }],
  creator: "BloomDesk",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://bloomdesk.in",
    siteName: "BloomDesk Coworking Spaces",
    title: "BloomDesk | Inspiring Workspaces in Mumbai (Borivali & Kandivali)",
    description:
      "Fully furnished private offices, dedicated desks, and modern meeting rooms across 5 prime Mumbai centers.",
    images: [
      {
        url: "/assets/hero/hero-architectural.jpg",
        width: 1200,
        height: 630,
        alt: "BloomDesk Coworking Space Mumbai",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#FAFAF8] text-[#0F172A] selection:bg-[#008fb4]/20 selection:text-[#075F7A]">
        {children}
      </body>
    </html>
  );
}
