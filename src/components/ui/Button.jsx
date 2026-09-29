import { useRef } from 'react'
import { Link } from 'react-router'
import { useMagnetic } from '../../hooks/useMagnetic'
import styles from './Button.module.css'

/*
  One button component with three looks:
    variant="primary"   solid, for the one main action on a screen
    variant="secondary" outlined (default)
    variant="text"      a link with an arrow

  Pass `to` for a page inside the site, `href` for anything else,
  or neither for a normal <button>.
  magnetic: the button leans a few pixels toward the cursor (mouse only). Use it for key actions only.
*/
export function Button({ variant = 'secondary', to, href, icon: Icon, magnetic = false, children, className = '', ...props }) {
  const ref = useRef(null)
  useMagnetic(ref, { enabled: magnetic })
  const classes = `${styles.button} ${styles[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {Icon && <Icon className={styles.icon} size={16} strokeWidth={1.75} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }
  return (
    <button ref={ref} type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
