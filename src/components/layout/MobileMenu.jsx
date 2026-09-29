import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { mainNav } from '../../data/navigation'
import { profile } from '../../data/profile'
import { duration, ease, stagger } from '../../lib/motion'
import { NavItem } from './NavItem'
import styles from './MobileMenu.module.css'

/*
  Full-screen menu for phones.
  - Escape or the Close button closes it
  - Keyboard focus stays inside while it's open
  - The page behind it can't scroll
*/
export function MobileMenu({ open, activeId, onClose, onNavigate }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const panel = panelRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel?.querySelector('a, button')?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !panel) return

      const focusable = panel.querySelectorAll('a[href], button')
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
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.base, ease: ease.out }}
        >
          <div className={styles.top}>
            <span className={styles.name}>{profile.name}</span>
            <button type="button" className={styles.close} onClick={onClose}>
              <span>Close</span>
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Main">
            <motion.ul
              className={styles.list}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } } }}
            >
              {mainNav.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } },
                  }}
                >
                  <NavItem item={item} active={activeId === item.id} className={styles.link} onClick={onNavigate} />
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <div className={styles.bottom}>
            <p className="label">Get in touch</p>
            <a href={`mailto:${profile.email}`} className={styles.email}>
              {profile.email}
            </a>
            <p className="muted">{profile.location}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
