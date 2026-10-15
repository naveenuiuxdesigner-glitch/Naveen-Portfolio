import { useSyncExternalStore } from 'react'

/*
  True on devices with a precise mouse or trackpad (not touch), when the visitor
  has not asked for reduced motion. Cursor effects (glow, parallax, magnetic buttons)
  only run when this is true, so phones and tablets keep plain, natural touch behavior.
  Pre-rendered HTML assumes touch; the real answer takes over when the page starts.
*/
const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function subscribe(onChange) {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

export function useFinePointer() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
}
