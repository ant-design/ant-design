import path from 'path';
import React from 'react';
// Reference: https://github.com/ant-design/ant-design/pull/24003#discussion_r427267386
// eslint-disable-next-line import/no-unresolved
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import dayjs from 'dayjs';
import { globSync } from 'glob';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import { JSDOM } from 'jsdom';
import MockDate from 'mockdate';
import ReactDOMServer from 'react-dom/server';

import { App, ConfigProvider, theme } from '../../components';
import { fillWindowEnv } from '../setup';
import { render } from '../utils';

jest.mock('../../components/grid/hooks/useBreakpoint', () => () => ({}));

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
  ssr?: boolean;
}

// eslint-disable-next-line jest/no-export
export default function imageTest(
  component: React.ReactElement,
  identifier: string,
  options: ImageTestOptions,
) {
  let doc: Document;
  let container: HTMLDivElement;

  beforeAll(() => {
    const dom = new JSDOM('<!DOCTYPE html><body></body></p>', {
      url: 'http://localhost/',
    });
    const win = dom.window;
    doc = win.document;

    (global as any).window = win;

    // Fill env
    const keys = [
      ...Object.keys(win),
      'HTMLElement',
      'SVGElement',
      'ShadowRoot',
      'Element',
      'File',
      'Blob',
    ].filter((key) => !(global as any)[key]);

    keys.forEach((key) => {
      (global as any)[key] = win[key];
    });

    // Fake Resize Observer
    global.ResizeObserver = function FakeResizeObserver() {
      return {
        observe() {},
        unobserve() {},
        disconnect() {},
      };
    } as any;

    // Fake promise not called
    global.fetch = function mockFetch() {
      return {
        then() {
          return this;
        },
        catch() {
          return this;
        },
        finally() {
          return this;
        },
      };
    } as any;

    // Fake matchMedia
    win.matchMedia = () =>
      ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }) as any;

    // Fill window
    fillWindowEnv(win);
  });

  beforeEach(() => {
    doc.body.innerHTML = `<div id="root"></div>`;
    container = doc.querySelector<HTMLDivElement>('#root')!;
  });

  function test(name: string, suffix: string, themedComponent: React.ReactElement) {
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

      const emptyStyleHolder = doc.createElement('div');

      const element = (
        <StyleProvider cache={cache} container={emptyStyleHolder}>
          <App>{themedComponent}</App>
        </StyleProvider>
      );

      let html: string;
      let styleStr: string;

      if (options.ssr) {
        html = ReactDOMServer.renderToString(element);
        styleStr = extractStyle(cache);
      } else {
        const { unmount } = render(element, {
          container,
        });
        html = container.innerHTML;
        styleStr = extractStyle(cache);

        // We should extract style before unmount
        unmount();
      }

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

      expect(image).toMatchImageSnapshot({
        customSnapshotIdentifier: `${identifier}${suffix}`,
      });

      MockDate.reset();
      page.off('request', onRequestHandle);
    });
  }

  if (options.splitTheme) {
    Object.entries(themes).forEach(([key, algorithm]) => {
      test(
        `component image screenshot should correct ${key}`,
        `-${key}`,
        <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
          <ConfigProvider theme={{ algorithm }}>{component}</ConfigProvider>
        </div>,
      );
      test(
        `[CSS Var] component image screenshot should correct ${key}`,
        `-${key}.css-var`,
        <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
          <ConfigProvider theme={{ algorithm, cssVar: true }}>{component}</ConfigProvider>
        </div>,
      );
    });
  } else {
    test(
      `component image screenshot should correct`,
      '',
      <>
        {Object.entries(themes).map(([key, algorithm]) => (
          <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
            <ConfigProvider theme={{ algorithm }}>{component}</ConfigProvider>
          </div>
        ))}
      </>,
    );
    test(
      `[CSS Var] component image screenshot should correct`,
      '.css-var',
      <>
        {Object.entries(themes).map(([key, algorithm]) => (
          <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
            <ConfigProvider theme={{ algorithm, cssVar: true }}>{component}</ConfigProvider>
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
  /** Use SSR render instead. Only used when the third part deps component */
  ssr?: boolean;
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
      imageTest(Demo, `${component}-${path.basename(file, '.tsx')}`, {
        onlyViewport:
          options.onlyViewport === true ||
          (Array.isArray(options.onlyViewport) &&
            options.onlyViewport.some((c) => file.endsWith(c))),
        splitTheme:
          options.splitTheme === true ||
          (Array.isArray(options.splitTheme) && options.splitTheme.some((c) => file.endsWith(c))),
        ssr: options.ssr,
      });
    });
  });
}
