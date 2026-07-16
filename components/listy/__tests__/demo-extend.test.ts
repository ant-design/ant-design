import { extendTest } from '../../../tests/shared/demoTest';

// `@rc-component/virtual-list` is auto-mocked to render all rows in tests,
// so skip big-data demos to keep snapshots reviewable.
extendTest('listy', {
  skip: ['basic.tsx', 'rich.tsx', 'scroll-to.tsx'],
});
