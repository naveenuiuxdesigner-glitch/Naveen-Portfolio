/*
  SJ Life case study.
  Source: Naveen's SJ Life case study, extracted to case-studies/case-study-extract.md.
  Every sentence here comes from that source. Nothing is invented.
  Missing on purpose (hidden on the live site until Naveen provides them):
  problem statement, team, dates, research, wireframes, prototype, testing, results, learnings.
  The story itself (challenge, approach, product…) is in ./sj-life-story.js.
*/

const base = `${import.meta.env.BASE_URL}images/work/sj-life/`

// The 10 real screens. width/height are the image's own pixel size, so the page never jumps while loading.
export const sjLifeScreens = {
  splash: { src: `${base}00a-splash.webp`, width: 393, height: 852, caption: 'Splash' },
  signUp: { src: `${base}00b-sign-up-welcome.webp`, width: 393, height: 852, caption: 'Welcome, sign up' },
  login: { src: `${base}00c-login.webp`, width: 393, height: 852, caption: 'Login' },
  welcome: { src: `${base}01-welcome-value-prop.webp`, width: 393, height: 853, caption: 'Welcome, value prop' },
  bmi: { src: `${base}02-onboarding-bmi-match.webp`, width: 393, height: 852, caption: 'Onboarding, BMI match' },
  home: { src: `${base}03-home.webp`, width: 786, height: 2080, caption: 'Home', tall: true },
  clinic: { src: `${base}04-offline-booking-select-clinic.webp`, width: 393, height: 792, caption: 'Offline booking, Select Clinic' },
  shop: { src: `${base}05-shop-health-profile-aware-catalog.webp`, width: 393, height: 852, caption: 'Shop, health-profile-aware catalog' },
  sleepDashboard: { src: `${base}06-sleep-dashboard.webp`, width: 393, height: 852, caption: 'Sleep Dashboard' },
  sleepCoaching: { src: `${base}07-sleep-coaching.webp`, width: 393, height: 852, caption: 'Sleep Coaching' },
  sleepCheck: { src: `${base}08-sleep-health-check.webp`, width: 394, height: 852, caption: 'Sleep Health Check' },
  stopBang: { src: `${base}09-stop-bang-question-flow.webp`, width: 393, height: 852, caption: 'STOP-BANG question flow' },
  screeningResult: { src: `${base}10-screening-result.webp`, width: 370, height: 852, caption: 'Screening result' },
}

export const sjLife = {
  summary:
    'A unified health, clinic, and longevity platform for OLM/ShopJapan, from onboarding and daily health tracking through telemedicine, shopping, and warranty, with a dedicated Sleep Intelligence module layered in as Phase 2.1.',
  role: 'UI/UX Designer',
  client: 'OLM / ShopJapan, via INCITE',
  domain: 'HealthTech',
  platform: 'iOS, Android & Web Clinic Portal',
  scope: 'Full BRD: health, clinic, shop, warranty',
  // Not provided yet: timeline dates, team
  tags: ['HealthTech', 'UX design', 'UI design'],
  tagline: 'A unified health, clinic and longevity platform for OLM/ShopJapan, from onboarding and health tracking to telemedicine, shopping and warranty, plus Sleep Intelligence.',
  meta: ['HealthTech', 'Health, clinic & longevity platform', 'iOS, Android & Web Clinic Portal'],
  screens: sjLifeScreens,
  heroVisual: { layout: 'phones', screens: ['welcome', 'home', 'sleepDashboard'] },
  // Work-list card: different screens from the hero, so it doesn't look like Limina's
  coverVisual: { layout: 'phones', screens: ['signUp', 'splash', 'login'] },
}
