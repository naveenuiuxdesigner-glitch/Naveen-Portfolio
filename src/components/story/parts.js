/*
  A case study told as a visual story. The order is always:
  The challenge → The approach → The product → Key flows → (Design system / Platform) → Outcome.
  A part only appears when the project has content for it.
*/
export const storyParts = [
  { id: 'challenge', title: 'The challenge', nav: 'Challenge' },
  { id: 'approach', title: 'The approach', nav: 'Approach' },
  { id: 'product', title: 'The product', nav: 'Product' },
  { id: 'flows', title: 'Key flows', nav: 'Key flows' },
  { id: 'system', title: 'Design system', nav: 'Design system' },
  { id: 'outcome', title: 'Outcome', nav: 'Outcome' },
]

const has = (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value))

// The parts this story has, with any title a project sets for itself (e.g. system → "Platform")
export function partsFor(story) {
  return storyParts
    .filter((part) => has(story?.[part.id]))
    .map((part) => {
      const title = story[part.id]?.title
      return title ? { ...part, title, nav: title } : part
    })
}
