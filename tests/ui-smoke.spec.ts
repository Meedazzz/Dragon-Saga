import { expect, test, type Page } from '@playwright/test';

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];

const routes = ['/', '/activities', '/lore/valery', '/lor', '/map/sever'];

const waitForPageReady = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1300);
};

const expectNoBrokenLocalImages = async (page: Page) => {
  await page.evaluate(async () => {
    const step = Math.max(320, Math.floor(window.innerHeight * 0.7));
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 220));
  });

  const broken = await page.locator('img').evaluateAll((images) => images
    .filter((image) => !image.complete || image.naturalWidth === 0 || image.naturalHeight === 0)
    .map((image) => image.getAttribute('src') || image.getAttribute('alt') || 'unknown'));

  expect(broken).toEqual([]);
};

const expectNoHorizontalOverflow = async (page: Page) => {
  const overflow = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  expect(overflow.scrollWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.width + 8);
  expect(overflow.bodyScrollWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.width + 8);
};

for (const viewport of viewports) {
  test.describe(`responsive smoke: ${viewport.name}`, () => {
    test.use({ viewport });

    for (const route of routes) {
      test(`${route} renders without broken UI on ${viewport.name}`, async ({ page }) => {
        const failedLocalRequests: string[] = [];
        page.on('requestfailed', (request) => {
          if (request.url().includes('127.0.0.1:4173')) {
            failedLocalRequests.push(`${request.url()} — ${request.failure()?.errorText}`);
          }
        });

        await page.goto(route === '/' ? '/Dragon-Saga/' : `/Dragon-Saga${route}`);
        await waitForPageReady(page);

        await expect(page.locator('body')).toBeVisible();
        await expectNoBrokenLocalImages(page);
        await expectNoHorizontalOverflow(page);
        expect(failedLocalRequests).toEqual([]);

        if (route === '/') {
          await expect(page.locator('.codex-hero h1')).toContainText('Драконья');
          await expect(page.locator('.codex-character-card')).toHaveCount(5);
          await expect(page.locator('.tarot-fan-card')).toHaveCount(5);
        }

        if (route === '/activities') {
          await expect(page.locator('.activity-card')).toHaveCount(7);
        }
      });
    }
  });
}

test('main interface parts work as intended', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/Dragon-Saga/');
  await waitForPageReady(page);

  await expect(page.locator('.mythic-rune')).toHaveCount(10);
  await expect(page.locator('.mythic-ember')).toHaveCount(7);
  await expect(page.locator('.codex-character-card')).toHaveCount(5);

  const characterColors = await page.locator('.codex-character-card').evaluateAll((cards) => cards.map((card) =>
    (card as HTMLElement).style.getPropertyValue('--character-color').trim(),
  ));
  expect(new Set(characterColors).size).toBe(5);

  const transitionDuration = await page.locator('.codex-character-card').first().evaluate((node) =>
    getComputedStyle(node).transitionDuration,
  );
  expect(transitionDuration).not.toBe('0s');

  await page.getByRole('button', { name: /Таро/i }).click();
  const fanCenters = await page.locator('.tarot-fan-card').evaluateAll((cards) => cards.map((card) => {
    const rect = card.getBoundingClientRect();
    return Math.round(rect.left + rect.width / 2);
  }));
  expect(new Set(fanCenters).size, `fan centers: ${fanCenters.join(', ')}`).toBeGreaterThanOrEqual(4);
  expect(Math.max(...fanCenters) - Math.min(...fanCenters), `fan spread: ${fanCenters.join(', ')}`).toBeGreaterThan(250);

  await page.getByRole('button', { name: /Показать все/i }).click();
  await expect(page.locator('.tarot-fan-card.flipped')).toHaveCount(5);

  await page.waitForTimeout(900);
  await page.locator('.tarot-fan-card').nth(2).click({ force: true });
  await expect(page.locator('.tarot-detail-overlay')).toBeVisible();
  await expectNoBrokenLocalImages(page);
  await page.locator('.tarot-detail-close').click();
  await expect(page.locator('.tarot-detail-overlay')).toHaveCount(0);

  await page.getByLabel(/Открыть меню/i).click();
  await expect(page.locator('nav').filter({ hasText: 'Персонажи' })).toBeVisible();
});

test('activities tools open and produce interactive content', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/Dragon-Saga/activities');
  await waitForPageReady(page);

  await page.locator('.activity-card').filter({ hasText: 'Оракул' }).click();
  await expect(page.locator('.activity-modal')).toBeVisible();
  await expect(page.locator('.activity-oracle-result img')).toBeVisible();
  await expectNoBrokenLocalImages(page);
  await page.getByRole('button', { name: /Бросить снова/i }).click();
  await expect(page.locator('.activity-oracle-result img')).toBeVisible();
  await page.locator('.activity-modal__close').click();

  await page.locator('.activities-search input').fill('Маршрут');
  await expect(page.locator('.activity-card')).toHaveCount(1);
  await expect(page.locator('.activity-card')).toContainText('Маршрут');
});

test('each hero route has individual theme color', async ({ page }) => {
  const heroes = ['valery', 'brin', 'sakris', 'talis', 'stive'];
  const colors: string[] = [];

  for (const hero of heroes) {
    await page.goto(`/Dragon-Saga/lore/${hero}`);
    await waitForPageReady(page);
    await expect(page.locator('h1')).toBeVisible();
    colors.push(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--scrollbar-thumb').trim()));
  }

  expect(new Set(colors).size, colors.join(', ')).toBe(5);
});

test('captures reference screenshots for manual visual comparison', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/Dragon-Saga/');
  await waitForPageReady(page);
  await page.screenshot({ path: 'qa-screenshots/home-desktop.png', fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/Dragon-Saga/');
  await waitForPageReady(page);
  await page.screenshot({ path: 'qa-screenshots/home-mobile.png', fullPage: true });

  await page.goto('/Dragon-Saga/activities');
  await waitForPageReady(page);
  await page.screenshot({ path: 'qa-screenshots/activities-mobile.png', fullPage: true });
});
