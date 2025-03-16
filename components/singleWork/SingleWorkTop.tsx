'use client';

import { WorkType } from '@/lib/types';
import { UnderlineButton } from '..';

type SingleWorkTopProps = {
  title: string;
};

export default function SingleWorkTop({ title }: SingleWorkTopProps) {
  return (
    <div className="single-work-page-top">
      <div className="container">
        <UnderlineButton
          className="text-xl"
          onClick={() => {
            history.back();
          }}>
          Go back
        </UnderlineButton>

        <h1>{title}</h1>
      </div>
    </div>
  );
}
