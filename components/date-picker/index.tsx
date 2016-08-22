import * as React from 'react';
import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import createPicker from './createPicker';
import wrapPicker from './wrapPicker';
import RangePicker from './RangePicker';
import Calendar from './Calendar';
import { TimePickerProps } from '../time-picker';

interface PickerProps {
  format?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  locale?: any;
  size?: 'large' | 'small' | 'default';
  getCalendarContainer?: (trigger) => React.ReactNode;
}

interface SinglePickerProps {
  value?: string | Date;
  defaultValue?: string | Date;
  onChange?: (date: Date, dateString: string) => void;
}

export interface DatePickerProps extends PickerProps, SinglePickerProps {
  showTime?: TimePickerProps;
}
const DatePicker = wrapPicker(createPicker(RcCalendar)) as React.ClassicComponentClass<DatePickerProps>;

export interface MonthPickerProps extends PickerProps, SinglePickerProps {
}
const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'yyyy-MM') as React.ClassicComponentClass<MonthPickerProps>;

export interface RangePickerProps extends PickerProps {
  value?: [string | Date, string | Date];
  defaultValue?: [string | Date, string | Date];
  onChange?: (dates: [Date, Date], dateStrings: [String, String]) => void;
  showTime?: TimePickerProps;
}
DatePicker.RangePicker = wrapPicker(RangePicker) as React.ClassicComponentClass<RangePickerProps>;

DatePicker.Calendar = Calendar;
DatePicker.MonthPicker = MonthPicker;

export default DatePicker;
