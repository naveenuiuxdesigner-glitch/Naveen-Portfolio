import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToHash } from './ScrollToHash'
import { SkipLink } from './SkipLink'
import styles from './PageShell.module.css'

// The frame around every page: skip link, header, the page itself, and the footer.
export function PageShell() {
  return (
    <div id="top" className={styles.shell}>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
      <ScrollToHash />
    </div>
  )
}
