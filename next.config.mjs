import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  async headers() {
    if (process.env.NODE_ENV === 'production') {
      const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://*.vercel-insights.com;
        style-src 'self' 'unsafe-inline' https:;
        img-src 'self' blob: data: https:;
        font-src 'self';
        connect-src 'self' https://www.google-analytics.com https://*.vercel-insights.com https://cdn.jsdelivr.net https://unpkg.com;
        frame-src 'self' https:;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'self';
        upgrade-insecure-requests;
    `.replace(/\n/g, '');

      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: cspHeader.replace(/\n/g, ''),
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin', // 'same-origin' or 'same-origin-allow-popups'
            },
          ],
        },
      ];
    }

    return [];
  },
};

const withMDX = createMDX({
  // Optional: Add remark and rehype plugins here
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
  },
});

export default withMDX(nextConfig);
