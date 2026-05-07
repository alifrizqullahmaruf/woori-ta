import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/wooriIcon.png",
  },
  title: "Woori-ta — AI Investment Insights",
  description: "AI-powered investment analysis service for Woori Bank customers by AdvisorLoren (testing phase)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKr.variable} ${lato.variable} typo-base mx-auto md:max-w-[720px]`}
    >
      <body className="min-h-full bg-neutral-500 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
