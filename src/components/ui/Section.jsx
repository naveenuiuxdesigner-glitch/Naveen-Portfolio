import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import styles from './Section.module.css'

/*
  A homepage section: consistent spacing, a heading, and an id the menu can jump to.

  <Section id="skills" label="Skills" title="What I bring" intro="…">
    …content…
  </Section>

  tone="raised" gives the section a slightly lighter background band.
*/
export function Section({ id, label, title, intro, tone = 'default', aside, children }) {
  const headingId = `${id}-title`
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[tone] ?? ''}`}>
      <Container className={styles.inner}>
        <div className={styles.head}>
          <SectionHeading id={headingId} label={label} title={title} intro={intro} />
          {aside && <div className={styles.aside}>{aside}</div>}
        </div>
        {children}
      </Container>
    </section>
  )
}
