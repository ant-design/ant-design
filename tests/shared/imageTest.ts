import React from 'react';
// Reference: https://github.com/ant-design/ant-design/pull/24003#discussion_r427267386
// eslint-disable-next-line import/no-unresolved
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import ReactDOMServer from 'react-dom/server';
import glob from 'glob';
import MockDate from 'mockdate';
import moment from 'moment';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/imageSnapshots`,
  customDiffDir: `${process.cwd()}/imageDiffSnapshots`,
});

expect.extend({ toMatchImageSnapshot });

// eslint-disable-next-line jest/no-export
export default function imageTest(component: React.ReactElement) {
  it('component image screenshot should correct', async () => {
    await jestPuppeteer.resetPage();
    await page.setRequestInterception(true);
    const onRequestHandle = (request: any) => {
      if (['image'].indexOf(request.resourceType()) !== -1) {
        request.abort();
      } else {
        request.continue();
      }
    };

    MockDate.set(moment('2016-11-22').valueOf());
    page.on('request', onRequestHandle);
    await page.goto(`file://${process.cwd()}/tests/index.html`);
    await page.addStyleTag({ path: `${process.cwd()}/dist/antd.css` });
    const html = ReactDOMServer.renderToString(component);
    await page.evaluate(innerHTML => {
      document.querySelector('#root')!.innerHTML = innerHTML;
    }, html);

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();

    MockDate.reset();
    page.removeListener('request', onRequestHandle);
  });
}

type Options = {
  skip?: boolean | string[];
};

// eslint-disable-next-line jest/no-export
export function imageDemoTest(component: string, options: Options = {}) {
  let testMethod = options.skip === true ? describe.skip : describe;
  const files = glob.sync(`./components/${component}/demo/*.md`);

  files.forEach(file => {
    if (Array.isArray(options.skip) && options.skip.some(c => file.includes(c))) {
      testMethod = test.skip;
    }
    testMethod(`Test ${file} image`, () => {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      const demo = require(`../.${file}`).default;
      imageTest(demo);
    });
  });
}
