import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ScrollReset } from "@/components/ScrollReset";
import { NavMenuProvider } from "@/components/nav-menu-context";
import { NavOverlay } from "@/components/NavOverlay";
import { FloatingNavButton } from "@/components/FloatingNavButton";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "NEWVA CAFE | Coffee & Cafe",
  description:
    "NEWVA CAFEは、コーヒーと自家製ケーキを楽しめる街なかのカフェです。明るく open な店内で、日常的に立ち寄れる一杯を。",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-newva-cafe-v3-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-newva-cafe-v2.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon-newva-cafe-v3.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "NEWVA CAFE | Coffee & Cafe",
    description:
      "NEWVA CAFEは、コーヒーと自家製ケーキを楽しめる街なかのカフェです。明るく open な店内で、日常的に立ち寄れる一杯を。",
    url: "/",
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

// Runs in <head>, before hydration — same beforeInteractive timing as
// SCROLL_RESET_SCRIPT above, so Hero's mobile min-height (see Hero.tsx)
// has this variable available before its first paint, with zero flash.
//
// Real-device measurement confirmed Hero was the only section whose own
// rendered height tracked iOS Safari's toolbar show/hide 1:1 (a ~94px
// swing that exactly matched document.scrollHeight's swing) — every other
// section stayed fixed. Hero used `min-h-[100svh]`, which per spec should
// already be pinned to the small-viewport value regardless of toolbar
// state, but empirically wasn't behaving that way on the real device.
// Freezing window.innerHeight once into a CSS variable, and never
// updating it on resize/visualViewport resize/scroll, sidesteps that
// entirely: Hero's mobile height becomes "whatever the viewport was on
// first load", full stop, so there's nothing left for the toolbar to move.
const FREEZE_HERO_VIEWPORT_SCRIPT = `
(function () {
  try {
    function freeze() {
      document.documentElement.style.setProperty(
        "--initial-viewport-height",
        window.innerHeight + "px"
      );
    }
    freeze();

    // Only re-capture on an actual device rotation — never on resize,
    // visualViewport resize, or scroll, all of which fire continuously
    // while Mobile Safari's toolbar animates. Re-freezing on any of those
    // would defeat the entire point. iOS needs a short delay after
    // orientationchange before innerHeight reflects the new orientation's
    // real dimensions, hence the setTimeout.
    window.addEventListener("orientationchange", function () {
      setTimeout(freeze, 300);
    });
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} antialiased`}
      // FREEZE_HERO_VIEWPORT_SCRIPT runs beforeInteractive and sets
      // --initial-viewport-height directly on this element's style,
      // before React hydrates — an expected, intentional mismatch versus
      // the plain SSR markup (which has no way to know that value), same
      // as the standard pattern for any script that sets attributes on
      // <html> pre-hydration (e.g. next-themes). Without this, React logs
      // a hydration-mismatch warning for the style attribute; it doesn't
      // touch the attribute either way, so this only silences the noise.
      suppressHydrationWarning
    >
      {/* min-h-[100svh] replaces the old min-h-full (and the h-full that
          used to be on <html> above, which existed only to give that
          percentage something definite to resolve against). height/
          min-height as a percentage has no static/dynamic distinction —
          it always tracks whatever the current viewport height resolves
          to, which in Mobile Safari changes in real time as the address
          bar shows/hides. svh is fixed at the small-viewport value
          regardless of toolbar state. Since content height here is always
          far taller than one screen, this min-height is inert either way —
          content, not this floor, determines body's actual height. */}
      <body className="min-h-[100svh] flex flex-col bg-brand-base font-sans text-brand">
        <Script
          id="scroll-reset"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: SCROLL_RESET_SCRIPT }}
        />
        <Script
          id="freeze-hero-viewport"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: FREEZE_HERO_VIEWPORT_SCRIPT }}
        />
        <ScrollReset />
        <NavMenuProvider>
          {children}
          <FloatingNavButton />
          <NavOverlay />
        </NavMenuProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
      </body>
    </html>
  );
}
