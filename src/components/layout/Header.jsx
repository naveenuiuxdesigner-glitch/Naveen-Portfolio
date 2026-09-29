import { useCallback, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu } from 'lucide-react'
import { mainNav } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useScrolled } from '../../hooks/useScrolled'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Container } from '../ui/Container'
import { MobileMenu } from './MobileMenu'
import { NavItem } from './NavItem'
import { ThemeToggle } from '../ui/ThemeToggle'
import styles from './Header.module.css'

const sectionIds = mainNav.map((item) => item.id)

export function Header() {
  const scrolled = useScrolled()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const { pathname } = useLocation()

  // Highlight the section on screen, but only on the homepage where the sections live
  const activeId = useActiveSection(sectionIds, pathname === '/')

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  // Choosing a link closes the menu without moving focus back to the Menu button
  const onNavigate = useCallback(() => setMenuOpen(false), [])

  const classes = [styles.header, scrolled && styles.scrolled].filter(Boolean).join(' ')

  return (
    <>
      <header className={classes}>
        <Container className={styles.inner}>
          <Link to="/" className={styles.wordmark} aria-label={`${profile.name}, home`}>
            {profile.name}
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <ul className={styles.list}>
              {mainNav.map((item) => (
                <li key={item.id}>
                  <NavItem item={item} active={activeId === item.id} className={styles.link} />
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.controls}>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span>Menu</span>
            <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} activeId={activeId} onClose={closeMenu} onNavigate={onNavigate} />
    </>
  )
}
