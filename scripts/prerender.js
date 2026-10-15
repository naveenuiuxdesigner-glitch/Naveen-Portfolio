/*
  Pre-renders each page to HTML after the normal build (part of npm run build):
  dist/index.html, dist/work/index.html, dist/work/<case study>/index.html.
  Visitors see the page straight away; the scripts then take it over (see src/main.jsx).
  Each page also gets its own title and description, so search engines and link previews read them.
  Each page's CSS (including the CSS of its own page script) goes inside its HTML, and the two
  main fonts are preloaded, so the page paints styled at once and doesn't shift as styles or fonts arrive.
*/
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const server = join(root, 'dist-ssr')

const { render, prerenderPaths, pageMeta } = await import(pathToFileURL(join(server, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf-8')

const manifest = JSON.parse(await readFile(join(dist, '.vite', 'manifest.json'), 'utf-8'))

// The CSS files a module needs, following its imports (e.g. the case-study page and the parts it shares)
function cssFor(key, seen = new Set()) {
  if (seen.has(key) || !manifest[key]) return []
  seen.add(key)
  const chunk = manifest[key]
  return [...(chunk.imports ?? []).flatMap((imported) => cssFor(imported, seen)), ...(chunk.css ?? [])]
}

const pageModule = (path) => (path === '/' ? null : path === '/work' ? 'src/pages/Work.jsx' : 'src/pages/CaseStudy.jsx')

async function stylesFor(path) {
  const files = [...new Set([...cssFor('index.html'), ...(pageModule(path) ? cssFor(pageModule(path)) : [])])]
  const css = await Promise.all(files.map((file) => readFile(join(dist, file), 'utf-8')))
  return `<style>${css.join('\n')}</style>`
}

// The two fonts the first screen uses; the third (labels) can arrive a moment later
const fonts = Object.values(manifest)
  .flatMap((chunk) => chunk.assets ?? [])
  .filter((file) => /(inter|plus-jakarta-sans)-latin-wght-normal.*\.woff2$/.test(file))
const fontPreloads = [...new Set(fonts)].map((file) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/${file}">`).join('\n    ')

const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

for (const path of prerenderPaths) {
  const html = await render(path)
  const { title, description } = pageMeta(path)
  // Function replacers, so a "$" in the page (e.g. "$2.85") is never read as a replacement pattern
  const head = `    ${fontPreloads}
    ${await stylesFor(path)}
  </head>`
  const page = template
    .replace(/\s*<link rel="stylesheet"[^>]*>/g, () => '')
    // The page is already complete as HTML, so its scripts (needed only for interaction) wait behind
    // the fonts and the main image instead of competing with them on slow connections
    .replace(/<script type="module" crossorigin/g, () => '<script type="module" fetchpriority="low" crossorigin')
    .replace(/<link rel="modulepreload" crossorigin/g, () => '<link rel="modulepreload" fetchpriority="low" crossorigin')
    .replace("</head>", () => head)
    // data-path: which page this HTML is, so the browser only takes it over on that page (see src/main.jsx)
    .replace('<div id="root"></div>', () => `<div id="root" data-path="${path}">${html}</div>`)
    .replace(/<title>.*?<\/title>/, () => `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, (_, start, end) => `${start}${escape(description)}${end}`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, start, end) => `${start}${escape(title)}${end}`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, start, end) => `${start}${escape(description)}${end}`)
  const file = join(dist, path === '/' ? '' : path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page)
  console.log(`pre-rendered ${path}`)
}

// The server build is only needed for this step
await rm(server, { recursive: true, force: true })
