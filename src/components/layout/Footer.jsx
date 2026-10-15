import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { profile } from '../../data/profile'
import { jumpTo } from '../../lib/scrollToTarget'
import { resume } from '../../data/resume'
import { experience } from '../../data/experience'
import { Container } from '../ui/Container'
import { CopyEmail } from '../ui/CopyEmail'
import { LocalTime } from '../ui/LocalTime'
import { CardFan } from '../motion/CardFan'
import { duration, ease } from '../../lib/motion'
import styles from './Footer.module.css'

// The contact section. Appears at the bottom of every page (the "Contact" menu link jumps here).
// In order: the invitation, a fan of real screens, the details, and the name, set huge, rising in at the very end.
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-title">
      <Container className={styles.inner}>
        <div className={styles.cta}>
          <p className="label">Contact</p>
          <h2 id="contact-title" className={styles.title}>
            Have a complex product that needs to feel simple?
          </h2>
          <CopyEmail email={profile.email} />
        </div>
      </Container>

      <CardFan />

      <Container className={styles.inner}>
        <div className={styles.meta}>
          <div className={styles.col}>
            <p className="label">Elsewhere</p>
            <ul className={styles.links}>
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noreferrer">
                    {social.label}
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              {resume.fileUrl && (
                <li>
                  <a href={resume.fileUrl} target="_blank" rel="noreferrer">
                    Resume
                    <ArrowUpRight size={14} aria-hidden="true" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className={styles.col}>
            <p className="label">Based in</p>
            <p>{profile.location}</p>
            <p className="muted">
              <LocalTime timeZone={profile.timezone} />
            </p>
          </div>

          {profile.availability && (
            <div className={styles.col}>
              <p className="label">Status</p>
              <p>{profile.availability}</p>
            </div>
          )}
          <div className={styles.col}>
            <p className="label">Currently</p>
            <p>{experience[0].role}</p>
            <p className="muted">at {experience[0].company}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          {/* The year is the build's in the pre-rendered HTML, then the visitor's */}
          <p className="muted" suppressHydrationWarning>
            © {year} {profile.name}. Designed and built by me.
          </p>
          <a href="#top" className={styles.top} onClick={jumpTo('top')}>
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </Container>

      {/* Decoration: the name is already in the line above */}
      <div className={styles.wordmark} aria-hidden="true">
        <motion.p
          initial={{ y: '45%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: duration.slower, ease: ease.out }}
        >
          {profile.name.toLowerCase()}
        </motion.p>
        <motion.span
          className={styles.stripes}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.slower, ease: ease.out, delay: 0.15 }}
        />
      </div>
    </footer>
  )
}
