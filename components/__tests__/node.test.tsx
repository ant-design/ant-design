import { globSync } from 'glob';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import type { Options } from '../../tests/shared/demoTest';

(global as any).testConfig = {};

jest.mock('../../tests/shared/demoTest', () => {
  function fakeDemoTest(name: string, option: Options = {}) {
    (global as any).testConfig[name] = option;
  }

  fakeDemoTest.rootPropsTest = () => {};

  return fakeDemoTest;
});

describe('node', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2016-11-22'));
  });

  // Find the component exist demo test file
  const files = globSync(`./components/*/__tests__/demo.test.@(j|t)s?(x)`);

  files.forEach((componentTestFile) => {
    const componentName = componentTestFile.match(/components\/([^/]*)\//)![1];

    // Test for ssr
    describe(componentName, () => {
      const demoList = globSync(`./components/${componentName}/demo/*.tsx`);

      // Use mock to get config
      require(`../../${componentTestFile}`); // eslint-disable-line global-require, import/no-dynamic-require
      const option = (global as any).testConfig?.[componentName];

      demoList.forEach((demoFile) => {
        const skip: string[] = option?.skip || [];
        const test = skip.some((skipMarkdown) => demoFile.includes(skipMarkdown)) ? it.skip : it;

        test(demoFile, () => {
          const Demo = require(`../../${demoFile}`).default; // eslint-disable-line global-require, import/no-dynamic-require
          expect(() => {
            renderToString(<Demo />);
          }).not.toThrow();
        });
      });
    });
  });
});
