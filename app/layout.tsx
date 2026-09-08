import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { ScrollReset } from "@/components/ScrollReset";
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

// Runs in <head>, before hydration and before the body's anchor targets even
// exist, so it wins the race against the browser's native "scroll to the URL
// fragment" behavior. Disables scroll restoration and strips any #hash from
// the URL so a reload (or an old bookmark/shared link) always lands on Hero
// instead of wherever the user was last scrolled to.
const SCROLL_RESET_SCRIPT = `
(function () {
  try {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo(0, 0);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-base font-sans text-brand">
        <Script
          id="scroll-reset"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: SCROLL_RESET_SCRIPT }}
        />
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
