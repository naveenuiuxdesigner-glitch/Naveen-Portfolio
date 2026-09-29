import { Fragment, useRef } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import { getProject } from '../data/projects'
import { duration, ease } from '../lib/motion'
import { usePointerVars } from '../hooks/usePointerVars'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { RevealGroup, RevealItem } from '../components/motion/Reveal'
import { BrowserFrame, PhoneFrame } from '../components/mockups/Devices'
import styles from './Hero.module.css'

// The kinds of products you design, from your CV's domain experience
const domains = ['Enterprise SaaS', 'AI products', 'EdTech', 'HealthTech', 'Cybersecurity']

// Real screens from real case studies, laid out like a desk of work in progress.
// depth: how far each one drifts with the cursor (px). Nearer ones move more.
const showcase = [
  { slug: 'projam-ai', screen: 'overview', className: 'cardBack', depth: 6 },
  { slug: 'learnopedia', screen: 'overview', className: 'cardLow', depth: 10 },
  { slug: 'sampatee', screen: 'home', className: 'cardFront', depth: 16 },
]

// The name rises out of a mask, word by word
const wordVariants = {
  hidden: { y: '105%' },
  visible: { y: '0%', transition: { duration: duration.slower + 0.2, ease: ease.out } },
}

// 1 · Home: who you are, what you do and what you design, in one screen
export function Hero() {
  const sectionRef = useRef(null)
  const pointer = usePointerVars(sectionRef)

  return (
    <section ref={sectionRef} id="home" aria-labelledby="home-title" className={styles.hero}>
      {/* A soft light that follows the cursor (mouse only) */}
      {pointer && <div className={styles.spotlight} aria-hidden="true" />}

      <Container className={styles.stage}>
        {/* Page-load sequence: each line rises in, one after another */}
        <RevealGroup onLoad delay={0.1} className={styles.intro}>
          {profile.availability && (
            <RevealItem as="p" className={styles.status}>
              <span className={styles.dot} aria-hidden="true" />
              {profile.availability}
            </RevealItem>
          )}
          <motion.h1
            id="home-title"
            className={styles.name}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          >
            {profile.name.split(' ').map((word, index) => (
              <Fragment key={word}>
                {index > 0 && ' '}
                <span className={styles.word}>
                  <motion.span className={styles.wordInner} variants={wordVariants}>
                    {word}
                  </motion.span>
                </span>
              </Fragment>
            ))}
          </motion.h1>
          <RevealItem as="p" className={styles.role}>
            {profile.role}
          </RevealItem>
          <RevealItem as="p" className={styles.thesis}>
            {profile.thesis}
          </RevealItem>
          <RevealItem as="ul" className={styles.facts} aria-label="At a glance">
            <li>{profile.experience} experience</li>
            {profile.currentCompany && <li>Currently at {profile.currentCompany}</li>}
            <li>{profile.location}</li>
          </RevealItem>
          <RevealItem className={styles.actions}>
            <Button variant="primary" to={{ pathname: '/', hash: '#work' }} icon={ArrowRight} magnetic>
              View work
            </Button>
            <Button to={{ hash: '#contact' }} magnetic>
              Get in touch
            </Button>
          </RevealItem>
        </RevealGroup>

        <HeroShowcase />

        <RevealGroup onLoad delay={0.7} as="ul" className={styles.domains} aria-label="Products I design">
          {domains.map((domain) => (
            <RevealItem as="li" key={domain}>
              {domain}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}

// Three real product screens. Each one opens its case study.
function HeroShowcase() {
  return (
    <div className={styles.showcase}>
      {showcase.map((item, index) => {
        const project = getProject(item.slug)
        const screen = project?.screens[item.screen]
        if (!screen) return null
        const Frame = screen.wide ? BrowserFrame : PhoneFrame
        return (
          <motion.div
            key={item.slug}
            className={`${styles.card} ${styles[item.className]}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slower + 0.2, ease: ease.out, delay: 0.45 + index * 0.12 }}
          >
            <div className={styles.parallax} style={{ '--depth': `${item.depth}px` }}>
              <Link to={`/work/${item.slug}`} className={styles.cardLink} aria-label={`${project.title} case study`}>
                <span className={styles.cardScreen}>
                  <Frame screen={screen} eager={index === 0} />
                </span>
              </Link>
            </div>
          </motion.div>
        )
      })}
      <p className={styles.showcaseCaption}>Real screens · Projam AI, Learnopedia, SAMpatee</p>
    </div>
  )
}
