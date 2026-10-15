import { Navigate } from 'react-router'
import { PageShell } from './components/layout/PageShell'
import Home from './pages/Home'
import { projects } from './data/projects'

/*
  The site map. Each "path" is a web address, and "Component" is the page it shows.
  Every page sits inside PageShell, which adds the header and footer.
  Only the homepage is in the first download; every other page loads when it's opened.
  Shared by the browser (main.jsx) and the build step that pre-renders each page to HTML (entry-server.jsx).
*/
const page = (load) => () => load().then((module) => ({ Component: module.default }))
export const loadCaseStudy = () => import('./pages/CaseStudy')

export const routes = [
  {
    path: '/',
    Component: PageShell,
    // While a page's code loads on a fresh visit (pages not built ahead, e.g. in npm run dev), show nothing
    HydrateFallback: () => null,
    children: [
      { index: true, Component: Home },
      { path: 'work', lazy: page(() => import('./pages/Work')) },
      { path: 'work/:slug', lazy: page(loadCaseStudy) },
      // About now lives on the homepage; old /about links still land there
      { path: 'about', element: <Navigate to={{ pathname: '/', hash: '#about' }} replace /> },
      { path: 'foundation', lazy: page(() => import('./pages/Foundation')) }, // Design-system preview, hidden from search engines
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
]

// The pages built to HTML ahead of time, so they show before any script has run
export const prerenderPaths = ['/', '/work', ...projects.map((project) => `/work/${project.slug}`)]
