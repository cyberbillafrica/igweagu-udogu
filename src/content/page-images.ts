/**
 * Interior-page masthead photography.
 *
 * Dimensions are those of the processed files in /public/images/pages. Alt
 * text lives with the page copy in the dictionary, so it travels with the page
 * when the Igbo edition is written.
 */
export const pageHeroImages = {
  about: { src: "/images/pages/about-hero.jpg", width: 2400, height: 1200 },
  history: { src: "/images/pages/history-hero.jpg", width: 2400, height: 1200 },
  igweagu: { src: "/images/pages/igweagu-hero.jpg", width: 2400, height: 1200 },
  heritage: { src: "/images/pages/heritage-hero.jpg", width: 2400, height: 1200 },
  leadership: { src: "/images/pages/leadership-hero.jpg", width: 2400, height: 1200 },
  programmes: { src: "/images/pages/programmes-hero.jpg", width: 2400, height: 1200 },
} as const;
