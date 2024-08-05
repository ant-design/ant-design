import DatePicker from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import accessibilityTest from '../../../tests/shared/accessibilityTest';

const { MonthPicker, WeekPicker, RangePicker } = DatePicker;

describe('mount', () => {
  mountTest(DatePicker);
  mountTest(MonthPicker);
  mountTest(WeekPicker);
  mountTest(RangePicker);

  rtlTest(DatePicker);
  accessibilityTest(DatePicker);
  rtlTest(MonthPicker);
  accessibilityTest(MonthPicker);
  rtlTest(WeekPicker);
  accessibilityTest(WeekPicker);
  rtlTest(RangePicker);
  accessibilityTest(RangePicker);
});
