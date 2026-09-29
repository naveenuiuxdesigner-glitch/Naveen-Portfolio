import { useEffect, useRef, useState } from 'react'

/*
  Counts a number up from 0 when it scrolls into view, once, in about a second.
  The final text is exactly the approved value (e.g. "507", "$2.85", "~61 min", "90%").
  Screen readers always get the final value; the counting digits are hidden from them.
  With reduced motion, or for values that aren't a plain number (e.g. "× 1.2"), the value just shows.
*/
const PATTERN = /^([^\d×]*?)(\d[\d,]*(?:\.\d+)?)(.*)$/
const DURATION = 1100

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
  const parts = parse(value)
  const animate = Boolean(parts) && typeof window !== 'undefined' && !reduceMotion() && 'IntersectionObserver' in window
  const [text, setText] = useState(() => (animate ? format(parts, 0) : String(value)))

  useEffect(() => {
    if (!animate) return undefined
    const el = ref.current
    let frame = 0
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
    // Runs once per value; parts is derived from value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, value])

  if (!animate) return value

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span aria-hidden="true">{text}</span>
      <span className="visually-hidden">{value}</span>
    </span>
  )
}
