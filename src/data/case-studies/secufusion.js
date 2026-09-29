/*
  SecuFusion case study: a personal project, not client work.
  Source: Naveen's SecuFusion case study (case-studies/sources/secufusion-case-study.html). Nothing is invented.
  The source has no real screenshots. Its own HTML mockups were captured as images (approved by Naveen,
  2026-09-27) and every one is captioned "Concept mockup · sample data". All numbers in them are illustrative.
  The competitive analysis is shown as grounding, never as user research. No user validation is claimed.
  Missing on purpose: dates, platform, process, constraints, results, learnings.
  The story itself (challenge, approach, product…) is in ./secufusion-story.js.
*/

const base = `${import.meta.env.BASE_URL}images/work/secufusion/`
const note = 'Concept mockup · sample data'
const wide = true

export const secufusionScreens = {
  tenants: { src: `${base}01-tenants.webp`, width: 1600, height: 561, caption: `Tenants. ${note}`, wide },
  policy: { src: `${base}02-policy-builder.webp`, width: 1600, height: 637, caption: `Policy builder. ${note}`, wide },
  event: { src: `${base}03-event-investigation.webp`, width: 1600, height: 724, caption: `Event investigation. ${note}`, wide },
  ai: { src: `${base}04-ai-usage.webp`, width: 1600, height: 439, caption: `AI Security. ${note}`, wide },
  dashMaster: { src: `${base}05-dashboard-master-mssp.webp`, width: 1600, height: 378, caption: `Dashboard, Master MSSP. ${note}`, wide },
  dashMssp: { src: `${base}06-dashboard-mssp.webp`, width: 1600, height: 378, caption: `Dashboard, MSSP. ${note}`, wide },
  dashEnterprise: {
    src: `${base}07-dashboard-enterprise.webp`,
    width: 1600,
    height: 378,
    caption: `Dashboard, Enterprise. ${note}`,
    wide,
  },
}

export const secufusion = {
  label: 'Personal project · Enterprise Security SaaS',
  summary:
    'A multi-tenant security and access management platform for MSSPs and enterprise security teams, designed to make tenant hierarchy, policy control, and threat investigation feel manageable instead of overwhelming.',
  role: 'Product & UX Design (solo)',
  domain: 'Cybersecurity · B2B SaaS',
  scope: 'IA, RBAC, policy systems, data viz',
  format: 'Personal case study',
  tags: ['Personal project', 'Cybersecurity', 'B2B SaaS', 'UX design'],
  tagline: 'A multi-tenant security platform for MSSPs and enterprise teams that makes tenant hierarchy, policy control and threat investigation manageable instead of overwhelming.',
  meta: ['Cybersecurity · B2B SaaS', 'Security & access management', 'Multi-tenant SaaS'],
  screens: secufusionScreens,
  heroVisual: { layout: 'browser', screens: ['event'], ratio: 1600 / 724 },
  coverVisual: { layout: 'stack', screens: ['tenants', 'policy'] },
}
