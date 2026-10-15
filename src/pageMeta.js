import { profile } from './data/profile'
import { getProject } from './data/projects'

/*
  The tab title and search description of each pre-rendered page, written into its HTML at build time
  (scripts/prerender.js). The same words as each page's usePageMeta, which keeps them right in the browser.
*/
export function pageMeta(path) {
  if (path === '/') {
    return {
      title: `${profile.name} · ${profile.role}`,
      description: `${profile.name} is a ${profile.role} in ${profile.location} who designs enterprise, SaaS and AI products.`,
    }
  }
  if (path === '/work') {
    return { title: `Work · ${profile.name}`, description: 'Selected case studies in enterprise, SaaS and AI product design by Naveen Peddi.' }
  }
  const project = getProject(path.replace('/work/', ''))
  return {
    title: `${project.title} · ${profile.name}`,
    description: project.tagline || project.summary || `${project.title} case study by Naveen Peddi.`,
  }
}
