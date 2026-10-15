import { Fragment, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { duration, ease } from '../lib/motion'
import { usePointerVars } from '../hooks/usePointerVars'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { RevealGroup, RevealItem } from '../components/motion/Reveal'
import { Parallax } from '../components/motion/Parallax'
import { ParticleMark } from '../components/motion/ParticleMark'
import markStyles from '../components/motion/ParticleMark.module.css'
import styles from './Hero.module.css'

// The kinds of products you design, from your CV's domain experience
const domains = ['Enterprise SaaS', 'AI products', 'EdTech', 'HealthTech', 'Cybersecurity']

// Facts that float around the particle initials, all from the CV and the work list.
// optional: hidden on phones, where there's room for two
const chips = [
  { text: profile.role, style: { top: '6%', left: '4%' }, optional: true },
  { text: `${profile.experience} experience`, style: { top: '2%', right: '6%' }, accent: true },
  { text: `${projects.length} case studies`, style: { bottom: '8%', right: '2%' } },
  { text: profile.location, style: { bottom: '3%', left: '10%' }, optional: true },
]

// The name rises out of a mask, word by word
const wordVariants = {
  hidden: { y: '105%' },
  visible: { y: '0%', transition: { duration: duration.slower, ease: ease.out } },
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

        <HeroMark />

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

// The signature visual: particles that gather into the initials, with a few facts floating around them
function HeroMark() {
  return (
    <Parallax top distance={40} className={styles.markSlot}>
      <ParticleMark text="NP" label={`${profile.name}, ${profile.role}`}>
        {chips.map((chip) => (
          <span key={chip.text} className={[markStyles.chip, chip.accent && markStyles.chipAccent, chip.optional && markStyles.chipOptional].filter(Boolean).join(' ')} style={chip.style}>
            {chip.text}
          </span>
        ))}
      </ParticleMark>
    </Parallax>
  )
}
