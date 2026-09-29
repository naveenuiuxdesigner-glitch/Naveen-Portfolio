/*
  Limina case study.
  Source: Naveen's Limina case study (case-studies/sources/limina-case-study.html). Nothing is invented.
  Medical and product requirements are kept separate from outcomes; there are no results in the source.
  Naveen asked (2026-09-27) that this page mentions no link to any other project or client.
  Missing on purpose (hidden until Naveen provides them): client, dates, team, research,
  portal screens, wireframes, prototype, testing, results.
  The story itself (challenge, approach, product…) is in ./limina-story.js.
*/

const base = `${import.meta.env.BASE_URL}images/work/limina/`

export const liminaScreens = {
  architecture: {
    src: `${base}22-architecture.webp`,
    width: 2000,
    height: 1687,
    caption: 'Platform infrastructure architecture',
    wide: true,
  },
  trialActive: { src: `${base}15-trial-active.webp`, width: 466, height: 1010, caption: 'Trial active' },
  trialEnded: { src: `${base}16-trial-ended.webp`, width: 466, height: 1010, caption: 'Trial ended' },
  welcome: { src: `${base}01-welcome.webp`, width: 466, height: 1010, caption: 'Welcome' },
  consent: { src: `${base}02-consent.webp`, width: 466, height: 1010, caption: 'Consent, item by item' },
  profile: { src: `${base}03-health-profile.webp`, width: 466, height: 1010, caption: 'Health profile' },
  notifications: { src: `${base}04-notifications.webp`, width: 466, height: 1010, caption: 'Notifications' },
  home: { src: `${base}05-home.webp`, width: 466, height: 1010, caption: 'Home' },
  appointments: { src: `${base}06-appointments.webp`, width: 466, height: 1010, caption: 'Appointments' },
  book: { src: `${base}07-book-consultation.webp`, width: 466, height: 1010, caption: 'Book a consultation' },
  consultation: { src: `${base}08-consultation.webp`, width: 466, height: 1010, caption: 'Online consultation' },
  afterCall: { src: `${base}09-after-the-call.webp`, width: 466, height: 1010, caption: 'After the call' },
  prescription: { src: `${base}10-prescription.webp`, width: 466, height: 1010, caption: 'Prescription' },
  bodyHeart: { src: `${base}11-body-heart.webp`, width: 466, height: 1010, caption: 'Body & Heart' },
  heartRate: { src: `${base}12-heart-rate.webp`, width: 466, height: 1010, caption: 'Heart rate history' },
  sleepCoaching: { src: `${base}13-sleep-coaching.webp`, width: 466, height: 1010, caption: 'Sleep coaching' },
  sleepScreening: { src: `${base}14-sleep-screening.webp`, width: 466, height: 1010, caption: 'Sleep apnea screening' },
  learn: { src: `${base}17-learn.webp`, width: 466, height: 1010, caption: 'Learn' },
  referrals: { src: `${base}18-referrals.webp`, width: 466, height: 1010, caption: 'Referral program' },
  shop: { src: `${base}19-shop.webp`, width: 466, height: 1010, caption: 'Shop' },
  product: { src: `${base}20-product.webp`, width: 466, height: 1010, caption: 'Product details' },
  cart: { src: `${base}21-cart.webp`, width: 466, height: 1010, caption: 'My cart' },
}

export const limina = {
  summary:
    'A clinician-led obesity care programme in one app: health profile and eligibility, online consultations, prescriptions, wearable data and daily aftercare, built to run across several countries with local data rules.',
  role: 'UI/UX Designer',
  company: 'Motivity Labs',
  domain: 'HealthTech · Obesity care · Telemedicine',
  platform: 'iOS & Android, with clinic, admin & partner portals',
  scope: 'Patient app, end to end',
  tags: ['HealthTech', 'Telemedicine', 'UX design', 'UI design'],
  tagline: 'A clinician-led obesity care programme in one app, from eligibility and online consultations to prescriptions, wearable data and daily aftercare.',
  meta: ['HealthTech · Telemedicine', 'Obesity care programme', 'iOS & Android app'],
  screens: liminaScreens,
  heroVisual: { layout: 'phones', screens: ['welcome', 'home', 'prescription'] },
}
