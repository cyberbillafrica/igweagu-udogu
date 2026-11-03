/**
 * Builds the social sharing card (1200×630) used by every page's Open Graph and
 * Twitter metadata, so a shared link shows the official emblem and wordmark
 * rather than a cropped photograph.
 *
 * Run with `node scripts/generate-og.mjs` after changing the emblem, the
 * palette or the wordmark. The card is rendered in headless Chrome so it uses
 * the same two brand families as the site (Cormorant Garamond and Manrope),
 * then compressed to `public/images/og-default.jpg`.
 *
 * Requirements: Chrome or Edge installed locally, and network access the first
 * time it runs (the two TTFs are downloaded into `.tmp/fonts`, never committed).
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const fontDir = path.join(root, ".tmp", "fonts");
const workDir = path.join(root, ".tmp", "og");

const FONTS = [
  { family: "Cormorant+Garamond", weight: 600, css: "Cormorant Garamond" },
  { family: "Manrope", weight: 600, css: "Manrope" },
];

const BROWSERS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

mkdirSync(fontDir, { recursive: true });
mkdirSync(workDir, { recursive: true });

/** Google serves true static instances of a weight to legacy user agents. */
function fontFile(file, family, weight) {
  const target = path.join(fontDir, file);

  if (!existsSync(target)) {
    const css = execFileSync(
      "curl",
      [
        "-sfL",
        "-m",
        "60",
        "-H",
        "User-Agent: Mozilla/5.0 (Windows NT 5.1)",
        `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
      ],
      { encoding: "utf8" },
    );
    const match = css.match(/src: url\((https:[^)]+\.ttf)\)/);

    if (!match) {
      throw new Error(`Could not resolve a TTF for ${family} ${weight}`);
    }

    execFileSync("curl", ["-sfL", "-m", "60", "-o", target, match[1]]);
  }

  return `data:font/ttf;base64,${readFileSync(target).toString("base64")}`;
}

const faces = FONTS.map(
  (font) => `@font-face {
    font-family: "${font.css}";
    font-weight: ${font.weight};
    font-style: normal;
    src: url(${fontFile(`${font.css.replace(/\s/g, "")}-${font.weight}.ttf`, font.family, font.weight)}) format("truetype");
  }`,
).join("\n");

const emblem = `data:image/jpeg;base64,${readFileSync(
  path.join(root, "public", "brand", "igweagu-emblem.jpg"),
).toString("base64")}`;

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  ${faces}
  @page { margin: 0 }
  html, body { margin: 0; padding: 0 }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #F8F5EC; color: #202521;
    display: flex; align-items: center; justify-content: center;
    font-family: "Manrope", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .frame { position: absolute; inset: 24px; border: 1.5px solid rgba(198,160,74,0.6) }
  .frame-inner { position: absolute; inset: 33px; border: 1px solid rgba(18,59,121,0.18) }
  .card {
    position: relative; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 22px;
    padding: 0 60px; text-align: center;
  }
  .emblem { height: 292px; mix-blend-mode: multiply }
  .wordmark {
    font-family: "Cormorant Garamond", serif; font-weight: 600;
    font-size: 34px; letter-spacing: 0.17em; text-transform: uppercase;
    color: #123B79; white-space: nowrap; line-height: 1;
  }
  .rule { width: 84px; height: 2px; background: #C6A04A }
  .tagline {
    font-weight: 600; font-size: 13.5px; letter-spacing: 0.44em;
    text-transform: uppercase; color: rgba(32,37,33,0.72); line-height: 1;
    text-indent: 0.44em;
  }
</style>
</head>
<body>
  <div class="frame"></div>
  <div class="frame-inner"></div>
  <div class="card">
    <img class="emblem" src="${emblem}" alt="">
    <div class="wordmark">Igweagu Udogu Igbonine Gbulugbulu</div>
    <div class="rule"></div>
    <div class="tagline">The New Covenant · Ndi Gboo</div>
  </div>
</body>
</html>`;

const htmlPath = path.join(workDir, "card.html");
const pngPath = path.join(workDir, "card.png");
writeFileSync(htmlPath, html);

const browser = BROWSERS.find((candidate) => existsSync(candidate));
if (!browser) {
  throw new Error("No Chrome or Edge installation found to render the card");
}

execFileSync(browser, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  "--window-size=1200,630",
  "--screenshot=" + pngPath,
  "--virtual-time-budget=5000",
  "file:///" + htmlPath.replace(/\\/g, "/").replace(/^\//, ""),
]);

const sharp = (await import("sharp")).default;
const out = path.join(root, "public", "images", "og-default.jpg");
const info = await sharp(pngPath)
  .resize(1200, 630, { fit: "cover" })
  .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
  .toFile(out);

rmSync(workDir, { recursive: true, force: true });
console.log(`Wrote ${out} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
