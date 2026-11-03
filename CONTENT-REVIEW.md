# Content review — Milestone 2

Status of every claim on the public site, and what the house still needs to confirm.
Provenance for each page is in [CONTENT-PROVENANCE.md](CONTENT-PROVENANCE.md).

## Since Milestone 1

Milestone 1 shipped a homepage built on placeholder milestones and invented sample notices.
Those have been **removed**, not merely relabelled:

| Milestone 1 placeholder | Now |
| --- | --- |
| Timeline entries for 2001, 2007, 2013, 2020 with invented descriptions | Replaced by the sourced record: 1996, 1 Aug 2021, 23 Sep 2021, 9 Oct 2021, 2026 |
| Three sample announcements dated 2026 | Replaced by three notices drawn from the 2021 announcement |
| Three future events (Nov 2026, Dec 2026, Mar 2027) with "venue to be confirmed" | Removed. The events page publishes one **past** event and an explicit empty state for upcoming dates |
| Five invented offices (Office of the Igwe, Bureau of Finance, Ndi Gboo Council, …) | Replaced by the four 2021 signatories, the first-seven rule, and the published correspondence channels |
| "Contact details to be confirmed" | Replaced by the email, four telephone numbers and WhatsApp group published in 2021 |
| Membership page describing a portal "in preparation" with no detail | Rebuilt around the house's own registration format and first-seven rule |

## Verified against the primary source

Everything in this column comes from the house's revised announcement of 23 September 2021
and is reproduced without embellishment:

- The Igbo agenda (**Nchawaputa ala Igbo**) began in 1996.
- **Chief Dim Chukwuemeka Odumegwu Ojukwu** was crowned **Eze Igbo Gburugburu** in 1996.
- **Chief Ozua Okoye** was installed as **Onowu Igbo Gburugburu** in 1996.
- The Igweagu are defined in the announcement as Igbo children **born 1970–1976**, anywhere in the world.
- The prophecy: the Igweagu (Udogu) shall bring peace to Ndigbo at their golden age.
- The golden age is read as 50 years, and therefore as a **Golden Jubilee**.
- **2021** marks the jubilee in the announcement; activities began **1 August 2021**.
- The first phase was to last **seven months** and be carried out by the Igweagu.
- The intended outcomes are **peace, economic development, food security and good health**.
- The **first seven registered Igweagu in any Igbo-speaking senatorial zone** become Directors of
  Igweagu Affairs in that zone.
- The first official task: **Saturday 9 October 2021 (Eke market day)**, at **Obu Gad, Aguleri,
  Anambra East LGA, Anambra State**.
- Signatories: **Chief Dr. Chukwuemeka Ezeife** (Okwadike Igbukwu); **Dr. Ramas Okoye Asuzu**
  (Ezeoba Nri); **Eze Chukwuemeka Eri** (Ezedi-Gbo Ezeora 34th, Eze Akajlofor Igbo); **Maazi
  Nnamdi O. Okoronkwo** (Igwekala of Arochukwu).
- Contact: **igweaguigbonine@gmail.com**; **+234 806 054 8039**, **+234 803 698 6543**,
  **+234 707 763 3014**, **+234 702 036 5331**; the published WhatsApp group link.

## Unresolved — do not publish a ruling until confirmed

### 1. Birth-year span

| Source | Span |
| --- | --- |
| Supplied emblem | Born from **1967–1976** |
| 2021 announcement | Born **1970–1976** |

Both are shown on the site (emblem span in the hero and Jubilee feature; announcement span on
`/igweagu-udogu`, `/history` and `/membership`), and the discrepancy is stated in plain words.
**No eligibility rule is asserted.** Applicants near either boundary are told to confirm with the
house.

### 2. Jubilee year

The announcement says **2021** marks the Golden Jubilee; the house's current identity and emblem
carry **2026**. The site treats the observance as a period and records both.

### 3. Leadership

- No chairman, secretary, treasurer or other office holder has been published.
- No zone director has been published.
- The four signatories are described as signatories of a 2021 document — **not** as current
  office holders.

The `/leadership` page states all three positions explicitly rather than filling them.

### 4. The film

`public/brand/Igweagu.mp4` was supplied with the brand assets and now plays from the homepage film
band. The recording is published **as supplied**, without trimming or re-encoding.

- Its date, location and the names of anyone appearing in it are **not confirmed**, so no caption
  makes a claim about them; the page says the provenance is pending.
- The frame carries on-screen titles ("Ndi Igbo Royal Ordained Heritage — NIROH"; "Prophet Ikem
  Okoyedike · Ebube Agu Prophecy"). These are **not** reproduced as house statements, and the
  relationship between NIROH and the house is unconfirmed.
- The secretariat should confirm that the recording may be published, and supply a date and a
  one-line description for the caption.

## Editorial wording awaiting approval

These are written by the project, not by the house. They contain no new facts but the house should
adopt, amend or reject them:

| Location | Text | Question |
| --- | --- | --- |
| `/vision-mission` | Vision: "A Ndigbo at peace: reunited with its heritage, secure in its livelihood, and confident in the generations that follow." | Has the assembly adopted a vision text? |
| `/vision-mission` | Mission: "To gather the Igweagu into one body, to keep faith with the prophecy the house carries, and to turn that faith into peace, economic development, food security and good health for Ndigbo." | Same |
| `/vision-mission` | Six objectives and four principles (unity, respect, truth, stewardship) | Are these the house's principles? |
| `/about` | The name explained part by part; "Udogu" glossed only by quoting the announcement | Approve the gloss |
| `/heritage` | General explanations of Ọmenala, Ụmụnna, Ndi Gboo, Iri Ji, Mgba, Mmanwụ, age grades, titled societies | House to confirm its own teaching where it differs |
| `/programmes` | Three cultural programme items marked **proposed** | Confirm whether these are planned |

## Status labels in use

`/programmes` labels every item:

- **Announced** — the house has named the outcome (the four mandate items).
- **Proposed** — an intention described without a published programme (the cultural items).
- **Recorded** — a historical fact (`/events`).

No item is labelled delivered, completed or achieved.

## Deliberate omissions

- No photographs of the house's own occasions — the archive has not been supplied.
- No membership statistics, chapters, project counts or testimonials.
- No postal address (never published).
- No Igbo translation: the language switcher shows Igbo as unavailable until a reviewed
  dictionary exists.

## Contact details in use

Published by the house in 2021 and reproduced verbatim in `src/content/contact.ts`, the footer,
`/contact` and `/leadership`. **If any number has changed, it must be corrected there and nowhere
else** — every surface reads from that one file.

## Before launch

1. Confirm the birth-year span and the jubilee year.
2. Confirm the contact details are current.
3. Approve or replace the editorial vision/mission/principles.
4. Supply the house's own photography.
5. Set `NEXT_PUBLIC_SITE_URL` to the production origin.
