import * as React from 'react';
import { extendTest } from '../../../tests/shared/demoTest';

jest.mock('../', () => {
  const Drawer = jest.requireActual('../');
  const MockDrawer = Drawer.default;
  return (props: any) => <MockDrawer {...props} visible />;
});

extendTest('drawer', {
  testingLib: true,
});
