import { useEffect } from 'react'
import { profile } from '../data/profile'

/*
  Sets the browser tab title and the search-engine description for a page.
  usePageMeta({ title: 'Work', description: '…' })
  In Stage 8 we pre-build each page as HTML so Google and LinkedIn read these too.
*/
export function usePageMeta({ title, description, noindex = false } = {}) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : `${profile.name} · ${profile.role}`

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
    }
    setMeta('property', 'og:title', document.title)
    setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow')
  }, [title, description, noindex])
}

function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
