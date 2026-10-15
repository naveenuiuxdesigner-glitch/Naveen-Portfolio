import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Visual } from '../mockups/Visual'
import { CountUp } from '../motion/CountUp'
import { Reveal } from '../motion/Reveal'
import { duration, ease } from '../../lib/motion'
import styles from './CaseStory.module.css'

/*
  The parts of a case-study story (problem, key screens…). Which parts a project has: see parts.js.
  Screens lead, at full width; the case-study text, personas, cards and learnings sit alongside them in full.
*/
const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: duration.slower, ease: ease.out },
}

export function StoryPart({ part, id, number, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.part}>
      <motion.h2 id={`${id}-title`} className={styles.partLabel} {...fade}>
        <span>{String(number).padStart(2, '0')}</span>
        {part.title}
      </motion.h2>
      {children}
    </section>
  )
}

// The body of one part, chosen by its id
export function StoryContent({ part, story, screenMap, onOpen }) {
  const shared = { screenMap, onOpen }
  switch (part.id) {
    case 'challenge':
      return <Problem data={story.challenge} {...shared} />
    case 'approach':
      return <Features items={story.approach} numbered {...shared} />
    case 'flows':
      return <Flows compare={story.challenge?.compare} items={story.flows} {...shared} />
    case 'product':
      return <Features items={story.product} {...shared} />
    case 'system':
      return <System data={story.system} {...shared} />
    case 'outcome':
      return <Outcome data={story.outcome} />
    default:
      return null
  }
}

/* ---------- Small pieces ---------- */

// The part's point, set large: one sentence
function Statement({ children }) {
  return (
    <motion.p className={styles.statement} {...fade}>
      {children}
    </motion.p>
  )
}

/* ---------- Parts ---------- */

function Problem({ data, screenMap, onOpen }) {
  return (
    <div className={styles.stack}>
      <Statement>{data.statement}</Statement>

      {data.visual && (
        <Reveal>
          <Visual visual={data.visual} screenMap={screenMap} onOpen={onOpen} large />
        </Reveal>
        )}

      {data.users?.length > 0 && (
        <Reveal>
          <Users label={data.usersLabel} users={data.users} />
        </Reveal>
      )}
    </div>
  )
}

function Users({ label, users }) {
  return (
    <div className={styles.users}>
      <p className={styles.miniLabel}>{label ?? 'Designed for'}</p>
      <ul>
        {users.map((user) => (
          <li key={user.title}>
            {user.code && <span className={styles.userCode}>{user.code}</span>}
            <span className={styles.userText}>
              <strong>{user.title}</strong>
              {user.line && <span>{user.line}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Key screens (numbered) and Final UI: a short heading and line, then a large visual
function Features({ items, numbered = false, screenMap, onOpen }) {
  const List = numbered ? 'ol' : 'div'
  const Item = numbered ? 'li' : 'article'
  return (
    <List className={styles.showcase}>
      {items.map((item, index) => (
        <Item key={item.title} className={styles.feature}>
          <Reveal className={styles.featureHead}>
            <h3>
              {numbered && <span className={styles.featureNumber}>{String(index + 1).padStart(2, '0')}</span>}
              {item.title}
            </h3>
            {item.text && (
              <div className={styles.featureText}>
                <p>{item.text}</p>
              </div>
            )}
          </Reveal>
          {item.visual && (
            <Reveal delay={0.06}>
              <Visual visual={item.visual} screenMap={screenMap} onOpen={onOpen} large />
            </Reveal>
        )}
        </Item>
      ))}
    </List>
  )
}

// "Before · As-is", but just "Before" when the label already says it
const sideLabel = (label, side) => (label.toLowerCase() === side.toLowerCase() ? label : `${side} · ${label}`)

function Flows({ compare, items = [], screenMap, onOpen }) {
  return (
    <div className={styles.showcase}>
      {compare && (
        <div className={styles.feature}>
          <Reveal className={styles.compare}>
            {[compare.before, compare.after].map((side, index) => (
              <div key={side.label} className={`${styles.compareSide} ${index === 1 ? styles.compareAfter : ''}`}>
                <p className={styles.compareLabel}>{sideLabel(side.label, index === 0 ? 'Before' : 'After')}</p>
                <ul>
                  {side.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>
      )}

      {items.map((flow) => (
        <article key={flow.title} className={styles.feature}>
          <Reveal className={styles.featureHead}>
            <h3>{flow.title}</h3>
            {flow.note && (
              <div className={styles.featureText}>
                <p>{flow.note}</p>
              </div>
            )}
          </Reveal>
          {flow.steps && (
            <Reveal as="ol" className={styles.chain}>
              {flow.steps.map((step, index) => (
                <li key={`${step}-${index}`}>
                  <span className={styles.chainStep}>
                    <span className={styles.chainNumber}>{String(index + 1).padStart(2, '0')}</span>
                    {step}
                  </span>
                  {index < flow.steps.length - 1 && <ArrowRight className={styles.chainArrow} size={14} strokeWidth={1.75} aria-hidden="true" />}
                </li>
              ))}
            </Reveal>
          )}
          {flow.visual && (
            <Reveal delay={0.06}>
              <Visual visual={flow.visual} screenMap={screenMap} onOpen={onOpen} large />
            </Reveal>
          )}
        </article>
      ))}
    </div>
  )
}

function System({ data, screenMap, onOpen }) {
  return (
    <div className={styles.stack}>
      {data.text && <Statement>{data.text}</Statement>}

      {data.cards?.length > 0 && (
        <Reveal>
          <Cards cards={data.cards} />
        </Reveal>
      )}

      {data.swatches?.length > 0 && (
        <Reveal as="ul" className={styles.swatches}>
          {data.swatches.map((swatch) => (
            <li key={swatch.name}>
              <span className={styles.swatch} style={{ background: swatch.color }} aria-hidden="true" />
              <strong>{swatch.name}</strong>
              {swatch.use && <span>{swatch.use}</span>}
            </li>
          ))}
        </Reveal>
      )}

      {data.visual && (
        <Reveal>
          <Visual visual={data.visual} screenMap={screenMap} onOpen={onOpen} large />
        </Reveal>
        )}

      {data.note && <p className={styles.note}>{data.note}</p>}
    </div>
  )
}

function Cards({ cards }) {
  return (
    <ul className={styles.cards}>
      {cards.map((card) => (
        <li key={card.label}>
          <p className={styles.cardLabel}>{card.label}</p>
          <p>{card.text}</p>
        </li>
      ))}
    </ul>
  )
}

function Outcome({ data }) {
  return (
    <div className={styles.stack}>
      {data.statement && <Statement>{data.statement}</Statement>}

      {/* The numbers stay in view, with their note, so nothing reads as a bigger claim than it is */}
      {data.stats && (
        <Reveal className={styles.stats}>
          <p className={styles.miniLabel}>{data.stats.label}</p>
          <dl>
            {data.stats.items.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>
                  <CountUp value={item.value} />
                </dd>
              </div>
            ))}
          </dl>
          {data.stats.note && <p className={styles.note}>{data.stats.note}</p>}
        </Reveal>
      )}

      {(data.cards?.length > 0 || data.learnings?.length > 0) && (
        <Reveal className={styles.stack}>
          {data.cards?.length > 0 && (
            <div className={styles.outcomeCards}>
              {data.cardsLabel && <p className={styles.miniLabel}>{data.cardsLabel}</p>}
              <Cards cards={data.cards} />
              {data.cardsNote && <p className={styles.note}>{data.cardsNote}</p>}
            </div>
          )}
          {data.learnings?.length > 0 && (
            <div className={styles.learnings}>
              <p className={styles.miniLabel}>What I learned</p>
              <ol>
                {data.learnings.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    {item.text && <p>{item.text}</p>}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Reveal>
      )}
    </div>
  )
}
