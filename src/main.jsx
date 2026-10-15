import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, matchPath, matchRoutes } from 'react-router'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/global.css'
import { loadCaseStudy, routes } from './routes'
import { preloadStory } from './data/projects'
import App from './App.jsx'

/*
  Starts the site in the browser.
  Pages built ahead of time (npm run build) already have their HTML: React takes it over ("hydrates")
  instead of drawing it again. Their page code is loaded first, so the two match exactly.
  If a server answers an address with another page's HTML (e.g. a fallback to the homepage),
  that HTML is dropped and the page is drawn fresh.
*/
const normalize = (path) => path.replace(/\/+$/, '') || '/'
async function start() {
  const root = document.getElementById('root')
  const prerendered = root.hasChildNodes() && normalize(root.dataset.path ?? '') === normalize(window.location.pathname)
  if (!prerendered) root.replaceChildren()

  if (prerendered) {
    const lazyMatches = matchRoutes(routes, window.location)?.filter((match) => match.route.lazy) ?? []
    await Promise.all(
      lazyMatches.map(async ({ route }) => {
        const loaded = await route.lazy()
        Object.assign(route, { ...loaded, lazy: undefined })
      }),
    )
    // A case study's HTML includes its story, so the story must be here before taking it over
    const caseStudy = matchPath('/work/:slug', normalize(window.location.pathname))
    if (caseStudy) await preloadStory(caseStudy.params.slug).catch(() => null)
  }

  const router = createBrowserRouter(routes)
  const app = (
    <StrictMode>
      <App router={router} />
    </StrictMode>
  )
  if (prerendered) hydrateRoot(root, app)
  else createRoot(root).render(app)

  // Once the page is idle, fetch the case-study page in the background, so opening one is instant
  const idle = window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 2000))
  idle(() => loadCaseStudy())
}

start()
