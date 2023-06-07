import * as React from 'react';
import { extendTest } from '../../../tests/shared/demoTest';

vi.mock('rc-drawer', async () => {
  const Drawer = await vi.importActual<typeof import('rc-drawer')>('rc-drawer');
  const MockDrawer = Drawer.default;
  return {
    default: (props: any) => {
      const newProps = {
        ...props,
        open: true,
        getContainer: false,
        maskMotion: null,
        motion: null,
      };
      return <MockDrawer {...newProps} />;
    },
  };
});

extendTest('drawer', {
  testingLib: true,
});
