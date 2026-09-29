import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { Container } from '../components/ui/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { Tag } from '../components/ui/Tag'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import styles from './Foundation.module.css'

/*
  The design foundation, shown as a living style guide.
  Everything on this page reads from styles/tokens.css, so it always
  shows the real values. It's hidden from search engines.
*/

const colors = [
  { name: 'Background', token: '--color-bg', hex: '#0C0D10', use: 'Page background' },
  { name: 'Raised', token: '--color-bg-raised', hex: '#111317', use: 'Footer and banded sections' },
  { name: 'Surface', token: '--color-surface', hex: '#16181D', use: 'Cards and screen frames' },
  { name: 'Line', token: '--color-line', hex: '#262A31', use: 'Hairline dividers' },
  { name: 'Text', token: '--color-text', hex: '#EEEDE8', use: 'Primary text · 16.6:1' },
  { name: 'Muted', token: '--color-text-muted', hex: '#A3A7AF', use: 'Secondary text · 8.0:1' },
  { name: 'Subtle', token: '--color-text-subtle', hex: '#868B95', use: 'Labels and captions · 5.7:1' },
  { name: 'Accent', token: '--color-accent', hex: '#F2A44B', use: 'Labels, hover, active, focus · 9.4:1' },
]

const typeScale = [
  { token: '--text-display', size: '40 → 88px', sample: 'Naveen Peddi', font: 'display', weight: 600 },
  { token: '--text-3xl', size: '34 → 56px', sample: 'Clarity in complex software', font: 'display', weight: 600 },
  { token: '--text-2xl', size: '28 → 40px', sample: 'Section heading', font: 'display', weight: 600 },
  { token: '--text-xl', size: '20 → 26px', sample: 'Small heading', font: 'display', weight: 600 },
  { token: '--text-lg', size: '18 → 20px', sample: 'Lead text introduces a section in one or two sentences.', font: 'body', weight: 400 },
  { token: '--text-base', size: '16 → 17px', sample: 'Body text is set in Inter. It stays readable at long lengths, and lines never run wider than about 62 characters.', font: 'body', weight: 400 },
  { token: '--text-sm', size: '14px', sample: 'Supporting text, buttons and navigation.', font: 'body', weight: 400 },
  { token: '--text-xs', size: '12px', sample: 'ROLE · LEAD DESIGNER · 2024', font: 'label', weight: 600 },
]

const spacing = [
  ['--space-1', 4], ['--space-2', 8], ['--space-3', 12], ['--space-4', 16], ['--space-5', 24],
  ['--space-6', 32], ['--space-7', 48], ['--space-8', 64], ['--space-9', 96], ['--space-10', 128],
]

const breakpoints = [
  { name: 'Mobile', range: 'Under 640px', layout: 'One column, full-width images, Menu button' },
  { name: 'Tablet', range: '640 – 1023px', layout: 'Two columns where useful, Menu button' },
  { name: 'Laptop', range: '1024 – 1439px', layout: '12-column grid, full top menu, side index in case studies' },
  { name: 'Large desktop', range: '1440px and up', layout: 'Content stops at 1360px so lines stay readable' },
]

const motionTokens = [
  { token: '--duration-fast', value: '150ms', use: 'Color changes on hover' },
  { token: '--duration-base', value: '250ms', use: 'Hover movement, menu open' },
  { token: '--duration-slow', value: '400ms', use: 'Header hide and show' },
  { token: '--duration-slower', value: '700ms', use: 'Text and section reveals' },
  { token: '--ease-out', value: 'cubic-bezier(0.22, 1, 0.36, 1)', use: 'Quick start, gentle stop. No bounce.' },
]

export default function Foundation() {
  usePageMeta({ title: 'Design foundation', noindex: true })

  return (
    <Container className={styles.page}>
      <RevealGroup onLoad className={styles.intro}>
        <RevealItem as="p" className="label">
          Stage 1 · Design foundation
        </RevealItem>
        <RevealItem as="h1">The building blocks of the site</RevealItem>
        <RevealItem as="p" className="lead">
          Colors, type, spacing, breakpoints and motion. Every page is built from these values, so the whole site stays
          consistent.
        </RevealItem>
      </RevealGroup>

      {/* Color */}
      <section className={styles.section} aria-labelledby="color">
        <SectionHeading id="color" label="01 · Color" title="A deep, quiet canvas" intro="Near-black with a cool bias, warm off-white text, and one warm accent used sparingly. Contrast ratios are measured against the background." />
        <Reveal className={styles.swatches}>
          {colors.map((c) => (
            <div key={c.token} className={styles.swatch}>
              <div className={styles.chip} style={{ background: `var(${c.token})` }} />
              <div className={styles.swatchText}>
                <strong>{c.name}</strong>
                <code>{c.hex}</code>
                <span>{c.use}</span>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Typography */}
      <section className={styles.section} aria-labelledby="type">
        <SectionHeading id="type" label="02 · Typography" title="Two fonts, one job each" intro="Plus Jakarta Sans for headings, Inter for reading, interface and labels. Sizes grow smoothly with the screen." />
        <div className={styles.typeList}>
          {typeScale.map((t) => (
            <Reveal key={t.token} className={styles.typeRow}>
              <div className={styles.typeMeta}>
                <code>{t.token}</code>
                <span>{t.size}</span>
              </div>
              <p
                className={styles[`sample-${t.font}`]}
                style={{ fontSize: `var(${t.token})`, fontWeight: t.weight }}
              >
                {t.sample}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section className={styles.section} aria-labelledby="spacing">
        <SectionHeading id="spacing" label="03 · Spacing" title="A 4px spacing scale" intro="Every gap and padding comes from this list. Big sections are separated by 64px on phones, growing to 160px on large screens." />
        <Reveal className={styles.spaceList}>
          {spacing.map(([token, px]) => (
            <div key={token} className={styles.spaceRow}>
              <code>{token}</code>
              <span className={styles.spaceBar} style={{ width: `var(${token})` }} />
              <span className={styles.spacePx}>{px}px</span>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Breakpoints */}
      <section className={styles.section} aria-labelledby="breakpoints">
        <SectionHeading id="breakpoints" label="04 · Breakpoints" title="Four screen sizes" intro="The layout adapts at these widths. Resize your browser window to see the header switch to a Menu button." />
        <Reveal className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Screen</th>
                <th scope="col">Width</th>
                <th scope="col">What changes</th>
              </tr>
            </thead>
            <tbody>
              {breakpoints.map((b) => (
                <tr key={b.name}>
                  <td>{b.name}</td>
                  <td>{b.range}</td>
                  <td>{b.layout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      {/* Motion */}
      <section className={styles.section} aria-labelledby="motion">
        <SectionHeading id="motion" label="05 · Motion" title="Subtle and purposeful" intro="Short, calm movements that start quickly and settle gently. Visitors who turn on 'reduce motion' get simple fades instead." />
        <Reveal className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Value</th>
                <th scope="col">Used for</th>
              </tr>
            </thead>
            <tbody>
              {motionTokens.map((m) => (
                <tr key={m.token}>
                  <td><code>{m.token}</code></td>
                  <td><code>{m.value}</code></td>
                  <td>{m.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="muted">Hover over these to feel the interactions. The cards below also reveal one after another as you scroll to them.</p>
        <RevealGroup className={styles.demoGrid}>
          {['Scroll reveal', 'Hover lift', 'Image movement'].map((label) => (
            <RevealItem key={label} className={styles.demoCard} tabIndex={0}>
              <div className={styles.demoMedia}>
                <div className={styles.demoScreen} aria-hidden="true">
                  <span /><span /><span />
                </div>
              </div>
              <div className={styles.demoText}>
                <strong>{label}</strong>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" className={styles.demoArrow} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Components */}
      <section className={styles.section} aria-labelledby="components">
        <SectionHeading id="components" label="06 · Components" title="First building blocks" intro="Reusable pieces, like Figma components. More are added in each stage." />
        <Reveal className={styles.componentGrid}>
          <div className={styles.componentBox}>
            <p className="label">Buttons</p>
            <div className={styles.row}>
              <Button variant="primary" icon={ArrowRight}>View work</Button>
              <Button>Get in touch</Button>
              <Button variant="text" icon={ArrowUpRight}>Read case study</Button>
            </div>
          </div>
          <div className={styles.componentBox}>
            <p className="label">Tags</p>
            <div className={styles.row}>
              <Tag>Lead designer</Tag>
              <Tag>Web app</Tag>
              <Tag>Design system</Tag>
              <Tag>2024</Tag>
            </div>
          </div>
          <div className={styles.componentBox}>
            <p className="label">Section heading</p>
            <SectionHeading as="h3" label="Selected work" title="Projects" intro="Label, heading and one intro line." />
          </div>
        </Reveal>
      </section>
    </Container>
  )
}
