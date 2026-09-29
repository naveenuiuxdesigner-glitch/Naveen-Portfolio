import { skillGroups, tools } from '../data/skills'
import { Section } from '../components/ui/Section'
import { RevealGroup, RevealItem } from '../components/motion/Reveal'
import styles from './SkillsSection.module.css'

// Skills: each group on one line of small chips, then the tools
export function SkillsSection() {
  return (
    <Section id="skills" label="Skills" title="What I bring to a product team" tone="raised">
      <div className={styles.columns}>
        <RevealGroup as="dl" className={styles.rows}>
          {skillGroups.map((group) => (
            <RevealItem key={group.title} className={styles.row}>
              <dt>{group.title}</dt>
              <dd>
                <ul className={styles.chips}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup as="dl" className={styles.rows}>
          {tools.map((group) => (
            <RevealItem key={group.group} className={styles.row}>
              <dt>{group.group}</dt>
              <dd>
                <ul className={`${styles.chips} ${styles.tools}`}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
