import type * as React from 'react';
import { spyElementPrototypes } from '@rc-component/util';
import { vi } from 'vitest';

import type { TourProps } from '../.';
import { semanticDemoTest } from '../../../tests/shared/demoTest';

// Mock Tour component to ensure it renders correctly in test environment
// Similar to demo-extend.test.ts, but handle getPopupContainer issue
vi.mock('../.', async () => {
  const OriReact = await vi.importActual<typeof import('react')>('react');
  const OriTourModule = await vi.importActual<typeof import('../.')>('../.');
  const OriTour = OriTourModule.default as React.ComponentType<
    TourProps & React.RefAttributes<any>
  >;

  const ProxyTour = OriReact.forwardRef<any, TourProps>((props, ref) => {
    // Fix getPopupContainer: convert false to a function that returns body
    const getPopupContainerProp = props.getPopupContainer;
    const fixedGetPopupContainer =
      getPopupContainerProp === false
        ? function getBody(): HTMLElement {
            // Use function declaration to avoid Babel parsing issues
            const doc = global.document || global.window?.document;
            return doc.body;
          }
        : getPopupContainerProp;

    return OriReact.createElement(OriTour, {
      ...props,
      open: true,
      getPopupContainer: fixedGetPopupContainer,
      ref,
    });
  });

  return {
    ...OriTourModule,
    default: ProxyTour,
  };
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
