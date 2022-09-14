/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import glob from 'glob';
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import { excludeWarning } from './excludeWarning';
import { render } from '../utils';
import { TriggerMockContext } from './demoTestContext';

require('isomorphic-fetch');

function normalizeAriaValue(value: string | null): string {
  const defaultValue = value || '';

  return defaultValue.replace(/\d+/g, 'test').replace(/TEST_OR_SSR/g, 'test');
}

function normalizeAria(element: Element, ariaName: string) {
  if (element.hasAttribute(ariaName)) {
    element.setAttribute(ariaName, normalizeAriaValue(element.getAttribute(ariaName)));
  }
}

/**
 * Rc component will generate id for aria usage. It's created as `test-uuid` when env === 'test'. Or
 * `f7fa7a3c-a675-47bc-912e-0c45fb6a74d9`(randomly) when not test env. So we need hack of this to
 * modify the `aria-controls`.
 */
function ariaConvert(element: Element) {
  normalizeAria(element, 'aria-owns');
  normalizeAria(element, 'aria-controls');
  normalizeAria(element, 'aria-labelledby');
  normalizeAria(element, 'aria-activedescendant');
  if (element.id) {
    element.id = normalizeAriaValue(element.id);
  }

  Array.from(element.children).forEach(child => {
    ariaConvert(child);
  });
}

export type Options = {
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
    Date.now = jest.fn(() => new Date('2016-11-22').getTime());
    jest.useFakeTimers().setSystemTime(new Date('2016-11-22'));

    if (!doInject) {
      testMethod(`cssinjs should not warn in ${file}`, () => {
        const errSpy = excludeWarning();

        let Demo = require(`../.${file}`).default; // eslint-disable-line global-require, import/no-dynamic-require
        // Inject Trigger status unless skipped
        Demo = typeof Demo === 'function' ? <Demo /> : Demo;

        // Inject cssinjs cache to avoid create <style /> element
        Demo = <StyleProvider cache={createCache()}>{Demo}</StyleProvider>;

        render(Demo);

        expect(errSpy).not.toHaveBeenCalledWith(expect.stringContaining('[Ant Design CSS-in-JS]'));

        errSpy();
      });
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

        if (typeof document === 'undefined') {
          // Server
          expect(() => {
            renderToString(Demo);
          }).not.toThrow();
        } else {
          // Client
          const { container } = render(Demo);
          ariaConvert(container);

          const { children } = container;
          const child = children.length > 1 ? Array.from(children) : children[0];

          expect(child).toMatchSnapshot();
        }

        errSpy();
      },
    );
    jest.useRealTimers();
  });
}

export function extendTest(component: string, options: Options = {}) {
  baseText(true, component, options);
}

export default function demoTest(component: string, options: Options = {}) {
  baseText(false, component, options);
}
