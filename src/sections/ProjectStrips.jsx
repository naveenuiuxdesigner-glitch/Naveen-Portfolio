import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { getProject } from '../data/projects'
import { srcSetFor } from '../lib/srcSet'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/motion/Reveal'
import styles from './ProjectStrips.module.css'

/*
  The best-looking mobile screens from the app projects, as tall strips. On laptops the strip under the cursor
  (or keyboard focus) widens smoothly and shows the whole phone and its project; the others narrow to make room.
  On phones the strips sit side by side and swipe sideways. Each opens its case study.
*/
const screens = [
  ['sampatee', 'welcome'],
  ['limina', 'home'],
  ['sj-life', 'signUp'],
  ['sampatee', 'fall'],
  ['limina', 'consultation'],
  ['sj-life', 'splash'],
  ['sampatee', 'rewards'],
]

export function ProjectStrips() {
  const [active, setActive] = useState(0)
  const items = screens
    .map(([slug, id]) => {
      const project = getProject(slug)
      const screen = project?.screens[id]
      return screen ? { key: `${slug}-${id}`, project, screen } : null
    })
    .filter(Boolean)

  return (
    <section className={styles.section} aria-labelledby="strips-title">
      <Container>
        <Reveal as="h2" id="strips-title" className={styles.title}>
          Products I’ve designed, end to end
        </Reveal>
      </Container>
      <Container className={styles.wide}>
        <Reveal as="ul" className={styles.strips} onPointerLeave={() => setActive(0)}>
          {items.map(({ key, project, screen }, index) => (
            <li
              key={key}
              className={`${styles.strip} ${active === index ? styles.active : ''}`}
              onPointerEnter={() => setActive(index)}
            >
              <Link to={`/work/${project.slug}`} className={styles.link} onFocus={() => setActive(index)}>
                {/* The whole phone, centred, over a soft blurred copy of itself */}
                <img src={srcSetFor(screen) ? screen.src.replace(/\.webp$/, '-480.webp') : screen.src} alt="" loading="lazy" decoding="async" className={styles.backdrop} />
                <img
                  src={screen.src}
                  srcSet={srcSetFor(screen)}
                  sizes="(max-width: 768px) 60vw, 20rem"
                  width={screen.width}
                  height={screen.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={styles.phone}
                />
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.info}>
                  <span className={styles.name}>{project.title}</span>
                  <span className={styles.meta}>{screen.caption}</span>
                  <span className={styles.cta} aria-hidden="true">
                    View case study <ArrowUpRight size={14} strokeWidth={1.75} />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
