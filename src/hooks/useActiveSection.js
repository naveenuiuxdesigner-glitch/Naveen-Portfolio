import { useEffect, useState } from 'react'

/*
  Watches the homepage sections and returns the id of the one currently
  in view, so the menu can highlight where you are.
  Pass enabled=false on pages that don't have these sections.
*/
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!enabled) return undefined

    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (elements.length === 0) return undefined

    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting))
        // The first section (in page order) that is inside the reading band wins
        const current = ids.find((id) => visible.get(id))
        setActive(current ?? null)
      },
      // A band across the middle of the screen: a section counts as "current" while it crosses it
      { rootMargin: '-35% 0px -55% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids, enabled])

  return enabled ? active : null
}
