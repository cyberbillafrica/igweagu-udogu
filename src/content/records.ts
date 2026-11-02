/**
 * The house's public record: notices and events.
 *
 * PROVENANCE
 * ----------
 * Every record below is drawn from the house's public announcement, revised
 * 23 September 2021. Three entries appear because the announcement itself
 * records three dated moments — the opening of jubilee activities (1 August
 * 2021), the revised announcement (23 September 2021) and the first official
 * task (9 October 2021). No notice, event, date or venue has been invented,
 * and no future date is published.
 *
 * These records are static for Milestone 2. In Milestone 3 they move to
 * Firestore (`notices`, `events` collections) behind the same types, so the
 * page components do not change.
 */

export type NoticeCategory = "announcement" | "programme" | "assembly";

export type Notice = {
  slug: string;
  category: NoticeCategory;
  /** ISO date, used for <time dateTime> and ordering. */
  date: string;
  dateLabel: string;
  title: string;
  summary: string;
  body: string[];
  facts: { label: string; value: string }[];
  source: string;
  featured?: boolean;
};

export type EventRecord = {
  slug: string;
  title: string;
  /** ISO date. */
  date: string;
  dateLabel: string;
  weekday: string;
  /** Empty for a past event whose date is historical. */
  status: "recorded" | "announced";
  kind: string;
  venue: string;
  lga: string;
  state: string;
  summary: string;
  body: string[];
  facts: { label: string; value: string }[];
  source: string;
};

const ANNOUNCEMENT = "House announcement, 23 September 2021";

export const notices: Notice[] = [
  {
    slug: "the-igweagu-announcement",
    category: "announcement",
    date: "2021-09-23",
    dateLabel: "23 September 2021",
    title: "The Igweagu announcement, revised",
    summary:
      "The house restated the Igbo agenda that began in 1996 and set out what it asks of the Igweagu: the prophecy, the Golden Jubilee, the registration format and the first-seven rule.",
    body: [
      "On 23 September 2021 the house issued a revised public announcement. It restates the Igbo agenda — Nchawaputa ala Igbo — as a work begun in 1996 and still in progress, and it sets out what that work now asks of the Igweagu.",
      "The announcement records the two installations of 1996: the crowning of Chief Dim Chukwuemeka Odumegwu Ojukwu as Eze Igbo Gburugburu and the installation of Chief Ozua Okoye as Onowu Igbo Gburugburu. The house presents those crownings as the public beginning of the mission.",
      "It defines the Igweagu as all Igbo children, in any part of the world, born between 1970 and 1976, and states the prophecy the house carries: that the Igweagu — the Udogu — shall bring peace to Ndigbo at their golden age. The golden age is read as fifty years, and therefore as a Golden Jubilee.",
      "The jubilee, in the announcement's account, opens a first phase of seven months to be carried out by the Igweagu. The programmes that follow are meant to translate into the restoration of peace, economic development, food security and good health for Ndigbo.",
      "The announcement then turns to practice. Every Igweagu is asked to identify themselves. The registration format is published: a name in full, the village, town, Local Government Area, state and senatorial zone of origin, and a year of birth. The first seven registered Igweagu in any Igbo-speaking senatorial zone automatically become the Directors of Igweagu Affairs in that zone.",
      "It closes with the signatures of four custodians and with the telephone, WhatsApp and email channels through which the house receives enquiries.",
    ],
    facts: [
      { label: "Issued", value: "23 September 2021" },
      { label: "Signed by", value: "Four custodians" },
      { label: "Registration format", value: "Name · origin · birth year" },
      { label: "Channels", value: "Telephone, WhatsApp, email" },
    ],
    source: ANNOUNCEMENT,
    featured: true,
  },
  {
    slug: "the-first-official-task",
    category: "assembly",
    date: "2021-10-09",
    dateLabel: "9 October 2021",
    title: "The first official task, at Obu Gad",
    summary:
      "The Igweagu were called to their first official task on Eke market day, at Obu Gad in Aguleri, Anambra East Local Government Area.",
    body: [
      "The announcement named a date and a place for the Igweagu's first official task: Saturday 9 October 2021, an Eke market day, at Obu Gad in Aguleri, Anambra East Local Government Area, Anambra State.",
      "The gathering is recorded here as history. It is not an upcoming event, and this site publishes no future date until the house announces one.",
    ],
    facts: [
      { label: "Date", value: "Saturday 9 October 2021" },
      { label: "Market day", value: "Eke" },
      { label: "Venue", value: "Obu Gad, Aguleri" },
      { label: "Local Government Area", value: "Anambra East, Anambra State" },
    ],
    source: ANNOUNCEMENT,
  },
  {
    slug: "jubilee-activities-begin",
    category: "programme",
    date: "2021-08-01",
    dateLabel: "1 August 2021",
    title: "Golden Jubilee activities begin",
    summary:
      "Activities marking the Golden Jubilee of the Igweagu opened on 1 August 2021, beginning a first phase the house describes as lasting seven months.",
    body: [
      "Activities marking the Golden Jubilee of the Igweagu began on 1 August 2021. The announcement describes the jubilee as opening a series of activities whose first phase would last seven months and would be carried out by the Igweagu.",
      "The house has not published a programme report for that phase. This notice records the opening as announced, and nothing beyond it.",
    ],
    facts: [
      { label: "Opened", value: "1 August 2021" },
      { label: "First phase", value: "Seven months" },
      { label: "Carried out by", value: "The Igweagu" },
    ],
    source: ANNOUNCEMENT,
  },
];

export const featuredNotice = notices.find((notice) => notice.featured) ?? notices[0];

export function noticeBySlug(slug: string): Notice | undefined {
  return notices.find((notice) => notice.slug === slug);
}

export function noticesExcept(slug: string): Notice[] {
  return notices.filter((notice) => notice.slug !== slug);
}

export const events: EventRecord[] = [
  {
    slug: "first-official-task-2021",
    title: "The first official task of the Igweagu",
    date: "2021-10-09",
    dateLabel: "9 October 2021",
    weekday: "Saturday",
    status: "recorded",
    kind: "Assembly",
    venue: "Obu Gad",
    lga: "Anambra East",
    state: "Anambra State",
    summary:
      "The Igweagu were called to their first official task on Eke market day at Obu Gad in Aguleri, Anambra East Local Government Area.",
    body: [
      "The house's 2021 announcement named Saturday 9 October 2021 — an Eke market day — as the date on which the Igweagu would perform their first official task.",
      "The central venue was Obu Gad in Aguleri, Anambra East Local Government Area, Anambra State.",
      "The record of the gathering itself rests with the house. This page records what was announced, and marks the event as historical. No account of attendance, outcome or programme is published here, because none has been published by the house.",
    ],
    facts: [
      { label: "Date", value: "Saturday 9 October 2021" },
      { label: "Market day", value: "Eke" },
      { label: "Venue", value: "Obu Gad, Aguleri" },
      { label: "Local Government Area", value: "Anambra East" },
      { label: "State", value: "Anambra State" },
    ],
    source: ANNOUNCEMENT,
  },
];

export function eventBySlug(slug: string): EventRecord | undefined {
  return events.find((event) => event.slug === slug);
}

export function eventsExcept(slug: string): EventRecord[] {
  return events.filter((event) => event.slug !== slug);
}

/** No future date has been announced by the house. */
export const upcomingEvents: EventRecord[] = events.filter(
  (event) => event.status === "announced",
);

export const pastEvents: EventRecord[] = events.filter(
  (event) => event.status === "recorded",
);
