/*
  SAMpatee: the case study as a visual story.
  Condensed from Naveen's approved case study (./sampatee-sections.js and
  case-studies/sources/sampatee-case-study.html). Nothing is added: wording is shortened, facts are unchanged.
  The BRD's KPIs and acceptance criteria are targets. They appear only as requirements in the outcome,
  never as results. There are no voice-AI results in the source.

  Story shape (shared by every case study, see CaseStory.jsx):
  challenge → approach → product → flows → system (optional) → outcome.
  A visual is { layout, screens, crop?, ratio?, labels?, annotations?, caption? } (see mockups/Visual.jsx).
*/

// Parts of a screen to float as detail cards (fractions of the screen's width and height)
const crops = {
  confirm: { x: 0.03, y: 0.53, w: 0.94, h: 0.19 },
  oneTap: { x: 0.03, y: 0.785, w: 0.94, h: 0.2 },
  sources: { x: 0.03, y: 0.2, w: 0.94, h: 0.175 },
  voiceBar: { x: 0.02, y: 0.82, w: 0.96, h: 0.085 },
  earned: { x: 0.03, y: 0.295, w: 0.94, h: 0.175 },
  samPanel: { x: 0.69, y: 0.27, w: 0.3, h: 0.48 },
}

export const story = {
  challenge: {
    statement:
      'A family’s health data is split across wearable apps, health-device apps and smart-home apps. Nothing connects them, so nobody sees that a hot bedroom is behind last night’s bad sleep.',
    compare: {
      before: {
        label: 'As-is',
        items: [
          'A different app for each device',
          'No way to link sleep, activity and room temperature',
          'Home devices controlled app by app, or by hand',
        ],
      },
      after: {
        label: 'To-be',
        items: [
          'Speak to SAM; tapping is optional',
          'All devices sync into one view, turned into daily recommendations',
          'Quests, streaks and rewards the whole family shares',
        ],
      },
    },
    usersLabel: 'Three personas from the BRD',
    users: [
      { code: 'AO', title: 'Account Owner', line: '“Just tell me what to change today.”' },
      { code: 'FM', title: 'Invited Family Member', line: '“Am I beating Dad this week?”' },
      { code: 'AD', title: 'Platform Admin', line: '“Is SAM understanding people?”' },
    ],
  },

  approach: [
    {
      title: 'Voice first, screen as proof',
      text: 'The BRD asks for 90% of main tasks by voice, so every spoken command gets a visual confirmation: the tile, device or number that changed.',
      visual: { layout: 'phone', screens: ['chat'], crop: crops.confirm, caption: 'The device change that proves SAM acted' },
    },
    {
      title: 'Taps only where the law requires them',
      text: 'OAuth sign-in, HealthKit / Google Fit consent and OS permission dialogs stay manual, designed to feel deliberate rather than like a break from voice.',
      visual: { layout: 'phone', screens: ['pairing'], crop: crops.oneTap, caption: 'One clearly labelled OAuth tap, visible timer' },
    },
    {
      title: 'SAM speaks first',
      text: 'The biggest value is SAM stepping in before the user asks: a walk nudge at 3 PM, cooling the room when heat and fatigue coincide.',
      visual: { layout: 'phone', screens: ['recharge'], crop: crops.sources, caption: '“Body Battery 32 + Bedroom 31°C”: both sources behind the insight' },
    },
    {
      title: 'One voice bar, five states',
      text: 'An always-listening voice and chat bar sits above the navigation on every screen, so users always know whether SAM is listening.',
      visual: {
        layout: 'phone',
        screens: ['home'],
        crop: crops.voiceBar,
        annotations: ['Idle: mic ready', 'Listening: live transcript', 'Thinking: checking your data', 'Speaking: answer on screen', 'Muted: typing still works'],
      },
    },
  ],

  product: [
    {
      title: 'SAM, always within reach',
      text: 'Health, home and SAM’s tip for today on one screen; answers come with the chart and device change that prove them.',
      visual: {
        layout: 'phones',
        screens: ['home', 'chat', 'recharge'],
        annotations: ['Transcript always visible (RK-001)', 'Both sources behind every insight', '“Undo changes” beside the action'],
      },
    },
    {
      title: 'Rooms & family',
      text: 'Devices are grouped into rooms the way people talk (“turn off the bedroom lights”), and each member gets their own room access and device rights.',
      visual: {
        layout: 'phones',
        screens: ['rooms', 'family'],
        annotations: ['Room environment shown first', 'Spoken command live in bar', 'Per-member rights (BRD-1.5.2)'],
      },
    },
    {
      title: 'Quests, streaks & leaderboard',
      text: 'Every reward is tied to data devices actually record, so progress is earned rather than claimed and the family leaderboard stays fair.',
      visual: {
        layout: 'phones',
        screens: ['challenges', 'leaderboard'],
        annotations: ['Streak Saver shown early (BR-007)', 'Score formula on screen', 'Spending never changes rank (BR-008)'],
      },
    },
    {
      title: 'Rewards that show the maths',
      text: 'The BRD sets the multipliers; the reward screen shows why a 45-min moderate workout earns 36 and not 30.',
      visual: {
        layout: 'phone',
        screens: ['rewards'],
        crop: crops.earned,
        annotations: ['30 base per workout', 'Intensity × 0.8 / 1.0 / 1.5', 'Duration × 1.2 / 1.5', 'Daily login: 15-min cooldown (BR-004)'],
      },
    },
    {
      title: 'Arabic, fully mirrored',
      text: 'Arabic isn’t just translation: navigation order, progress bars and icon direction mirror right-to-left, and units change by region.',
      visual: {
        layout: 'phones',
        screens: ['home', 'arabic'],
        annotations: ['°F in the USA, °C elsewhere', 'Miles in the USA, km elsewhere', 'Glucose in mg/dL or mmol/L'],
      },
    },
  ],

  flows: [
    {
      title: 'First device',
      note: 'Target: connected and live in under 10 seconds.',
      steps: ['Sign in', 'Data consent', '“Connect my Garmin”', 'Authorize (OAuth)', 'Sync', 'Live on Home'],
      visual: {
        layout: 'sequence',
        screens: ['welcome', 'pairing', 'home'],
        labels: ['Sign in, English or Arabic', 'Spoken request, one OAuth tap', 'Live on Home'],
      },
    },
    {
      title: 'Ask SAM',
      note: 'Target: answer on screen within 2 seconds.',
      steps: ['“Show my steps trend”', 'Live transcript', 'Steps tile expands', 'Trend in chat', 'Suggested next step'],
      visual: {
        layout: 'sequence',
        screens: ['home', 'chat'],
        labels: ['Ask from the voice bar', 'Trend and next step in chat'],
      },
    },
    {
      title: 'Fall safety',
      note: 'The one flow where silence is an answer: a full-screen alert, large countdown, two big buttons and a spoken fallback.',
      steps: ['Fall detected', '“Are you okay?”', '30-second countdown', '“I’m okay” or SOS to family'],
      visual: { layout: 'phone', screens: ['fall'], caption: '“I’m okay”, or an SOS after 30 seconds' },
    },
  ],

  system: {
    title: 'Platform',
    text: 'The web admin portal tracks the targets the product is judged on (voice completion, streaks, uptime) and gives admins direct control over SAM and reward fairness.',
    cards: [
      { label: 'Role-based access', text: 'Create and assign roles; permission changes take effect right away.' },
      { label: 'SAM configuration', text: 'Voice engine, languages, proactive guidance, confidence threshold and misheard-command rate.' },
      { label: 'Flagged activity', text: 'Reward abuse and unusual leaderboard jumps, shown with the rule that caught them.' },
      { label: 'Quests & badges', text: 'Add or edit quests, badges and streak rules without a new release.' },
      { label: 'Catalogue & payments', text: 'Reward catalogue, redemptions, orders and transaction history.' },
      { label: 'Subscriptions', text: 'Free trial, Basic, Standard and Premium, each with its own device limit (BR-010).' },
    ],
    visual: { layout: 'detail', screens: ['admin'], crop: crops.samPanel, caption: 'Admin dashboard with the SAM configuration panel' },
    note: 'Scope: 19 health metrics (steps to ECG), 28 smart-home device categories, 60+ device brands through Terra.',
  },

  outcome: {
    statement:
      'A health app you talk to rather than tap through, where the screen proves what SAM did, and SAM steps in before you fall behind.',
    cardsLabel: 'Requirements the design had to meet',
    cards: [
      { label: 'KPI-001', text: '90% of main tasks done by voice.' },
      { label: 'KPI-002', text: 'Under 10 s to connect the first device.' },
      { label: 'AC-FR-3.4', text: '2 s from a spoken question to an answer on screen.' },
      { label: 'Performance', text: 'Home tiles update within 2 s of a device sync: live values, not spinners.' },
      { label: 'Objective 5', text: '7-day average daily streak within 6 months.' },
      { label: 'Objective 8', text: 'Under 60 s to add a new smart-home device, hands-free.' },
      { label: 'KPI-010', text: '99.9% system uptime; sync and reward events must never be lost.' },
      { label: 'Security', text: 'Health data encrypted in transit and at rest; HIPAA / GDPR consent kept explicit and tappable.' },
    ],
    cardsNote: 'Targets and requirements from the brief, not results.',
    learnings: [
      {
        title: 'Voice-first design is still visual design',
        text: 'Removing taps put more weight on feedback: states, transcripts and confirmations became the main UI.',
      },
      {
        title: 'Explain the rules and people accept them',
        text: 'Showing the reward formula and the leaderboard score made gamification feel fair instead of random.',
      },
      {
        title: 'Acting first needs an undo',
        text: 'Every automatic action ships with a visible way back. That’s what makes letting SAM act first safe.',
      },
    ],
  },
}
