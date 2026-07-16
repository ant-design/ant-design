import demoTest from '../../../tests/shared/demoTest';

// `@rc-component/virtual-list` is auto-mocked to render all rows in tests,
// so skip big-data demos to keep snapshots reviewable.
demoTest('listy', {
  skip: ['basic.tsx', 'rich.tsx', 'scroll-to.tsx'],
});
