/* eslint-disable react/jsx-no-constructed-context-values */
import path from 'path';
import * as React from 'react';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { globSync } from 'glob';
import { kebabCase } from 'lodash';
import { renderToString } from 'react-dom/server';
import { test } from 'vitest';

import { resetWarned } from '../../components/_util/warning';
import { render } from '../utils';
import { TriggerMockContext } from './demoTestContext';
import { excludeWarning, isSafeWarning } from './excludeWarning';
import rootPropsTest from './rootPropsTest';

import 'isomorphic-fetch';

export { rootPropsTest };

export type Options = {
  skip?: boolean | string[];
  testingLib?: boolean;
  testRootProps?: false | object;
  /**
   * Not check component `displayName`, check path only
   */
  nameCheckPathOnly?: boolean;
};

function baseText(doInject: boolean, component: string, options: Options = {}) {
  const files = globSync(`./components/${component}/demo/*.tsx`);
  if (options.skip === true) {
    return;
  }
  test.each(files)(
    doInject ? `renders %s extend context correctly` : `renders %s correctly`,
    async (file) => {
      file = file.split(path.sep).join('/');
      if (options.skip && (options.skip as string[]).some((f) => file.includes(f))) {
        return;
      }

      resetWarned();

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

      // Snapshot of warning info
      if (doInject) {
        const errorMessageSet = new Set(errSpy.mock.calls.map((args) => args[0]));
        const errorMessages = Array.from(errorMessageSet)
          .filter((msg) => !isSafeWarning(msg, true))
          .sort();

        expect(errorMessages).toMatchSnapshot();
      }

      errSpy.mockRestore();
      vi.useRealTimers();
    },
    120000,
  );
}

/**
 * Inject Trigger to force open in test snapshots
 */
export function extendTest(component: string, options: Options = {}) {
  baseText(true, component, options);
}

/**
 * Test all the demo snapshots
 */
export default function demoTest(component: string, options: Options = {}) {
  baseText(false, component, options);

  // Test component name is match the kebab-case
  const testName = test;
  testName('component name is match the kebab-case', async () => {
    const kebabName = kebabCase(component);

    // Path should exist
    const { default: Component } = await import(`../../components/${kebabName}`);

    if (options.nameCheckPathOnly !== true) {
      expect(kebabCase(Component.displayName || '')).toEqual(kebabName);
    }
  });

  if (options?.testRootProps !== false) {
    rootPropsTest(component, null!, {
      props: options?.testRootProps,
    });
  }
}
