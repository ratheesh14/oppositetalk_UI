import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/about', '/how-it-works', '/safety', '/privacy', '/terms'],
      disallow: ['/discover', '/matches', '/messages/*', '/communities/*', '/feed', '/settings', '/admin/*', '/profile/*', '/eligibility/*'],
    },
    sitemap: 'https://oppositetalk.com/sitemap.xml',
  };
}
