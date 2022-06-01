/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from 'react';
import glob from 'glob';
import MockDate from 'mockdate';
import moment from 'moment';
import type { TriggerProps } from 'rc-trigger';
import { excludeWarning } from './excludeWarning';
import { render } from '../utils';

export const TriggerMockContext = React.createContext<Partial<TriggerProps> | undefined>(undefined);

// We should avoid use it in 4.0. Reopen if can not handle this.
const USE_REPLACEMENT = false;
const testDist = process.env.LIB_DIR === 'dist';

function isValidElement(element: ChildNode): element is HTMLElement {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#value
  return element.nodeType === 3 || element.nodeType === 8;
}

/**
 * Rc component will generate id for aria usage. It's created as `test-uuid` when env === 'test'. Or
 * `f7fa7a3c-a675-47bc-912e-0c45fb6a74d9`(randomly) when not test env. So we need hack of this to
 * modify the `aria-controls`.
 */
function ariaConvert(container: HTMLElement) {
  if (!testDist || !USE_REPLACEMENT) return container;

  const matches = new Map();

  function process(entry: ChildNode) {
    if (isValidElement(entry)) {
      const { childNodes } = entry;
      if (matches.has(entry)) return;
      matches.set(entry, true);

      // Change aria
      if (entry.getAttribute('aria-controls')) {
        entry.setAttribute('aria-controls', ''); // Remove all the aria to keep render sync in jest & jest node
      }

      // Loop children
      if (!childNodes.length) {
        return;
      }
      childNodes.forEach(process);
    }
  }

  container.childNodes.forEach(entry => process(entry));

  return container;
}

type Options = {
  skip?: boolean | string[];
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

        MockDate.set(moment('2016-11-22').valueOf());
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

        const { container, asFragment } = render(Demo);

        const childNodes = Array.from(asFragment().childNodes);

        // Convert aria related content
        ariaConvert(container);

        if (childNodes.length === 1) {
          expect(childNodes[0]).toMatchSnapshot();
        } else {
          expect(childNodes).toMatchSnapshot();
        }

        MockDate.reset();

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
