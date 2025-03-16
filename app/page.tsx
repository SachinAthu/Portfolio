import dynamic from 'next/dynamic';
import Script from 'next/script';
import dayjs from 'dayjs';

import { About, Contact, Experience, Hero, TechStack, Works } from '@/components';
import { ROOTURL } from '@/lib/data';

const HomeScrollNav = dynamic(() => import('@/components/home/HomeScrollNav'), { ssr: false });
const HomeSideNav = dynamic(() => import('@/components/home/HomeSideNav'), { ssr: false });

const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${ROOTURL}/#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          '@id': `${ROOTURL}/#listItem`,
          position: 1,
          name: 'Home',
          item: ROOTURL,
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${ROOTURL}/#webpage`,
      url: ROOTURL,
      name: 'Sachin Athukorala | Full-stack Developer',
      description: 'The portfolio of Sachin Athukorala, Full-stack Developer.',
      inLanguage: 'en-US',
      isPartOf: { '@id': `${ROOTURL}/#website` },
      breadcrumb: { '@id': `${ROOTURL}/#breadcrumb` },
      datePublished: '2025-03-15',
      dateModified: dayjs().format('YYYY-MM-DD'),
    },
    {
      '@type': 'WebSite',
      '@id': `${ROOTURL}/#website`,
      url: ROOTURL,
      name: 'Portfolio Sachin Athukorala',
      description: 'The portfolio of Sachin Athukorala, Full-stack Developer.',
      inLanguage: 'en-US',
      publisher: { '@id': `${ROOTURL}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${ROOTURL}/?s={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${ROOTURL}/#organization`,
      name: 'Portfolio Sachin Athukorala',
      url: ROOTURL,
      logo: `${ROOTURL}/static/logo-144x144.png`,
      email: 'sachin2262716@gmail.com',
      telephone: '+94-71-707-3470',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'No 131/1, Sandalla, Yalagala Road',
        addressLocality: 'Horana',
        postalCode: '12400',
        addressCountry: 'LK',
      },
      sameAs: ['https://www.linkedin.com/in/sachinathu/'],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="home-page | pt-[var(--header-height)]">
      <Script
        id="homeJsonLd"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}></Script>

      <HomeSideNav />
      <HomeScrollNav />

      <Hero />
      <About />
      <TechStack />
      <Experience />
      <Works />
      <Contact />
    </div>
  );
}
