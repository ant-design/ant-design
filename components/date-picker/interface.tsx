import * as React from 'react';
import * as moment from 'moment';
import { TimePickerProps } from '../time-picker';
import { tuple } from '../_util/type';

export interface PickerProps {
  id?: number | string;
  name?: string;
  prefixCls?: string;
  inputPrefixCls?: string;
  format?: string | string[];
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
  suffixIcon?: React.ReactNode;
  style?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  dropdownClassName?: string;
  locale?: any;
  size?: 'large' | 'small' | 'default';
  getCalendarContainer?: (triggerNode: Element) => HTMLElement;
  open?: boolean;
  onOpenChange?: (status: boolean) => void;
  disabledDate?: (current: moment.Moment | undefined) => boolean;
  dateRender?: (current: moment.Moment, today: moment.Moment) => React.ReactNode;
}

export interface SinglePickerProps {
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  defaultPickerValue?: moment.Moment;
  renderExtraFooter?: (mode: 'date' | 'month' | 'year' | 'decade') => React.ReactNode;
  onChange?: (date: moment.Moment, dateString: string) => void;
}

const DatePickerModes = tuple('time', 'date', 'month', 'year');
export type DatePickerMode = (typeof DatePickerModes)[number];

export interface DatePickerProps extends PickerProps, SinglePickerProps {
  className?: string;
  showTime?: TimePickerProps | boolean;
  showToday?: boolean;
  open?: boolean;
  disabledTime?: (
    current: moment.Moment | undefined,
  ) => {
    disabledHours?: () => number[];
    disabledMinutes?: () => number[];
    disabledSeconds?: () => number[];
  };
  onOpenChange?: (status: boolean) => void;
  onPanelChange?: (value: moment.Moment | undefined, mode: DatePickerMode) => void;
  onOk?: (selectedTime: moment.Moment) => void;
  placeholder?: string;
  mode?: DatePickerMode;
}

export interface MonthPickerProps extends PickerProps, SinglePickerProps {
  className?: string;
  placeholder?: string;
}

export type RangePickerValue =
  | undefined[]
  | [moment.Moment]
  | [undefined, moment.Moment]
  | [moment.Moment, moment.Moment];
export type RangePickerPresetRange = RangePickerValue | (() => RangePickerValue);

export interface RangePickerProps extends PickerProps {
  className?: string;
  value?: RangePickerValue;
  defaultValue?: RangePickerValue;
  defaultPickerValue?: RangePickerValue;
  onChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  onCalendarChange?: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  onOk?: (selectedTime: RangePickerPresetRange) => void;
  showTime?: TimePickerProps | boolean;
  ranges?: {
    [range: string]: RangePickerPresetRange;
  };
  placeholder?: [string, string];
  mode?: string | string[];
  separator?: React.ReactNode;
  disabledTime?: (
    current: moment.Moment | undefined,
    type: string,
  ) => {
    disabledHours?: () => number[];
    disabledMinutes?: () => number[];
    disabledSeconds?: () => number[];
  };
  onPanelChange?: (value?: RangePickerValue, mode?: string | string[]) => void;
  renderExtraFooter?: () => React.ReactNode;
}

export interface WeekPickerProps extends PickerProps, SinglePickerProps {
  className?: string;
  placeholder?: string;
}

export interface DatePickerDecorator extends React.ClassicComponentClass<DatePickerProps> {
  RangePicker: React.ClassicComponentClass<RangePickerProps>;
  MonthPicker: React.ClassicComponentClass<MonthPickerProps>;
  WeekPicker: React.ClassicComponentClass<WeekPickerProps>;
}
