import dayjs from 'dayjs';
import * as React from 'react';
import DatePicker from '..';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('date-picker', { skip: ['locale.tsx'], testRootProps: false });

rootPropsTest('time-picker', (props) => <DatePicker {...props} value={dayjs()} />, {
  findRootElements: () => document.querySelectorAll('.ant-picker, .ant-picker-dropdown'),
  expectCount: 2,
});
