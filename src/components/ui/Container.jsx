import styles from './Container.module.css'

// Centers content and keeps the side padding consistent on every screen size.
export function Container({ as: Component = 'div', size = 'default', className = '', children, ...props }) {
  return (
    <Component className={`${styles.container} ${styles[size] ?? ''} ${className}`} {...props}>
      {children}
    </Component>
  )
}
