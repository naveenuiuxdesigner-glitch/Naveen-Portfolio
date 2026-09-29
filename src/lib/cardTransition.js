/*
  Remembers that a Work card was just clicked, so the case study it opens can skip
  its own fade-in and let the card's screens glide into place (a view transition) instead.
*/
let pending = null

export function markCardTransition(slug) {
  pending = { slug, at: Date.now() }
}

export function cameFromCard(slug) {
  return pending?.slug === slug && Date.now() - pending.at < 1500
}

// Only browsers with view transitions get the glide; others open the page as before
export const supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document
