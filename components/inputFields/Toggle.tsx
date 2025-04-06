'use client';

import React, { useRef, memo, useEffect } from 'react';

export type ToggleProps = {
  children: React.ReactNode;
  id: string;
  onChange: (checked: boolean) => void;
  value: string;
  isChecked?: boolean;
};

const Toggle = ({ children, id, onChange, value, isChecked }: ToggleProps) => {
  const toggle = useRef<HTMLInputElement | null>(null);
  const label = useRef<HTMLLabelElement | null>(null);

  useEffect(() => {
    const labelRef = label.current;
    if (!labelRef) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        e.preventDefault();
        toggle.current?.click();
      }
    }

    labelRef.addEventListener('keydown', handleKeyDown);

    return () => {
      labelRef.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="toggle-field relative will-change-auto">
      <input
        ref={toggle}
        tabIndex={-1}
        id={id}
        type="checkbox"
        className="hidden-input | peer"
        value={value}
        onChange={(e) => onChange(e.target.checked)}
        checked={isChecked && isChecked}
      />
      <label
        ref={label}
        tabIndex={0}
        htmlFor={id}
        className="block cursor-pointer rounded-full px-4 py-2 text-center text-lg transition-colors duration-300 peer-checked:bg-primary peer-checked:text-d-text">
        {children}
      </label>
    </div>
  );
};

export default memo(Toggle);
