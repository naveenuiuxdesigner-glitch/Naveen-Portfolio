/*
  The About section on the homepage.
  Every line comes from your CV (Oct 2026) or from the numbers in your own case studies. Nothing is invented.
  Education and the certificate are shown under Experience; tools under Skills.
*/
export const about = {
  heading: 'I make complex products feel simple to use.',
  // Two short paragraphs, in your voice
  story: [
    'I’m Naveen, a UI/UX designer with 4+ years of experience, now at Motivity Labs in Hyderabad. I design web and mobile products for HealthTech, AI, enterprise SaaS, EdTech and cybersecurity teams.',
    'I start with the requirements, not the pixels: user flows and information architecture first, then high-fidelity UI, prototypes and design-system components that developers can build from.',
  ],
  photo: `${import.meta.env.BASE_URL}images/about/naveen-peddi.webp`, // Naveen's photo (added 2026-09-27)
  photoAlt: 'Portrait of Naveen Peddi',
  photoCaption: 'Hyderabad, India · UI/UX Designer at Motivity Labs',
  highlights: [
    { value: '4+', label: 'Years in UI/UX design' },
    { value: '6', label: 'Case studies' },
    { value: '5', label: 'Product domains' },
    { value: '3', label: 'Companies' },
  ],
  // What I bring, from the CV
  strengths: [
    {
      title: 'Requirements into flows',
      text: 'Turning complex, still-forming requirements into clear user flows and information architecture.',
    },
    {
      title: 'UI that ships',
      text: 'High-fidelity UI, interactive prototypes and reusable design-system components, ready for developer handoff.',
    },
    {
      title: 'AI-assisted speed',
      text: 'Claude, ChatGPT, Figma Make, Lovable and UX Pilot to explore ideas and prototype faster.',
    },
  ],
  // Real numbers from the case studies (their outcome sections), each linking to its case study
  proof: [
    { value: '507', label: 'requirements in one Projam AI pilot run', project: 'projam-ai' },
    { value: '353', label: 'learners on the Learnopedia leaderboard', project: 'learnopedia' },
    { value: '17', label: 'steps in Limina’s health profile', project: 'limina' },
    { value: '26', label: 'key screens designed for SecuFusion', project: 'secufusion' },
  ],
  domains: ['HealthTech', 'AI & Agentic', 'Enterprise SaaS & B2B', 'EdTech & HR Tech', 'Cybersecurity'],
}
