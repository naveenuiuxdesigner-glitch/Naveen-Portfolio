/*
  Your projects, in the order they appear on the site.
  Names come from your CV ("Selected product experience"). Order chosen by Naveen (Sept 2026).
  ShopJapan (an additional project in your CV, related client work to SJ Life) was removed from the site at Naveen's request (Sept 2026).

  Each case study lives in its own file in ./case-studies/, built only from Naveen's own case-study files.
  Empty fields stay hidden on the live site.
*/

import { sjLife } from './case-studies/sj-life'
import { projam } from './case-studies/projam'
import { learnopedia } from './case-studies/learnopedia'
import { limina } from './case-studies/limina'
import { sampatee } from './case-studies/sampatee'
import { secufusion } from './case-studies/secufusion'

// One empty case study. Each project copies this shape.
const emptyCaseStudy = {
  outcome: '', // One-line result, e.g. what changed for users or the business
  summary: '', // Two or three sentences: what the product is and who it's for
  domain: '', // e.g. 'Cybersecurity', 'HealthTech'
  role: '', // Your role on the project
  company: '', // The company you worked at for this project, e.g. 'Motivity Labs'
  client: '', // Who the product was for
  platform: '', // e.g. 'Web app', 'iOS and Android'
  scope: '', // What the project covered
  timeline: '', // e.g. '6 months, 2024'
  team: '', // e.g. '1 PM, 4 developers'
  format: '', // Only for non-client work, e.g. 'Personal case study'
  label: '', // Small label above the case-study title. Empty means 'Case study'
  tags: [],
  tagline: '', // One sentence: what the product does. Shown on the Work card and the case-study hero
  meta: [], // Industry · product type · platform, e.g. ['HealthTech', 'Patient app', 'iOS & Android']
  screens: {}, // Real product screens, by name
  heroVisual: null, // The large visual at the top of the case study, e.g. { layout: 'phones', screens: ['home'] }
  coverVisual: null, // The Work card visual, if it should differ from the hero
}

// Every case study keeps its story (challenge, approach, product…) in its own file that only downloads
// when that case study is opened, so the home page stays light.
export const projects = [
  { slug: 'projam-ai', title: 'Projam AI', ...emptyCaseStudy, ...projam, loadStory: () => import('./case-studies/projam-story') },
  { slug: 'learnopedia', title: 'Learnopedia (LMS)', ...emptyCaseStudy, ...learnopedia, loadStory: () => import('./case-studies/learnopedia-story') },
  { slug: 'limina', title: 'Limina', ...emptyCaseStudy, ...limina, loadStory: () => import('./case-studies/limina-story') },
  { slug: 'sampatee', title: 'SAMpatee', ...emptyCaseStudy, ...sampatee, loadStory: () => import('./case-studies/sampatee-story') },
  { slug: 'sj-life', title: 'SJ Life', ...emptyCaseStudy, ...sjLife, loadStory: () => import('./case-studies/sj-life-story') },
  { slug: 'secufusion', title: 'SecuFusion', ...emptyCaseStudy, ...secufusion, loadStory: () => import('./case-studies/secufusion-story') },
]

// The few facts shown in the case-study hero (empty ones are hidden)
export const factFields = [
  { key: 'role', label: 'Role' },
  { key: 'company', label: 'Company' },
  { key: 'client', label: 'Client' },
  { key: 'format', label: 'Format' },
  { key: 'platform', label: 'Platform' },
  { key: 'scope', label: 'Scope' },
]

export function getProject(slug) {
  return projects.find((project) => project.slug === slug)
}

// The project after this one, looping back to the first. Used for "Next project".
export function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}
