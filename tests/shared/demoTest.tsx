/* eslint-disable react/jsx-no-constructed-context-values */
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { globSync } from 'glob';
import path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { render } from '../utils';
import { TriggerMockContext } from './demoTestContext';
import { excludeWarning } from './excludeWarning';
import rootPropsTest from './rootPropsTest';

import 'isomorphic-fetch';

export { rootPropsTest };

export type Options = {
  skip?: boolean | string[];
  testingLib?: boolean;
  testRootProps?: false | object;
};

function baseText(doInject: boolean, component: string, options: Options = {}) {
  const files = globSync(`./components/${component}/demo/*.tsx`);
  files.forEach((file) => {
    // to compatible windows path
    file = file.split(path.sep).join('/');
    const testMethod =
      options.skip === true ||
      (Array.isArray(options.skip) && options.skip.some((c) => file.includes(c)))
        ? test.skip
        : test;

    // function doTest(name: string, openTrigger = false) {
    testMethod(
      doInject ? `renders ${file} extend context correctly` : `renders ${file} correctly`,
      async () => {
        const errSpy = excludeWarning();

        Date.now = vi.fn(() => new Date('2016-11-22').getTime());
        vi.useFakeTimers().setSystemTime(new Date('2016-11-22'));

        let { default: Demo } = await import(`../../${file}`);
        // Inject Trigger status unless skipped
        Demo = typeof Demo === 'function' ? <Demo /> : Demo;
        if (doInject) {
          Demo = (
            <TriggerMockContext.Provider value={{ popupVisible: true }}>
              {Demo}
            </TriggerMockContext.Provider>
          );
        }

        // Inject cssinjs cache to avoid create <style /> element
        Demo = <StyleProvider cache={createCache()}>{Demo}</StyleProvider>;

        // Demo Test also include `dist` test which is already uglified.
        // We need test this as SSR instead.
        if (doInject) {
          const { container } = render(Demo);
          expect({ type: 'demo', html: container.innerHTML }).toMatchSnapshot();
        } else {
          const html = renderToString(Demo);
          expect({ type: 'demo', html }).toMatchSnapshot();
        }

        vi.clearAllTimers();
        errSpy.mockRestore();
      },
      120000,
    );
    vi.useRealTimers();
  });
}

export function extendTest(component: string, options: Options = {}) {
  baseText(true, component, options);
}

export default function demoTest(component: string, options: Options = {}) {
  baseText(false, component, options);

  if (options?.testRootProps !== false) {
    rootPropsTest(component, null!, {
      props: options?.testRootProps,
    });
  }
}
