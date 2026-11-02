/**
 * Photography registry.
 *
 * These are placeholder cultural photographs sourced from Wikimedia Commons
 * under the licences recorded below. They are intentionally not the house's own
 * archive: they are replaced as the family collection is digitised. Attribution
 * is published at /credits and must be kept while these files are in use.
 */
export type MediaCredit = {
  author: string;
  licence: string;
  licenceUrl: string;
  sourceUrl: string;
};

export type MediaAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: MediaCredit;
};

const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0/";

export const media = {
  hero: {
    src: "/images/hero-masquerade.jpg",
    width: 2400,
    height: 1350,
    alt: "An Igbo masquerade troupe in red and black costume, with drummers and hand rattles, processing through a town during a festival.",
    credit: {
      author: "Dalli Gozie K.",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Nwaotam_dance_troupe.jpg",
    },
  },
  jubilee: {
    src: "/images/jubilee-masquerade.jpg",
    width: 1600,
    height: 1200,
    alt: "An Igbo masquerade seated in ceremonial costume while an attendant kneels before him, watched by a gathered crowd.",
    credit: {
      author: "Boss Empire Media",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Igbo_Masquerade.jpg",
    },
  },
  omenala: {
    src: "/images/heritage-omenala.jpg",
    width: 1200,
    height: 900,
    alt: "Hands slicing a roasted yam on a metal tray during the Iri Ji new yam festival.",
    credit: {
      author: "Frankincense Diala",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Yam_Eating_Festival_in_an_Igbo_Community,_Nigeria.jpg",
    },
  },
  umunna: {
    src: "/images/heritage-umunna.jpg",
    width: 1128,
    height: 846,
    alt: "An Igbo family in matching traditional attire and red caps, photographed together at home.",
    credit: {
      author: "Jerry Emeka Obi",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Igbo_family_in_traditional_attire.jpg",
    },
  },
  ndiGboo: {
    src: "/images/heritage-ndi-gboo.jpg",
    width: 1200,
    height: 900,
    alt: "Igbo cultural performers in red caps and white wrappers, playing drums and hand rattles at a public ceremony.",
    credit: {
      author: "OPNPhotography",
      licence: "CC BY 4.0",
      licenceUrl: CC_BY_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Igbo_Cultural_Dancers_01.jpg",
    },
  },
} as const satisfies Record<string, MediaAsset>;

export const heritageImages = [media.omenala, media.umunna, media.ndiGboo];

export const allCreditedMedia: MediaAsset[] = Object.values(media);
