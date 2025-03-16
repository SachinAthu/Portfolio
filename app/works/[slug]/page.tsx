import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { ROOTURL, WORKS } from '@/lib/data';
import { WorkType } from '@/lib/types';
import { SingleWorkTop } from '@/components';

type SingleWorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getWorkBySlug(slug: string) {
  return WORKS.filter((work) => work.slug === slug)[0];
}

function generateJsonLd(work: WorkType | null) {
  if (!work) {
    return;
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${ROOTURL}/${work.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            '@id': `${ROOTURL}/#listItem`,
            position: 1,
            name: 'Home',
            item: ROOTURL,
            nextItem: `${ROOTURL}/${work.slug}/#listItem`,
          },
          {
            '@type': 'ListItem',
            '@id': `${ROOTURL}/${work.slug}/#listItem`,
            position: 2,
            name: work.title,
            item: `${ROOTURL}/${work.slug}`,
            previousItem: `${ROOTURL}/#listItem`,
          },
        ],
      },
      {
        '@type': 'NewsArticle',
        headline: work.title,
        name: work.title,
        description: work.description,
        url: `${ROOTURL}/${work.slug}`,
        dateCreated: work.date.dateCreated,
        datePublished: work.date.datePublished,
        dateModified: work.date.dateModified,
        image: work.titleImage.url,
        author: work.author,
      },
    ],
  };
}

export async function generateMetadata(props: SingleWorkPageProps): Promise<Metadata> {
  const params = await props.params;
  const work = getWorkBySlug(params.slug);

  if (!work) {
    return notFound();
  }

  const title = `${work.title} | Case Study | SachinAthu`;
  const url = ROOTURL + '/works/' + work.slug;

  return {
    title,
    description: work.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: work.description,
      url,
      images: [
        {
          url: work.ogImage,
          secureUrl: work.ogImage,
          alt: work.title,
          width: 1200,
          height: 630,
          type: 'image/png',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return WORKS.map((work) => ({
    slug: work.slug,
  }));
}

export default async function SingleWorkPage(props: SingleWorkPageProps) {
  const params = await props.params;
  const work = getWorkBySlug(params.slug);

  if (!work) {
    return notFound();
  }

  const jsonld = generateJsonLd(work || null);

  return (
    <article className="single-work-page | min-h-screen pt-[var(--header-height)]">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        id="workSingleJsonLd"
      />

      <SingleWorkTop title={work.title} />
    </article>
  );
}
