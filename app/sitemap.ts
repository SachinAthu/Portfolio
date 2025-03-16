import { MetadataRoute } from 'next';
import dayjs from 'dayjs';

import { ROOTURL, WORKS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: ROOTURL,
      lastModified: dayjs().format('YYYY-MM-DD'),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...WORKS.map((work) => {
      return {
        url: `${ROOTURL}/${work.slug}`,
        lastModified: work.date.dateModified,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      };
    }),
  ];
}
