import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, matchPath, StaticRouterProvider } from 'react-router'
import { MotionConfig } from 'motion/react'
import { routes } from './routes'
import { preloadStory } from './data/projects'

/*
  Used only while building (scripts/prerender.js): turns one page into HTML,
  so visitors see it before any script has loaded. The browser then takes it over (see main.jsx).
  The tree matches App.jsx, so the HTML and the browser's first render are identical.
*/
export { prerenderPaths } from './routes'
export { pageMeta } from './pageMeta'

export async function render(url) {
  // A case study is rendered whole, story included
  const caseStudy = matchPath('/work/:slug', url)
  if (caseStudy) await preloadStory(caseStudy.params.slug)
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(new URL(url, 'http://localhost')))
  if (context instanceof Response) throw new Error(`${url} redirected; it can't be pre-rendered`)
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <StrictMode>
      <MotionConfig reducedMotion="user">
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </MotionConfig>
    </StrictMode>,
  )
}
