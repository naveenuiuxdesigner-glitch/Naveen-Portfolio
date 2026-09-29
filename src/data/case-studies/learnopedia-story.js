/*
  Learnopedia (LMS): the case study as a visual story.
  Condensed from Naveen's approved case study (./learnopedia-sections.js,
  original text in case-studies/sources/lms-text.txt). Nothing is added: wording is shortened, facts are unchanged.
  Live numbers are labelled as a platform snapshot, never as results. BRD requirements are labelled as requirements.

  Story shape (shared by every case study, see CaseStory.jsx):
  challenge → approach → product → flows → system (optional) → outcome.
  A visual is { layout, screens, crop?, ratio?, labels?, annotations?, caption? } (see mockups/Visual.jsx).
*/

// Parts of a screen to float as detail cards (fractions of the screen's width and height)
const crops = {
  mandatory: { x: 0.2, y: 0.48, w: 0.6, h: 0.25 },
  nowLearning: { x: 0.18, y: 0.07, w: 0.82, h: 0.14 },
  podium: { x: 0.18, y: 0.23, w: 0.82, h: 0.34 },
  progressTable: { x: 0.2, y: 0.58, w: 0.79, h: 0.29 },
  catalogTools: { x: 0.18, y: 0.18, w: 0.82, h: 0.26 },
}

export const story = {
  challenge: {
    statement:
      'Training lived everywhere at once: compliance decks in email, recorded sessions in shared drives, certificates in personal folders and completion tracking in someone’s spreadsheet. The BRD set five goals (continuous learning, better skills, self-directed learning, measurable progress and lower training cost), and the existing way of working met none of them well.',
    compare: {
      before: {
        label: 'Before',
        items: [
          'Mandatory training sent as decks and email reminders',
          'No single list of courses; completion tracked by hand',
          'Learning is a solo task nobody else sees',
        ],
      },
      after: {
        label: 'With Learnopedia',
        items: [
          'Mandatory modules flagged and assigned at scale',
          'A browsable catalog, with progress tracked automatically',
          'Points, leaderboard, teams and a feed make learning visible',
        ],
      },
    },
    users: [
      { code: 'LR', title: 'Learner (every employee)', line: '“What do I still need to finish?”' },
      { code: 'SM', title: 'Skill Master / author', line: '“Let me ship a course in an afternoon.”' },
      { code: 'AD', title: 'L&D / HR admin', line: '“Who hasn’t done ISO training yet?”' },
    ],
    visual: {
      layout: 'detail',
      screens: ['activities'],
      crop: crops.mandatory,
      caption: 'A mandatory module, flagged inside the catalog',
    },
  },

  approach: [
    {
      title: 'Model the learning hierarchy',
      text: 'Every screen hangs off one content model: a module groups courses, a course holds lessons, and a scored quiz unlocks once the lessons are done.',
      visual: { layout: 'browser', screens: ['module'], annotations: ['Module groups its courses', 'Mandatory tag on the card', 'Certified on passing'] },
    },
    {
      title: 'Mandatory, but manageable',
      text: 'Compliance modules like ISO 42001 are tagged “Mandatory”, kept short (about 30 minutes) and always one click from “Continue learning”.',
      visual: { layout: 'detail', screens: ['description'], crop: { x: 0.19, y: 0.42, w: 0.62, h: 0.4 }, caption: 'A mandatory 30-minute module, with a scored final assessment' },
    },
    {
      title: 'Progress is always visible',
      text: 'Percent complete, items done, time spent and resume position show up on the home page, the player and the progress report.',
      visual: { layout: 'detail', screens: ['player'], crop: crops.nowLearning, ratio: 16 / 11, caption: 'Items, quiz, time spent and progress in one band' },
    },
    {
      title: 'Learning is social',
      text: 'Points, a ranked leaderboard, team spaces and a feed of recent achievements turn private effort into something colleagues can see.',
      visual: { layout: 'detail', screens: ['leaderboard'], crop: crops.podium, ratio: 16 / 11, caption: 'Own rank first, then the top three' },
    },
  ],

  product: [
    {
      title: 'Home: everything I owe, everything I’ve earned',
      text: 'Work on the left (modules, courses, content, new courses); recognition on the right (points, rank and recent activity).',
      visual: {
        layout: 'browser',
        screens: ['overview'],
        annotations: ['Eight numbers, one grid', 'Rank with context', 'Activity as a timeline'],
      },
    },
    {
      title: 'Catalog: browse, then commit',
      text: 'Enrolled modules and Explore more, with search, category filter and sorting; details open over the catalog in three tabs.',
      visual: {
        layout: 'browsers',
        screens: ['catalog', 'description'],
        annotations: ['A modal, not a new page', 'Description · Activities · Learners', 'State-aware call to action'],
      },
    },
    {
      title: 'The course player',
      text: 'Lesson, progress and the rest of the course on one screen, with time spent recorded quietly so reports stay accurate.',
      visual: {
        layout: 'browser',
        screens: ['player'],
        ratio: 1400 / 1361,
        annotations: ['“Now learning” header', 'Resume where you stopped', 'Video and web-link lessons', 'Quiz locked until content is done'],
      },
    },
    {
      title: 'Progress & reports',
      text: 'Each learner gets their own report: enrolled, completed, in progress, not started and total time, then a searchable course table.',
      visual: { layout: 'detail', screens: ['progress'], crop: crops.progressTable, caption: 'Progress bar, lessons done, time spent and quiz result per course' },
    },
    {
      title: 'Gamification & community',
      text: 'A company-wide leaderboard highlights the learner’s own row, and Team Learning lets people join or start groups around a topic.',
      visual: {
        layout: 'browsers',
        screens: ['leaderboard', 'teams'],
        annotations: ['Podium for the top three', 'Your row highlighted', 'Join or start a team', 'Colleagues’ names blurred'],
      },
    },
  ],

  flows: [
    {
      title: 'Discover, learn, prove',
      visual: {
        layout: 'sequence',
        screens: ['catalog', 'activities', 'player', 'progress'],
        labels: ['Filter by category · sort', 'Check what’s inside, enrol', 'Progress & time saved', 'Quiz result in the report'],
      },
    },
    {
      title: 'Prove: assessment and certificate',
      note: 'The quiz stays locked until every lesson is done. The rule is visible, not a surprise.',
      steps: ['All content complete', 'Quiz unlocks', 'Score ≥ 80%', 'Certificate issued', 'Points added'],
    },
    {
      title: 'Share: learning in public',
      note: 'Post an update or achievement; recent achievements run down the side.',
      visual: {
        layout: 'sequence',
        screens: ['leaderboard', 'overview', 'teams'],
        labels: ['Leaderboard rank updates', 'Recent activity & feed', 'Join a team'],
      },
    },
  ],

  system: {
    title: 'Platform',
    text: 'The learner app ships six destinations in three groups: Overview, Community, Learning. Around it, the BRD defines the author and admin tools and a multi-tenant layer so the same LMS can later serve other organisations with their own branding and sign-in.',
    cards: [
      { label: 'Access', text: 'Company SSO for employees, social login for external tenants, and RBAC across learner, Skill Master, author and admin roles.' },
      { label: 'Sessions', text: 'Strong password policy for form login, session timeout on inactivity, and SCIM for user provisioning.' },
      { label: 'Audit', text: 'Logins, data changes, report generation and access to sensitive data are logged with time, user and action.' },
      { label: 'Reports', text: 'Completion, points, time spent, quiz and graded assessments, login activity, audit logs, journeys, a report scheduler and a report hub.' },
    ],
    visual: { layout: 'detail', screens: ['catalog'], crop: crops.catalogTools, caption: 'Enrolled vs Explore more, search, category and sort' },
    note: 'Requirements from the BRD around the learner app. These are requirements, not results.',
  },

  outcome: {
    statement:
      'One portal for the whole company’s learning: a catalog to browse and enrol in, a player that remembers where people stopped, a quiz and certificate at the end, and points, a leaderboard, teams and a feed that make finishing a course visible to colleagues.',
    stats: {
      label: 'Platform snapshot',
      items: [
        { value: '353', label: 'learners ranked on the leaderboard' },
        { value: '35', label: 'learning modules in the catalog' },
        { value: '509', label: 'enrolled in one mandatory module' },
        { value: '80%', label: 'pass mark on scored assessments' },
      ],
    },
    cardsLabel: 'The engagement layer',
    cards: [
      { label: 'Points for activity', text: 'Lessons, videos, quizzes and discussions all add to a visible points balance.' },
      { label: 'Certificates', text: 'Issued on passing; internal ones for HIPAA, QMS and ISMS, plus external certificates.' },
      { label: 'Leaderboards', text: 'Company-wide ranking today; team leaderboards designed next.' },
      { label: 'Social feed', text: 'Post a photo, achievement or update; recent achievements run down the side.' },
    ],
    learnings: [
      {
        title: 'Model the content first',
        text: 'Settling module → course → lesson → quiz → certificate early made the catalog, player and reports feel like one product.',
      },
      {
        title: 'Visibility drives completion',
        text: 'Progress bars, resume points and a locked-until-ready quiz removed the “where was I?” friction that stalls training.',
      },
      {
        title: 'Recognition beats reminders',
        text: 'Points, rank and a public activity feed give people a reason to come back that email nudges never did.',
      },
    ],
  },
}
