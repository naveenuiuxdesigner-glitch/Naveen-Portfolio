// The Resume section on the homepage.
export const resume = {
  summary: 'A short summary of my experience, skills, tools and selected product work.',
  // The PDF lives in public/ and is served at /Naveen-Peddi-Resume.pdf. Every resume link opens it in a new tab.
  // To update it, replace that file (keep the same name).
  fileUrl: `${import.meta.env.BASE_URL}Naveen-Peddi-Resume.pdf`,
  fileLabel: 'PDF',
  updated: '',
  highlights: [
    '4+ years in UI/UX and product design',
    'Web and mobile products across 5 domains',
    'Design systems and developer handoff',
    'Google UX Design Professional Certificate',
  ],
}
