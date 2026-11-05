/**
 * Regenerates docs/assets/header.png from the "Internal / README header" story.
 *
 *   npm run build-storybook && npm run readme:header
 *
 * Needs Playwright's Chromium (`npx playwright install chromium`).
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const staticDir = join(root, 'storybook-static');
const out = join(root, 'docs/assets/header.png');
const CORNER_RADIUS = 16; // CSS px (32px in the 2x image)
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.json': 'application/json' };

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0]);
  try {
    const file = join(staticDir, path === '/' ? 'index.html' : path);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});

server.listen(0, async () => {
  const { port } = server.address();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 860 }, deviceScaleFactor: 2 });
  await page.goto(`http://localhost:${port}/iframe.html?id=internal-readme-header--header-1600&viewMode=story`);
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const shot = await page.screenshot();

  // Round the corners: redraw the shot as a rounded <img> on a transparent page.
  const frame = await browser.newPage({ viewport: { width: 1600, height: 860 }, deviceScaleFactor: 2 });
  await frame.setContent(
    `<body style="margin:0;background:transparent">` +
      `<img src="data:image/png;base64,${shot.toString('base64')}" ` +
      `style="display:block;width:1600px;height:860px;border-radius:${CORNER_RADIUS}px">` +
      `</body>`,
  );
  await frame.screenshot({ path: out, omitBackground: true });
  console.log(`Saved ${out}`);
  await browser.close();
  server.close();
});
