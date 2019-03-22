import * as React from 'react';

import { DatePickerDecorator, DatePickerProps } from './interface';

import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RangePicker from './RangePicker';
import RcCalendar from 'rc-calendar';
import WeekPicker from './WeekPicker';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';

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
