import * as React from 'react';
import Modal from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('modal', {
  testRootProps: false,
});

rootPropsTest('modal', (props) => <Modal {...props} />, {
  findRootElements: () => document.querySelectorAll('.ant-modal-root'),
  expectCount: 1,
});
