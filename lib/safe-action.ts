import { createSafeActionClient } from 'next-safe-action';

import { BotError, ActionError } from '@/lib/types';

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error(e.message);

    if (e instanceof BotError) {
      return { status: 'bot' };
    } else if (e instanceof ActionError) {
      return { status: 'error', message: e.message };
    }

    return { status: 'error', message: `Sorry didn't work. Please try again.` };
  },
});
