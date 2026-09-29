import { BrowserFrame, DetailCard, Device, PhoneFrame, PlainFrame } from './Devices'
import styles from './Visual.module.css'

/*
  One art-directed visual, built from real screens. Case-study data describes it, e.g.
    { layout: 'phones', screens: ['home', 'chat', 'recharge'], annotations: ['Voice first', 'Proactive'] }

  Layouts
  - browser    one desktop screen, large
  - browsers   two desktop screens, the second overlapping the first
  - phone      one phone (add `crop` to float a detail of it beside the phone)
  - phones     two to four phones side by side
  - detail     a desktop screen with one part of it (`crop`) floating in front
  - sequence   the steps of a flow, numbered and connected
  - stack      wide strips (short dashboards) stacked like cards
  - plain      a diagram or board in a simple card

  annotations: tiny numbered labels under the visual. caption: one short line.
  compact: the Work-list version (no labels, not clickable).
*/
export function Visual({ visual, screenMap, onOpen, eager = false, compact = false, className = '' }) {
  const items = (visual.screens ?? []).map((id) => ({ id, screen: screenMap[id] })).filter((item) => item.screen)
  if (items.length === 0) return null

  const open = (id) => (onOpen && !compact ? () => onOpen(id) : undefined)
  const reveal = !compact
  const layout = visual.layout ?? (items[0].screen.wide ? 'browser' : items.length > 1 ? 'phones' : 'phone')
  const canvas = visual.canvas ?? true

  let body
  switch (layout) {
    case 'browsers':
      body = (
        <div className={styles.browsers}>
          {items.slice(0, 2).map(({ id, screen }, index) => (
            <div key={id} className={index === 0 ? styles.back : styles.front}>
              <BrowserFrame screen={screen} onOpen={open(id)} eager={eager} reveal={reveal} ratio={visual.ratio} />
            </div>
          ))}
        </div>
      )
      break
    case 'phone':
      body = (
        <div className={styles.single}>
          <div className={styles.singlePhone}>
            <PhoneFrame screen={items[0].screen} onOpen={open(items[0].id)} eager={eager} reveal={reveal} />
          </div>
          {visual.crop && (
            <div className={styles.phoneDetail}>
              <DetailCard screen={items[0].screen} crop={visual.crop} onOpen={open(items[0].id)} reveal={reveal} />
            </div>
          )}
        </div>
      )
      break
    case 'phones':
      body = (
        <div className={styles.phones} style={{ '--count': items.length }}>
          {items.map(({ id, screen }) => (
            <div key={id} className={styles.phoneSlot}>
              <PhoneFrame screen={screen} onOpen={open(id)} eager={eager} reveal={reveal} />
            </div>
          ))}
        </div>
      )
      break
    case 'detail':
      body = (
        // The detail is drawn larger than it appears in the screen behind it, so it reads as a zoom
        <div className={styles.detailWrap} style={{ '--float-w': `${Math.round(Math.min(86, Math.max(52, (visual.crop?.w ?? 0.5) * 95)))}%` }}>
          <div className={styles.detailBase}>
            <BrowserFrame screen={items[0].screen} onOpen={open(items[0].id)} eager={eager} reveal={reveal} ratio={visual.ratio} />
          </div>
          <div className={styles.detailFloat}>
            <DetailCard screen={items[0].screen} crop={visual.crop} onOpen={open(items[0].id)} reveal={reveal} />
          </div>
        </div>
      )
      break
    case 'sequence': {
      const wide = items.every(({ screen }) => screen.wide)
      body = (
        <ol className={`${styles.sequence} ${wide ? styles.sequenceWide : ''}`} style={{ '--count': items.length }}>
          {items.map(({ id, screen }, index) => (
            <li key={id} className={styles.step}>
              <span className={styles.stepLabel}>
                <span className={styles.stepNumber}>{String(index + 1).padStart(2, '0')}</span>
                {visual.labels?.[index] ?? screen.caption}
              </span>
              <Device screen={screen} onOpen={open(id)} eager={eager} reveal={reveal} />
            </li>
          ))}
        </ol>
      )
      break
    }
    case 'stack':
      body = (
        <div className={styles.stack}>
          {items.map(({ id, screen }) => (
            <div key={id} className={styles.stackItem}>
              <PlainFrame screen={screen} onOpen={open(id)} eager={eager} reveal={reveal} />
            </div>
          ))}
        </div>
      )
      break
    case 'plain':
      body = (
        <div className={styles.plainWrap}>
          <PlainFrame screen={items[0].screen} onOpen={open(items[0].id)} eager={eager} reveal={reveal} />
        </div>
      )
      break
    default:
      body = (
        <div className={styles.browser}>
          <BrowserFrame screen={items[0].screen} onOpen={open(items[0].id)} eager={eager} reveal={reveal} ratio={visual.ratio} />
        </div>
      )
  }

  const classes = [styles.visual, canvas && styles.canvas, compact && styles.compact, styles[`is-${layout}`], className]
    .filter(Boolean)
    .join(' ')

  return (
    <figure className={classes}>
      <div className={styles.stage}>{body}</div>
      {!compact && (visual.annotations?.length > 0 || visual.caption) && (
        <figcaption className={styles.notes}>
          {visual.caption && <span className={styles.caption}>{visual.caption}</span>}
          {visual.annotations?.length > 0 && (
            <ol className={styles.annotations}>
              {visual.annotations.map((note, index) => (
                <li key={note}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {note}
                </li>
              ))}
            </ol>
          )}
        </figcaption>
      )}
    </figure>
  )
}
