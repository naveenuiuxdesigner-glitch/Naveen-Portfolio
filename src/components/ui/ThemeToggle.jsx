import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import styles from './ThemeToggle.module.css'

/*
  A small switch between the dark and light themes.
  The sun and moon swap with a short turn; screen readers hear which theme it switches to.
*/
export function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className}`}
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className={styles.icons} data-theme-icon={theme} aria-hidden="true">
        <Sun size={16} strokeWidth={1.75} className={styles.sun} />
        <Moon size={16} strokeWidth={1.75} className={styles.moon} />
      </span>
    </button>
  )
}
