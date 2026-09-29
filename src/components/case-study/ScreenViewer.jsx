import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { duration, ease } from '../../lib/motion'
import styles from './ScreenViewer.module.css'

/*
  Full-size view of one product screen.
  - Escape or the Close button closes it, and focus returns to the screen you opened
  - Left and right arrow keys (or the buttons) move between screens
  - Keyboard focus stays inside while it's open, and the page behind can't scroll
  - Tall screens scroll inside the viewer
*/
export function ScreenViewer({ items, index, onClose, onChange }) {
  const panelRef = useRef(null)
  const openerRef = useRef(null)
  const open = index !== null
  const item = open ? items[index] : null

  // Remember what opened the viewer, lock page scroll, and put focus inside
  useEffect(() => {
    if (!open) return undefined

    openerRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('[data-autofocus]')?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      openerRef.current?.focus?.()
    }
  }, [open])

  // Keyboard: Escape, arrows, and keeping Tab inside the viewer
  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll('button, [tabindex="0"]')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, index, items.length, onClose, onChange])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          className={styles.viewer}
          role="dialog"
          aria-modal="true"
          aria-label={`Screen ${index + 1} of ${items.length}: ${item.screen.caption}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          <div className={styles.top}>
            <p className={styles.caption}>
              <span className={styles.count}>
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <span>{item.screen.caption}</span>
            </p>
            <button type="button" className={styles.button} onClick={onClose} data-autofocus>
              <span>Close</span>
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          {/* The tall Home screen scrolls here; keyboard users can scroll it with the arrow keys after tabbing to it */}
          <div
            key={item.id}
            className={`${styles.stage} ${item.screen.tall ? styles.tall : ''}`}
            tabIndex={item.screen.tall ? 0 : undefined}
            aria-label={item.screen.tall ? `${item.screen.caption}, scrollable` : undefined}
            role={item.screen.tall ? 'region' : undefined}
            onClick={(event) => event.target === event.currentTarget && onClose()}
          >
            <img
              src={item.screen.src}
              width={item.screen.width}
              height={item.screen.height}
              alt={`SJ Life screen: ${item.screen.caption}`}
              className={styles.image}
            />
          </div>

          <div className={styles.bottom}>
            <button type="button" className={styles.button} onClick={() => onChange((index - 1 + items.length) % items.length)}>
              <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              <span>Previous</span>
            </button>
            <button type="button" className={styles.button} onClick={() => onChange((index + 1) % items.length)}>
              <span>Next</span>
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
