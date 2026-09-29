import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { Visual } from '../mockups/Visual'
import styles from './NextProject.module.css'

// The end of every case study: a large preview of the next project, so readers never hit a dead end
export function NextProject({ project }) {
  const visual = project.coverVisual ?? project.heroVisual
  return (
    <section className={styles.band} aria-label="Next project">
      <Container>
        <Link to={`/work/${project.slug}`} className={styles.next}>
          <span className={styles.text}>
            <span className={styles.label}>Next project</span>
            <span className={styles.title}>
              {project.title}
              <ArrowRight className={styles.icon} size={36} strokeWidth={1.5} aria-hidden="true" />
            </span>
            {project.tagline && <span className={styles.tagline}>{project.tagline}</span>}
          </span>
          {visual && (
            <span className={styles.media}>
              <span className={styles.mediaInner}>
                <Visual visual={visual} screenMap={project.screens} compact />
              </span>
            </span>
          )}
        </Link>
      </Container>
    </section>
  )
}
