import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';

import { semanticDemoTest } from '../../../tests/shared/demoTest';

// Mock Tour component to ensure it renders correctly in test environment
// Similar to demo-extend.test.ts, but handle getPopupContainer issue
jest.mock('../.', () => {
  const OriReact = jest.requireActual('react');
  const OriTour = jest.requireActual('../.').default;

  const ProxyTour = OriReact.forwardRef((props: any, ref: any) => {
    // Fix getPopupContainer: convert false to a function that returns body
    const getPopupContainerProp = props.getPopupContainer;
    const fixedGetPopupContainer =
      getPopupContainerProp === false
        ? function getBody() {
            // Use function declaration to avoid Babel parsing issues
            const doc = global.document || global.window?.document;
            return doc ? doc.body : null;
          }
        : getPopupContainerProp;

    return OriReact.createElement(OriTour, {
      ...props,
      open: true,
      getPopupContainer: fixedGetPopupContainer,
      ref,
    });
  });

  return ProxyTour;
});

// Mock getBoundingClientRect for Tour component to calculate target position
const mockBtnRect = (rect: { x: number; y: number; width: number; height: number }) => {
  spyElementPrototypes(HTMLButtonElement, {
    getBoundingClientRect: {
      get(): any {
        return () => ({ ...rect, left: rect.x, top: rect.y });
      },
    },
    scrollIntoView: {
      get(): any {
        return (val: boolean | ScrollIntoViewOptions) => val;
      },
    },
  });
};

// Mock getBoundingClientRect before running tests
beforeAll(() => {
  mockBtnRect({ x: 100, y: 100, width: 100, height: 32 });
});

semanticDemoTest('tour', { skip: ['render-panel.tsx'] });
