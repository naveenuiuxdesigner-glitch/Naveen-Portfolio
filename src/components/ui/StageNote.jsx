import styles from './StageNote.module.css'

// A temporary note that marks unfinished pages while we build in stages. Removed before launch.
export function StageNote({ children }) {
  return (
    <p className={styles.note}>
      <span className="label">Work in progress</span>
      <span>{children}</span>
    </p>
  )
}
