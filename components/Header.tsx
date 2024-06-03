'use client';

import { useTheme } from 'next-themes';

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <header className="px-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setTheme('light')}>Light</button>
        <button onClick={() => setTheme('dark')}>Dark</button>
      </div>
    </header>
  );
}
