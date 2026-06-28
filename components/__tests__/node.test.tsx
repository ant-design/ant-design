import * as React from 'react';
import { globSync } from 'glob';
import { renderToString } from 'react-dom/server';
import { vi } from 'vitest';

import type { Options } from '../../tests/shared/demoTest';

(global as any).testConfig = {};

vi.mock('../../tests/shared/demoTest', () => {
  function fakeDemoTest(name: string, option: Options = {}) {
    (global as any).testConfig[name] = option;
  }

  const rootPropsTest = () => {};

  return {
    default: fakeDemoTest,
    rootPropsTest,
  };
});

const files = globSync(`./components/*/__tests__/demo.test.@(j|t)s?(x)`);

for (const componentTestFile of files) {
  await vi.importActual(`../../${componentTestFile}`);
}

describe('node', () => {
  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date('2016-11-22').getTime());
  });

  files.forEach((componentTestFile) => {
    const componentName = componentTestFile.match(/components\/([^/]*)\//)![1];

    // Test for ssr
    describe(componentName, () => {
      const demoList = globSync(`./components/${componentName}/demo/*.tsx`).filter(
        (file) => !file.includes('_semantic'),
      );

      const option = (global as any).testConfig?.[componentName];

      demoList.forEach((demoFile) => {
        const skip: string[] = option?.skip || [];
        const test = skip.some((skipMarkdown) => demoFile.includes(skipMarkdown)) ? it.skip : it;

        test(demoFile, async () => {
          const Demo = (
            await vi.importActual<{ default: React.ComponentType }>(`../../${demoFile}`)
          ).default;
          expect(() => {
            renderToString(<Demo />);
          }).not.toThrow();
        });
      });
    });
  });
});
