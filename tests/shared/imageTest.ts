import React from 'react';
// Reference: https://github.com/ant-design/ant-design/pull/24003#discussion_r427267386
// eslint-disable-next-line import/no-unresolved
import puppeteer, { Browser, Page } from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import ReactDOMServer from 'react-dom/server';

expect.extend({ toMatchImageSnapshot });

// eslint-disable-next-line jest/no-export
export default function imageTest(component: React.ReactElement) {
  describe(`Image test`, () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
      browser = await puppeteer.launch({
        args: [
          // Required for Docker version of Puppeteer
          '--no-sandbox',
          '--disable-setuid-sandbox',
          // This will write shared memory files into /tmp instead of /dev/shm,
          // because Docker’s default for /dev/shm is 64MB
          '--disable-dev-shm-usage',
        ],
      });
      page = await browser.newPage();
      await page.goto(`file://${process.cwd()}/tests/index.html`);
      await page.addStyleTag({ path: `${process.cwd()}/dist/antd.css` });
    });

    afterAll(() => {
      browser.close();
    });

    it('component image screenshot should correct', async () => {
      const html = ReactDOMServer.renderToString(component);
      await page.evaluate(innerHTML => {
        document.querySelector('#root')!.innerHTML = innerHTML;
      }, html);

      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot();
    });
  });
}
