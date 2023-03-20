import dayjs from 'dayjs';
import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('date-picker', { skip: ['locale.tsx'], testRootProps: false });

rootPropsTest('time-picker', (DatePicker, props) => <DatePicker {...props} value={dayjs()} />, {
  findRootElements: () => document.querySelectorAll('.ant-picker, .ant-picker-dropdown'),
  expectCount: 2,
});
