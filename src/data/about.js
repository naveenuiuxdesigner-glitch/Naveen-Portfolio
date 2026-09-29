/*
  The About section on the homepage.
  Written only from facts in your CV, condensed (Sept 2026) so it reads in a few seconds.
  Education and the certificate are shown under Experience; tools under Skills.
*/
export const about = {
  heading: 'Turning complex requirements into products people can use with confidence.',
  intro:
    'I turn complex, still-forming requirements into user flows, information architecture and high-fidelity UI that developers can build from. I work closely with product managers, developers and clients, and use AI tools like Claude, ChatGPT, Figma Make and Lovable to explore and prototype faster.',
  photo: `${import.meta.env.BASE_URL}images/about/naveen-peddi.webp`, // Naveen's photo (added 2026-09-27)
  photoAlt: 'Portrait of Naveen Peddi',
  highlights: [
    { value: '4.5', label: 'Years in UI/UX design' },
    { value: '3', label: 'Companies' },
    { value: '5', label: 'Product domains' },
  ],
  // How a screen gets designed, in four layers
  process: [
    { title: 'Research', detail: 'Requirements, users and goals' },
    { title: 'Structure', detail: 'User flows and information architecture' },
    { title: 'Interaction', detail: 'Prototypes, states and feedback' },
    { title: 'Visual design', detail: 'High-fidelity UI and design systems' },
  ],
  // The "Domain experience" section of your CV, shortened
  domains: [
    { name: 'HealthTech', detail: 'Telemedicine, wearables, obesity care, clinic and longevity' },
    { name: 'AI & Agentic', detail: 'Voice AI, AI assistants, agentic workflows' },
    { name: 'Enterprise SaaS & B2B', detail: 'Project management, security services, enterprise workflows' },
    { name: 'EdTech & HR Tech', detail: 'Corporate learning, courses, quizzes, certifications' },
    { name: 'Cybersecurity', detail: 'Security service providers, access policies, threat investigations' },
  ],
}
