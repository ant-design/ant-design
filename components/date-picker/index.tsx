import * as React from 'react';
import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import WeekPicker from './WeekPicker';
import { DatePickerProps, DatePickerDecorator } from './interface';

const DatePicker = wrapPicker(createPicker(RcCalendar), 'date') as React.ClassicComponentClass<
  DatePickerProps
>;

const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'month');

Object.assign(DatePicker, {
  RangePicker: wrapPicker(RangePicker, 'date'),
  MonthPicker,
  WeekPicker: wrapPicker(WeekPicker, 'week'),
});

export default DatePicker as DatePickerDecorator;
