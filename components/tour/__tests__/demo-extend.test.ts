import type * as React from 'react';
import { vi } from 'vitest';

import type { TourProps } from '../.';
import { extendTest } from '../../../tests/shared/demoTest';

vi.mock('../.', async () => {
  const OriReact = await vi.importActual<typeof import('react')>('react');
  const OriTourModule = await vi.importActual<typeof import('../.')>('../.');
  const OriTour = OriTourModule.default as React.ComponentType<
    TourProps & React.RefAttributes<any>
  >;
  const ProxyTour = OriReact.forwardRef<any, TourProps>((props, ref) =>
    OriReact.createElement(OriTour, { ...props, open: true, ref }),
  );
  return {
    ...OriTourModule,
    default: ProxyTour,
  };
});

extendTest('tour', { skip: ['render-panel.tsx'] });
