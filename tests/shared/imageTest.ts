import React from 'react';
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
      browser = await puppeteer.launch();
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
