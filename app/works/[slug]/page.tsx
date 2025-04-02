import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

import { ROOTURL, WORKS } from '@/lib/data';
import { WorkType } from '@/lib/types';
import { CustomLink, PageLink, SSCarousel } from '@/components';
import { truncateText } from '@/lib/common';

type SingleWorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getWorkBySlug(slug: string) {
  const index = WORKS.findIndex((work) => work.slug === slug);

  if (index === -1) {
    return null;
  }

  return {
    index,
    work: WORKS[index],
  };
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
  const workRes = getWorkBySlug(params.slug);

  if (!workRes) {
    return notFound();
  }

  const work = workRes.work;
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
  const workRes = getWorkBySlug(params.slug);

  if (!workRes) {
    return notFound();
  }

  const { index, work } = workRes;
  const jsonld = generateJsonLd(work || null);

  return (
    <article className="single-work-page | min-h-screen pt-[var(--header-height)]">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
        id="workSingleJsonLd"
      />

      {/* header */}
      <div data-scroll data-scroll-speed="-0.2" className="single-work-page-top pt-10 sm:pt-20">
        <div className="container">
          <PageLink
            href={'/#works'}
            className="underline-button back-button | flex w-fit items-center gap-1 text-lg [&_svg]:opacity-90 [&_svg]:transition-transform [&_svg]:duration-300"
            short>
            <FaArrowLeft /> Back to works
          </PageLink>

          <h1 className="heading-article mt-20">{work.title}</h1>

          {(work.demoLink || work.previewLink) && (
            <div className="mt-14 flex items-center gap-4 sm:mt-20">
              {work.demoLink && (
                <CustomLink
                  id="workDemoLink"
                  content="Demo"
                  href={work.demoLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-full px-12 py-6 text-lg sm:px-14 sm:py-8 sm:text-xl"
                />
              )}

              {work.previewLink && (
                <CustomLink
                  id="workPreviewLink"
                  content="Preview"
                  href={work.previewLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-full px-12 py-6 text-lg sm:px-14 sm:py-8 sm:text-xl"
                />
              )}
            </div>
          )}

          {/* ss carousal */}
          {work.screenshots.length > 0 && <SSCarousel images={work.screenshots} />}
        </div>
      </div>

      {/* body */}
      <div className="container relative z-[10] mt-32 min-h-screen bg-background pb-40 pt-32 shadow-section dark:bg-d-background dark:shadow-d-section">
        <div className="container-text">{work.content}</div>
      </div>

      {/* footer */}
      <div className="mt-20 pb-72 sm:mt-36">
        <div className="container">
          <div className="flex flex-col gap-12 sm:flex-row sm:items-center sm:justify-between">
            {/* previous work */}
            {index > 0 && (
              <PageLink href={`/works/${WORKS[index - 1].slug}`} className="underline-button back-button | w-fit" short>
                <div className="flex items-center gap-1 text-lg [&_svg]:opacity-90 [&_svg]:transition-transform [&_svg]:duration-300">
                  <FaArrowLeft /> Previous
                </div>
                <div className="mt-1 text-3xl">{truncateText(WORKS[index - 1].title, 20)}</div>
              </PageLink>
            )}

            {/* next work */}
            {index < WORKS.length - 1 && (
              <PageLink
                href={`/works/${WORKS[index + 1].slug}`}
                className="underline-button next-button | flex w-fit flex-col sm:items-end"
                short>
                <div className="flex items-center gap-1 text-lg [&_svg]:opacity-90 [&_svg]:transition-transform [&_svg]:duration-300">
                  Next <FaArrowRight />
                </div>
                <div className="mt-1 text-3xl">{truncateText(WORKS[index + 1].title, 20)}</div>
              </PageLink>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
