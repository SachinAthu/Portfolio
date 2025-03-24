import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import '@/styles/main.scss';
import { Footer, PageLoader, Welcome } from '@/components';
import { LayoutProvider } from '@/context/LayoutContext';
import { EventsProvider } from '@/context/EventsContext';
import { ROOTURL } from '@/lib/data';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const viewport: Viewport = {
  themeColor: '#E91E63',
};

const title = 'Sachin Athukorala | Full-stack Developer';
const description = 'The portfolio of Sachin Athukorala, Full-stack Developer.';
export const metadata: Metadata = {
  metadataBase: new URL(ROOTURL),
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
        url: '/apple-icon-180x180.png',
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
        url: '/favicon-96x96.png',
        sizes: '96x96',
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
  alternates: { canonical: ROOTURL },
  openGraph: {
    title,
    description,
    url: ROOTURL,
    images: [
      {
        url: `${ROOTURL}/static/og_image.jpg`,
        secureUrl: `${ROOTURL}/static/og_image.jpg`,
        alt: 'Sachin Athukorala',
        width: 1200,
        height: 630,
        type: 'image/jpg',
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

const Header = dynamic(() => import('@/components/header/Header'), {
  loading: () => (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-[var(--header-height)] w-full items-center">
      <div className="container-wide hidden h-[var(--header-content-height)] w-full items-center justify-between rounded-full px-[2%] sm:flex sm:rounded-none sm:px-[3%] 2xl:px-0">
        <div className="flex h-full items-center justify-center rounded-full px-8 backdrop-blur-lg">
          <div className="skeleton h-7 w-[9.125rem]"></div>
        </div>

        <div className="flex h-full items-center gap-4 rounded-full px-8 backdrop-blur-lg">
          <div className="skeleton hidden h-9 w-[7.375rem] md:block"></div>
          <div className="skeleton h-9 w-[4.5rem]"></div>
          <div className="skeleton h-9 w-[2.125rem] 2xl:hidden"></div>
        </div>
      </div>

      <div className="h-[var(--header-content-height)] w-full sm:hidden">
        <div className="container h-full">
          <div className="flex h-full items-center justify-between rounded-full px-[2%] backdrop-blur-lg">
            <div className="flex h-full items-center justify-center rounded-full px-4">
              <div className="skeleton h-7 w-[5.8125rem]"></div>
            </div>

            <div className="header-inner-2 | flex h-full items-center gap-4 rounded-full px-4 backdrop-blur-lg">
              <div className="skeleton h-9 w-[4.5rem]"></div>
              <div className="skeleton h-9 w-[2.125rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  ssr: false,
});

const NavMenu = dynamic(() => import('@/components/NavMenu'), { ssr: false });
const ToasterCom = dynamic(() => import('@/components/ToasterCom'), { ssr: false });
const AnimGrid = dynamic(() => import('@/components/AnimGrid'), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* for development remove overflow-hidden */}
      <body className={`${montserrat.variable}`}>
        <ThemeProvider attribute="class">
          <LayoutProvider>
            <EventsProvider>
              <AnimGrid />

              <Header />

              <NavMenu />

              <main className="pb-72">{children}</main>

              <Footer />

              <PageLoader />

              {/* for development comment out */}
              {/* <Welcome /> */}

              <ToasterCom />
            </EventsProvider>
          </LayoutProvider>
        </ThemeProvider>

        {/* for development comment out */}
        {/* Tell the browser to never restore the scroll position on load. Always scroll position is on top on page load. */}
        {/* <Script
        id="scroll-top-script"
        dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = "manual"` }}></Script> */}
      </body>
    </html>
  );
}
