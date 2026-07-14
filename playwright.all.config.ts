import { defineConfig, devices } from '@playwright/test';

/**
 * Полный кросс-браузерный прогон.
 * Обычный `npm run test:ui` оставлен быстрее и гоняет Chromium.
 * Этот конфиг нужен для контрольной проверки: Chromium + Firefox + WebKit.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report-all', open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173/Dragon-Saga',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/Dragon-Saga/',
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
