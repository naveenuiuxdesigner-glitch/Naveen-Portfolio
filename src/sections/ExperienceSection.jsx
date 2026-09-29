import { certifications, education, experience } from '../data/experience'
import { Section } from '../components/ui/Section'
import { RevealGroup, RevealItem } from '../components/motion/Reveal'
import styles from './ExperienceSection.module.css'

// Experience: one line per role (title, company, focus, dates), then education and certification
export function ExperienceSection() {
  return (
    <Section id="experience" label="Experience" title="Where I’ve worked">
      <RevealGroup as="ol" className={styles.list}>
        {experience.map((job) => (
          <RevealItem as="li" key={`${job.company}-${job.start}`} className={styles.item}>
            <div className={styles.who}>
              <h3 className={styles.role}>{job.role}</h3>
              <p className={styles.company}>{job.company}</p>
            </div>
            <ul className={styles.focus} aria-label="Focus">
              {job.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className={styles.dates}>
              <time>{job.start}</time> – <time>{job.end}</time>
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <dl className={styles.extra}>
        {education.map((item) => (
          <div key={item.title}>
            <dt>Education</dt>
            <dd>
              <strong>{item.title}</strong>
              <span>{[item.place, item.years, item.note].filter(Boolean).join(' · ')}</span>
            </dd>
          </div>
        ))}
        {certifications.map((item) => (
          <div key={item.title}>
            <dt>Certification</dt>
            <dd>
              <strong>{item.title}</strong>
              <span>{[item.place, item.years].filter(Boolean).join(' · ')}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
