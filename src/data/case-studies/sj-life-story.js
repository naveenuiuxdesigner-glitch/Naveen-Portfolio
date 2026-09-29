/*
  SJ Life: the case study as a visual story.
  Condensed from Naveen's approved SJ Life case study (the earlier `sections` in sj-life.js, see git history,
  and case-studies/case-study-extract.md). Nothing is added: wording is shortened, facts are unchanged.
  BRD numbers are requirements the design had to meet, never results. The scope strip counts scope, not impact.

  Story shape (shared by every case study, see CaseStory.jsx):
  challenge → approach → product → flows → system (optional) → outcome.
  A visual is { layout, screens, crop?, ratio?, labels?, annotations?, caption? } (see mockups/Visual.jsx).
*/

// Parts of a screen to float as detail cards (fractions of the screen's width and height)
const crops = {
  homeCards: { x: 0, y: 0.26, w: 1, h: 0.2 },
  sleepScore: { x: 0.05, y: 0.22, w: 0.9, h: 0.36 },
  highRisk: { x: 0.04, y: 0.09, w: 0.92, h: 0.37 },
}

export const story = {
  challenge: {
    statement:
      'OLM, the parent company behind ShopJapan, brought in INCITE to build the foundation of a longevity-focused digital community. Not a single feature, but a full platform: health tracking, telemedicine, product shopping and post-sale warranty support, unified under one app. I designed the experience end to end, including the Sleep Intelligence module (Phase 2.1).',
    usersLabel: 'Three personas, defined in the BRD',
    users: [
      { code: 'HC', title: 'Health-Conscious Consumer', line: 'Monitor health, consult doctors, buy wellness products.' },
      { code: 'CS', title: 'Clinic Staff', line: 'Appointments, records and prescriptions, via the web portal.' },
      { code: 'WS', title: 'Warranty Support Seeker', line: 'Registers a product, often before ever installing the app.' },
    ],
    visual: {
      layout: 'phones',
      screens: ['home', 'clinic', 'shop', 'sleepDashboard'],
      caption: 'Home, clinic booking, shop and Sleep Intelligence in one app',
    },
  },

  approach: [
    {
      title: 'A small payoff before Home',
      text: 'A value-prop welcome, sign-up, then a BMI read and matched health offerings, before the user ever reaches Home.',
      visual: { layout: 'phones', screens: ['welcome', 'bmi'], annotations: ['Value-prop welcome', 'Sign up or log in', 'BMI read', 'Matched health offerings'] },
    },
    {
      title: 'Point to a doctor, not another chart',
      text: 'The sleep screening pathway knows when to send someone to a doctor rather than show another chart.',
      visual: { layout: 'phone', screens: ['screeningResult'], crop: crops.highRisk, caption: 'A high-risk result points to a healthcare professional' },
    },
    {
      title: 'A fallback chain for sleep data',
      text: 'Sleep.ai ring data comes first; with no data, the module falls back to Apple HealthKit, Health Connect, Samsung Health, then an empty state.',
      visual: { layout: 'phone', screens: ['sleepDashboard'], crop: crops.sleepScore, caption: 'Raw sleep-ring data, made legible' },
    },
  ],

  product: [
    {
      title: 'Home',
      text: 'Every module starts here, with Sleep Intelligence sitting inside the health track.',
      visual: { layout: 'phone', screens: ['home'], crop: crops.homeCards, annotations: ['Health programmes as cards', 'Sleep score one tap away', 'Free online consultation'] },
    },
    {
      title: 'Clinic booking & shop',
      text: 'Two of the BRD’s heaviest flows, offline clinic discovery and health-profile-aware shopping, built as first-class experiences.',
      visual: { layout: 'phones', screens: ['clinic', 'shop'], annotations: ['Offline booking: select clinic', 'Health-profile-aware catalog'] },
    },
    {
      title: 'Sleep Intelligence',
      text: 'A dashboard that makes ring data legible, and coaching that adapts to it (Phase 2.1).',
      visual: { layout: 'phones', screens: ['sleepDashboard', 'sleepCoaching'], annotations: ['Sleep score from the ring', 'Sleep stages distribution', 'Recommendations by priority'] },
    },
  ],

  flows: [
    {
      title: 'End-to-end journey',
      note: 'Every module in one line, onboarding through to warranty.',
      steps: ['Open App', 'Onboard', 'Home', 'Sleep Module', 'Clinic Consult', 'Shop', 'Warranty'],
      visual: {
        layout: 'sequence',
        screens: ['welcome', 'bmi', 'home', 'clinic', 'shop'],
        labels: ['Welcome', 'BMI and matched offerings', 'Home', 'Select a clinic', 'Shop'],
      },
    },
    {
      title: 'Sleep screening pathway',
      visual: {
        layout: 'sequence',
        screens: ['sleepCheck', 'stopBang', 'screeningResult'],
        labels: ['Recommended screening', 'STOP-BANG, one question at a time', 'Result points to a doctor'],
      },
    },
    {
      title: 'Care pathway',
      note: 'Defined in the BRD: the health profile is shared with the clinic portal before an online or offline consult.',
      steps: ['Login / Register', 'Health Questionnaire', 'Personal Health Dashboard', 'Pre-Qualification', 'Shared with Clinic Portal', 'Online / Offline Pathway'],
    },
  ],

  system: {
    title: 'Platform',
    text: 'A web clinic portal for Admin, Doctor and Nurse, built for speed during a live consultation, not for wellness browsing.',
    cards: [
      { label: 'Role-based access', text: 'Admin, Doctor and Nurse each see a different surface of the same portal.' },
      { label: 'Appointments', text: 'Accept or reject bookings and manage slot availability in real time.' },
      { label: 'Patient records', text: 'Profiles, history and treatment progress, synced live from the app.' },
      { label: 'Prescriptions', text: 'Uploaded in the portal, auto-synced to the patient’s app instantly.' },
      { label: 'Billing & reports', text: 'Payment workflows, receipts, analytics and follow-up records.' },
      { label: 'Two consultation modes', text: 'Online: video consult and a digital prescription in the app. Offline: GPS finds nearby clinics; the prescription syncs after the visit.' },
    ],
    note: 'How the platform is set up in the BRD. These describe the product, not results.',
  },

  outcome: {
    statement:
      'One platform instead of four separate apps: health tracking, telemedicine, shopping and warranty support, unified for the user and kept legible for the clinics running it.',
    stats: {
      label: 'Scope at a glance',
      items: [
        { value: '3', label: 'core user personas' },
        { value: '6', label: 'functional modules (BRD)' },
        { value: '2', label: 'consultation modes: online & offline' },
        { value: '3', label: 'surfaces: iOS, Android, Clinic Portal' },
      ],
      note: 'Scope, not results. Six phases, Requirement Finalization to Handover (1–4 weeks each); Sleep Intelligence was layered in as Phase 2.1.',
    },
    cardsLabel: 'Requirements the design had to meet',
    cards: [
      { label: 'Performance', text: 'Screens load in <3s; portal-to-app sync in <5s. No spinners on core flows.' },
      { label: 'Security', text: 'All health & personal data encrypted at rest and in transit (APPI/HIPAA/GDPR).' },
      { label: 'Usability', text: 'Booking, shopping and warranty flows complete in ≤5 steps.' },
      { label: 'Localization', text: 'Full Japanese + English, with dynamic date, currency and units.' },
      { label: 'Accessibility', text: 'WCAG 2.1 compliance for visual and navigation accessibility.' },
      { label: 'Availability', text: '99.9% uptime target across mobile and web portals.' },
    ],
    cardsNote: 'Targets from the client’s BRD, not results.',
  },
}
