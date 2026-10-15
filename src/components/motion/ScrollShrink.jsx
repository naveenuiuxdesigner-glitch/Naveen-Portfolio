import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

/*
  A hero image that starts big and settles into its frame as the page scrolls:
  it shrinks a little and drifts up, eased by a spring so it glides rather than tracks the wheel.
  Off with reduced motion.
*/
export function ScrollShrink({ to = 0.9, children, className }) {
  const ref = useRef(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 })
  const scale = useTransform(progress, [0, 1], [1, to])
  const y = useTransform(progress, [0, 1], [0, 60])

  return (
    <div ref={ref} className={className}>
      <motion.div style={still ? undefined : { scale, y, transformOrigin: '50% 0%' }}>{children}</motion.div>
    </div>
  )
}
