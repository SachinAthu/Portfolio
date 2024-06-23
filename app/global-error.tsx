'use client';

import { Montserrat } from 'next/font/google';

import '@/styles/main.scss';
import { ErrorCom } from '@/components';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  console.error(error);

  return (
    <html lang="en" className={`${montserrat.variable}`}>
      <body className="dark:bg-black-300 dark:text-white-400">
        <ErrorCom reset={reset} />
      </body>
    </html>
  );
}
