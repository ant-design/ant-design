import DatePicker from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

const { MonthPicker, WeekPicker, RangePicker } = DatePicker;

describe('mount', () => {
  mountTest(DatePicker);
  mountTest(MonthPicker);
  mountTest(WeekPicker);
  mountTest(RangePicker);

  rtlTest(DatePicker);
  rtlTest(MonthPicker);
  rtlTest(WeekPicker);
  rtlTest(RangePicker);
});
