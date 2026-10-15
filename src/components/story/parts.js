/*
  A case study told as a visual story. The order is always:
  The problem → Key screens → Before / after & flows → Final UI → (Design system / Platform) → Outcome.
  The ids are the story's data keys (and the #cs-… links); the titles are what visitors see.
  A part only appears when the project has content for it.
*/
export const storyParts = [
  { id: 'challenge', title: 'The problem', nav: 'Problem' },
  { id: 'approach', title: 'Key screens', nav: 'Key screens' },
  { id: 'flows', title: 'Key flows', nav: 'Flows' },
  { id: 'product', title: 'Final UI', nav: 'Final UI' },
  { id: 'system', title: 'Design system', nav: 'Design system' },
  { id: 'outcome', title: 'Outcome', nav: 'Outcome' },
]

const has = (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value))

// The before / after comparison is written in the challenge data, but shown with the flows
function flowsPart(part, story) {
  const compare = Boolean(story.challenge?.compare)
  const flows = has(story.flows)
  if (!compare && !flows) return null
  if (compare && flows) return { ...part, title: 'Before / after & flows', nav: 'Before / after' }
  if (compare) return { ...part, title: 'Before / after', nav: 'Before / after' }
  return part
}

// The parts this story has, with any title a project sets for itself (e.g. system → "Platform")
export function partsFor(story) {
  if (!story) return []
  return storyParts
    .map((part) => {
      if (part.id === 'flows') return flowsPart(part, story)
      if (!has(story[part.id])) return null
      const title = story[part.id]?.title
      return title ? { ...part, title, nav: title } : part
    })
    .filter(Boolean)
}
