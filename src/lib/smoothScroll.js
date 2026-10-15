import 'lenis/dist/lenis.css'

/*
  Smooth scrolling for the whole site (Lenis). Started once by PageShell.
  Lenis downloads after the page has painted, so it never delays the first view.
  Off for visitors who ask their device to reduce motion: they keep the browser's own scrolling.
  Overlays that lock the page (the mobile menu, the screen viewer) pause it while they're open,
  and mark themselves data-lenis-prevent so their own content still scrolls.
*/
let lenis = null

export function startSmoothScroll() {
  if (lenis || typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  let stopped = false
  import('lenis').then(({ default: Lenis }) => {
    // Slow and steady: each wheel notch moves less (wheelMultiplier) and eases in more gently (lerp)
    if (!stopped) lenis = new Lenis({ autoRaf: true, lerp: 0.08, wheelMultiplier: 0.75, touchMultiplier: 1 })
  })
  return () => {
    stopped = true
    lenis?.destroy()
    lenis = null
  }
}

// Scroll to an element, leaving room for the sticky header (its scroll-margin-top or the page's scroll-padding-top)
export function smoothScrollTo(target) {
  if (!lenis) return false
  const style = window.getComputedStyle(target)
  const margin = parseFloat(style.scrollMarginTop) || parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  // force: also works in the moment a closing menu is still pausing the scroll
  lenis.scrollTo(target, { offset: -margin, force: true })
  return true
}

export function pauseSmoothScroll(paused) {
  if (!lenis) return
  if (paused) lenis.stop()
  else lenis.start()
}
