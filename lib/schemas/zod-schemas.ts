import { z } from 'zod';

export const contactSchema = z.object({
  nameVerify: z.string().optional(),

  name: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your name.' })
    .max(100, { message: 'Maximum length for name is 100 characters.' }),

  email: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your email.' })
    .max(320, { message: 'Maximum length for email address name is 320 characters.' })
    .email('Invalid email address.'),

  message: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your message.' })
    .max(1500, { message: 'Maximum length for message is 1500 characters.' }),
});
