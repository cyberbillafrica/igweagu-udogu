import { notFound } from "next/navigation";

/**
 * Unknown paths inside a locale resolve to the in-layout not-found page, so a
 * visitor keeps the header, footer and route back into the site.
 */
export default function CatchAllPage() {
  notFound();
}
