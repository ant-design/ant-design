import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';

let browser: Browser;
let currentPage: Page;
const systemChromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function createPage() {
  currentPage = await browser.newPage();
  (globalThis as any).page = currentPage;
  return currentPage;
}

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    executablePath: existsSync(systemChromePath) ? systemChromePath : undefined,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  await createPage();

  (globalThis as any).vitestPuppeteer = {
    resetPage: async () => {
      if (currentPage && !currentPage.isClosed()) {
        await currentPage.close();
      }
      await createPage();
    },
  };
}, 120_000);

afterAll(async () => {
  if (currentPage && !currentPage.isClosed()) {
    await currentPage.close();
  }
  await browser?.close();
});
