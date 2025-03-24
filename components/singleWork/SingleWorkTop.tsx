'use client';

import { CustomLink, PageLink } from '..';
import { FaArrowLeft } from 'react-icons/fa6';

type SingleWorkTopProps = {
  title: string;
  demoLink?: string;
  previewLink?: string;
};

export default function SingleWorkTop({ title, demoLink, previewLink }: SingleWorkTopProps) {
  return (
    <div className="single-work-page-top pt-20">
      <div className="container">
        <PageLink
          href={'/#works'}
          className="underline-button back-button | flex w-fit items-center gap-1 text-lg [&_svg]:opacity-90 [&_svg]:transition-transform [&_svg]:duration-300"
          short>
          <FaArrowLeft /> Back to works
        </PageLink>

        <h1 className="heading-1 mt-20">{title}</h1>

        {(demoLink || previewLink) && (
          <div className="mt-20 flex items-center gap-4">
            {demoLink && (
              <CustomLink
                id="workDemoLink"
                content="Demo"
                href={demoLink}
                rel="noopener noreferrer"
                target="_blank"
                className="rounded-full px-12 py-6 text-lg sm:px-14 sm:py-8 sm:text-xl"
              />
            )}

            {previewLink && (
              <CustomLink
                id="workPreviewLink"
                content="Preview"
                href={previewLink}
                rel="noopener noreferrer"
                target="_blank"
                className="rounded-full px-12 py-6 text-lg sm:px-14 sm:py-8 sm:text-xl"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
