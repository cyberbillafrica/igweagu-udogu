import type { MediaCredit } from "@/content/media";

/**
 * Gallery manifest.
 *
 * These are licensed cultural photographs from Wikimedia Commons — not
 * photographs of the house's own occasions. They are placeholders for the
 * house's archive, credited individually here and on /credits. Each entry is
 * replaced as the family collection is digitised.
 */
export type GalleryCategory =
  | "ceremony"
  | "masquerade"
  | "festival"
  | "performance"
  | "community";

export type GalleryImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  category: GalleryCategory;
  credit: MediaCredit;
};

const CC_BY_SA_4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0/";

export const galleryImages: GalleryImage[] = [
  {
    id: "ijele",
    src: "/images/gallery/ijele-masquerade.jpg",
    width: 1280,
    height: 850,
    alt: "The Ijele masquerade — a tall, tiered Igbo festival mask — surrounded by onlookers at an outdoor celebration.",
    caption: "Ijele, the greatest of the Igbo masks, at a festival.",
    category: "masquerade",
    credit: {
      author: "Cosmodammy",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ijele_Masquerade.jpg",
    },
  },
  {
    id: "ofala",
    src: "/images/gallery/ofala-onitsha.jpg",
    width: 1280,
    height: 853,
    alt: "A procession at the Ofala festival in Onitsha, with attendants in ceremonial dress and a gathered crowd.",
    caption: "Ofala at Onitsha, the annual royal festival of the Obi of Onitsha.",
    category: "ceremony",
    credit: {
      author: "Eaghadiuno",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ofala_Onitsha_02.jpg",
    },
  },
  {
    id: "ite-igbo",
    src: "/images/gallery/ite-igbo-dance.jpg",
    width: 1280,
    height: 853,
    alt: "Members of an Ohafia war dance group performing the Ite-Igbo dance in a clearing at Ebem clan.",
    caption: "The Ite-Igbo dance, performed by the Ohafia war dance group at Ebem.",
    category: "performance",
    credit: {
      author: "AID Project",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Ite-igbo_dance_1.jpg",
    },
  },
  {
    id: "titled-men",
    src: "/images/gallery/titled-men.jpg",
    width: 1280,
    height: 853,
    alt: "Two Igbo titled men in red caps greeting each other with the backs of their hands.",
    caption: "Titled men greeting one another with the back of the hand.",
    category: "community",
    credit: {
      author: "Sylvaline39",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Igbo_titled_Men_greeting.jpg",
    },
  },
  {
    id: "iri-ji",
    src: "/images/gallery/new-yam-drummers.jpg",
    width: 990,
    height: 1800,
    alt: "Drummers in white wrappers and red caps playing at an Iri Ji new yam festival.",
    caption: "Drummers at Iri Ji, the new yam festival.",
    category: "festival",
    credit: {
      author: "ABORISADEADETONA",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:New_Yam_Festival_(Iri_Ji)_01.jpg",
    },
  },
  {
    id: "marriage",
    src: "/images/gallery/marriage-attire.jpg",
    width: 1280,
    height: 1680,
    alt: "A couple in Igbo traditional marriage attire, the bride in coral beads and the groom in a red cap.",
    caption: "Igbo traditional marriage attire.",
    category: "ceremony",
    credit: {
      author: "Olugold",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Igbo_traditional_marriage_attire_01.jpg",
    },
  },
  {
    id: "cultural-dancers",
    src: "/images/gallery/cultural-dancers.jpg",
    width: 1280,
    height: 854,
    alt: "Igbo cultural dancers in red caps and white wrappers, holding hand rattles during a performance.",
    caption: "Cultural dancers with hand rattles.",
    category: "performance",
    credit: {
      author: "OPNPhotography",
      licence: "CC BY 4.0",
      licenceUrl: CC_BY_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Igbo_Cultural_Dancers_04.jpg",
    },
  },
  {
    id: "omenala",
    src: "/images/heritage-omenala.jpg",
    width: 1200,
    height: 900,
    alt: "Hands slicing a roasted yam on a metal tray during the Iri Ji new yam festival.",
    caption: "Roasted yam shared at Iri Ji.",
    category: "festival",
    credit: {
      author: "Frankincense Diala",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Yam_Eating_Festival_in_an_Igbo_Community,_Nigeria.jpg",
    },
  },
  {
    id: "umunna",
    src: "/images/heritage-umunna.jpg",
    width: 1128,
    height: 846,
    alt: "An Igbo family in matching traditional attire and red caps, photographed together at home.",
    caption: "A family in traditional attire — ụmụnna in the ordinary sense.",
    category: "community",
    credit: {
      author: "Jerry Emeka Obi",
      licence: "CC BY-SA 4.0",
      licenceUrl: CC_BY_SA_4,
      sourceUrl:
        "https://commons.wikimedia.org/wiki/File:Igbo_family_in_traditional_attire.jpg",
    },
  },
];

export const galleryCategories: GalleryCategory[] = [
  "ceremony",
  "masquerade",
  "festival",
  "performance",
  "community",
];
