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
  autoFocus?: boolean;
}

export interface SinglePickerProps {
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  defaultPickerValue?: moment.Moment;
  placeholder?: string;
  renderExtraFooter?: (mode: DatePickerMode) => React.ReactNode;
  onChange?: (date: moment.Moment | null, dateString: string) => void;
}

const DatePickerModes = tuple('time', 'date', 'month', 'year', 'decade');
export type DatePickerMode = (typeof DatePickerModes)[number];

export interface DatePickerProps extends PickerProps, SinglePickerProps {
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
  mode?: DatePickerMode;
}

export interface MonthPickerProps extends PickerProps, SinglePickerProps {
  monthCellContentRender?: (date: moment.Moment, locale: any) => React.ReactNode
}

export type RangePickerValue =
  | undefined[]
  | [moment.Moment]
  | [undefined, moment.Moment]
  | [moment.Moment, undefined]
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
  showToday?: boolean;
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
  // - currently no own props -
}

export interface DatePickerDecorator extends React.ClassicComponentClass<DatePickerProps> {
  RangePicker: React.ClassicComponentClass<RangePickerProps>;
  MonthPicker: React.ClassicComponentClass<MonthPickerProps>;
  WeekPicker: React.ClassicComponentClass<WeekPickerProps>;
}
