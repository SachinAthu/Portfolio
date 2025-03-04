'use server';

import { returnValidationErrors } from 'next-safe-action';

import { actionClient } from '@/lib/safe-action';
import { contactSchema } from '@/lib/schemas/zod-schemas';
import { BotError } from '@/lib/types';
import { isSanitized } from '@/lib/common';
import { db } from '@/lib/db';
import { contactsDBSchema } from '@/lib/schemas/drizzle-schemas';
import { knockClient } from '@/lib/knock';
import { KNOCK_CONFIG } from '@/lib/data';

export const contactAction = actionClient.schema(contactSchema).action(async ({ parsedInput }) => {
  const { nameVerify, name, email, message } = parsedInput;
  // console.log(name, email, message);

  // check bot
  if (nameVerify) throw new BotError();

  // sanatization
  let errorObj: { [key: string]: { _errors: string[] } } = {};

  Object.keys(parsedInput).forEach((key: string) => {
    const val = parsedInput[key as keyof typeof parsedInput];

    if (val && !isSanitized(val)) {
      errorObj[key] = {
        _errors: ['Invalid value.'],
      };
    }
  });

  if (Object.keys(errorObj).length > 0) {
    returnValidationErrors(contactSchema, {
      _errors: ['One or more inputs are invalid.'],
      ...errorObj,
    });
  }

  // save record
  try {
    await db.insert(contactsDBSchema).values({ name, email, message });
  } catch (err) {
    console.error(err);
  }

  // trigger knock workflow - discord notification
  // await initKnock();
  await knockClient.workflows.trigger(KNOCK_CONFIG.WORKFLOW_KEY, {
    recipients: [
      {
        collection: KNOCK_CONFIG.COLLECTION,
        id: KNOCK_CONFIG.OBJECT,
      },
    ],
    data: { visitor_name: name, visitor_email: email, visitor_message: message },
  });

  return { status: 'success' };
});
