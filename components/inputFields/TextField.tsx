'use client';

import React, { memo, useEffect } from 'react';
import { FieldError } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import { ScrollTrigger } from '@/lib/gsap-config';

import { cn } from '@/lib/common';

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  isRequired: boolean;
  errors: FieldError | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const TextField = React.forwardRef(
  (
    { id, name, label, isRequired, errors, onBlur, onChange }: TextFieldProps,
    ref: React.LegacyRef<HTMLInputElement> | undefined
  ) => {
    useEffect(() => {
      ScrollTrigger.refresh();
    }, [errors]);

    useEffect(() => {
      const textfield = document.getElementById(id);
      if (!textfield) return;

      function onKeyDown(e: KeyboardEvent) {
        e.stopPropagation();
      }

      textfield.addEventListener('keydown', onKeyDown);

      return () => {
        textfield.removeEventListener('keydown', onKeyDown);
      };
    }, [id]);

    return (
      <div className="form-control | relative mt-6">
        <label htmlFor={id} className="text-lg">
          {label} {isRequired && <span className="px-1 text-xl text-primary">*</span>}
        </label>

        <input
          ref={ref}
          type="text"
          id={id}
          name={name}
          className={cn(
            'mt-2 h-auto w-full rounded-lg bg-transparent px-6 py-5 text-base outline-none transition-colors duration-300 sm:mt-3',
            errors
              ? 'border border-primary focus:border-primary dark:border-primary dark:focus:border-primary'
              : 'border border-gray-300 focus:border-text dark:border-gray-600 dark:focus:border-d-text'
          )}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={errors ? 'true' : 'false'}
        />

        {errors && (
          <div className="mt-2 flex items-center gap-1 text-base text-primary" role="alert">
            <MdError className="h-5 w-5" /> {errors.message}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default memo(TextField);
