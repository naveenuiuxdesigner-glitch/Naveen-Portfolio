import { ArrowRight } from 'lucide-react'
import { projects } from '../data/projects'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { ProjectList } from '../components/work/ProjectList'

// 2 · Work: the six featured projects, each linking to its case study
export function WorkSection() {
  return (
    <Section
      id="work"
      label="Selected work"
      title="Six products, from agentic AI to HealthTech"
      aside={
        <Button variant="text" to="/work" icon={ArrowRight}>
          All work and POCs
        </Button>
      }
    >
      <ProjectList projects={projects} />
    </Section>
  )
}
