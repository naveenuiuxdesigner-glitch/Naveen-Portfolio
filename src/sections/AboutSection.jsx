import { motion } from 'motion/react'
import { about } from '../data/about'
import { Section } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import { CountUp } from '../components/motion/CountUp'
import styles from './AboutSection.module.css'

// About: a photo, one statement, three numbers, how I work and the domains I design for
export function AboutSection() {
  return (
    <Section id="about" label="About" title={about.heading}>
      <div className={styles.grid}>
        <figure className={styles.photo}>
          <motion.img
            src={about.photo}
            alt={about.photoAlt}
            width="640"
            height="800"
            loading="lazy"
            decoding="async"
            initial={{ scale: 1.08, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </figure>

        <div className={styles.text}>
          <Reveal as="p" className={styles.intro}>
            {about.intro}
          </Reveal>

          <dl className={styles.stats}>
            {about.highlights.map((item) => (
              <div key={item.label} className={styles.stat}>
                <dt>{item.label}</dt>
                <dd>
                  <CountUp value={item.value} />
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.block}>
            <h3 className={styles.blockLabel}>How I work</h3>
            <RevealGroup as="ol" className={styles.process}>
              {about.process.map((step, index) => (
                <RevealItem as="li" key={step.title}>
                  <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step.title}</strong>
                  <span>{step.detail}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className={styles.block}>
            <h3 className={styles.blockLabel}>Domains</h3>
            <dl className={styles.domains}>
              {about.domains.map((domain) => (
                <div key={domain.name}>
                  <dt>{domain.name}</dt>
                  <dd>{domain.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  )
}
