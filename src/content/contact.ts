/**
 * Contact channels, exactly as the house published them.
 *
 * Source: the house's public announcement, revised 23 September 2021.
 * The announcement lists four telephone/WhatsApp numbers, one email address
 * and one WhatsApp group. Nothing here is inferred, and no postal address is
 * given because the house has never published one.
 */
export const contact = {
  email: "igweaguigbonine@gmail.com",
  phones: ["+234 806 054 8039", "+234 803 698 6543", "+234 707 763 3014", "+234 702 036 5331"],
  whatsappGroup:
    "https://chat.whatsapp.com/FbiIAstI2RT55Kqh6DZJW0?s=cl&p=a&mlu=4&ilr=4",
  publishedIn: "House announcement, 23 September 2021",
} as const;

/** A `tel:` href for a number written for human reading. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
