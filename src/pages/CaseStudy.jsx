import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { factFields, getNextProject, getProject } from '../data/projects'
import { usePageMeta } from '../hooks/usePageMeta'
import { scrollToTarget } from '../lib/scrollToTarget'
import { cameFromCard, supportsViewTransitions } from '../lib/cardTransition'
import { duration, ease } from '../lib/motion'
import { Container } from '../components/ui/Container'
import { RevealGroup, RevealItem } from '../components/motion/Reveal'
import { Visual } from '../components/mockups/Visual'
import { StoryContent, StoryPart } from '../components/story/CaseStory'
import { partsFor } from '../components/story/parts'
import { CaseSectionNav } from '../components/case-study/CaseSectionNav'
import { ScreenViewer } from '../components/case-study/ScreenViewer'
import { NextProject } from '../components/case-study/NextProject'
import NotFound from './NotFound'
import styles from './CaseStudy.module.css'

/*
  One case study, told visually:
  a hero (name, one line, a few facts, the strongest screen), then the story parts with the sticky
  section list beside them on laptops, then a large teaser for the next project.
  Every screen opens full size in the viewer.
*/
export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProject(slug)
  const next = getNextProject(slug)
  const [viewerIndex, setViewerIndex] = useState(null)
  // Opened from a Work card: the card's screens glide into the hero, so the hero skips its own fade-in
  const [fromCard] = useState(() => supportsViewTransitions && cameFromCard(slug))
  // Start at the top before the transition takes its "after" picture, so the glide lands on the hero
  useLayoutEffect(() => {
    if (fromCard) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [fromCard])

  // The story downloads only when a case study is opened (see loadStory in projects.js),
  // so the home page stays light. Until it arrives, the hero shows and the parts below wait.
  const [loaded, setLoaded] = useState({ slug: null, story: null, failed: false })
  useEffect(() => {
    if (!project) return undefined
    let current = true
    project
      .loadStory()
      .then((module) => current && setLoaded({ slug, story: module.story, failed: false }))
      .catch(() => current && setLoaded({ slug, story: null, failed: true }))
    return () => {
      current = false
    }
  }, [project, slug])

  const story = loaded.slug === slug ? loaded.story : null
  const failed = loaded.slug === slug && loaded.failed
  const ready = Boolean(story)

  // Opening a link like /work/limina#cs-product: the parts arrive after the page,
  // so once they're on screen, scroll to the one in the address.
  const { hash } = useLocation()
  useEffect(() => {
    if (!ready || !hash) return undefined
    const id = decodeURIComponent(hash.slice(1))
    const frame = window.requestAnimationFrame(() => scrollToTarget(id))
    return () => window.cancelAnimationFrame(frame)
    // Only when the parts first appear; clicks on the section list are handled by ScrollToHash
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, slug])

  usePageMeta({
    title: project?.title ?? 'Not found',
    description: project?.tagline || project?.summary || `${project?.title} case study by Naveen Peddi.`,
  })

  const parts = useMemo(() => partsFor(story), [story])
  const partIds = useMemo(() => parts.map((part) => `cs-${part.id}`), [parts])

  // Every real screen, in order. The viewer steps through these.
  const screenItems = useMemo(
    () => Object.entries(project?.screens ?? {}).map(([id, screen]) => ({ id, screen })),
    [project],
  )
  const openScreen = useCallback((id) => setViewerIndex(screenItems.findIndex((item) => item.id === id)), [screenItems])
  const closeViewer = useCallback(() => setViewerIndex(null), [])

  if (!project) return <NotFound />

  const facts = factFields.filter((field) => project[field.key])

  return (
    <div className={styles.page}>
      <Container className={styles.top}>
        <Link to={{ pathname: '/', hash: '#work' }} className={styles.back}>
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          All work
        </Link>

        <RevealGroup onLoad className={styles.hero}>
          <RevealItem as="p" className={styles.label}>
            {project.label || 'Case study'}
          </RevealItem>
          <h1 className={styles.title}>
            <span className={styles.mask}>
              <motion.span
                className={styles.maskInner}
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: duration.slower + 0.2, ease: ease.out }}
              >
                {project.title}
              </motion.span>
            </span>
          </h1>
          {project.meta?.length > 0 && (
            <RevealItem as="ul" className={styles.meta} aria-label="Project type">
              {project.meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </RevealItem>
          )}
          <RevealItem as="p" className={styles.tagline}>
            {project.tagline || project.summary}
          </RevealItem>
          {facts.length > 0 && (
            <RevealItem as="dl" className={styles.facts}>
              {facts.map((field) => (
                <div key={field.key}>
                  <dt>{field.label}</dt>
                  <dd>{project[field.key]}</dd>
                </div>
              ))}
            </RevealItem>
          )}
        </RevealGroup>
      </Container>

      {project.heroVisual && (
        <Container className={styles.heroVisual}>
          <motion.div
            initial={fromCard ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slower + 0.2, ease: ease.out, delay: 0.25 }}
            style={{ viewTransitionName: 'project-media' }}
          >
            <Visual visual={project.heroVisual} screenMap={project.screens} onOpen={openScreen} eager />
          </motion.div>
        </Container>
      )}

      <Container>
        {!ready ? (
          failed && <p className="lead">This case study didn’t load. Refresh the page to try again.</p>
        ) : (
          <div className={styles.body}>
            <CaseSectionNav sections={parts.map((part) => ({ id: part.id, title: part.nav }))} ids={partIds} />
            <div className={styles.parts}>
              {parts.map((part, index) => (
                <StoryPart key={part.id} part={part} id={partIds[index]} number={index + 1}>
                  <StoryContent part={part} story={story} screenMap={project.screens} onOpen={openScreen} />
                </StoryPart>
              ))}
            </div>
          </div>
        )}
      </Container>

      {ready && <NextProject project={next} />}

      {screenItems.length > 0 && (
        <ScreenViewer items={screenItems} index={viewerIndex} onClose={closeViewer} onChange={setViewerIndex} />
      )}
    </div>
  )
}
