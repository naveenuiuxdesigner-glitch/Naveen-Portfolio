import { usePageMeta } from '../hooks/usePageMeta'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import styles from './Page.module.css'

export default function NotFound() {
  usePageMeta({ title: 'Page not found', noindex: true })

  return (
    <Container className={styles.page}>
      <SectionHeading
        as="h1"
        label="404"
        title="This page doesn’t exist."
        intro="The link may be old, or the address may have a typo."
      />
      <div>
        <Button variant="primary" to="/">
          Go to the homepage
        </Button>
      </div>
    </Container>
  )
}
