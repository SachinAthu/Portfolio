'use client';

import React, { memo, useEffect, useRef, useImperativeHandle } from 'react';
import { FieldError } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import { ScrollTrigger } from '@/lib/gsap-config';

import { cn } from '@/lib/common';

type TextAreaProps = {
  id: string;
  label: string;
  isRequired: boolean;
  onChange: (value: string) => void;
  errors: FieldError | undefined;
};

const TextAreaField = React.forwardRef<{ clearField: () => void }, TextAreaProps>(
  ({ id, label, isRequired, onChange, errors }: TextAreaProps, ref) => {
    const textareaRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        clearField() {
          if (textareaRef.current) textareaRef.current.innerText = '';
        },
      }),
      []
    );

    // Function to strip formatting from pasted content
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain'); // Get only plain text

      try {
        if (typeof document.execCommand === 'function' && document.queryCommandSupported('insertText')) {
          document.execCommand('insertText', false, text); // Insert as unformatted text
        } else {
          // document.execCommand not supported
          const sel = window.getSelection();
          if (!sel || !sel.rangeCount) return;

          const range = sel.getRangeAt(0);
          range.deleteContents(); // Remove any selected content

          const textNode = document.createTextNode(text);
          range.insertNode(textNode);

          // Move the cursor to the end of the inserted text
          range.setStartAfter(textNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      } catch (_) {}
    };

    useEffect(() => {
      ScrollTrigger.refresh();
    }, [errors]);

    useEffect(() => {
      if (!textareaRef.current) return;

      const tRef = textareaRef.current;
      let resizeObserver: ResizeObserver,
        mutationObserver: MutationObserver,
        height = tRef.offsetHeight;

      // listen on textarea height changes and refresh ScrollTrigger
      if ('ResizeObserver' in window) {
        // Use ResizeObserver
        resizeObserver = new ResizeObserver(() => {
          if (tRef.offsetHeight !== height) {
            ScrollTrigger.refresh();
          }
          height = tRef.offsetHeight;
        });
        resizeObserver.observe(tRef);
      } else {
        // Fallback to MutationObserver
        mutationObserver = new MutationObserver((mutationList: MutationRecord[]) => {
          mutationList.forEach(() => {
            if (tRef.offsetHeight !== height) {
              ScrollTrigger.refresh();
            }
            height = tRef.offsetHeight;
          });
        });
        mutationObserver.observe(textareaRef.current, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }

      // stop propagating keydown event
      function onKeyDown(e: KeyboardEvent) {
        e.stopPropagation();
      }

      tRef.addEventListener('keydown', onKeyDown);

      return () => {
        resizeObserver?.disconnect();
        mutationObserver?.disconnect();
        tRef.removeEventListener('keydown', onKeyDown);
      };
    }, []);

    return (
      <div className="form-control | relative mt-6">
        <label htmlFor={id} id={`${id}-label`} className="text-lg" onClick={() => textareaRef.current?.focus()}>
          {label} {isRequired && <span className="px-1 text-xl text-primary">*</span>}
        </label>

        <div
          className={cn(
            'mt-3 rounded-lg py-1 pr-1 transition-colors duration-300',
            errors
              ? 'border border-primary focus:border-primary dark:border-primary dark:focus:border-primary'
              : 'border border-gray-300 focus-within:border-text dark:border-gray-600 dark:focus-within:border-d-text'
          )}>
          <div
            ref={textareaRef}
            contentEditable={true}
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-labelledby={`${id}-label`}
            aria-describedby={errors && `${id}-error`}
            className={cn(
              'scrollbar-thin h-auto max-h-[50rem] min-h-[12lh] w-full overflow-y-auto border-none bg-transparent py-4 pl-6 pr-5 text-base outline-none'
            )}
            onInput={(e) => onChange(e.currentTarget.innerText)}
            onPaste={handlePaste}
            aria-invalid={errors ? 'true' : 'false'}
          />
        </div>

        {errors && (
          <div id={`${id}-error`} className="mt-2 flex items-center gap-1 text-base text-primary" role="alert">
            <MdError className="h-5 w-5" /> {errors.message}
          </div>
        )}
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default memo(TextAreaField);
