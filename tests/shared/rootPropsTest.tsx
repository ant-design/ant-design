/* eslint-disable jest/no-export */
import React from 'react';

import ConfigProvider from '../../components/config-provider';
import { render, waitFakeTimer } from '../utils';
import { TriggerMockContext } from './demoTestContext';

export interface Options {
  name?: string;
  findRootElements?: (
    container: HTMLElement,
  ) => Element | HTMLCollection | Element[] | NodeListOf<Element>;
  expectCount?: number;
  beforeRender?: () => void;
  afterRender?: (container: HTMLElement) => void;
  props?: object;
}

function isSingleNode(node: any): node is Element {
  return node && node instanceof HTMLElement;
}

export default function rootPropsTest(
  component: string | string[],
  customizeRender?: (
    component: React.ComponentType<any> & Record<string, any>,
    props: any,
  ) => React.ReactNode,
  options?: Options,
) {
  const componentNames = Array.isArray(component) ? component : [component];
  const [componentName, subComponentName] = componentNames;

  const Component = require(`../../components/${componentName}`).default;
  const name = options?.name ? `(${options.name})` : '';

  describe(`RootProps${name}`, () => {
    let passed = false;

    beforeEach(() => {
      passed = false;
      jest.useFakeTimers();
      document.body.innerHTML = '';
    });

    afterEach(() => {
      if (!passed || process.env.DEBUG === 'true') {
        console.log(document.body.innerHTML);
      }
      jest.useRealTimers();
    });

    it(['rootClassName', subComponentName].filter((v) => v).join(' '), async () => {
      const rootClassName = 'TEST_ROOT_CLS';

      if (options?.beforeRender) {
        options?.beforeRender();
      }

      const Demo = () => {
        const holderRef = React.useRef<HTMLDivElement>(null);
        const [show, setShow] = React.useState(false);
        React.useEffect(() => {
          setShow(true);
        }, []);

        const sharedProps = {
          value: 1,
          rootClassName,
          open: true,
          ...options?.props,
        };

        const node = customizeRender ? (
          customizeRender(Component, sharedProps)
        ) : (
          <Component {...sharedProps} />
        );

        const triggerContext = React.useMemo(() => ({ mock: false }), []);

        return (
          <TriggerMockContext.Provider value={triggerContext}>
            <div id="holder" className="holder" ref={holderRef}>
              {show && (
                <ConfigProvider getPopupContainer={() => holderRef.current!}>{node}</ConfigProvider>
              )}
            </div>
          </TriggerMockContext.Provider>
        );
      };

      const { container } = render(<Demo />);
      await waitFakeTimer();

      if (options?.afterRender) {
        options?.afterRender(container);
      }

      await waitFakeTimer();

      const holder = container.querySelector<HTMLElement>('#holder')!;
      let customizeFindNodes = options?.findRootElements?.(holder);
      if (isSingleNode(customizeFindNodes)) {
        customizeFindNodes = [customizeFindNodes];
      }
      const childList = Array.from(customizeFindNodes ?? holder.children);

      expect(childList.length).toBeGreaterThan(0);
      if (options?.expectCount) {
        expect(childList).toHaveLength(options.expectCount);
      }

      childList.forEach((ele) => {
        expect(ele).toHaveClass(rootClassName);

        // `rootClassName` should not show in children element
        expect(ele.querySelector(`.${rootClassName}`)).toBeFalsy();
      });

      passed = true;
    });
  });
}
