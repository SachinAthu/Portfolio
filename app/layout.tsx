import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import '@/styles/main.scss';
import { Footer, Header, PageLoader, NavMenu, ToasterCom, AnimGrid, Welcome } from '@/components';
import { LayoutProvider } from '@/context/LayoutContext';
import { EventsProvider } from '@/context/EventsContext';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const title = 'Sachin Athukorala | Full-stack Developer';
const description = 'The portfolio of Sachin Athukorala, Fullstack Developer.';
const websiteURL = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://sachinathu.dev';
export const metadata: Metadata = {
  metadataBase: new URL(websiteURL),
  title,
  description,
  icons: {
    shortcut: [
      {
        rel: 'shortcut icon',
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        sizes: '625x625',
        type: 'image/png',
        color: '#1e1e1e',
      },
    ],
  },
  alternates: { canonical: websiteURL },
  openGraph: {
    title,
    description,
    url: websiteURL,
    images: [
      {
        url: `${websiteURL}/static/og_image.png`,
        secureUrl: `${websiteURL}/static/og_image.png`,
        alt: 'Sachin Athukorala',
        width: 1200,
        height: 627,
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    siteName: "Sachin's Portfolio",
    type: 'website',
  },
  generator: 'Next.js',
  applicationName: 'SachinAthu',
  robots: 'max-image-preview:standard',
  manifest: '/manifest.json',
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  other: {
    'msapplication-TileColor': '#00aba9',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.variable}>
        <ThemeProvider attribute="class">
          <LayoutProvider>
            <EventsProvider>
              <AnimGrid />

              <Header />

              <NavMenu />

              <main>{children}</main>

              <Footer />

              <PageLoader />

              {/* <Welcome /> */}

              <ToasterCom />
            </EventsProvider>
          </LayoutProvider>
        </ThemeProvider>

        {/* Tell the browser to never restore the scroll position on load. Always scroll position is on top on page load. */}
        {/* <Script
        id="scroll-top-script"
        dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }}></Script> */}
      </body>
    </html>
  );
}
