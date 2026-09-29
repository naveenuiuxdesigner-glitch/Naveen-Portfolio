import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Visual } from '../mockups/Visual'
import { CountUp } from '../motion/CountUp'
import { Reveal } from '../motion/Reveal'
import { duration, ease } from '../../lib/motion'
import styles from './CaseStory.module.css'

/*
  The parts of a case-study story (challenge, approach…). Which parts a project has: see parts.js.
  Screens do most of the explaining; text stays to a sentence or two.
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
      return <Challenge data={story.challenge} {...shared} />
    case 'approach':
      return <Approach items={story.approach} {...shared} />
    case 'product':
      return <Product items={story.product} {...shared} />
    case 'flows':
      return <Flows items={story.flows} {...shared} />
    case 'system':
      return <System data={story.system} {...shared} />
    case 'outcome':
      return <Outcome data={story.outcome} />
    default:
      return null
  }
}

function Statement({ children }) {
  return (
    <motion.p className={styles.statement} {...fade}>
      {children}
    </motion.p>
  )
}

function Challenge({ data, screenMap, onOpen }) {
  return (
    <div className={styles.stack}>
      <Statement>{data.statement}</Statement>

      {data.compare && (
        <Reveal className={styles.compare}>
          {[data.compare.before, data.compare.after].map((side, index) => (
            <div key={side.label} className={`${styles.compareSide} ${index === 1 ? styles.compareAfter : ''}`}>
              <p className={styles.compareLabel}>{side.label}</p>
              <ul>
                {side.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      )}

      {data.visual && (
        <Reveal>
          <Visual visual={data.visual} screenMap={screenMap} onOpen={onOpen} />
        </Reveal>
      )}

      {data.users?.length > 0 && (
        <Reveal className={styles.users}>
          <p className={styles.miniLabel}>{data.usersLabel ?? 'Designed for'}</p>
          <ul>
            {data.users.map((user) => (
              <li key={user.title}>
                {user.code && <span className={styles.userCode}>{user.code}</span>}
                <span className={styles.userText}>
                  <strong>{user.title}</strong>
                  {user.line && <span>{user.line}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </div>
  )
}

function Approach({ items, screenMap, onOpen }) {
  return (
    <ol className={styles.decisions}>
      {items.map((item, index) => (
        <li key={item.title} className={styles.decision}>
          <Reveal className={styles.decisionText}>
            <span className={styles.decisionNumber}>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </Reveal>
          {item.visual && (
            <Reveal className={styles.decisionVisual} delay={0.08}>
              <Visual visual={item.visual} screenMap={screenMap} onOpen={onOpen} />
            </Reveal>
          )}
        </li>
      ))}
    </ol>
  )
}

function Product({ items, screenMap, onOpen }) {
  return (
    <div className={styles.showcase}>
      {items.map((item) => (
        <article key={item.title} className={styles.feature}>
          <Reveal className={styles.featureHead}>
            <h3>{item.title}</h3>
            {item.text && <p>{item.text}</p>}
          </Reveal>
          {item.visual && (
            <Reveal delay={0.06}>
              <Visual visual={item.visual} screenMap={screenMap} onOpen={onOpen} />
            </Reveal>
          )}
        </article>
      ))}
    </div>
  )
}

function Flows({ items, screenMap, onOpen }) {
  return (
    <div className={styles.showcase}>
      {items.map((flow) => (
        <article key={flow.title} className={styles.flow}>
          <Reveal className={styles.featureHead}>
            <h3>{flow.title}</h3>
            {flow.note && <p>{flow.note}</p>}
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
              <Visual visual={flow.visual} screenMap={screenMap} onOpen={onOpen} />
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

      {data.cards?.length > 0 && (
        <Reveal as="ul" className={styles.cards}>
          {data.cards.map((card) => (
            <li key={card.label}>
              <p className={styles.cardLabel}>{card.label}</p>
              <p>{card.text}</p>
            </li>
          ))}
        </Reveal>
      )}

      {data.visual && (
        <Reveal>
          <Visual visual={data.visual} screenMap={screenMap} onOpen={onOpen} />
        </Reveal>
      )}

      {data.note && <p className={styles.note}>{data.note}</p>}
    </div>
  )
}

function Outcome({ data }) {
  return (
    <div className={styles.stack}>
      {data.statement && <Statement>{data.statement}</Statement>}

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

      {data.cards?.length > 0 && (
        <Reveal className={styles.outcomeCards}>
          {data.cardsLabel && <p className={styles.miniLabel}>{data.cardsLabel}</p>}
          <ul className={styles.cards}>
            {data.cards.map((card) => (
              <li key={card.label}>
                <p className={styles.cardLabel}>{card.label}</p>
                <p>{card.text}</p>
              </li>
            ))}
          </ul>
          {data.cardsNote && <p className={styles.note}>{data.cardsNote}</p>}
        </Reveal>
      )}

      {data.learnings?.length > 0 && (
        <Reveal className={styles.learnings}>
          <p className={styles.miniLabel}>What I learned</p>
          <ol>
            {data.learnings.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                {item.text && <p>{item.text}</p>}
              </li>
            ))}
          </ol>
        </Reveal>
      )}
    </div>
  )
}
