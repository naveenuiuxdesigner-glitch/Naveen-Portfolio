import { useEffect, useRef, useState } from 'react'

/*
  Counts a number up from 0 when it scrolls into view, once, in 600ms.
  The final text is exactly the approved value (e.g. "507", "$2.85", "~61 min", "90%").
  Screen readers always get the final value; the counting digits are hidden from them.
  With reduced motion, or for values that aren't a plain number (e.g. "× 1.2"), the value just shows.
  The pre-rendered HTML (and the first render in the browser) shows the final value;
  counting starts once the page is running.
*/
const PATTERN = /^([^\d×]*?)(\d[\d,]*(?:\.\d+)?)(.*)$/
const DURATION = 600

function parse(value) {
  const match = String(value).match(PATTERN)
  if (!match) return null
  const [, prefix, number, suffix] = match
  return {
    prefix,
    suffix,
    target: Number(number.replaceAll(',', '')),
    decimals: number.includes('.') ? number.split('.')[1].length : 0,
    commas: number.includes(','),
  }
}

function format(parts, current) {
  const fixed = current.toFixed(parts.decimals)
  const text = parts.commas ? Number(fixed).toLocaleString('en-US', { minimumFractionDigits: parts.decimals }) : fixed
  return `${parts.prefix}${text}${parts.suffix}`
}

export function CountUp({ value }) {
  const ref = useRef(null)
  // null: just show the value (before the page starts, and when there's nothing to count)
  const [text, setText] = useState(null)

  useEffect(() => {
    const parts = parse(value)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!parts || reduceMotion || !el || !('IntersectionObserver' in window)) return undefined

    let frame = 0
    // Already counted past (e.g. scrolled by fast): leave the value as it is
    if (el.getBoundingClientRect().bottom < 0) return undefined
    setText(format(parts, 0))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / DURATION)
          const eased = 1 - Math.pow(1 - t, 3)
          setText(t < 1 ? format(parts, parts.target * eased) : String(value))
          if (t < 1) frame = window.requestAnimationFrame(tick)
        }
        frame = window.requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span aria-hidden="true">{text ?? value}</span>
      <span className="visually-hidden">{value}</span>
    </span>
  )
}
