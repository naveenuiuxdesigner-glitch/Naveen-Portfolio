/*
  Projam AI case study.
  Source: Naveen's Projam case study (case-studies/sources/projam-case-study.html). Nothing is invented.
  Numbers from the pilot project are shown only where they describe the product, labelled as pilot data,
  never as business results.
  Missing on purpose (hidden until Naveen provides them): client, dates, team, research, wireframes,
  prototype, testing, results.
  The story itself (challenge, approach, product…) is in ./projam-story.js.
*/

const base = `${import.meta.env.BASE_URL}images/work/projam-ai/`
const wide = true

export const projamScreens = {
  intake: { src: `${base}02-create-project.webp`, width: 1600, height: 1900, caption: 'Create new project wizard', wide },
  overview: { src: `${base}01-project-overview.webp`, width: 1600, height: 1000, caption: 'Project overview', wide },
  hub: { src: `${base}03-integration-hub.webp`, width: 1600, height: 1376, caption: 'Integration Hub, brief, technical context', wide },
  engine: { src: `${base}04-requirements-engine.webp`, width: 1400, height: 1847, caption: 'AI requirements generation', wide },
  integrations: { src: `${base}05-integrations.webp`, width: 1600, height: 1000, caption: 'Integrations', wide },
  dashboard: { src: `${base}06-dashboard.webp`, width: 1600, height: 1000, caption: 'Dashboard (sample data)', wide },
  projects: { src: `${base}07-projects.webp`, width: 1600, height: 1000, caption: 'Projects', wide },
}

export const projam = {
  summary:
    'An agentic program & project management platform that turns a one-paragraph project idea into a complete, linked delivery backlog, from business requirements down to sprint-ready tasks, and pushes it straight into Azure DevOps.',
  role: 'UI/UX Designer',
  company: 'Motivity Labs',
  domain: 'B2B SaaS · Agentic AI',
  platform: 'Multi-tenant web app (SaaS)',
  scope: 'Product design & AI workflow UX',
  tags: ['B2B SaaS', 'Agentic AI', 'UX design', 'UI design'],
  tagline: 'Agentic project management that turns a one-paragraph idea into a linked, sprint-ready backlog, and pushes it straight into Azure DevOps.',
  meta: ['B2B SaaS · Agentic AI', 'Program & project management', 'Web app'],
  screens: projamScreens,
  heroVisual: { layout: 'browser', screens: ['overview'] },
}
