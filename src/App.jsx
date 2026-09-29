import { createBrowserRouter, Navigate } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { MotionConfig } from 'motion/react'
import { PageShell } from './components/layout/PageShell'
import Home from './pages/Home'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Foundation from './pages/Foundation'
import NotFound from './pages/NotFound'

/*
  The site map. Each "path" is a web address, and "Component" is the page it shows.
  Every page sits inside PageShell, which adds the header and footer.
*/
const router = createBrowserRouter([
  {
    path: '/',
    Component: PageShell,
    children: [
      { index: true, Component: Home },
      { path: 'work', Component: Work },
      { path: 'work/:slug', Component: CaseStudy },
      // About now lives on the homepage; old /about links still land there
      { path: 'about', element: <Navigate to={{ pathname: '/', hash: '#about' }} replace /> },
      { path: 'foundation', Component: Foundation }, // Design-system preview, hidden from search engines
      { path: '*', Component: NotFound },
    ],
  },
])

export default function App() {
  return (
    // reducedMotion="user": if a visitor asks their device to reduce motion,
    // Motion removes movement and keeps only gentle fades.
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
