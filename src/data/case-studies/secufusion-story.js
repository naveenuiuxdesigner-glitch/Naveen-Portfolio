/*
  SecuFusion: the case study as a visual story.
  Condensed from Naveen's approved content (./secufusion-sections.js, and the original text in
  case-studies/sources/secufusion-text.txt). Nothing is added: wording is shortened, facts are unchanged.
  A personal project: every screen is a concept mockup with sample data. The competitive analysis is
  grounding, not user research, and no user validation or result is claimed.

  Story shape (shared by every case study, see CaseStory.jsx):
  challenge → approach → product → flows → system (optional) → outcome.
  A visual is { layout, screens, crop?, ratio?, labels?, annotations?, caption? } (see mockups/Visual.jsx).
*/

// Each mockup is a wide, short strip: show it whole
const ratio = {
  tenants: 1600 / 561,
  policy: 1600 / 637,
  event: 1600 / 724,
  ai: 1600 / 439,
}

// Parts of a screen to float as detail cards (fractions of the screen's width and height)
const crops = {
  breadcrumb: { x: 0, y: 0, w: 0.5, h: 0.45 },
  status: { x: 0.62, y: 0.17, w: 0.37, h: 0.55 },
  severity: { x: 0.02, y: 0.12, w: 0.5, h: 0.2 },
  timeline: { x: 0.01, y: 0.34, w: 0.4, h: 0.62 },
}

export const story = {
  challenge: {
    statement:
      'Security platforms usually make administrators think in system terms instead of security terms. SecuFusion has to serve three levels of admin, a hierarchy of isolated tenants, three policy systems and a constant stream of security events. The challenge was making that depth legible without flattening it.',
    compare: {
      before: {
        label: 'System terms',
        items: [
          'A Master MSSP oversees dozens of MSSPs, each with many tenants',
          'Raw tables of users, policies and logs',
          'No sense of what needs attention right now',
        ],
      },
      after: {
        label: 'Security terms',
        items: [
          'Every screen shows where you are in the hierarchy',
          'Events lead with severity, not timestamp',
          'Each tier sees the layer it needs to act on',
        ],
      },
    },
    visual: {
      layout: 'stack',
      screens: ['dashMaster', 'dashMssp', 'dashEnterprise'],
      caption: 'One product, three tiers of admin (concept mockups, sample data)',
    },
    usersLabel: 'Personas from role responsibilities, not interviews',
    users: [
      { code: 'MM', title: 'Master MSSP Admin', line: 'Global risk posture, not individual events.' },
      { code: 'MS', title: 'MSSP Admin', line: 'Triages attention across enterprise customers.' },
      { code: 'EA', title: 'Enterprise Security Admin', line: 'Day-to-day enforcement for one org.' },
    ],
  },

  approach: [
    {
      title: 'Reuse what admins already know',
      text: 'With no users to interview, the design reused category conventions: severity-first triage (CrowdStrike, Defender) and rule-based policy builders (Zscaler, Netskope).',
      visual: { layout: 'detail', screens: ['event'], crop: crops.severity, ratio: ratio.event, caption: 'Severity leads, then who, what and the action' },
    },
    {
      title: 'The hierarchy is the navigation',
      text: 'Every screen carries a breadcrumb of the same shape, Master MSSP / MSSP / Enterprise, so it is always obvious where you are.',
      visual: { layout: 'detail', screens: ['tenants'], crop: crops.breadcrumb, ratio: ratio.tenants, caption: 'The full tenant path, no exceptions' },
    },
    {
      title: 'Colour means state',
      text: 'A dark, low-saturation base, with every accent reserved for a security state and never used decoratively.',
      visual: { layout: 'detail', screens: ['tenants'], crop: crops.status, ratio: ratio.tenants, caption: 'Active, needs review, key expiring' },
    },
  ],

  product: [
    {
      title: 'Tenants',
      text: 'Breadcrumbs carry the full tenant path and the table shows lineage, so an MSSP admin never loses track of which enterprise they’re inside.',
      visual: {
        layout: 'browser',
        screens: ['tenants'],
        ratio: ratio.tenants,
        annotations: ['Full tenant path', 'SSO or API key', 'Status as a badge'],
      },
    },
    {
      title: 'Policy builder',
      text: 'The IF → CONDITION → ACTION structure stays visible instead of hiding behind form fields, so a policy reads back like a sentence.',
      visual: {
        layout: 'browser',
        screens: ['policy'],
        ratio: ratio.policy,
        annotations: ['IF group, app, detection', 'AND chains conditions', 'THEN block and log'],
      },
    },
    {
      title: 'Event investigation',
      text: 'Opening an event replays it as a timeline: what happened, who did it, and what SecuFusion did about it, in that order.',
      visual: {
        layout: 'detail',
        screens: ['event'],
        crop: crops.timeline,
        ratio: ratio.event,
        annotations: ['Severity first', 'User, app, action', 'Replayed as a timeline'],
      },
    },
    {
      title: 'AI Security',
      text: 'The same table, badge and policy patterns as the rest of the product, so there is no second learning curve.',
      visual: {
        layout: 'browser',
        screens: ['ai'],
        ratio: ratio.ai,
        annotations: ['Same stat cards', 'Usage by AI app', 'Same policy model'],
      },
    },
    {
      title: 'Three dashboards, one layout',
      text: 'Same layout system and components, but what surfaces first changes with the tier of admin logged in.',
      visual: {
        layout: 'stack',
        screens: ['dashMaster', 'dashMssp', 'dashEnterprise'],
        annotations: ['Master MSSP: global risk', 'MSSP: who needs attention', 'Enterprise: own org'],
      },
    },
  ],

  flows: [
    {
      title: 'Tenant onboarding',
      note: 'Assign a parent MSSP, choose SSO or API key, sync or invite users, then review conflicts before the tenant goes live.',
      steps: ['Create tenant', 'Configure auth', 'Provision users', 'Assign policies', 'Review & activate'],
    },
    {
      title: 'Policy creation & assignment',
      steps: ['Choose policy type', 'Define condition', 'Set action', 'Assign scope', 'Publish'],
      visual: {
        layout: 'sequence',
        screens: ['policy', 'event'],
        labels: ['Build the IF / AND chain', 'An event on trigger'],
      },
    },
    {
      title: 'Security event investigation',
      note: 'Severity-ranked, replayed as a timeline, with the exact rule that fired. Resolve by dismissing, escalating or adjusting the policy.',
      steps: ['Event surfaces', 'Open investigation', 'Confirm policy applied', 'Resolve'],
    },
  ],

  system: {
    title: 'Design system',
    text: 'A dark, low-saturation base so that colour could mean something: every accent is reserved for a security state.',
    swatches: [
      { name: 'Safe / Allowed', color: '#34D399', use: '#34D399' },
      { name: 'Warning', color: '#F5C451', use: '#F5C451' },
      { name: 'Elevated risk', color: '#FB923C', use: '#FB923C' },
      { name: 'Blocked / Critical', color: '#F0665E', use: '#F0665E' },
      { name: 'Informational', color: '#5FA8F5', use: '#5FA8F5' },
    ],
    cards: [
      { label: 'Display', text: 'Space Grotesk for headings and section titles.' },
      { label: 'Body', text: 'Inter for body copy, descriptions and table content.' },
      { label: 'Data / mono', text: 'IBM Plex Mono for breadcrumbs, tags, policy syntax and timestamps.' },
    ],
  },

  outcome: {
    statement:
      'Enterprise security is inherently complex. The goal was never to hide that; it was to give every admin, at every tier, exactly the layer of it they need to act on, and nothing else.',
    stats: {
      label: 'Scope of the concept',
      items: [
        { value: '3', label: 'tenant tiers to design for' },
        { value: '3', label: 'policy categories' },
        { value: '12', label: 'core product modules' },
        { value: '26', label: 'key screens designed' },
      ],
      note: 'A personal case study: the scope of the concept, not results.',
    },
    cardsLabel: 'Grounding, not user research',
    cards: [
      {
        label: 'Competitive patterns',
        text: 'Multi-tenant hierarchy models: Okta (org & hierarchy switching), Cloudflare Zero Trust (account/tenant scoping), JumpCloud (MSP multi-org management).',
      },
      {
        label: 'Category conventions',
        text: 'Severity-first event triage (CrowdStrike, Defender), rule-based policy builders (Zscaler, Netskope), breadcrumb-driven tenant context.',
      },
      {
        label: 'Named assumptions',
        text: 'Personas from role responsibilities, not interviews. Priority order (risk > volume) assumed, not tested. Flagged for validation in a real engagement.',
      },
    ],
    cardsNote: 'There was no live user base, so nothing here claims user validation, and every number in the mockups is sample data.',
  },
}
