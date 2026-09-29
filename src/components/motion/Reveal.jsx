import { motion } from 'motion/react'
import { distance, duration, ease, stagger } from '../../lib/motion'

/*
  Reveal: fades content up gently when it scrolls into view (once only).

  <Reveal>…</Reveal>               — one block
  <Reveal delay={0.2}>…</Reveal>   — wait a moment first
  <RevealGroup> + <RevealItem>     — children reveal one after another

  If the visitor has "reduce motion" turned on, the movement is removed
  and only a quick fade remains (handled by <MotionConfig> in App.jsx).
*/

const itemVariants = {
  hidden: { opacity: 0, y: distance.reveal },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slower, ease: ease.out },
  },
}

const viewport = { once: true, amount: 0.2 }

export function Reveal({ as = 'div', delay = 0, children, ...props }) {
  const Component = motion[as] ?? motion.div
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={itemVariants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Component>
  )
}

export function RevealGroup({ as = 'div', delay = 0, onLoad = false, children, ...props }) {
  const Component = motion[as] ?? motion.div
  const trigger = onLoad ? { animate: 'visible' } : { whileInView: 'visible', viewport }
  return (
    <Component
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </Component>
  )
}

export function RevealItem({ as = 'div', children, ...props }) {
  const Component = motion[as] ?? motion.div
  return (
    <Component variants={itemVariants} {...props}>
      {children}
    </Component>
  )
}
