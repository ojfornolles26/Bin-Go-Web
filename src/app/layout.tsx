import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bin'Go - Smart Community Waste & Sanitation",
  description:
    "Bin'Go is a dual-platform municipal waste management and illegal dumping mitigation platform for Metro Cebu. Track waste collection, report illegal dumping, and stay informed with real-time schedules.",
  keywords: [
    "waste management",
    "Metro Cebu",
    "illegal dumping",
    "sanitation",
    "civic tech",
    "community",
  ],
  openGraph: {
    title: "Bin'Go - Smart Community Waste & Sanitation",
    description:
      "Track waste collection, report illegal dumping, and keep Metro Cebu clean with Bin'Go.",
    type: "website",
    locale: "en_PH",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-[100dvh] bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
