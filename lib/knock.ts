import { Knock } from '@knocklabs/node';

import { KNOCK_CONFIG } from './data';

const knockClient = new Knock(process.env.KNOCK_API_KEY);

const initKnock = async () => {
  const { COLLECTION, OBJECT, DISCORD_CHANNEL_ID, DISCORD_WEBHOOK_URL } = KNOCK_CONFIG;

  await knockClient.objects.set(COLLECTION, OBJECT, {
    name: 'Contact Notify',
    locale: 'en-US',
    timezone: 'Asia/Colombo',
  });

  await knockClient.objects.setChannelData(COLLECTION, OBJECT, DISCORD_CHANNEL_ID, {
    connections: [
      {
        incoming_webhook: {
          url: DISCORD_WEBHOOK_URL,
        },
      },
    ],
  });
};

export { knockClient, initKnock };
