import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { scrollToTarget } from '../../lib/scrollToTarget'

/*
  When the address has a #section (e.g. /#skills), scroll to that section
  and move keyboard focus there, so screen-reader users land in the right place too.
  Pages without a # start at the top (handled by <ScrollRestoration>).
  Case studies whose sections load a moment later scroll themselves once they arrive (see CaseStudy.jsx).
*/
export function ScrollToHash() {
  const { hash, key } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    const frame = window.requestAnimationFrame(() => scrollToTarget(id))
    return () => window.cancelAnimationFrame(frame)
  }, [hash, key])

  return null
}
