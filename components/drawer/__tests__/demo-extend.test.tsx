import { vi } from 'vitest';
import * as React from 'react';
import { extendTest } from '../../../tests/shared/demoTest';

vi.mock('rc-drawer', () => {
  const Drawer = vi.requireActual('rc-drawer');
  const MockDrawer = Drawer.default;
  return (props: any) => {
    const newProps = {
      ...props,
      open: true,
      getContainer: false,
      maskMotion: null,
      motion: null,
    };
    return <MockDrawer {...newProps} />;
  };
});

extendTest('drawer', {
  testingLib: true,
});
