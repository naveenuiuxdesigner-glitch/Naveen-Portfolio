import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/*
  Moves its content a little slower than the page as it scrolls: a subtle depth effect for hero mockups.
  distance: how far it drifts in total (px).
  top: for a hero already on screen when the page opens. It starts in place and drifts as you scroll away.
  innerClassName styles the moving layer, e.g. to fill a box whose children are positioned absolutely.
  Off with reduced motion.
*/
export function Parallax({ distance = 48, top = false, children, className, innerClassName }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: top ? ['start start', 'end start'] : ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], top ? [0, distance] : [distance / 2, -distance / 2])

  return (
    <div ref={ref} className={className}>
      <motion.div className={innerClassName} style={reduceMotion ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  )
}
