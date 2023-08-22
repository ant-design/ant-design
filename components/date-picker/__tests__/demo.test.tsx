import dayjs from 'dayjs';
import * as React from 'react';
import demoTest, { rootPropsTest } from '../../../tests/shared/demoTest';

demoTest('date-picker', { skip: ['locale.tsx', 'component-token.tsx'], testRootProps: false });

rootPropsTest('date-picker', (DatePicker, props) => <DatePicker {...props} value={dayjs()} />, {
  findRootElements: () => document.querySelectorAll('.ant-picker, .ant-picker-dropdown'),
  expectCount: 2,
});

rootPropsTest(
  'date-picker',
  (DatePicker, props) => <DatePicker.RangePicker {...props} value={dayjs()} />,
  {
    findRootElements: () => document.querySelectorAll('.ant-picker-range, .ant-picker-dropdown'),
    expectCount: 2,
  },
);
