'use client';

import React, { memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { useMobile } from '@/lib/hooks';
import { DialogRefProps } from '@/lib/types';
import { cn } from '@/lib/common';

function DialogCloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="relative z-10 h-8 w-8 before:absolute before:left-0 before:top-1/2 before:h-1 before:w-full before:-translate-y-1/2 before:-rotate-45 before:rounded-full before:bg-gray-300 before:transition-colors before:duration-500 before:content-[''] after:absolute after:left-0 after:top-1/2 after:h-1 after:w-full after:-translate-y-1/2 after:rotate-45 after:rounded-full after:bg-gray-600 after:transition-colors after:duration-500 after:content-[''] hover:before:bg-gray-600 hover:after:bg-gray-300"
      aria-label="Close contact success dialog"></button>
  );
}

type DialogProps = {
  children: React.ReactNode;
  id: string;
  ariaLabel: string;
  imageView?: boolean;
};

const Dialog = React.forwardRef<DialogRefProps, DialogProps>(
  ({ children, id, ariaLabel, imageView = false }: DialogProps, ref) => {
    const isMobile = useMobile();
    const dialogElRef = useRef<HTMLDialogElement>(null);
    const [isMount, setIsMount] = useState(false);

    const resetBodyStyles = useCallback((unmount?: boolean) => {
      if (unmount) {
        const dialogsCount = document.querySelectorAll('dialog[open]').length;
        if (dialogsCount > 0) return;
      }

      const scrollY = parseInt(document.body.style.top || '0') * -1;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';

      if (!unmount) window.scrollTo(0, scrollY);
    }, []);

    const handleOpen = useCallback(() => {
      const scrollBarWidth = isMobile ? 0 : window.innerWidth - document.documentElement.clientWidth || 15;
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      dialogElRef.current?.showModal();
      setIsMount(true);
      requestAnimationFrame(() => {
        dialogElRef.current?.classList.add('show');
      });

      const firstFocusableElement = dialogElRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusableElement?.focus();
    }, [isMobile]);

    const handleClose = useCallback(() => {
      if (!dialogElRef.current) return;

      dialogElRef.current.classList.remove('show');
      dialogElRef.current.classList.add('hide');
      setTimeout(() => {
        dialogElRef.current?.close();
        setIsMount(false);
        dialogElRef.current?.classList.remove('hide');
        resetBodyStyles();
      }, 300);
    }, [resetBodyStyles]);

    useImperativeHandle(
      ref,
      () => ({
        openDialog() {
          handleOpen();
        },

        closeDialog() {
          handleClose();
        },
      }),
      [handleOpen, handleClose]
    );

    useEffect(() => {
      const controller = new AbortController();

      if (dialogElRef.current) {
        if (!imageView) {
          dialogElRef.current.addEventListener(
            'click',
            (e: MouseEvent) => {
              const dialogRef = dialogElRef.current;
              if (dialogRef && e.target === dialogRef) {
                handleClose();
              }
            },
            { signal: controller.signal }
          );
        }

        dialogElRef.current.addEventListener(
          'keydown',
          (e: KeyboardEvent) => {
            e.stopPropagation();

            if (e.key === 'Escape') {
              e.preventDefault();
              handleClose();
            }
          },
          { signal: controller.signal }
        );
      }

      return () => {
        resetBodyStyles(true);
        controller.abort();
      };
    }, [handleClose]);

    return (
      <dialog
        id={id}
        ref={dialogElRef}
        className={cn(
          'relative overflow-hidden bg-background dark:bg-d-background',
          imageView ? 'image-view-dialog h-[100svh] w-screen' : 'modal-dialog rounded-lg px-4 py-3 sm:px-5 sm:py-4'
        )}
        aria-label={ariaLabel}
        data-lenis-prevent>
        <div className={imageView ? 'absolute right-3 top-3' : 'mb-6 flex h-10 items-center justify-end sm:mb-8'}>
          <DialogCloseBtn onClose={handleClose} />
        </div>

        <div
          className={cn(
            'overflow-auto',
            imageView ? 'max-w-screen max-h-[100svh]' : 'max-h-[85svh] max-w-[90vw] sm:max-h-[85vh]'
          )}>
          {isMount && children}
        </div>
      </dialog>
    );
  }
);
Dialog.displayName = 'Dialog';

export default memo(Dialog);
