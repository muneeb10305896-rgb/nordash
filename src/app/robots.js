export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: 'https://nordash.vercel.app/sitemap.xml',
    host: 'https://nordash.vercel.app',
  };
}
