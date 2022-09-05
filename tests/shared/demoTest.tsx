/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react';
import glob from 'glob';
import { excludeWarning } from './excludeWarning';
import { render } from '../utils';
import { TriggerMockContext } from './demoTestContext';

require('isomorphic-fetch');

type Options = {
  skip?: boolean | string[];
  testingLib?: boolean;
};

function baseText(doInject: boolean, component: string, options: Options = {}) {
  const files = glob.sync(`./components/${component}/demo/*.md`);

  files.forEach(file => {
    let testMethod = options.skip === true ? test.skip : test;
    if (Array.isArray(options.skip) && options.skip.some(c => file.includes(c))) {
      testMethod = test.skip;
    }

    // function doTest(name: string, openTrigger = false) {
    testMethod(
      doInject ? `renders ${file} extend context correctly` : `renders ${file} correctly`,
      () => {
        const errSpy = excludeWarning();

        let Demo = require(`../.${file}`).default; // eslint-disable-line global-require, import/no-dynamic-require
        // Inject Trigger status unless skipped
        Demo = typeof Demo === 'function' ? <Demo /> : Demo;
        if (doInject) {
          Demo = (
            <TriggerMockContext.Provider
              value={{
                popupVisible: true,
              }}
            >
              {Demo}
            </TriggerMockContext.Provider>
          );
        }
        jest.useFakeTimers().setSystemTime(new Date('2016-11-22'));

        const { container } = render(Demo);

        const { children } = container;
        const child = children.length > 1 ? children : children[0];
        expect(child).toMatchSnapshot();

        jest.useRealTimers();

        errSpy();
      },
    );
  });
}

export function extendTest(component: string, options: Options = {}) {
  baseText(true, component, options);
}

export default function demoTest(component: string, options: Options = {}) {
  baseText(false, component, options);
}
