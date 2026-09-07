import demoTest from '../../../tests/shared/demoTest';

demoTest('tree', {
  skip: [
    'big-data.tsx',
    'virtual-scroll.tsx',
    'scroll-to.tsx',
    'component-token.tsx',
    'directory-debug.tsx',
  ],
});
