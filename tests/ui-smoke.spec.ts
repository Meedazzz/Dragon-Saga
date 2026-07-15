import { expect, test, type Page } from '@playwright/test';

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];

const routes = ['/', '/admin', '/activities', '/lorebook', '/lorebook/bestiary-werewolves', '/lorebook/bestiary-vampires', '/lorebook/bestiary-undead-overview', '/lorebook/bestiary-owlbears', '/lorebook/bestiary-morgoth-spawn', '/lorebook/bestiary-tieflings', '/lorebook/bestiary-fiends', '/lorebook/magic-anaptanium', '/lorebook/faction-legion', '/lorebook/illyria-war-machines-doctrine', '/lore/valery', '/lor', '/map/full-north', '/map/north-humans', '/map/north-elves', '/map/north-dwarves', '/brin/astaria', '/brin/pursuing-peace', '/map/sever'];

const waitForPageReady = async (page: Page) => {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(700);
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
          const url = request.url();
          // Chromium headless can abort PDF plugin loading while the PDF link itself is valid.
          if (url.includes('127.0.0.1:4173') && !url.includes('.pdf')) {
            failedLocalRequests.push(`${url} — ${request.failure()?.errorText}`);
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
          await expect(page.locator('.codex-card-altar--backs img')).toHaveCount(5);
          await expect(page.locator('.tarot-fan-card')).toHaveCount(5);
        }

        if (route === '/activities') {
          await expect(page.locator('.activity-card')).toHaveCount(7);
        }

        if (route === '/lorebook') {
          await expect(page.locator('.lorebook-card')).toHaveCount(51);
        }

        if (route.startsWith('/lorebook/')) {
          await expect(page.locator('.lorebook-section-card').first()).toBeVisible();
        }

        if (route.startsWith('/map/')) {
          await expect(page.locator('.map-layer-switcher')).toBeVisible();
        }

        if (route.startsWith('/brin/')) {
          await expect(page.locator('.document-hero-card')).toBeVisible();
          await expect(page.locator('.document-article-card').first()).toBeVisible();
        }
      });
    }
  });
}

test('main interface parts work as intended', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/Dragon-Saga/');
  await waitForPageReady(page);

  await expect(page.locator('.mythic-rune')).toHaveCount(10);
  await expect(page.locator('.mythic-ember')).toHaveCount(7);
  await expect(page.locator('.codex-character-card')).toHaveCount(0);
  await expect(page.locator('.codex-card-altar--backs img')).toHaveCount(5);
  const heroBackSources = await page.locator('.codex-card-altar--backs img').evaluateAll((images) => images.map((image) => image.getAttribute('src') || ''));
  expect(heroBackSources.every((src) => src.includes('optimized/shirt.webp')), heroBackSources.join(', ')).toBeTruthy();
  await expect(page.locator('body')).not.toContainText('Активности стали отдельным залом управления сценами');
  await expect(page.locator('body')).not.toContainText('Таро героев без битых лицевых сторон');

  const transitionDuration = await page.locator('.tarot-fan-card').first().evaluate((node) =>
    getComputedStyle(node).transitionDuration,
  );
  expect(transitionDuration).not.toBe('0s');

  await page.locator('#tarot-section').scrollIntoViewIfNeeded();
  const fanCenters = await page.locator('.tarot-fan-card').evaluateAll((cards) => cards.map((card) => {
    const rect = card.getBoundingClientRect();
    return Math.round(rect.left + rect.width / 2);
  }));
  expect(new Set(fanCenters).size, `fan centers: ${fanCenters.join(', ')}`).toBeGreaterThanOrEqual(4);
  expect(Math.max(...fanCenters) - Math.min(...fanCenters), `fan spread: ${fanCenters.join(', ')}`).toBeGreaterThan(250);

  if (browserName !== 'chromium') {
    // Full click/flip/modal workflow is verified in Chromium. For Firefox/WebKit the smoke
    // route checks above already verify rendering, images and overflow on all viewports.
    return;
  }

  await page.getByRole('button', { name: /Показать все/i }).evaluate((button: HTMLButtonElement) => button.click());
  await expect(page.locator('.tarot-fan-card.flipped')).toHaveCount(5);

  await page.waitForTimeout(900);
  await page.locator('.tarot-fan-card').nth(2).click({ force: true });
  await expect(page.locator('.tarot-detail-overlay')).toBeVisible();
  await expect(page.locator('.tarot-detail-actions')).toBeVisible();
  await expect(page.locator('.tarot-detail-actions')).toContainText('Полный лор');
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


test('lorebook catalogue and entry pages work', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/Dragon-Saga/lorebook');
  await waitForPageReady(page);
  await expect(page.locator('.lorebook-card')).toHaveCount(51);
  await page.locator('.lorebook-search input').fill('Оборотни');
  await expect(page.locator('.lorebook-card')).toHaveCount(1);
  await page.locator('.lorebook-card').click();
  await expect(page.locator('.lorebook-entry-hero h1')).toContainText('Оборотни');
  await expect(page.locator('.lorebook-section-card')).toHaveCount(2);
  await expectNoBrokenLocalImages(page);
});


test('video records, autoplay modal, latest feed and shorts category work', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/Dragon-Saga/');
  await waitForPageReady(page);

  await expect(page.locator('.codex-video-card')).toHaveCount(2);
  await expect(page.locator('.codex-video-card').first()).toContainText('Dragon Saga. Часть 1. Знакомство');
  await expect(page.locator('.codex-video-card').nth(1)).toContainText('Dragon Saga. Часть 2. Деревенские проблемы');

  if (browserName === 'chromium') {
    await page.locator('.codex-video-card').first().evaluate((button: HTMLButtonElement) => button.click());
    const videoFrame = page.locator('iframe[title="Dragon Saga. Часть 1. Знакомство"]');
    await expect(videoFrame).toBeVisible();
    await expect(videoFrame).toHaveAttribute('src', /HgRX_wIi3mY/);
    await expect(videoFrame).toHaveAttribute('src', /start=5473/);
    await page.locator('button').filter({ hasText: '×' }).click();
  }

  await page.getByLabel('Категории видео').getByRole('button', { name: /Автолента/i }).evaluate((button: HTMLButtonElement) => button.click());
  const latestFrame = page.locator('iframe[title="Последние видео Sigmarillion"]');
  await expect(latestFrame).toBeVisible();
  await expect(latestFrame).toHaveAttribute('src', /videoseries\?list=UU7IRkV7Cg7MznCecmQXCN1A/);

  await page.getByLabel('Категории видео').getByRole('button', { name: /Shorts/i }).evaluate((button: HTMLButtonElement) => button.click());
  await expect(page.locator('.codex-shorts-card')).toContainText('Shorts Dragon Saga');
  await expect(page.locator('.codex-shorts-card a')).toHaveAttribute('href', 'https://www.youtube.com/@Sigmarillion/shorts');
});


test('admin local text editor can edit visible text', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/Dragon-Saga/admin');
  await waitForPageReady(page);

  await expect(page.locator('.admin-editor-panel')).toBeVisible();
  await page.getByLabel('Ключ редактора').fill('dragon-saga-dm');
  await page.getByRole('button', { name: 'Войти' }).click();
  await expect(page.locator('.admin-editor-panel')).toContainText('Редактор текста');
  await page.locator('.admin-page-card h1').click();
  await expect(page.locator('.admin-editor-modal')).toBeVisible();
  await page.locator('.admin-editor-dialog textarea').fill('Тестовое редактирование текста');
  await page.getByRole('button', { name: 'Сохранить' }).click();
  await expect(page.locator('.admin-page-card h1')).toContainText('Тестовое редактирование текста');
});


test('north atlas maps and Brin documents are available', async ({ page }) => {
  await page.setViewportSize({ width: 1360, height: 900 });
  await page.goto('/Dragon-Saga/map/full-north');
  await waitForPageReady(page);
  await expect(page.locator('.map-layer-switcher')).toBeVisible();
  await expect(page.locator('.map-layer-switcher a')).toHaveCount(5);
  await expect(page.locator('img[alt="Атлас всего Севера"]')).toBeVisible();
  await expectNoBrokenLocalImages(page);

  await page.goto('/Dragon-Saga/brin/astaria');
  await waitForPageReady(page);
  await expect(page.locator('.document-hero-card h1')).toContainText('Астария');
  await expect(page.locator('.document-source-note a').first()).toHaveAttribute('href', /astaria\.pdf/);

  await page.goto('/Dragon-Saga/brin/pursuing-peace');
  await waitForPageReady(page);
  await expect(page.locator('.document-hero-card h1')).toContainText('Мирный план');
  await expect(page.locator('.document-source-note a').first()).toHaveAttribute('href', /pursuing-peace-orcs\.pdf/);
});

test('captures reference screenshots for manual visual comparison', async ({ page, browserName }) => {
  test.skip(browserName !== 'chromium', 'Reference screenshots are captured once in Chromium.');
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
