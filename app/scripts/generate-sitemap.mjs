import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const appDir = resolve(process.cwd())
const siteUrl = process.env.SITE_URL || 'https://dev-util-hub.vercel.app'
const appFile = resolve(appDir, 'src', 'App.jsx')
const publicDir = resolve(appDir, 'public')

function extractRoutes(appSource) {
  const routes = new Set(['/'])
  const routeRegex = /<Route\s+path="([^"]+)"/g
  let m
  while ((m = routeRegex.exec(appSource)) !== null) {
    const p = m[1]
    // skip wildcard and dynamic paramized routes
    if (p.includes('*') || p.includes(':')) continue
    routes.add(p)
  }
  return Array.from(routes)
}

function buildSitemap(urls) {
  const lines = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
  for (const u of urls) {
    const loc = `${siteUrl}${u}`
    lines.push('  <url>')
    lines.push(`    <loc>${loc}</loc>`)
    lines.push('    <changefreq>weekly</changefreq>')
    lines.push('    <priority>0.7</priority>')
    lines.push('  </url>')
  }
  lines.push('</urlset>')
  return lines.join('\n')
}

function ensurePublicDir() {
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true })
  }
}

function main() {
  const appSource = readFileSync(appFile, 'utf8')
  const routes = extractRoutes(appSource)
  ensurePublicDir()
  const sitemap = buildSitemap(routes)
  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap)
  // robots.txt hint to sitemap
  const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
  writeFileSync(resolve(publicDir, 'robots.txt'), robots)
  console.log(`Generated sitemap with ${routes.length} routes to ${publicDir}`)
}

main()