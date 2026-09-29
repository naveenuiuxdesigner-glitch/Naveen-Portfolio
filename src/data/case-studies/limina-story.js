/*
  Limina: the case study as a visual story.
  Condensed from Naveen's approved case study (./limina-sections.js and
  case-studies/sources/limina-case-study.html). Nothing is added: wording is shortened, facts are unchanged.
  Medical and product requirements stay requirements; there are no results in the source.

  Story shape (shared by every case study, see CaseStory.jsx):
  challenge → approach → product → flows → system (optional) → outcome.
  A visual is { layout, screens, crop?, ratio?, labels?, annotations?, caption? } (see mockups/Visual.jsx).
*/

// Parts of a screen to float as detail cards (fractions of the screen's width and height)
const crops = {
  profileStep: { x: 0, y: 0.08, w: 1, h: 0.42 },
  homeStepper: { x: 0, y: 0.74, w: 1, h: 0.12 },
  bookPrice: { x: 0.03, y: 0.27, w: 0.94, h: 0.38 },
  consentItems: { x: 0.03, y: 0.33, w: 0.94, h: 0.48 },
}

export const story = {
  challenge: {
    statement:
      'Limina treats obesity as long-term medical care, not a diet app. Medical weight care usually fails for practical reasons: it’s hard to get seen, treatment is expensive before anyone knows whether it will help, and nothing supports the patient between appointments.',
    compare: {
      before: {
        label: 'Care in pieces',
        items: [
          'You pay before knowing whether you even qualify',
          'The prescription arrives with no follow-up',
          'Weight, sleep and activity data sit in separate apps',
        ],
      },
      after: {
        label: 'With Limina',
        items: [
          'A health profile decides fit before any money changes hands',
          'Online consultation, then prescription only if appropriate',
          'Weight, sleep and wearable data feed one health score',
        ],
      },
    },
    usersLabel: 'Three groups use the platform; only the patient sees the app',
    users: [
      { code: 'PT', title: 'The patient', line: '“Will this actually work for someone like me?”' },
      { code: 'CL', title: 'The clinician', line: '“Show me the history before I dial in.”' },
      { code: 'OP', title: 'Clinic & platform operators', line: '“Who can see which patients?”' },
    ],
  },

  approach: [
    {
      title: 'Qualify before you charge',
      text: 'The 17-step health profile and BMI check run before payment, so someone who doesn’t fit is told early and clearly.',
      visual: {
        layout: 'phone',
        screens: ['profile'],
        crop: crops.profileStep,
        annotations: ['“Step 1 of 17” always visible', 'One question per screen'],
      },
    },
    {
      title: 'Care continues between consultations',
      text: 'Home is built around a normal day (weight, sleep, next appointment, treatment due), not around booking another call.',
      visual: {
        layout: 'phone',
        screens: ['home'],
        crop: crops.homeStepper,
        annotations: ['A programme stepper, not a menu'],
      },
    },
    {
      title: 'Say the sensitive parts plainly',
      text: 'Consent, fees and the fact that a prescription depends on the clinician’s judgement are written in full, never buried.',
      visual: {
        layout: 'phone',
        screens: ['book'],
        crop: crops.bookPrice,
        annotations: ['Price and what’s included', 'Medicines cost extra'],
      },
    },
    {
      title: 'Access as a designed state',
      text: 'Free trial, trial ended, paid for 60 days and not eligible (BMI under 25): each has its own message, colour and one clear action.',
      visual: {
        layout: 'phones',
        screens: ['trialActive', 'trialEnded'],
        annotations: ['Green: everything open', 'Amber: locked items marked'],
      },
    },
  ],

  product: [
    {
      title: 'Joining: consent first',
      text: 'Personal, health and wearable data are agreed separately, and the optional one is labelled optional.',
      visual: {
        layout: 'phone',
        screens: ['consent'],
        crop: crops.consentItems,
        annotations: ['Three separate agreements', 'Wearable data optional', '3/3 shown on the button'],
      },
    },
    {
      title: 'Home: the day between appointments',
      text: 'How am I doing, what’s behind that number, and where am I in the programme, in that order.',
      visual: {
        layout: 'phones',
        screens: ['home', 'appointments'],
        annotations: ['Score above its five inputs', 'Treatment due, not just booked', 'One-tap join'],
      },
    },
    {
      title: 'Body, heart & sleep data',
      text: 'The smart ring and phone health kits feed one set of dashboards, and sleep screening can point someone towards a doctor.',
      visual: {
        layout: 'phones',
        screens: ['bodyHeart', 'heartRate', 'sleepCoaching', 'sleepScreening'],
        annotations: ['BMI as a banded gauge', 'Min, average and max', 'Tips tagged High or Medium', 'STOP-BANG, one question per step'],
      },
    },
    {
      title: 'Learning & referrals',
      text: 'Education is grouped by the question a patient is actually asking, and opens with “It’s not your fault”.',
      visual: {
        layout: 'phones',
        screens: ['learn', 'referrals'],
        annotations: ['No stock-clinical tone', 'Referrals in three steps'],
      },
    },
    {
      title: 'Shop',
      text: 'The smart ring, treadmills, bikes and home products sit in the same navigation as care, so shopping never feels like a separate app.',
      visual: {
        layout: 'phones',
        screens: ['shop', 'product', 'cart'],
        annotations: ['Category chips', 'Colour thumbnails and variants', 'Discount shown in the summary'],
      },
    },
  ],

  flows: [
    {
      title: 'Join & qualify',
      note: 'The programme checks fit before it asks for money.',
      steps: ['Sign up', 'Consent, item by item', '17-step health profile', 'BMI 25+ check', '5-day trial starts'],
      visual: {
        layout: 'sequence',
        screens: ['welcome', 'consent', 'profile', 'notifications', 'trialActive'],
        labels: ['Sign up', 'Consent, item by item', 'Step 1 of 17', 'Permission by example', '5-day trial starts'],
      },
    },
    {
      title: 'Consult, then treatment',
      note: 'The only route to a prescription, then from pharmacy to refill.',
      steps: ['Book a slot', 'Pay consultation fee', 'Video consultation', 'Post-call summary', 'Clinician decides', 'Prescription or advice'],
      visual: {
        layout: 'sequence',
        screens: ['book', 'consultation', 'afterCall', 'prescription'],
        labels: ['Price, and what isn’t included', 'Video with four controls', 'Summary, duration and fee', 'QR, refills and expiry'],
      },
    },
    {
      title: 'Limina, end to end',
      note: 'Care continues after the prescription.',
      steps: ['Sign up & consent', 'Health profile', 'Eligibility', 'Online consultation', 'Prescription', 'Daily tracking', 'Follow-up & refills'],
    },
  ],

  system: {
    title: 'Platform',
    text: 'Limina runs across several cloud regions, with patient data kept inside the country it belongs to. That platform decided several things about the design.',
    cards: [
      { label: 'Local rules, same app', text: 'Currencies, languages and clinic networks differ by market, so every screen with money or dates had to handle that.' },
      { label: 'Video has failure states', text: 'Consultations run on a third-party video service, so the call UI needed reconnect, ended-early and rejoin states.' },
      { label: 'Two sources of health data', text: 'Ring data and phone health kits can disagree or go missing, so charts needed an honest empty state.' },
    ],
    visual: {
      layout: 'plain',
      screens: ['architecture'],
      caption: 'Primary and secondary regions, plus separate data-residency regions',
      annotations: ['iOS, Android and three portals', 'Identity, appointments, prescriptions services', 'Auth0 sign-in, Agora video', 'Ring and Sleep.ai integrations'],
    },
    note: 'How the platform is set up. These describe the product, not results.',
  },

  outcome: {
    statement:
      'A weight programme that behaves like medical care: it checks whether you qualify, explains what it costs, and keeps showing up between appointments.',
    stats: {
      label: 'Scope at a glance',
      items: [
        { value: '17', label: 'steps in the health profile' },
        { value: '4', label: 'access states, from trial to treatment' },
        { value: '6', label: 'connected modules in one app' },
        { value: '4', label: 'cloud regions behind the product' },
      ],
      note: 'The size of the product, not results.',
    },
    cardsLabel: 'What the design had to respect',
    cards: [
      { label: 'Privacy', text: 'Consent per data type, reviewable later, with wearable data always optional.' },
      { label: 'Data residency', text: 'Patient records stay in their own region; the app never implies data moves with the user.' },
      { label: 'Clinical safety', text: 'No prescription without a completed, paid consultation and a clinician’s decision.' },
      { label: 'Localization', text: 'English and Spanish interfaces, with €, $ and ¥ pricing and local clinic names.' },
      { label: 'Tone', text: 'Non-judgemental language everywhere, including in refusals and locked states.' },
      { label: 'Continuity', text: 'Reminders and aftercare keep working between consultations, offline data gaps included.' },
    ],
    cardsNote: 'Requirements the interface had to meet, not results.',
    learnings: [
      {
        title: 'Rules are part of the interface',
        text: 'Eligibility, fees and consent aren’t obstacles to design around. Stated clearly and early, they’re what makes a medical product trustworthy.',
      },
      {
        title: 'Tone carries more than layout',
        text: 'In obesity care, the wrong sentence loses the user. The copy in refusals and locked states mattered as much as the screens themselves.',
      },
      {
        title: 'Read the architecture',
        text: 'Regions, third-party video and two sources of health data all changed the screens. The system map was a design document.',
      },
    ],
  },
}
