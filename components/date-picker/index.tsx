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
  prefixCls?: string;
  inputPrefixCls?: string;
  format?: string;
  disabled?: boolean;
  allowClear?: boolean;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  locale?: any;
  size?: 'large' | 'small' | 'default';
  getCalendarContainer?: (triggerNode: Element) => HTMLElement;
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  disabledDate?: (current: moment.Moment) => boolean;
}

export interface SinglePickerProps {
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  defaultPickerValue?: moment.Moment;
  onChange?: (date: moment.Moment, dateString: string) => void;
}

export interface DatePickerProps extends PickerProps, SinglePickerProps {
  showTime?: TimePickerProps | boolean;
  showToday?: boolean;
  open?: boolean;
  toggleOpen?: (e: {open: boolean}) => void;
  disabledTime?: (current: moment.Moment) => {
    disabledHours?: () => [number, number],
    disabledMinutes?: () => [number, number],
    disabledSeconds?: () => [number, number],
  };
  onOpenChange?: (status: boolean) => void;
  onOk?: () => void;
  placeholder?: string;
}
const DatePicker = wrapPicker(createPicker(RcCalendar)) as React.ClassicComponentClass<DatePickerProps>;

export interface MonthPickerProps extends PickerProps, SinglePickerProps {
  placeholder?: string;
}
const MonthPicker = wrapPicker(createPicker(MonthCalendar), 'YYYY-MM');

export interface RangePickerProps extends PickerProps {
  value?: [moment.Moment, moment.Moment];
  defaultValue?: [moment.Moment, moment.Moment];
  defaultPickerValue?: [moment.Moment, moment.Moment];
  onChange?: (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => void;
  onOk?: () => void;
  showTime?: TimePickerProps | boolean;
  ranges?: {
    [range: string]: moment.Moment[],
  };
  placeholder?: [string, string];
  disabledTime?: (current: moment.Moment, type: string) => {
    disabledHours?: () => [number, number],
    disabledMinutes?: () => [number, number],
    disabledSeconds?: () => [number, number],
  };
}

assign(DatePicker, {
  RangePicker: wrapPicker(RangePicker),
  Calendar,
  MonthPicker,
});

export interface DatePickerDecorator extends React.ClassicComponentClass<DatePickerProps> {
  RangePicker: React.ClassicComponentClass<RangePickerProps>;
  MonthPicker: React.ClassicComponentClass<MonthPickerProps>;
}

export default DatePicker as DatePickerDecorator;
