import { motion } from 'motion/react'
import styles from './Devices.module.css'

/*
  Product mockups: the ways a real screen can be presented.
  - BrowserFrame: a desktop product in a quiet browser window
  - PhoneFrame:   a mobile screen inside a phone
  - DetailCard:   one cropped part of a screen, floating, to point at a detail
  All three can open the screen full size (onOpen) and settle in as they scroll into view (reveal).
  They are decoration around the real screen, so the frame itself is hidden from screen readers.
*/

// The screen settles into its frame (a slight scale-down) the first time it scrolls into view
const settle = {
  initial: { scale: 1.05 },
  whileInView: { scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

function Screen({ screen, eager, reveal, style, className }) {
  const Img = reveal ? motion.img : 'img'
  return (
    <Img
      {...(reveal ? settle : {})}
      src={screen.src}
      width={screen.width}
      height={screen.height}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className ?? styles.image}
      style={style}
    />
  )
}

// A button when the screen can be opened, a picture otherwise
function Opener({ screen, onOpen, className, children }) {
  if (onOpen) {
    return (
      <button type="button" className={`${className} ${styles.opener}`} onClick={onOpen} aria-label={`${screen.caption}. Open full size`}>
        {children}
      </button>
    )
  }
  return (
    <div className={className} role="img" aria-label={`${screen.caption} screen`}>
      {children}
    </div>
  )
}

/* ratio: the visible window. Long pages are cropped from the top here and shown whole in the viewer. */
export function BrowserFrame({ screen, onOpen, eager = false, reveal = false, ratio }) {
  const shape = ratio ?? Math.max(screen.width / screen.height, 16 / 10)
  return (
    <Opener screen={screen} onOpen={onOpen} className={styles.browser}>
      <span className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.address} />
      </span>
      <span className={styles.viewport} style={{ aspectRatio: shape }}>
        <Screen screen={screen} eager={eager} reveal={reveal} />
      </span>
    </Opener>
  )
}

export function PhoneFrame({ screen, onOpen, eager = false, reveal = false }) {
  return (
    <Opener screen={screen} onOpen={onOpen} className={styles.phone}>
      <span className={styles.phoneBody}>
        <span className={styles.phoneScreen}>
          <Screen screen={screen} eager={eager} reveal={reveal} />
        </span>
      </span>
    </Opener>
  )
}

/*
  crop: the part of the screen to show, as fractions of its width and height,
  e.g. { x: 0.05, y: 0.2, w: 0.5, h: 0.25 } is a band starting 5% in and 20% down.
*/
export function DetailCard({ screen, crop, onOpen, reveal = false }) {
  const { x, y, w, h } = crop
  const shape = (screen.width * w) / (screen.height * h)
  return (
    <Opener screen={screen} onOpen={onOpen} className={styles.detail}>
      <span className={styles.detailWindow} style={{ aspectRatio: shape }}>
        <Screen
          screen={screen}
          reveal={reveal}
          className={styles.cropImage}
          style={{ width: `${100 / w}%`, left: `${(-x / w) * 100}%`, top: `${(-y / h) * 100}%` }}
        />
      </span>
    </Opener>
  )
}

// Picks the right frame for a screen: phones for mobile screens, a browser for desktop ones
export function Device({ screen, frame, ...props }) {
  const kind = frame ?? (screen.wide ? 'browser' : 'phone')
  if (kind === 'plain') return <PlainFrame screen={screen} {...props} />
  return kind === 'browser' ? <BrowserFrame screen={screen} {...props} /> : <PhoneFrame screen={screen} {...props} />
}

// Diagrams and strips that aren't app windows: a simple card
export function PlainFrame({ screen, onOpen, eager = false, reveal = false }) {
  return (
    <Opener screen={screen} onOpen={onOpen} className={styles.plain}>
      <Screen screen={screen} eager={eager} reveal={reveal} />
    </Opener>
  )
}
