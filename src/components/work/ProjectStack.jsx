import { useRef } from 'react'
import { Link, useViewTransitionState } from 'react-router'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Visual } from '../mockups/Visual'
import { usePointerVars } from '../../hooks/usePointerVars'
import { markCardTransition } from '../../lib/cardTransition'
import styles from './ProjectStack.module.css'

/*
  The selected work as a deck of large cards that stack while you scroll (laptops and up):
  each card pins below the header, the next one slides up over it, and the cards underneath
  shrink and dim a little, so the deck builds up. On phones and tablets the cards simply follow
  one another. Each card: number, name, domain, one line, tags and its real screens,
  which drift with the cursor. The whole card opens the case study, and its screens glide into the
  case-study hero (view transition, where supported).
*/

// A soft glow in each product's own colour, taken from its screens
const glow = {
  'projam-ai': '#7c5cff',
  learnopedia: '#22a99a',
  limina: '#e8742f',
  sampatee: '#8b5cf6',
  'sj-life': '#c2410c',
  secufusion: '#3b82f6',
}

export function ProjectStack({ projects }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} className={styles.stack}>
      {projects.map((project, index) => (
        <StackCard key={project.slug} project={project} index={index} total={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  )
}

function StackCard({ project, index, total, progress }) {
  const mediaRef = useRef(null)
  const still = useReducedMotion()
  usePointerVars(mediaRef)
  const to = `/work/${project.slug}`
  const opening = useViewTransitionState(to)
  const visual = project.coverVisual ?? project.heroVisual
  const titleId = `stack-${project.slug}`

  // Cards further down the deck end up a little smaller and darker
  const depth = total - 1 - index
  const scale = useTransform(progress, [index / total, 1], [1, 1 - depth * 0.035])
  const shade = useTransform(progress, [index / total, 1], [0, depth * 0.1])

  return (
    <div className={styles.slot} style={{ '--i': index }}>
      <motion.article
        className={styles.card}
        aria-labelledby={titleId}
        style={{ '--glow': glow[project.slug] ?? 'var(--color-accent-fill)', ...(still ? {} : { scale }) }}
      >
        <Link to={to} viewTransition onClick={() => markCardTransition(project.slug)} className={styles.link}>
          <div className={styles.info}>
            <p className={styles.top}>
              <span className={styles.count}>
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              {project.label && <span className={styles.badge}>{project.label.split(' · ')[0]}</span>}
            </p>
            <h3 id={titleId} className={styles.title}>
              {project.title}
            </h3>
            {project.meta?.length > 0 && <p className={styles.meta}>{project.meta.join(' · ')}</p>}
            <p className={styles.tagline}>{project.tagline || project.summary}</p>
            {project.tags?.length > 0 && (
              <ul className={styles.tags} aria-label="Tags">
                {project.tags.slice(0, 4).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
            <span className={styles.cta}>
              View case study
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </div>

          <div ref={mediaRef} className={styles.media} style={opening ? { viewTransitionName: 'project-media' } : undefined}>
            <div className={styles.mediaInner}>
              {visual && <Visual visual={visual} screenMap={project.screens} compact eager={index === 0} />}
            </div>
            {project.screenNote && <span className={styles.note}>{project.screenNote}</span>}
          </div>
        </Link>
        {!still && <motion.span className={styles.shade} style={{ opacity: shade }} aria-hidden="true" />}
      </motion.article>
    </div>
  )
}
