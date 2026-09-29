import { profile } from '../data/profile'
import { usePageMeta } from '../hooks/usePageMeta'
import { Hero } from '../sections/Hero'
import { AboutSection } from '../sections/AboutSection'
import { WorkSection } from '../sections/WorkSection'
import { SkillsSection } from '../sections/SkillsSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { ResumeSection } from '../sections/ResumeSection'

/*
  The homepage is one long scroll, in this order:
  1 Home · 2 Work · 3 About · 4 Experience · 5 Skills · 6 Resume · 7 Contact (the footer, on every page)
  The work comes straight after the intro, so it is the first thing people scroll into.
  To reorder sections, move the lines below.
*/
export default function Home() {
  usePageMeta({
    description: `${profile.name} is a ${profile.role} in ${profile.location} who designs enterprise, SaaS and AI products.`,
  })

  return (
    <>
      <Hero />
      <WorkSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ResumeSection />
    </>
  )
}
