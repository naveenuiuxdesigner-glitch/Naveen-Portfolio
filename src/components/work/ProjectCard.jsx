import { useRef } from 'react'
import { Link, useViewTransitionState } from 'react-router'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Visual } from '../mockups/Visual'
import { usePointerVars } from '../../hooks/usePointerVars'
import { markCardTransition } from '../../lib/cardTransition'
import { duration, ease } from '../../lib/motion'
import styles from './ProjectCard.module.css'

/*
  One project in the Work grid: a large product preview first, then the name, a few words of metadata
  and one line about the product. The whole card links to the case study.

  Hover (mouse only): the preview lifts and its screens drift toward the cursor, the number lights up
  in the accent, a soft accent border appears and "View case study" slides in.
  Opening the case study glides the preview into the case-study hero (view transition, where supported).
*/
const reveal = { once: true, amount: 0.2 }

export function ProjectCard({ project, index, featured = false }) {
  const number = String(index + 1).padStart(2, '0')
  const titleId = `project-${project.slug}`
  const to = `/work/${project.slug}`
  const mediaRef = useRef(null)
  const reduceMotion = useReducedMotion()
  usePointerVars(mediaRef)
  // True only while this card is the one opening, so just one element carries the transition name
  const opening = useViewTransitionState(to)
  const visual = project.coverVisual ?? project.heroVisual

  return (
    <motion.article
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      aria-labelledby={titleId}
      initial="hidden"
      whileInView="visible"
      viewport={reveal}
      variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: duration.slower, ease: ease.out } } }}
    >
      <Link to={to} viewTransition onClick={() => markCardTransition(project.slug)} className={styles.link}>
        <div ref={mediaRef} className={styles.media} style={opening ? { viewTransitionName: 'project-media' } : undefined}>
          {/* The screens reveal from a mask as the card scrolls into view */}
          <motion.div
            className={styles.mask}
            variants={
              reduceMotion
                ? undefined
                : {
                    hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
                    visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: duration.slower + 0.3, ease: ease.out, delay: 0.1 } },
                  }
            }
          >
            <div className={styles.mediaInner}>
              {visual ? (
                <Visual visual={visual} screenMap={project.screens} compact eager={index < 2} />
              ) : (
                <div className={styles.placeholder} aria-hidden="true">
                  <small>Screens coming soon</small>
                </div>
              )}
            </div>
          </motion.div>
          <span className={styles.number}>{number}</span>
          <span className={styles.cta} aria-hidden="true">
            View case study
            <ArrowUpRight size={14} strokeWidth={1.75} />
          </span>
        </div>

        <div className={styles.info}>
          <div className={styles.titleRow}>
            <h3 id={titleId} className={styles.title}>
              {project.title}
            </h3>
            {project.label && <span className={styles.badge}>{project.label.split(' · ')[0]}</span>}
          </div>
          {project.meta?.length > 0 && <p className={styles.meta}>{project.meta.join(' · ')}</p>}
          <p className={styles.tagline}>{project.tagline || project.summary || 'Case study coming soon.'}</p>
        </div>
      </Link>
    </motion.article>
  )
}
