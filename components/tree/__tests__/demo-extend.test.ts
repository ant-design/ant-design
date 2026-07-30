import { extendTest } from '../../../tests/shared/demoTest';

extendTest('tree', {
  skip: [
    'big-data.tsx',
    'virtual-scroll.tsx',
    'scroll-to.tsx',
    'component-token.tsx',
    'directory-debug.tsx',
  ],
});
