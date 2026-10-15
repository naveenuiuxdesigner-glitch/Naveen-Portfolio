import { useEffect, useRef } from 'react'
import styles from './ParticleMark.module.css'

/*
  The hero's signature: a cloud of particles that gathers into Naveen's initials,
  over a faint, slowly drifting network. Particles part gently around the cursor and drift back.

  - Plain canvas, no library. About a thousand particles, drawn once per frame.
  - Starts once the page is idle, so it never delays the first view.
  - Pauses when scrolled out of view or when the tab is hidden.
  - Reduced motion: the initials are drawn once, still.
  - Colours come from the theme tokens, so it follows dark and light mode.
  `children` (e.g. floating labels) sit on top of the canvas.
*/
const SPRING = 0.018 // how strongly a particle is pulled home: low, so it glides
const DAMPING = 0.86
const CURSOR_RADIUS = 90 // px around the cursor that particles move away from
const CURSOR_FORCE = 0.9 // gentle: they part, they don't scatter
const NODES = 16

const mix = (a, b, t) => a.map((value, i) => Math.round(value + (b[i] - value) * t))

function parseColor(value) {
  const probe = document.createElement('canvas').getContext('2d')
  probe.fillStyle = value
  const hex = probe.fillStyle // normalised to #rrggbb
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
}

function readColors(el) {
  const style = getComputedStyle(el)
  return {
    text: parseColor(style.getPropertyValue('--color-text').trim() || '#eeede8'),
    accent: parseColor(style.getPropertyValue('--color-accent-fill').trim() || '#f2a44b'),
    line: style.getPropertyValue('--color-line-strong').trim() || '#383c45',
  }
}

// Points inside the letters, sampled on a grid sized so there are roughly `target` of them
function samplePoints(text, width, height, target) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  let size = height * 0.62
  ctx.font = `800 ${size}px "Plus Jakarta Sans", Inter, sans-serif`
  const measured = ctx.measureText(text).width
  if (measured > width * 0.86) size *= (width * 0.86) / measured
  ctx.font = `800 ${size}px "Plus Jakarta Sans", Inter, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#000'
  ctx.fillText(text, width / 2, height / 2 + size * 0.04)

  const { data } = ctx.getImageData(0, 0, width, height)
  let inked = 0
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) inked++
  const gap = Math.max(3, Math.round(Math.sqrt(inked / target)))

  const points = []
  for (let y = 0; y < height; y += gap) {
    for (let x = 0; x < width; x += gap) {
      if (data[(y * width + x) * 4 + 3] > 128) points.push([x + (Math.random() - 0.5) * gap, y + (Math.random() - 0.5) * gap])
    }
  }
  return points
}

export function ParticleMark({ text = 'NP', label, className = '', children }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let particles = []
    let nodes = []
    let colors = readColors(wrap)
    let frame = 0
    let running = false
    let visible = true
    let started = false
    const pointer = { x: -9999, y: -9999 }

    function build() {
      const rect = wrap.getBoundingClientRect()
      width = Math.round(rect.width)
      height = Math.round(rect.height)
      if (!width || !height) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = width < 480 ? 650 : 1100
      const points = samplePoints(text, width, height, target)
      const old = particles
      particles = points.map(([tx, ty], i) => {
        const t = tx / width
        // Light on the left, warming into the accent on the right
        const color = t < 0.5 ? mix(colors.text, colors.accent, t * 0.9) : mix(mix(colors.text, colors.accent, 0.45), colors.accent, (t - 0.5) * 2)
        const from = old[i]
        return {
          tx,
          ty,
          x: still ? tx : (from?.x ?? Math.random() * width),
          y: still ? ty : (from?.y ?? Math.random() * height),
          vx: 0,
          vy: 0,
          r: 0.8 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          color: `rgb(${color.join(',')})`,
        }
      })
      nodes = Array.from({ length: NODES }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }))
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height)

      // The faint network behind
      ctx.lineWidth = 1
      ctx.strokeStyle = colors.line
      for (const node of nodes) {
        if (!still) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < 0 || node.x > width) node.vx *= -1
          if (node.y < 0 || node.y > height) node.vy *= -1
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < 170) {
            ctx.globalAlpha = (1 - d / 170) * 0.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 0.7
      ctx.fillStyle = colors.line
      for (const node of nodes) ctx.fillRect(node.x - 1, node.y - 1, 2, 2)

      // The particles
      ctx.globalAlpha = 1
      const seconds = time / 1000
      for (const p of particles) {
        if (!still) {
          // A slow breathing around home
          const hx = p.tx + Math.sin(seconds * 0.7 + p.phase) * 0.8
          const hy = p.ty + Math.cos(seconds * 0.6 + p.phase) * 0.8
          p.vx += (hx - p.x) * SPRING
          p.vy += (hy - p.y) * SPRING
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < CURSOR_RADIUS && d > 0.1) {
            const push = ((CURSOR_RADIUS - d) / CURSOR_RADIUS) * CURSOR_FORCE
            p.vx += (dx / d) * push
            p.vy += (dy / d) * push
          }
          p.vx *= DAMPING
          p.vy *= DAMPING
          p.x += p.vx
          p.y += p.vy
        }
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop(time) {
      draw(time)
      frame = window.requestAnimationFrame(loop)
    }

    function play() {
      if (still) return draw(0)
      if (running || !visible || document.hidden) return
      running = true
      frame = window.requestAnimationFrame(loop)
    }

    function pause() {
      running = false
      window.cancelAnimationFrame(frame)
    }

    const onMove = (event) => {
      const rect = wrap.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onVisibility = () => (document.hidden ? pause() : play())
    const onTheme = () => {
      colors = readColors(wrap)
      build()
      if (still) draw(0)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) play()
      else pause()
    })
    let resizeTimer = 0
    const resizer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (!started) return
        build()
        if (still) draw(0)
      }, 150)
    })

    // Wait for the page to settle and the heading font to load, so the letters have their real shape
    const idle = window.requestIdleCallback ?? ((callback) => window.setTimeout(callback, 300))
    const idleId = idle(() => {
      document.fonts
        .load('800 100px "Plus Jakarta Sans"')
        .catch(() => null)
        .then(() => {
          if (!wrap.isConnected) return
          started = true
          build()
          observer.observe(wrap)
          resizer.observe(wrap)
          play()
        })
    })

    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('themechange', onTheme)

    return () => {
      ;(window.cancelIdleCallback ?? window.clearTimeout)(idleId)
      window.clearTimeout(resizeTimer)
      pause()
      observer.disconnect()
      resizer.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('themechange', onTheme)
    }
  }, [text])

  return (
    <div ref={wrapRef} className={`${styles.mark} ${className}`} role="img" aria-label={label ?? text}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      {children}
    </div>
  )
}
