/*
  Learnopedia (LMS) case study.
  Source: Naveen's LMS case study (case-studies/sources/lms-case-study.html). Nothing is invented.
  Platform numbers (learners, modules, enrolments) are shown as a platform snapshot, never as results.
  Missing on purpose (hidden until Naveen provides them): dates, team, research beyond the BRD,
  author and admin screens, wireframes, prototype, testing, results.
  The story itself (challenge, approach, product…) is in ./learnopedia-story.js.
*/

const base = `${import.meta.env.BASE_URL}images/work/learnopedia/`
const wide = true

export const learnopediaScreens = {
  overview: { src: `${base}01-overview.webp`, width: 1600, height: 1278, caption: 'Learner overview', wide },
  catalog: { src: `${base}02-catalog.webp`, width: 1600, height: 1250, caption: 'Course catalog, explore', wide },
  description: { src: `${base}03-module-description.webp`, width: 1600, height: 1000, caption: 'Module details, description', wide },
  activities: { src: `${base}04-module-activities.webp`, width: 1600, height: 1000, caption: 'Module details, activities', wide },
  module: { src: `${base}05-module-page.webp`, width: 1600, height: 733, caption: 'Module page', wide },
  player: { src: `${base}06-course-player.webp`, width: 1400, height: 1361, caption: 'Course player', wide },
  progress: { src: `${base}07-my-progress.webp`, width: 1600, height: 911, caption: 'My progress', wide },
  leaderboard: { src: `${base}08-leaderboard.webp`, width: 1600, height: 1344, caption: 'Leaderboard (names blurred)', wide },
  teams: { src: `${base}09-team-learning.webp`, width: 1600, height: 834, caption: 'Team learning', wide },
}

export const learnopedia = {
  summary:
    "Motivity Labs’ own learning management system: one place where every employee finds courses, finishes mandatory training, earns certificates and points, and sees what their colleagues are learning.",
  role: 'UI/UX Designer',
  company: 'Motivity Labs',
  domain: 'Internal platform · Learning & development',
  platform: 'Web app · learner, author & admin roles',
  scope: 'End-to-end product design',
  tags: ['Internal platform', 'Gamification', 'UX design', 'UI design'],
  tagline: 'Motivity Labs’ own LMS: one place where every employee finds courses, finishes mandatory training, earns certificates and points, and sees what colleagues are learning.',
  meta: ['Internal platform · Learning & development', 'Learning management system', 'Web app'],
  screens: learnopediaScreens,
  heroVisual: { layout: 'browser', screens: ['overview'] },
}
