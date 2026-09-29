import styles from './Tag.module.css'

// A small metadata chip: role, platform, year, domain.
export function Tag({ children }) {
  return <span className={styles.tag}>{children}</span>
}
