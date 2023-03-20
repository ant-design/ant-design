import React from 'react';
// Reference: https://github.com/ant-design/ant-design/pull/24003#discussion_r427267386
// eslint-disable-next-line import/no-unresolved
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import dayjs from 'dayjs';
import glob from 'glob';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import MockDate from 'mockdate';
import ReactDOMServer from 'react-dom/server';
import { App, ConfigProvider, theme } from '../../components';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/imageSnapshots`,
  customDiffDir: `${process.cwd()}/imageDiffSnapshots`,
});

expect.extend({ toMatchImageSnapshot });

// eslint-disable-next-line jest/no-export
export default function imageTest(component: React.ReactElement) {
  [theme.defaultAlgorithm, theme.darkAlgorithm, theme.compactAlgorithm].forEach(
    (algorithm, index) => {
      it(`component image screenshot should correct${index || ''}`, async () => {
        await jestPuppeteer.resetPage();
        await page.setRequestInterception(true);
        const onRequestHandle = (request: any) => {
          if (['image'].includes(request.resourceType())) {
            request.abort();
          } else {
            request.continue();
          }
        };

        MockDate.set(dayjs('2016-11-22').valueOf());
        page.on('request', onRequestHandle);
        await page.goto(`file://${process.cwd()}/tests/index.html`);
        await page.addStyleTag({ path: `${process.cwd()}/dist/reset.css` });

        const cache = createCache();

        const element = (
          <ConfigProvider theme={{ algorithm }}>
            <App style={{ background: algorithm === theme.darkAlgorithm ? '#000' : '' }}>
              <StyleProvider cache={cache}>{component}</StyleProvider>
            </App>
          </ConfigProvider>
        );

        const html = ReactDOMServer.renderToString(element);
        const styleStr = extractStyle(cache);

        await page.evaluate(
          (innerHTML, ssrStyle) => {
            document.querySelector('#root')!.innerHTML = innerHTML;

            const head = document.querySelector('head')!;
            head.innerHTML += ssrStyle;
          },
          html,
          styleStr,
        );

        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();

        MockDate.reset();
        page.removeListener('request', onRequestHandle);
      });
    },
  );
}

type Options = {
  skip?: boolean | string[];
};

// eslint-disable-next-line jest/no-export
export function imageDemoTest(component: string, options: Options = {}) {
  let describeMethod = options.skip === true ? describe.skip : describe;
  const files = glob.globSync(`./components/${component}/demo/*.tsx`);

  files.forEach((file) => {
    if (Array.isArray(options.skip) && options.skip.some((c) => file.includes(c))) {
      describeMethod = describe.skip;
    } else {
      describeMethod = describe;
    }
    describeMethod(`Test ${file} image`, () => {
      // eslint-disable-next-line global-require,import/no-dynamic-require
      let Demo = require(`../../${file}`).default;
      if (typeof Demo === 'function') {
        Demo = <Demo />;
      }
      imageTest(Demo);
    });
  });
}
