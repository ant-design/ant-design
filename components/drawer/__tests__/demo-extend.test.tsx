import * as React from 'react';
import { vi } from 'vitest';

import { extendTest } from '../../../tests/shared/demoTest';

vi.mock('@rc-component/drawer', async () => {
  const Drawer =
    await vi.importActual<typeof import('@rc-component/drawer')>('@rc-component/drawer');
  const MockDrawer = Drawer.default;
  const ProxyDrawer = (props: any) => {
    const newProps = {
      ...props,
      open: true,
      getContainer: false,
      maskMotion: null,
      motion: null,
    };
    return <MockDrawer {...newProps} />;
  };

  return {
    ...Drawer,
    default: ProxyDrawer,
  };
});

extendTest('drawer', {
  testingLib: true,
});
