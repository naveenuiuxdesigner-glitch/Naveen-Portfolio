import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { about } from '../data/about'
import { getProject } from '../data/projects'
import { Section } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import { CountUp } from '../components/motion/CountUp'
import styles from './AboutSection.module.css'

/*
  About, in three beats:
  1. who I am: photo, a two-paragraph story and four headline numbers
  2. what I bring: three strengths
  3. proof from the work: real numbers from the case studies, each one a link to its case study
  Every word is in src/data/about.js.
*/
export function AboutSection() {
  return (
    <Section id="about" label="About" title={about.heading}>
      <div className={styles.intro}>
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <figcaption>{about.photoCaption}</figcaption>
        </figure>

        <div className={styles.story}>
          <RevealGroup className={styles.paragraphs}>
            {about.story.map((paragraph) => (
              <RevealItem as="p" key={paragraph}>
                {paragraph}
              </RevealItem>
            ))}
          </RevealGroup>

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

          <Reveal as="ul" className={styles.domains} aria-label="Product domains">
            {about.domains.map((domain) => (
              <li key={domain}>{domain}</li>
            ))}
          </Reveal>
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockLabel}>What I bring</h3>
        <RevealGroup as="ol" className={styles.strengths}>
          {about.strengths.map((item, index) => (
            <RevealItem as="li" key={item.title}>
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className={styles.block}>
        <h3 className={styles.blockLabel}>Proof from the work</h3>
        <RevealGroup as="ul" className={styles.proof}>
          {about.proof.map((item) => {
            const project = getProject(item.project)
            return (
              <RevealItem as="li" key={item.label}>
                <Link to={`/work/${item.project}`} className={styles.proofLink}>
                  <span className={styles.proofValue}>
                    <CountUp value={item.value} />
                  </span>
                  <span className={styles.proofLabel}>{item.label}</span>
                  <span className={styles.proofProject}>
                    {project?.title} case study <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </Section>
  )
}
