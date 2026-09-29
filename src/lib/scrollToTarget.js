/*
  Scrolls to the element with this id (below the sticky header) and moves keyboard focus there,
  so screen-reader users land in the same place. Smooth unless the visitor prefers reduced motion.
  Returns false when the element isn't on the page (yet).
*/
export function scrollToTarget(id) {
  const target = document.getElementById(id)
  if (!target) return false

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  return true
}

/*
  Click handler for a plain in-page link like <a href="#main">.
  Scrolls here instead of letting the browser change the address, because in the
  preview build the address itself lives after a # and "#main" would open a missing page.
  Ctrl/Cmd-clicks still behave like normal links.
*/
export function jumpTo(id) {
  return (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (scrollToTarget(id)) event.preventDefault()
  }
}
