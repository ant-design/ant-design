import path, { resolve } from 'path';
import React from 'react';
// Reference: https://github.com/ant-design/ant-design/pull/24003#discussion_r427267386
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import dayjs from 'dayjs';
import fse from 'fs-extra';
import fg from 'fast-glob';
import { JSDOM } from 'jsdom';
import MockDate from 'mockdate';
import type { HTTPRequest } from 'puppeteer';
import ReactDOMServer from 'react-dom/server';

import { App, ConfigProvider, theme } from '../../components';
import { fillWindowEnv } from '../setup';
import { render } from '../utils';
import { TriggerMockContext } from './demoTestContext';

import reduce from 'lodash/reduce';
// eslint-disable-next-line import/no-extraneous-dependencies
import flatMap from 'lodash/flatMap';

function combineMatrix<T>(_matrix: T[][]): [...T[]] {
  return reduce<any[][], any[]>(
    _matrix,
    (acc, curr: any) => flatMap(acc, (x) => curr.map((y: any) => x.concat(y))),
    [[]],
  );
}

// jest.mock('../../components/grid/hooks/useBreakpoint', () => () => ({}));

const snapshotPath = path.join(process.cwd(), 'imageSnapshots');
fse.emptyDirSync(snapshotPath);

const themes = {
  default: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

interface ImageTestOptions {
  onlyViewport?: boolean;
  ssr?: boolean;
  openTriggerClassName?: string;
  name: string;
}

// eslint-disable-next-line jest/no-export
export default function imageTest(
  component: React.ReactElement,
  identifier: string,
  options: ImageTestOptions,
) {
  let doc: Document;
  let container: HTMLDivElement;

  // beforeAll(async () => {
  //   const dom = new JSDOM('<!DOCTYPE html><body></body></html>', {
  //     url: 'http://localhost/',
  //   });
  //   const win = dom.window;
  //   doc = win.document;

  //   (global as any).window = win;

  //   // Fill env
  //   const keys = [
  //     ...Object.keys(win),
  //     'HTMLElement',
  //     'SVGElement',
  //     'ShadowRoot',
  //     'Element',
  //     'File',
  //     'Blob',
  //   ].filter((key) => !(global as any)[key]);

  //   keys.forEach((key) => {
  //     (global as any)[key] = win[key];
  //   });

  //   // Fake Resize Observer
  //   global.ResizeObserver = function FakeResizeObserver() {
  //     return {
  //       observe() { },
  //       unobserve() { },
  //       disconnect() { },
  //     };
  //   } as unknown as typeof ResizeObserver;

  //   // Fake promise not called
  //   global.fetch = function mockFetch() {
  //     return {
  //       then() {
  //         return this;
  //       },
  //       catch() {
  //         return this;
  //       },
  //       finally() {
  //         return this;
  //       },
  //     };
  //   } as unknown as typeof fetch;

  //   // Fake matchMedia
  //   win.matchMedia = (() => ({
  //     matches: false,
  //     addListener: jest.fn(),
  //     removeListener: jest.fn(),
  //   })) as unknown as typeof matchMedia;

  //   // Fill window
  //   fillWindowEnv(win);

  //   await page.setRequestInterception(true);
  // });

  // beforeEach(() => {
  //   doc.body.innerHTML = `<div id="root"></div>`;
  //   container = doc.querySelector<HTMLDivElement>('#root')!;
  // });

  function test(name: string, suffix: string, themedComponent: React.ReactElement, wxh: any) {
    it(name, async () => {
      await page.setViewport({ width: 800, height: 600 });

      const onRequestHandle = (request: HTTPRequest) => {
        if (['image'].includes(request.resourceType())) {
          request.abort();
        } else {
          request.continue();
        }
      };

      const { openTriggerClassName } = options;

      const requestListener = (request: any) => onRequestHandle(request as HTTPRequest);

      MockDate.set(dayjs('2016-11-22').valueOf());
      page.on('request', requestListener);
      // await page.goto(`file://${process.cwd()}/tests/index.html`);
      // await page.addStyleTag({ path: `${process.cwd()}/components/style/reset.css` });
      // await page.addStyleTag({ content: '*{animation: none!important;}' });
      console.log({
        name: options.name,
      });

      await page.goto(`http://localhost:8002/${wxh}/popover/demo/${options.name}`);
      // sleep(5000);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const cache = createCache();

      const emptyStyleHolder = doc.createElement('div');

      let element = (
        <StyleProvider cache={cache} container={emptyStyleHolder}>
          <App>{themedComponent}</App>
        </StyleProvider>
      );

      // Do inject open trigger
      if (openTriggerClassName) {
        element = (
          <TriggerMockContext.Provider value={{ popupVisible: true }}>
            {element}
          </TriggerMockContext.Provider>
        );
      }

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

      if (openTriggerClassName) {
        styleStr += `<style>
          .${openTriggerClassName} {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
            opacity: 1 !important;
            display: inline-block !important;
            vertical-align: top !important;
          }
        </style>`;
      }

      // await page.evaluate(
      //   (innerHTML: string, ssrStyle: string, triggerClassName?: string) => {
      //     const root = document.querySelector<HTMLDivElement>('#root')!;
      //     root.innerHTML = innerHTML;
      //     const head = document.querySelector<HTMLElement>('head')!;
      //     head.innerHTML += ssrStyle;
      //     // Inject open trigger with block style
      //     if (triggerClassName) {
      //       document.querySelectorAll<HTMLElement>(`.${triggerClassName}`).forEach((node) => {
      //         const blockStart = document.createElement('div');
      //         const blockEnd = document.createElement('div');
      //         node.parentNode?.insertBefore(blockStart, node);
      //         node.parentNode?.insertBefore(blockEnd, node.nextSibling);
      //       });
      //     }
      //   },
      //   html,
      //   styleStr,
      //   openTriggerClassName || '',
      // );

      // if (!options.onlyViewport) {
      //   // Get scroll height of the rendered page and set viewport
      //   const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      //   await page.setViewport({ width: 800, height: bodyHeight });
      // }

      const image = await page.screenshot({
        fullPage: !options.onlyViewport,
      });

      await fse.writeFile(path.join(snapshotPath, `${identifier}${suffix}.png`), image);

      MockDate.reset();
      page.off('request', requestListener);
    });
  }

  Object.entries(themes).forEach(([key, algorithm]) => {
    const configTheme = {
      algorithm,
      token: {
        fontFamily: 'Arial',
      },
    };

    test(
      `component image screenshot should correct ${key}`,
      `.${key}`,
      <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
        <ConfigProvider theme={configTheme}>{component}</ConfigProvider>
      </div>,
      `_${key}`,
    );
    test(
      `[CSS Var] component image screenshot should correct ${key}`,
      `.${key}.css-var`,
      <div style={{ background: key === 'dark' ? '#000' : '', padding: `24px 12px` }} key={key}>
        <ConfigProvider theme={{ ...configTheme, cssVar: true }}>{component}</ConfigProvider>
      </div>,
      `_${key}/_cssvar`,
    );
  });
}

type Options = {
  skip?: boolean | string[];
  onlyViewport?: boolean | string[];
  /** Use SSR render instead. Only used when the third part deps component */
  ssr?: boolean;
  /** Open Trigger to check the popup render */
  openTriggerClassName?: string;
};

// eslint-disable-next-line jest/no-export
export function imageDemoTest(component: string, options: Options = {}) {
  (options.skip === true ? describe.skip : describe)(`Test ${component} demo`, () => {
    const files = fg.sync(`./components/${component}/demo/[a-z]*.tsx`, {
      onlyFiles: true,
      cwd: process.cwd(),
    });

    const mainMatrix = ['default', 'dark', 'compact'];

    const allMatrix = [...mainMatrix, ...combineMatrix([mainMatrix, ['cssvar']])];

    files.forEach((file) => {
      const demoName = path.basename(file, '.tsx');

      const describeMethod = (function _() {
        if (Array.isArray(options.skip) && options.skip.some((c) => file.endsWith(c))) {
          return describe.skip;
        }
        return describe;
      })();

      // 每一个 demo 都放在一个 describe 里面
      describeMethod(file, () => {
        const matrix = allMatrix.map((m) => {
          const category = Array.isArray(m) ? m : [m];
          return [category.join('_'), category];
        });

        // 每一张截图都放在一个 test 里面
        test.each(matrix)(`${demoName}(%s)`, async (suffix, category: any) => {
          const urlPrefix = category.map((i: string) => `_${i}`).join('/');
          const realUrl = `http://localhost:8002/${urlPrefix}/${component}/demo/${demoName}`;

          await page.goto(realUrl);

          const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
          await page.setViewport({ width: 800, height: bodyHeight ?? 600 });

          const image = await page.screenshot({
            fullPage: !options.onlyViewport,
          });

          await fse.writeFile(
            path.join(snapshotPath, `${component}-${demoName}.${suffix}.png`),
            image,
          );
        });
      });
    });
  });
}
