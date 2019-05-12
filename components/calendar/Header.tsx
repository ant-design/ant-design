import * as React from 'react';
import * as moment from 'moment';
import Select from '../select';
import { Group, Button, RadioChangeEvent } from '../radio';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
const Option = Select.Option;

type yearType = {
  index: number;
  suffix: string;
};

type monthType = {
  month: number;
  index: number;
};

type RenderHeader = {
  yearSelect: React.ReactNode;
  monthSelect: React.ReactNode;
  typeSwitch: React.ReactNode;
  typeChange: (e: RadioChangeEvent) => void;
  monthChange: (month: string) => void;
  yearChange: (year: string) => void;
  months: monthType[];
  years: yearType[];
  ref: (node: HTMLDivElement) => void;
  type?: string;
};

export interface HeaderProps {
  prefixCls?: string;
  locale?: any;
  fullscreen?: boolean;
  yearSelectOffset?: number;
  yearSelectTotal?: number;
  type?: string;
  onValueChange?: (value: moment.Moment) => void;
  onTypeChange?: (type: string) => void;
  value: any;
  validRange?: [moment.Moment, moment.Moment];
  renderHeader?: (returnData: RenderHeader) => React.ReactNode;
}

export default class Header extends React.Component<HeaderProps, any> {
  static defaultProps = {
    yearSelectOffset: 10,
    yearSelectTotal: 20,
  };

  private calenderHeaderNode: HTMLDivElement;

  private years: yearType[] = [];

  private months: monthType[] = [];

  clearMonthsYears() {
    this.months = [];
    this.years = [];
  }

  getYearSelectElement(prefixCls: string, year: number) {
    const { yearSelectOffset, yearSelectTotal, locale, fullscreen, validRange } = this.props;
    let start = year - (yearSelectOffset as number);
    let end = start + (yearSelectTotal as number);
    if (validRange) {
      start = validRange[0].get('year');
      end = validRange[1].get('year') + 1;
    }
    const suffix = locale.year === '年' ? '年' : '';
    const options: React.ReactElement<any>[] = [];
    for (let index = start; index < end; index++) {
      this.years.push({
        index,
        suffix,
      });
      options.push(<Option key={`${index}`}>{index + suffix}</Option>);
    }
    return (
      <Select
        size={fullscreen ? 'default' : 'small'}
        dropdownMatchSelectWidth={false}
        className={`${prefixCls}-year-select`}
        onChange={this.onYearChange}
        value={String(year)}
        getPopupContainer={() => this.calenderHeaderNode}
      >
        {options}
      </Select>
    );
  }

  getMonthsLocale(value: moment.Moment) {
    const current = value.clone();
    const localeData = value.localeData();
    const months: any[] = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }
    return months;
  }

  getMonthSelectElement(prefixCls: string, month: number, months: number[]) {
    const { fullscreen, validRange, value } = this.props;
    const options: React.ReactElement<any>[] = [];
    let start = 0;
    let end = 12;
    if (validRange) {
      const [rangeStart, rangeEnd] = validRange;
      const currentYear = value.get('year');
      if (rangeEnd.get('year') === currentYear) {
        end = rangeEnd.get('month') + 1;
      }
      if (rangeStart.get('year') === currentYear) {
        start = rangeStart.get('month');
      }
    }

    for (let index = start; index < end; index++) {
      this.months.push({
        month: months[index],
        index,
      });
      options.push(<Option key={`${index}`}>{months[index]}</Option>);
    }
    return (
      <Select
        size={fullscreen ? 'default' : 'small'}
        dropdownMatchSelectWidth={false}
        className={`${prefixCls}-month-select`}
        value={String(month)}
        onChange={this.onMonthChange}
        getPopupContainer={() => this.calenderHeaderNode}
      >
        {options}
      </Select>
    );
  }

  onYearChange = (year: string) => {
    this.clearMonthsYears();
    const { value, validRange } = this.props;
    const newValue = value.clone();
    newValue.year(parseInt(year, 10));
    // switch the month so that it remains within range when year changes
    if (validRange) {
      const [start, end] = validRange;
      const newYear = newValue.get('year');
      const newMonth = newValue.get('month');
      if (newYear === end.get('year') && newMonth > end.get('month')) {
        newValue.month(end.get('month'));
      }
      if (newYear === start.get('year') && newMonth < start.get('month')) {
        newValue.month(start.get('month'));
      }
    }

    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  onMonthChange = (month: string) => {
    this.clearMonthsYears();
    const newValue = this.props.value.clone();
    newValue.month(parseInt(month, 10));
    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  onTypeChange = (e: RadioChangeEvent) => {
    this.clearMonthsYears();
    const onTypeChange = this.props.onTypeChange;
    if (onTypeChange) {
      onTypeChange(e.target.value);
    }
  };

  getCalenderHeaderNode = (node: HTMLDivElement) => {
    this.calenderHeaderNode = node;
  };

  renderHeader = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, type, value, locale, fullscreen } = this.props;
    const prefixCls = getPrefixCls('fullcalendar', customizePrefixCls);
    const yearSelect = this.getYearSelectElement(prefixCls, value.year());
    const monthSelect =
      type === 'month'
        ? this.getMonthSelectElement(prefixCls, value.month(), this.getMonthsLocale(value))
        : null;
    const size = fullscreen ? 'default' : 'small';
    const typeSwitch = (
      <Group onChange={this.onTypeChange} value={type} size={size}>
        <Button value="month">{locale.month}</Button>
        <Button value="year">{locale.year}</Button>
      </Group>
    );
    if (this.props.renderHeader) {
      if (typeof this.props.renderHeader === 'function') {
        return this.props.renderHeader({
          yearSelect,
          monthSelect,
          typeSwitch,
          type,
          typeChange: this.onTypeChange,
          monthChange: this.onMonthChange,
          yearChange: this.onYearChange,
          months: this.months,
          years: this.years,
          ref: this.getCalenderHeaderNode,
        });
      }
      console.warn('Calendar renderHeader props must be function');
    }
    return (
      <div className={`${prefixCls}-header`} ref={this.getCalenderHeaderNode}>
        {yearSelect}
        {monthSelect}
        {typeSwitch}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderHeader}</ConfigConsumer>;
  }
}
