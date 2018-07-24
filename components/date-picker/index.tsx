import * as React from 'react';
import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import WeekPicker from './WeekPicker';
import { DatePickerProps, DatePickerDecorator } from './interface';

const DatePicker = wrapPicker(createPicker(RcCalendar)) as React.ClassicComponentClass<DatePickerProps>;

const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'YYYY-MM');

Object.assign(DatePicker, {
  RangePicker: wrapPicker(RangePicker),
  MonthPicker,
  WeekPicker: wrapPicker(WeekPicker, 'gggg-wo'),
});

export default DatePicker as DatePickerDecorator;
