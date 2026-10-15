import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { getProject } from '../../data/projects'
import { srcSetFor } from '../../lib/srcSet'
import styles from './CardFan.module.css'

/*
  Real screens fanned out on an arc, like cards held in a hand. The fan turns slowly as the page
  scrolls past it (eased by a spring, so it glides), and a card lifts when hovered. Each opens its case study.
  The arc's lower ends run off the bottom edge and fade out. Still with reduced motion.
*/
const cards = [
  ['sampatee', 'recharge'],
  ['limina', 'home'],
  ['projam-ai', 'overview'],
  ['sj-life', 'signUp'],
  ['learnopedia', 'player'],
  ['secufusion', 'event'],
  ['limina', 'prescription'],
  ['sampatee', 'leaderboard'],
  ['sj-life', 'sleepDashboard'],
]

const STEP = 12 // degrees between cards

export function CardFan() {
  const ref = useRef(null)
  const still = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const turn = useSpring(useTransform(scrollYProgress, [0, 1], [14, -14]), { stiffness: 60, damping: 20, mass: 0.6 })

  const items = cards
    .map(([slug, id]) => {
      const project = getProject(slug)
      const screen = project?.screens[id]
      return screen ? { key: `${slug}-${id}`, project, screen } : null
    })
    .filter(Boolean)
  const middle = (items.length - 1) / 2

  return (
    <div ref={ref} className={styles.fan}>
      <motion.ul className={styles.pivot} style={still ? undefined : { rotate: turn }}>
        {items.map(({ key, project, screen }, index) => (
          <li key={key} className={styles.slot} style={{ '--angle': `${(index - middle) * STEP}deg` }}>
            <Link to={`/work/${project.slug}`} className={styles.card} aria-label={`${project.title}: ${screen.caption}`}>
              <img
                src={screen.src}
                srcSet={srcSetFor(screen)}
                sizes="(max-width: 640px) 35vw, 14rem"
                width={screen.width}
                height={screen.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </Link>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
