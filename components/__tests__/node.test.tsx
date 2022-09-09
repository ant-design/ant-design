import glob from 'glob';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

describe('node', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2016-11-22'));
  });

  // Find the component exist demo test file
  const files = glob.sync(`./components/*/__tests__/demo.test.@(j|t)s?(x)`);

  files.forEach(componentTestFile => {
    const componentName = componentTestFile.match(/components\/([^/]*)\//)![1];

    // Test for ssr
    describe(componentName, () => {
      const demoList = glob.sync(`./components/${componentName}/demo/*.md`);

      demoList.forEach(demoFile => {
        it(demoFile, () => {
          const Demo = require(`../../${demoFile}`).default; // eslint-disable-line global-require, import/no-dynamic-require
          expect(() => {
            renderToString(<Demo />);
          }).not.toThrow();
        });
      });
    });
  });
});
