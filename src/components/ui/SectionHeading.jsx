import { motion } from 'motion/react'
import { duration, ease } from '../../lib/motion'
import styles from './SectionHeading.module.css'

/*
  The heading pattern every section uses:
  a small label, a large heading, and an optional short intro line.

  <SectionHeading label="Selected work" title="Projects" intro="…" />

  As it scrolls into view the label fades in, the heading rises out of a mask and the intro follows:
  the strongest reveal on the page, because headings mark where a new part of the story starts.
  Page titles (as="h1") show straight away.
*/
const viewport = { once: true, amount: 0.6 }
const fade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slower, ease: ease.out } },
}
const rise = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: duration.slower + 0.15, ease: ease.out } },
}

export function SectionHeading({ label, title, intro, as: Heading = 'h2', id }) {
  if (Heading === 'h1') {
    return (
      <header className={styles.heading}>
        {label && <p className={`label ${styles.label}`}>{label}</p>}
        <Heading id={id} className={styles.title}>
          {title}
        </Heading>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>
    )
  }

  return (
    <motion.header
      className={styles.heading}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {label && (
        <motion.p className={`label ${styles.label}`} variants={fade}>
          {label}
        </motion.p>
      )}
      <Heading id={id} className={styles.title}>
        <span className={styles.mask}>
          <motion.span className={styles.maskInner} variants={rise}>
            {title}
          </motion.span>
        </span>
      </Heading>
      {intro && (
        <motion.p className={styles.intro} variants={fade}>
          {intro}
        </motion.p>
      )}
    </motion.header>
  )
}
