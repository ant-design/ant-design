import { extendTest } from '../../../tests/shared/demoTest';

extendTest('table', {
  skip: [
    'ajax.tsx',
    'virtual-list.tsx',
    'summary.tsx',
    'sticky.tsx',
    'fixed-gapped-columns.tsx',
    'fixed-columns.tsx',
    'fixed-columns-header.tsx',
  ],
});
