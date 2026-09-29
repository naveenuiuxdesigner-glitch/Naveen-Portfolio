import { projects } from '../data/projects'
import { pocs } from '../data/pocs'
import { usePageMeta } from '../hooks/usePageMeta'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { StageNote } from '../components/ui/StageNote'
import { ProjectList } from '../components/work/ProjectList'
import styles from './Page.module.css'

export default function Work() {
  usePageMeta({
    title: 'Work',
    description: 'Selected case studies in enterprise, SaaS and AI product design by Naveen Peddi.',
  })

  return (
    <Container className={styles.page}>
      <SectionHeading
        as="h1"
        label="Work / Case studies"
        title="All work"
        intro="Six featured case studies, followed by an archive of proofs of concept."
      />
      <ProjectList projects={projects} />

      <section aria-labelledby="pocs-title" className={styles.archive}>
        <SectionHeading as="h2" id="pocs-title" label="Archive" title="Proofs of concept" />
        <ul className={styles.pocList}>
          {pocs.map((poc) => (
            <li key={poc.name}>{poc.name}</li>
          ))}
        </ul>
        {import.meta.env.DEV && <StageNote>Each POC gets a short description, domain and year in Stage 4.</StageNote>}
      </section>
    </Container>
  )
}
