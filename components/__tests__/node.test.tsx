import { globSync } from 'glob';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import type { Options } from '../../tests/shared/demoTest';

globalThis.testConfig = {};

vi.mock('../../tests/shared/demoTest', () => {
  function fakeDemoTest(name: string, option: Options = {}) {
    globalThis.testConfig[name] = option;
  }

  fakeDemoTest.rootPropsTest = () => {};

  return {
    default: fakeDemoTest,
    rootPropsTest: () => {},
  };
});

describe('node', () => {
  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date('2016-11-22'));
  });

  // Find the component exist demo test file
  const files = globSync(`./components/*/__tests__/demo.test.@(j|t)s?(x)`);

  files.forEach((componentTestFile) => {
    const componentName = componentTestFile.match(/components\/([^/]*)\//)![1];

    // Test for ssr
    // eslint-disable-next-line vitest/valid-describe-callback
    describe(componentName, async () => {
      const demoList = globSync(`./components/${componentName}/demo/*.tsx`);

      // Use mock to get config
      await import(`../../${componentTestFile}`);
      demoList.forEach((demoFile) => {
        const option = globalThis.testConfig?.[componentName];
        const skip: string[] = option?.skip || [];
        const test = skip.some((skipMarkdown) => demoFile.includes(skipMarkdown)) ? it.skip : it;

        test(
          demoFile,
          async () => {
            const Demo = (await import(`../../${demoFile}`)).default;
            expect(() => {
              renderToString(<Demo />);
            }).not.toThrow();
          },
          120000,
        );
      });
    });
  });
});
