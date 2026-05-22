"use server";

import { returnValidationErrors } from "next-safe-action";

import { actionClient } from "@/lib/safe-action";
import { contactSchema } from "@/lib/zod-schemas";
import { BotError } from "@/lib/types";

function isSanitized(value: string) {
  if (!value) return false;

  // Reject obvious HTML/script injection payloads on the server.
  const containsHtmlTags = /<[^>]*>/u.test(value);
  const containsScriptProtocol = /(?:javascript|vbscript|data)\s*:/iu.test(
    value
  );
  // Allow common whitespace controls (\n, \r, \t), block the rest.
  const containsControlChars =
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u.test(value);

  return !(containsHtmlTags || containsScriptProtocol || containsControlChars);
}

export const contactAction = actionClient
  .inputSchema(contactSchema)
  .action(async ({ parsedInput }) => {
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
          _errors: ["Invalid value."],
        };
      }
    });

    if (Object.keys(errorObj).length > 0) {
      returnValidationErrors(contactSchema, {
        _errors: ["One or more inputs are invalid."],
        ...errorObj,
      });
    }

    // send email to sachin2262716@gmail.com
    // await fetch("https://api.brevo.com/v3/smtp/email", {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     "api-key": process.env.BREVO_API_KEY || "",
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     to: [
    //       {
    //         email: "sachin2262716@gmail.com",
    //         name: "Sachin Athukorala",
    //       },
    //     ],
    //     templateId: 5,
    //     params: {
    //       name,
    //       email,
    //       message,
    //     },
    //     headers: {
    //       charset: "iso-8859-1",
    //     },
    //   }),
    // });

    // send reply email
    // await fetch("https://api.brevo.com/v3/smtp/email", {
    //   method: "POST",
    //   headers: {
    //     accept: "application/json",
    //     "api-key": process.env.BREVO_API_KEY || "",
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     to: [
    //       {
    //         email,
    //         name,
    //       },
    //     ],
    //     templateId: 6,
    //     params: {
    //       name,
    //     },
    //     headers: {
    //       charset: "iso-8859-1",
    //     },
    //   }),
    // });

    return { status: "success" };
  });
