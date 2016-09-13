import React from 'react';
import moment from 'moment';
import assign from 'object-assign';
import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import Calendar from './Calendar';
import { TimePickerProps } from '../time-picker';

export interface PickerProps {
  format?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  locale?: any;
  size?: 'large' | 'small' | 'default';
  getCalendarContainer?: (trigger) => React.ReactNode;
}

export interface SinglePickerProps {
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  defaultPickerValue?: moment.Moment;
  onChange?: (date: moment.Moment, dateString: string) => void;
}

export interface DatePickerProps extends PickerProps, SinglePickerProps {
  showTime?: TimePickerProps;
}
const DatePicker = wrapPicker(createPicker(RcCalendar)) as React.ClassicComponentClass<DatePickerProps>;

export interface MonthPickerProps extends PickerProps, SinglePickerProps {
}
const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'YYYY-MM') as React.ClassicComponentClass<MonthPickerProps>;

export interface RangePickerProps extends PickerProps {
  value?: [moment.Moment, moment.Moment];
  defaultValue?: [moment.Moment, moment.Moment];
  defaultPickerValue?: [moment.Moment, moment.Moment];
  onChange?: (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => void;
  showTime?: TimePickerProps;
}

assign(DatePicker, {
  RangePicker: wrapPicker(RangePicker) as React.ClassicComponentClass<RangePickerProps>,
  Calendar,
  MonthPicker,
});

export default DatePicker;
