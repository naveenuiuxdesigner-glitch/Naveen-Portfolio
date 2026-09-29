import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/profile'
import { jumpTo } from '../../lib/scrollToTarget'
import { resume } from '../../data/resume'
import { experience } from '../../data/experience'
import { Container } from '../ui/Container'
import { CopyEmail } from '../ui/CopyEmail'
import { LocalTime } from '../ui/LocalTime'
import styles from './Footer.module.css'

// The contact section. Appears at the bottom of every page (the "Contact" menu link jumps here).
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
                  <a href={resume.fileUrl}>
                    Resume
                    <ArrowUpRight size={14} aria-hidden="true" />
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
          <p className="muted">
            © {year} {profile.name}. Designed and built by me.
          </p>
          <a href="#top" className={styles.top} onClick={jumpTo('top')}>
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
