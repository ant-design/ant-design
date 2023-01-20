import dayjs from 'dayjs';
import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('time-picker', {
  testRootProps: false,
});

rootPropsTest('time-picker', (TimePicker, props) => <TimePicker {...props} value={dayjs()} />, {
  findRootElements: () => document.querySelectorAll('.ant-picker, .ant-picker-dropdown'),
  expectCount: 2,
});
