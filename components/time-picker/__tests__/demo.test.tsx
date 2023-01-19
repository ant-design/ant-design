import dayjs from 'dayjs';
import * as React from 'react';
import TimePicker from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('time-picker', {
  testRootProps: false,
});

rootPropsTest('time-picker', (props) => <TimePicker {...props} value={dayjs()} />, {
  findRootElements: () => document.querySelectorAll('.ant-picker, .ant-picker-dropdown'),
  expectCount: 2,
});
