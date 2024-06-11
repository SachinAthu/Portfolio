'use client';

import { useEffect } from 'react';

import { ErrorCom } from '@/components';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorCom reset={reset} />;
}
