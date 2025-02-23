'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

import { contactSchema } from '@/lib/schemas/zod-schemas';
import { Button, Dialog, TextAreaField, TextField } from '@/components';
import { ContactFormValues, DialogRefProps } from '@/lib/types';
import { contactAction } from '@/app/actions/contact-action';

const fieldNames = {
  nameVerify: 'name verify',
  name: 'name',
  email: 'email',
  message: 'message',
};

function SuccessDialog() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    return () => {
      if (dotLottie) {
        dotLottie.destroy();
      }
    };
  }, []);

  const dotLottieRefCallback = (dotLottie: DotLottie) => {
    setDotLottie(dotLottie);
  };

  return (
    <div className="flex flex-col items-center px-8">
      <div className="h-[250px] w-[250px]">
        <DotLottieReact
          src="/static/lotties/success.lottie"
          loop={false}
          autoplay
          dotLottieRefCallback={dotLottieRefCallback}
          speed={0.75}
        />
      </div>

      <div className="mt-10 text-center">
        <p className="pb-2 text-xl sm:text-2xl">Thank you!</p>
        <p className="paragraph-2">Your message has been sent successfully.</p>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [isPending, setIsPending] = useState(false);
  const textareaRef = useRef<{ clearField: () => void }>(null);
  const dialogRef = useRef<DialogRefProps>(null);

  const {
    register,
    reset,
    setValue,
    setError,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    mode: 'onChange',
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nameVerify: '',
      name: '',
      email: '',
      message: '',
    },
  });

  // const delayPromise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve('Promise resolved after 10 seconds!');
  //   }, 10000);
  // });

  async function onSubmit(data: any) {
    // console.log(data);
    if (isPending) return;

    setIsPending(true);

    const result = await contactAction(data);
    // console.log(result);

    if (result?.data && result.data.status === 'success') {
      dialogRef.current?.openDialog();
      reset();
      textareaRef.current?.clearField();
    } else {
      if (result?.serverError?.status === 'error') {
        toast.error(result.serverError?.message || "Sorry didn't work. Please try again.", {
          id: 'contactServerErrorToast',
        });
      } else if (result?.validationErrors) {
        // map errors
        Object.keys(fieldNames).forEach((field: string) => {
          if ((result.validationErrors as any)[field]) {
            setError(field as any, { type: 'custom', message: `Invalid value for ${(fieldNames as any)[field]}` });
          }
        });
        toast.error(
          result.serverError?.message || 'There are some validation errors. Please correct them and try again.',
          { id: 'contactValidationErrorToast' }
        );
      }
    }

    setIsPending(false);
  }

  // console.log(errors);

  return (
    <>
      <div className="mt-8 max-w-[50rem] sm:mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            autoComplete="new-name-verify"
            id="nameVerify"
            placeholder="Your full name"
            className="honey-pot"
            tabIndex={-1}
            aria-label="Your full name"
            aria-hidden="true"
            {...register('nameVerify')}
          />

          {/* name */}
          <TextField id="contact-name" label="Your Name" isRequired {...register('name')} errors={errors.name} />

          {/* email */}
          <TextField id="contact-email" label="Email Address" isRequired {...register('email')} errors={errors.email} />

          {/* message */}
          <TextAreaField
            ref={textareaRef}
            id="contact-message"
            label="Your Message"
            onChange={(value: string) => {
              setValue('message', value);
              trigger('message');
            }}
            isRequired
            errors={errors.message}
          />

          <div className="mt-20 lg:mt-32">
            <Button
              id="contact-send-btn"
              type="submit"
              className="rounded-full px-12 py-10 text-xl sm:px-14 sm:py-12 sm:text-2xl lg:px-20 lg:py-16 lg:text-3xl"
              disabled={!isValid}
              isLoading={isPending}>
              Send request
            </Button>
          </div>
        </form>

        {/* <button
          type="button"
          onClick={() => {
            dialogRef.current?.openDialog();
          }}>
          open
        </button> */}
      </div>

      <Dialog id="contactSucessDialog" ref={dialogRef} ariaLabel="Contact request successfully submitted">
        <SuccessDialog />
      </Dialog>
    </>
  );
}
