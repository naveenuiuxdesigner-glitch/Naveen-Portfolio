import { jumpTo } from '../../lib/scrollToTarget'
import styles from './SkipLink.module.css'

// Hidden until a keyboard user presses Tab; lets them jump past the menu.
export function SkipLink() {
  return (
    <a href="#main" className={styles.skip} onClick={jumpTo('main')}>
      Skip to content
    </a>
  )
}
