import demoTest from '../../../tests/shared/demoTest';

// Virtual demos render every row without measurement in jsdom, snapshot is meaningless and huge
demoTest('listy', { skip: ['virtual.tsx', 'infinite.tsx'] });
