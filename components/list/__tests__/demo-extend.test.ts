import { extendTest } from '../../../tests/shared/demoTest';

extendTest('list', {
  skip: [
    'virtual-list.tsx',
    'drag-sorting.tsx',
    'drag-sorting-handler.tsx',
    'grid-drag-sorting.tsx',
    'grid-drag-sorting-handler.tsx',
  ],
});
