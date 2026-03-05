#!/usr/bin/env node
/**
 * Generates sitemap.xml from player data.
 * Run: node scripts/generate-sitemap.js
 * Output: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'players.json'), 'utf8')
);

const BASE_URL = 'https://dukebrotherhood.com';
const today = new Date().toISOString().split('T')[0];

const urls = [
  // Home
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  // Players index
  { loc: '/players/', priority: '0.9', changefreq: 'weekly' },
  // Eras index
  { loc: '/eras/', priority: '0.8', changefreq: 'monthly' },
  // About
  { loc: '/about/', priority: '0.5', changefreq: 'monthly' },
];

// Individual era pages
data.eras.forEach(era => {
  urls.push({ loc: `/eras/${era.key}/`, priority: '0.7', changefreq: 'monthly' });
});

// Individual player pages (only completed profiles)
data.players
  .filter(p => p.status === 'done')
  .forEach(player => {
    urls.push({ loc: `/players/${player.slug}/`, priority: '0.8', changefreq: 'monthly' });
  });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, sitemap);
console.log(`Sitemap generated: ${urls.length} URLs → ${outPath}`);
