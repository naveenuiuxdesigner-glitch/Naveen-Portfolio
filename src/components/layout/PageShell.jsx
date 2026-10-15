import { useEffect, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { duration, ease } from '../../lib/motion'
import { startSmoothScroll } from '../../lib/smoothScroll'
import { cardTransitionPending, supportsViewTransitions } from '../../lib/cardTransition'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToHash } from './ScrollToHash'
import { SkipLink } from './SkipLink'
import styles from './PageShell.module.css'

// The frame around every page: skip link, header, the page itself, and the footer.
// Moving to another page fades it in. Not on the first page (it is already there, pre-rendered),
// and not for a page opened from a Work card, so the card's screens can glide into place.
export function PageShell() {
  const { pathname } = useLocation()
  useEffect(() => startSmoothScroll(), [])
  const [firstPath] = useState(pathname)
  const fade = pathname !== firstPath && !(supportsViewTransitions && cardTransitionPending())

  return (
    <div id="top" className={styles.shell}>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className={styles.main}>
        <motion.div
          key={pathname}
          initial={fade ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.slow, ease: ease.out }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <ScrollRestoration />
      <ScrollToHash />
    </div>
  )
}
