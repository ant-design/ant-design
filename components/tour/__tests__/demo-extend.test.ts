import { extendTest } from '../../../tests/shared/demoTest';

jest.mock('../.', () => {
  const OriReact = jest.requireActual('react');
  const OriTour = jest.requireActual('../.').default;

  const ProxyTour = OriReact.forwardRef((props: any, ref: any) =>
    OriReact.createElement(OriTour, { ...props, open: true, ref }),
  );

  return ProxyTour;
});

extendTest('tour', { skip: ['render-panel.tsx'] });
