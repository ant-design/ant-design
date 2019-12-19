import demoTest from '../../../tests/shared/demoTest';

demoTest('table', {
  skip: process.env.REACT === '15' ? ['edit-row', 'edit-cell', 'drag-sorting'] : [],
});
