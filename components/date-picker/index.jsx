import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import RangePicker from './RangePicker';
import Calendar from './Calendar';

const DatePicker = createPicker(RcCalendar);
const MonthPicker = createPicker(MonthCalendar, 'yyyy-MM');

DatePicker.Calendar = Calendar;
DatePicker.RangePicker = RangePicker;
DatePicker.MonthPicker = MonthPicker;

export default DatePicker;
