import { useEffect, useState } from 'react'

/*
  True once the page has scrolled away from the very top.
  The header uses it to switch on its frosted background. The header itself always stays visible.
*/
export function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [offset])

  return scrolled
}
