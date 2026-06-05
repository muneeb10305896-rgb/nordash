/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://nordash.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,

  // Keep admin pages out of the sitemap entirely
  exclude: ['/admin', '/admin/*'],

  // Per-page priority and changefreq
  transform: async (config, path) => {
    const map = {
      '/':        { priority: 1.0, changefreq: 'weekly'  },
      '/privacy': { priority: 0.3, changefreq: 'yearly'  },
      '/terms':   { priority: 0.3, changefreq: 'yearly'  },
      '/cookies': { priority: 0.3, changefreq: 'yearly'  },
    };

    const custom = map[path];

    if (custom) {
      return { loc: path, ...custom, lastmod: new Date().toISOString() };
    }

    if (path.startsWith('/portfolio/')) {
      return { loc: path, priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() };
    }

    return { loc: path, priority: 0.5, changefreq: 'monthly', lastmod: new Date().toISOString() };
  },

  // Add portfolio case study pages (dynamic routes aren't picked up automatically)
  additionalPaths: async () => [
    { loc: '/portfolio/oktopus-group-social-media',   priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() },
    { loc: '/portfolio/hovertise-agency-partnerships', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() },
    { loc: '/portfolio/uef-social-media-content',      priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() },
    { loc: '/portfolio/fonezone-tiktok-ads',           priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString() },
  ],

  // robots.txt — block admin from crawlers
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/admin'] },
    ],
  },
};
