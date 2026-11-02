/**
 * English dictionary — the single source of all user-facing copy.
 *
 * Every string the visitor sees is defined here, addressed by a stable key.
 * To add Igbo: copy this file to `ig.ts`, translate the values, then add
 * `"ig"` to `enabledLocales` in `src/i18n/config.ts`. Components never hard-code
 * copy, so no UI work is required.
 *
 * ---------------------------------------------------------------------------
 * CONTENT STATUS
 * Copy that describes the house's own record (milestones, notices, events and
 * office titles) is placeholder material pending confirmation by the
 * secretariat. Each such block is marked `PLACEHOLDER` below and listed in
 * CONTENT-REVIEW.md. Nothing here invents named individuals, achievements,
 * venues or contact details.
 * ---------------------------------------------------------------------------
 */
import { pages, shared } from "./en-pages";

export const en = {
  meta: {
    siteName: "Igweagu Udogu Igbonine Gbulugbulu",
    tagline: "The New Covenant · Ndi Gboo",
    title: "Igweagu Udogu Igbonine Gbulugbulu — The New Covenant",
    description:
      "The official home of Igweagu Udogu Igbonine Gbulugbulu: a covenant of kinship formed in 1996 by the generation born 1967–1976, united across senatorial zones and rooted in Igbo heritage.",
    keywords: [
      "Igweagu Udogu",
      "Igbonine Gbulugbulu",
      "Ndi Gboo",
      "Igbo heritage",
      "Igbo cultural institution",
      "membership",
    ],
  },

  ui: {
    skipToContent: "Skip to content",
    menu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    languageComingSoon: "Igbo translation in preparation",
    readMore: "Read more",
    externalLink: "Opens in a new tab",
    backToTop: "Back to top",
    breadcrumb: "Breadcrumb",
  },

  nav: {
    home: "Home",
    about: "About",
    aboutHouse: "About the house",
    history: "Our history",
    igweagu: "Igweagu Udogu",
    vision: "Vision & mission",
    heritage: "Heritage",
    heritagePage: "Igbo heritage",
    gallery: "Gallery",
    programmes: "Programmes",
    leadership: "Leadership",
    newsEvents: "News & Events",
    news: "News",
    events: "Events",
    membership: "Membership",
    contact: "Contact",
    joinCta: "Join the covenant",
    greeting: "Ndeewo",
    greetingContext: "Welcome to the house of Igweagu Udogu",
    primaryLabel: "Primary",
    sectionsLabel: "All pages",
  },

  hero: {
    eyebrow: "The New Covenant · Ndi Gboo",
    titleLines: ["Igweagu Udogu", "Igbonine", "Gbulugbulu"],
    lede: "A covenant of kinship formed by the generation born between 1967 and 1976 — gathered across senatorial zones, rooted in Igbo heritage, and building an institution worthy of the generations still to come.",
    primaryCta: "Join the covenant",
    secondaryCta: "Our story since 1996",
    scrollCue: "Scroll",
    facts: [
      { value: "1996", label: "The covenant formed" },
      { value: "1967–1976", label: "The founding generation" },
      { value: "2026", label: "Golden Jubilee" },
    ],
  },

  intro: {
    eyebrow: "Who we are",
    heading: "An institution built on kinship, not on paperwork.",
    paragraphs: [
      "Igweagu Udogu Igbonine Gbulugbulu is a house of descendants and kin, bound by a covenant entered into in 1996. We exist to keep a people connected — to their villages and towns, to their customs, and to one another, wherever in Nigeria or the world they have settled.",
      "Membership is organised by village, town, local government, state and senatorial zone, so that every member is known by name and represented in the councils of the house. Our work is patient and institutional: records kept properly, leadership confirmed openly, and heritage taught to children who will one day inherit it.",
    ],
    quote: "Onye aghala nwanne ya.",
    quoteTranslation: "Let no one leave a brother behind.",
    quoteAttribution: "Igbo proverb",
  },

  story: {
    eyebrow: "Our journey",
    heading: "Thirty years of keeping a covenant.",
    lede: "The record begins in 1996, with two crownings and an agenda for Igboland. It continues through the jubilee the house opened in 2021, and into the year it now carries.",
    milestones: [
      {
        year: "1996",
        title: "The Igbo agenda begins",
        body: "The journey towards Nchawaputa ala Igbo is set in motion. Chief Dim Chukwuemeka Odumegwu Ojukwu is crowned Eze Igbo Gburugburu, and Chief Ozua Okoye is installed as Onowu Igbo Gburugburu.",
      },
      {
        year: "2021",
        title: "Jubilee activities open",
        body: "On 1 August 2021, activities marking the Golden Jubilee of the Igweagu begin — the first phase, in the house's account, of a longer programme.",
      },
      {
        year: "2021",
        title: "The announcement is revised",
        body: "On 23 September 2021 the house restates the prophecy, the mandate of the Igweagu, the registration format and the first-seven rule for senatorial zones.",
      },
      {
        year: "2021",
        title: "The first official task",
        body: "The Igweagu are called to their first official task on Eke market day, at Obu Gad in Aguleri, Anambra East Local Government Area.",
      },
      {
        year: "2026",
        title: "The year the house carries",
        body: "The house's identity now carries the year 2026, and the jubilee it opened in 2021 continues into it.",
      },
    ],
    footnote:
      "Milestones are taken from the house's public announcement of 23 September 2021 and from its emblem. Where the record is silent, this page is silent.",
  },

  vision: {
    eyebrow: "Vision & mission",
    heading: "What the covenant is for.",
    visionLabel: "Our vision",
    visionBody:
      "To be the enduring covenant that keeps every descendant of Igweagu Udogu connected — to their roots, to one another, and to a future they build together.",
    missionLabel: "Our mission",
    missionItems: [
      {
        title: "Restore peace",
        body: "Work for reconciliation and unity among Ndigbo — the first promise of the prophecy, and the condition of every other good.",
      },
      {
        title: "Build livelihoods",
        body: "Pursue economic development that reaches the household: work, trade and enterprise that make a family secure.",
      },
      {
        title: "Secure food",
        body: "Treat food security for Igbo communities as a matter of dignity and communal responsibility.",
      },
      {
        title: "Protect health",
        body: "Promote good health for the Igweagu generation and for the communities that raised it.",
      },
    ],
  },

  jubilee: {
    eyebrow: "Igweagu generation · Golden Jubilee",
    badge: "Golden Jubilee",
    fromYear: "1967–1976",
    toYear: "2026",
    yearsLabel: "years",
    heading: "Fifty years of a generation that would not scatter.",
    paragraphs: [
      "Between 1967 and 1976 — through the years that tested Igbo life most severely — a generation was born. They carried the names, the language and the customs of their fathers into a changed world.",
      "In 1996 that generation made a covenant, and called it new. Fifty years on, the house gathers to honour them, to record what they preserved, and to hand it on.",
    ],
    recordLabel: "Recorded in the emblem",
    recordValue: "Born from 1967–1976",
    cta: "Read the history",
  },

  heritage: {
    eyebrow: "Igbo heritage",
    heading: "The customs that made us — kept, not framed.",
    lede: "Heritage is instruction, not decoration. The house keeps three things close: the way we do things, the people we belong to, and the counsel of those who have gone before.",
    pillars: [
      {
        term: "Ọmenala",
        gloss: "Custom and practice",
        body: "The inherited way of doing things — naming and marriage, festival and burial, the courtesies that hold a community together — taught to each generation as a living practice.",
      },
      {
        term: "Ụmụnna",
        gloss: "Kinship and brotherhood",
        body: "The extended family as institution: where obligation is shared, where a stranger is a kinsman not yet met, and where no one is left to stand alone.",
      },
      {
        term: "Ndi Gboo",
        gloss: "The elders",
        body: "The living archive of the house — memory, counsel, and the authority of those who have gone before, whose judgement steadies the councils of the young.",
      },
    ],
    footnote:
      "Cultural photography from Wikimedia Commons contributors. Full attribution is published on the photography credits page.",
  },

  leadership: {
    eyebrow: "Leadership",
    heading: "Custodians of the covenant.",
    lede: "Leadership in the house rests on registration, appointment and confirmation — never on assumption. No seat is presented here as filled before the house has named its holder.",
    seats: [
      {
        office: "The signatories of 2021",
        role: "Custodians",
        body: "Four custodians signed the house's revised announcement of 23 September 2021. They are recorded by name, with their titles, on the leadership page.",
      },
      {
        office: "Directors of Igweagu Affairs",
        role: "Senatorial zones",
        body: "In each Igbo-speaking senatorial zone, the first seven registered Igweagu become the zone's directors — a rule stated in the house's own announcement.",
      },
      {
        office: "Correspondence",
        role: "Records & enquiries",
        body: "Registration, records and enquiries are received through the channels the house publishes: telephone, WhatsApp and email.",
      },
    ],
    note: "No chairman, secretary or treasurer has been published by the house. Appointments appear on this site only after the house confirms them."
  },

  news: {
    eyebrow: "Announcements",
    heading: "From the house's record.",
    lede: "Public notices, kept in date order. Nothing appears here that the house has not itself issued.",
    viewAll: "All notices",
    readMore: "Read the notice",
    categories: {
      announcement: "Announcement",
      programme: "Programme",
      assembly: "Assembly",
    },
    footnote:
      "Notices are drawn from the house's public announcement of 23 September 2021. The record has been quiet since.",
  },

  events: {
    eyebrow: "Events",
    heading: "Where the house gathers.",
    lede: "One gathering has been announced and held. No future date is published here until the house announces one.",
    viewAll: "All events",
    pastLabel: "Recorded",
    footnote:
      "Dates and venues appear only where the house has published them. The 2021 gathering is history, not a forthcoming event.",
  },

  membership: {
    eyebrow: "Membership",
    heading: "Take your place in the covenant.",
    body: "Registration gathers what the house needs to place you correctly — village, town, local government, state and senatorial zone — so that every member is known, counted and represented.",
    steps: [
      {
        step: "01",
        title: "Register",
        body: "Create your account with your names, place of origin and contact details.",
      },
      {
        step: "02",
        title: "Verify",
        body: "Confirm your email address so that the secretariat can correspond with you.",
      },
      {
        step: "03",
        title: "Review",
        body: "The secretariat reviews your application and confirms your details.",
      },
      {
        step: "04",
        title: "Serve",
        body: "Receive your membership number and take your place in the register.",
      },
    ],
    cta: "Begin registration",
    privacyNote:
      "Your details are used only for membership administration and are never published without your consent.",
  },

  footer: {
    tagline:
      "A house of Igbo sons and daughters carrying the Igbo agenda that began in 1996, and the covenant it places on the Igweagu generation.",
    columns: {
      theHouse: "The house",
      heritage: "Heritage",
      engagement: "Engagement",
    },
    contactTitle: "Correspondence",
    contactNote: "Channels published by the house in its 2021 announcement.",
    creditsLink: "Photography credits",
    rights: "All rights reserved.",
    motto: "The New Covenant · Ndi Gboo",
    imageryNote:
      "Photographs are licensed cultural images, not the house's own archive. Each is credited.",
  },

  creditsPage: {
    eyebrow: "Colophon",
    title: "Photography credits",
    lede: "The cultural photography on this site is used under the licences listed below. Images are placeholders for the house's own archive and will be replaced as the collection is digitised.",
    licenceLabel: "Licence",
    sourceLabel: "Source",
  },

  notFound: {
    eyebrow: "Page not found",
    title: "This page is not part of the house.",
    lede: "The page you asked for has moved or has not yet been published.",
    cta: "Return to the homepage",
  },

  shared,
  pages,
} as const;

export type Dictionary = typeof en;
