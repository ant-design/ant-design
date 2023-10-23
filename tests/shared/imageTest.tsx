import React from 'react';
// Reference: https://github.com/ant-design/ant-design/pull/24003#discussion_r427267386
// eslint-disable-next-line import/no-unresolved
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import dayjs from 'dayjs';
import { globSync } from 'glob';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import MockDate from 'mockdate';
import ReactDOMServer from 'react-dom/server';

import { App, ConfigProvider, theme } from '../../components';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/imageSnapshots`,
  customDiffDir: `${process.cwd()}/imageDiffSnapshots`,
});

expect.extend({ toMatchImageSnapshot });

const themes = {
  default: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

interface ImageTestOptions {
  onlyViewport?: boolean;
  splitTheme?: boolean;
}

// eslint-disable-next-line jest/no-export
export default function imageTest(component: React.ReactElement, options: ImageTestOptions) {
  function test(name: string, themedComponent: React.ReactElement) {
    it(name, async () => {
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
      await page.addStyleTag({ path: `${process.cwd()}/components/style/reset.css` });
      await page.addStyleTag({ content: '*{animation: none!important;}' });

      const cache = createCache();

      const element = (
        <StyleProvider cache={cache}>
          <App>{themedComponent}</App>
        </StyleProvider>
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

      if (!options.onlyViewport) {
        // Get scroll height of the rendered page and set viewport
        const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
        await page.setViewport({ width: 800, height: bodyHeight });
      }

      const image = await page.screenshot({
        fullPage: !options.onlyViewport,
      });

      expect(image).toMatchImageSnapshot();

      MockDate.reset();
      page.off('request', onRequestHandle);
    });
  }

  if (options.splitTheme) {
    Object.entries(themes).forEach(([key, algorithm]) => {
      test(
        `component image screenshot should correct ${key}`,
        <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
          <ConfigProvider theme={{ algorithm }}>{component}</ConfigProvider>
        </div>,
      );
    });
  } else {
    test(
      `component image screenshot should correct`,
      <>
        {Object.entries(themes).map(([key, algorithm]) => (
          <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
            <ConfigProvider theme={{ algorithm }}>{component}</ConfigProvider>
          </div>
        ))}
      </>,
    );
  }
}

type Options = {
  skip?: boolean | string[];
  onlyViewport?: boolean | string[];
  splitTheme?: boolean | string[];
};

// eslint-disable-next-line jest/no-export
export function imageDemoTest(component: string, options: Options = {}) {
  let describeMethod = options.skip === true ? describe.skip : describe;
  const files = globSync(`./components/${component}/demo/*.tsx`);

  files.forEach((file) => {
    if (Array.isArray(options.skip) && options.skip.some((c) => file.endsWith(c))) {
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
      imageTest(Demo, {
        onlyViewport:
          options.onlyViewport === true ||
          (Array.isArray(options.onlyViewport) &&
            options.onlyViewport.some((c) => file.endsWith(c))),
        splitTheme:
          options.splitTheme === true ||
          (Array.isArray(options.splitTheme) && options.splitTheme.some((c) => file.endsWith(c))),
      });
    });
  });
}
