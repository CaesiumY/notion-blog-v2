/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://notion-blog-v2-dusky.vercel.app",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  // ...other options
};
