import { useEffect, useState } from 'react'

/*
  True on devices with a precise mouse or trackpad (not touch), when the visitor
  has not asked for reduced motion. Cursor effects (glow, parallax, magnetic buttons)
  only run when this is true, so phones and tablets keep plain, natural touch behavior.
*/
const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

export function useFinePointer() {
  const [fine, setFine] = useState(() => typeof window !== 'undefined' && window.matchMedia(QUERY).matches)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const update = () => setFine(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return fine
}
