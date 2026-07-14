import { chromium, firefox, webkit } from 'playwright';

const BASE_URL = 'http://127.0.0.1:4173/Dragon-Saga';
const browsers = [
  ['chromium', chromium],
  ['firefox', firefox],
  ['webkit', webkit],
];
const viewports = [
  ['desktop', { width: 1360, height: 900 }],
  ['mobile', { width: 390, height: 844 }],
];
const routes = ['/', '/lorebook', '/map/full-north', '/brin/astaria', '/brin/pursuing-peace'];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const checkPage = async (page, route) => {
  const localFailures = [];
  page.on('requestfailed', (request) => {
    const url = request.url();
    if (url.includes('127.0.0.1:4173') && !url.includes('.pdf')) {
      localFailures.push(`${url} — ${request.failure()?.errorText}`);
    }
  });

  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await sleep(700);

  const result = await page.evaluate(async () => {
    const step = Math.max(320, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 120));

    const brokenImages = Array.from(document.images)
      .filter((image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0)
      .map((image) => image.getAttribute('src') || image.getAttribute('alt') || 'unknown');

    return {
      title: document.title,
      bodyText: document.body.innerText.slice(0, 300),
      width: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      brokenImages,
    };
  });

  const overflow = result.scrollWidth > result.width + 10 || result.bodyScrollWidth > result.width + 10;
  const ok = localFailures.length === 0 && result.brokenImages.length === 0 && !overflow && result.bodyText.length > 20;

  return { ok, localFailures, result };
};

let failed = false;
for (const [browserName, browserType] of browsers) {
  const browser = await browserType.launch({ headless: true });
  try {
    for (const [viewportName, viewport] of viewports) {
      const page = await browser.newPage({ viewport });
      for (const route of routes) {
        const check = await checkPage(page, route);
        const label = `${browserName}/${viewportName}${route}`;
        if (!check.ok) {
          failed = true;
          console.error(`BAD ${label}`, JSON.stringify(check, null, 2));
        } else {
          console.log(`OK ${label}`);
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
}

process.exit(failed ? 1 : 0);
