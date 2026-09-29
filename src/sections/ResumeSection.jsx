import { ArrowDownToLine } from 'lucide-react'
import { resume } from '../data/resume'
import { profile } from '../data/profile'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/motion/Reveal'
import styles from './ResumeSection.module.css'

// Resume: one slim band with the key facts and the download
export function ResumeSection() {
  return (
    <section id="resume" aria-labelledby="resume-title" className={styles.section}>
      <Container>
        <Reveal className={styles.band}>
          <h2 id="resume-title" className={styles.title}>
            Resume
          </h2>
          <ul className={styles.highlights}>
            {resume.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            {resume.fileUrl ? (
              <Button
                variant="primary"
                href={resume.fileUrl}
                icon={ArrowDownToLine}
                download={`${profile.name.replace(' ', '-')}-Resume.pdf`}
              >
                Download resume ({resume.fileLabel})
              </Button>
            ) : (
              // Placeholder until the final PDF is added in src/data/resume.js
              <span className={styles.pending}>PDF coming soon</span>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
