import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import Script from "next/script";

import "@/styles/main.css";
import { Footer, PageLoader, Welcome } from "@/components";
import { LayoutProvider } from "@/context/LayoutContext";
import { ROOTURL } from "@/lib/data";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E1E1E" },
    { media: "(prefers-color-scheme: dark)", color: "#008080" },
  ],
};

const title = "Sachin Athukorala | Full-stack Developer";
const description = "The portfolio of Sachin Athukorala, Full-stack Developer.";
export const metadata: Metadata = {
  metadataBase: new URL(ROOTURL),
  title,
  description,
  alternates: { canonical: ROOTURL },
  openGraph: {
    title,
    description,
    url: ROOTURL,
    images: [
      {
        url: `${ROOTURL}/static/og_image.jpg`,
        secureUrl: `${ROOTURL}/static/og_image.jpg`,
        alt: "Sachin Athukorala",
        width: 1200,
        height: 630,
        type: "image/jpg",
      },
    ],
    locale: "en_US",
    siteName: "Sachin's Portfolio",
    type: "website",
  },
  generator: "Next.js",
  applicationName: "SachinAthu",
  robots: "max-image-preview:standard",
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  other: {
    "msapplication-TileColor": "#00aba9",
  },
};

const Header = dynamic(() => import("@/components/header/Header"));

const NavMenu = dynamic(() => import("@/components/NavMenu"));
const ToasterCom = dynamic(() => import("@/components/ToasterCom"));
const AnimGrid = dynamic(() => import("@/components/AnimGrid"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta name="apple-mobile-web-app-title" content="SachinAthu" />
      </head>

      {/* for development remove overflow-hidden */}
      <body
        className={`${montserrat.variable}`}
        suppressHydrationWarning={true}>
        <ThemeProvider attribute="class">
          <LayoutProvider>
            <AnimGrid />

            <Header />

            <NavMenu />

            <main>{children}</main>

            <Footer />

            <PageLoader />

            {/* for development comment out */}
            <Welcome />

            <ToasterCom />
          </LayoutProvider>
        </ThemeProvider>

        {/* for development comment out */}
        {/* Tell the browser to never restore the scroll position on load. Always scroll position is on top on page load. */}
        <Script
          id="scroll-top-script"
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}></Script>
      </body>
    </html>
  );
}
