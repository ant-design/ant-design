import DatePicker from '..';
import mountTest from '../../../tests/shared/mountTest';

const { MonthPicker, WeekPicker, RangePicker } = DatePicker;

describe('mount', () => {
  mountTest(DatePicker);
  mountTest(MonthPicker);
  mountTest(WeekPicker);
  mountTest(RangePicker);
});
