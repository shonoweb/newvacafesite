import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEWVA CAFE | Coffee & Cafe",
  description:
    "NEWVA CAFEは、コーヒーと自家製ケーキを楽しめる街なかのカフェです。明るく open な店内で、日常的に立ち寄れる一杯を。",
  openGraph: {
    title: "NEWVA CAFE | Coffee & Cafe",
    description:
      "NEWVA CAFEは、コーヒーと自家製ケーキを楽しめる街なかのカフェです。明るく open な店内で、日常的に立ち寄れる一杯を。",
    type: "website",
    locale: "ja_JP",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFDF7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-base font-sans text-brand">
        {children}
      </body>
    </html>
  );
}
