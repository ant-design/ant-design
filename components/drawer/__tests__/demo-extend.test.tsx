import * as React from 'react';
import { extendTest } from '../../../tests/shared/demoTest';

jest.mock('rc-drawer', () => {
  const Drawer = jest.requireActual('rc-drawer');
  const MockDrawer = Drawer.default;
  return (props: any) => {
    const newProps = {
      ...props,
      open: true,
      getContainer: false,
    };
    return <MockDrawer {...newProps} />;
  };
});

extendTest('drawer', {
  testingLib: true,
});
