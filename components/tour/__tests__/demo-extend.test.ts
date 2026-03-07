import type React from 'react';

import type { TourProps } from '../.';
import { extendTest } from '../../../tests/shared/demoTest';

jest.mock('../.', () => {
  const OriReact: typeof React = jest.requireActual('react');
  const OriTour = jest.requireActual('../.').default;
  const ProxyTour = OriReact.forwardRef<any, TourProps>((props, ref) =>
    OriReact.createElement(OriTour, { ...props, open: true, ref }),
  );
  return ProxyTour;
});

extendTest('tour', { skip: ['render-panel.tsx'] });
