/*
  SAMpatee case study.
  Source: Naveen's SAMpatee case study (case-studies/sources/sampatee-case-study.html) and the screens ZIP.
  Nothing is invented. The BRD's KPIs are targets and appear only as requirements (story outcome),
  never as results. There are no voice-AI results in the source.
  Missing on purpose (hidden until Naveen provides them): client, dates, team, research beyond the BRD,
  tablet and web screens, wireframes, prototype, testing, results.
  The story itself (challenge, approach, product…) is in ./sampatee-story.js.
*/

const base = `${import.meta.env.BASE_URL}images/work/sampatee/`

export const sampateeScreens = {
  welcome: { src: `${base}01-welcome.webp`, width: 776, height: 1684, caption: 'Welcome & sign-in' },
  pairing: { src: `${base}02-voice-pairing.webp`, width: 776, height: 1684, caption: 'Voice device pairing' },
  home: { src: `${base}03-home.webp`, width: 776, height: 1684, caption: 'Home dashboard' },
  chat: { src: `${base}04-sam-chat.webp`, width: 776, height: 1684, caption: 'Talking to SAM' },
  recharge: { src: `${base}05-recharge-mode.webp`, width: 776, height: 1684, caption: 'Proactive: Recharge Mode' },
  rooms: { src: `${base}06-rooms.webp`, width: 776, height: 1684, caption: 'Room control' },
  family: { src: `${base}10-family.webp`, width: 776, height: 1684, caption: 'Family & permissions' },
  challenges: { src: `${base}07-challenges.webp`, width: 776, height: 1684, caption: 'Challenges' },
  leaderboard: { src: `${base}08-leaderboard.webp`, width: 776, height: 1684, caption: 'Family leaderboard' },
  rewards: { src: `${base}09-rewards.webp`, width: 776, height: 1684, caption: 'Rewards' },
  fall: { src: `${base}11-fall-sos.webp`, width: 776, height: 1684, caption: 'Fall detection' },
  arabic: { src: `${base}12-home-arabic.webp`, width: 776, height: 1684, caption: 'Home · Arabic, mirrored right-to-left' },
  admin: { src: `${base}13-admin-dashboard.webp`, width: 1600, height: 1000, caption: 'Admin dashboard', wide: true },
}

export const sampatee = {
  summary:
    "A voice-first wellness platform that brings a family’s wearables, health devices and smart home into one app, and lets them run all of it by talking to SAM, an AI agent.",
  role: 'UI/UX Designer',
  company: 'Motivity Labs',
  domain: 'HealthTech · Voice AI · Smart home',
  platform: 'iOS, Android, tablet, web + admin portal',
  scope: 'Consumer app, voice layer & admin',
  tags: ['HealthTech', 'Voice AI', 'Smart home', 'UX design', 'UI design'],
  tagline: 'A voice-first wellness app that puts a family’s wearables, health devices and smart home in one place, run by talking to SAM, an AI agent.',
  meta: ['HealthTech · Voice AI · Smart home', 'Voice-first wellness platform', 'iOS, Android, tablet, web + admin'],
  screens: sampateeScreens,
  heroVisual: { layout: 'phones', screens: ['home', 'chat', 'recharge'] },
}
