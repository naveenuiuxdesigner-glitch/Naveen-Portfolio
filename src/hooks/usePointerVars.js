import { useEffect } from 'react'
import { useFinePointer } from './useFinePointer'

/*
  Tracks the cursor over an element and writes it to CSS variables on that element:
    --mx, --my  cursor position in px (for a soft highlight that follows the cursor)
    --px, --py  cursor position from -1 to 1, 0 at the center (for gentle parallax)
  CSS does the movement with transform/opacity, so nothing runs while the mouse is still.
  At most one update per frame. Mouse and trackpad only; off for touch and reduced motion.
*/
export function usePointerVars(ref) {
  const fine = useFinePointer()

  useEffect(() => {
    const el = ref.current
    if (!fine || !el) return undefined

    let frame = 0
    let last = null

    const apply = () => {
      frame = 0
      if (!last) return
      const rect = el.getBoundingClientRect()
      const x = last.clientX - rect.left
      const y = last.clientY - rect.top
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      el.style.setProperty('--px', ((x / rect.width) * 2 - 1).toFixed(3))
      el.style.setProperty('--py', ((y / rect.height) * 2 - 1).toFixed(3))
    }

    const onMove = (event) => {
      last = event
      if (!frame) frame = window.requestAnimationFrame(apply)
    }
    const onEnter = () => el.setAttribute('data-pointer', '')
    const onLeave = () => {
      last = null
      el.removeAttribute('data-pointer')
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
  }, [fine, ref])

  return fine
}
