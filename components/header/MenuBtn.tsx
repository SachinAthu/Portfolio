'use client';

import { useState } from 'react';

export default function MenuBtn() {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      className={`menu-btn relative block overflow-hidden border-none lg:hidden ${open ? 'open' : ''}`}
      aria-label="Navigation Menu"
      onClick={() => setOpen(!open)}>
      <div className="icon-left"></div>
      <div className="icon-right"></div>
    </button>
  );
}
