import { useEffect } from 'react'
import { useFinePointer } from './useFinePointer'

/*
  A "magnetic" button: it leans a few pixels toward the cursor while hovered,
  then settles back. The pull is capped (max px) so it stays a hint, never a chase.
  Mouse and trackpad only; off for touch and reduced motion.
*/
export function useMagnetic(ref, { enabled = true, strength = 0.22, max = 6 } = {}) {
  const fine = useFinePointer()

  useEffect(() => {
    const el = ref.current
    if (!enabled || !fine || !el) return undefined

    let frame = 0
    let last = null

    const apply = () => {
      frame = 0
      if (!last) return
      const rect = el.getBoundingClientRect()
      const clamp = (value) => Math.max(-max, Math.min(max, value))
      const x = clamp((last.clientX - (rect.left + rect.width / 2)) * strength)
      const y = clamp((last.clientY - (rect.top + rect.height / 2)) * strength)
      el.style.setProperty('--mag-x', `${x.toFixed(1)}px`)
      el.style.setProperty('--mag-y', `${y.toFixed(1)}px`)
    }
    const onMove = (event) => {
      last = event
      if (!frame) frame = window.requestAnimationFrame(apply)
    }
    const onLeave = () => {
      last = null
      el.style.setProperty('--mag-x', '0px')
      el.style.setProperty('--mag-y', '0px')
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      window.cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      onLeave()
    }
  }, [enabled, fine, ref, strength, max])
}
