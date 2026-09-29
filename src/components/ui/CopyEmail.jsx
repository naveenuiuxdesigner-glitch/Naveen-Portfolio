import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import styles from './CopyEmail.module.css'

// Shows your email as a link, with a button that copies it to the clipboard.
export function CopyEmail({ email, className = '' }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the email is still visible and selectable
    }
  }

  return (
    <div className={`${styles.wrap} ${className}`}>
      <a href={`mailto:${email}`} className={styles.email}>
        {email}
      </a>
      <button type="button" className={styles.copy} onClick={copy}>
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <span className="visually-hidden" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </div>
  )
}
