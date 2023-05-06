import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('modal', {
  testRootProps: false,
});

rootPropsTest('modal', (Modal, props) => <Modal {...props} />, {
  findRootElements: () => document.querySelectorAll('.ant-modal-root'),
  expectCount: 1,
});
