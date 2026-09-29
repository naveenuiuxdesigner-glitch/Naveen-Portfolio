import { Link } from 'react-router'
import { useActiveSection } from '../../hooks/useActiveSection'
import styles from './CaseSectionNav.module.css'

/*
  The sticky list of section links beside a case study.
  Desktop only (1024px and up); hidden on tablets and phones, where the page reads top to bottom.
  The section on screen is highlighted and announced as the current location.
  Each link only adds #section to the current page's address (it never opens another page),
  then ScrollToHash scrolls there smoothly. That also works in the preview's #/work/… addresses.
*/
export function CaseSectionNav({ sections, ids }) {
  const activeId = useActiveSection(ids)

  return (
    <nav className={styles.nav} aria-label="Case study sections">
      <ol className={styles.list}>
        {sections.map((section, index) => {
          const id = ids[index]
          const active = activeId === id
          return (
            <li key={section.id}>
              <Link
                to={{ hash: `#${id}` }}
                replace
                preventScrollReset
                className={styles.link}
                aria-current={active ? 'location' : undefined}
              >
                <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
