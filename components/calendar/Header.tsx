import * as React from 'react';
import * as moment from 'moment';
import { PREFIX_CLS } from './Constants';
import Select from '../select';
import { Group, Button } from '../radio';
const Option = Select.Option;

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
}

export default class Header extends React.Component<HeaderProps, any> {
  static defaultProps = {
    prefixCls: `${PREFIX_CLS}-header`,
    yearSelectOffset: 10,
    yearSelectTotal: 20,
  };

  private calenderHeaderNode: HTMLDivElement;

  getYearSelectElement(year: number) {
    const { yearSelectOffset, yearSelectTotal, locale, prefixCls, fullscreen } = this.props;
    const start = year - (yearSelectOffset as number);
    const end = start + (yearSelectTotal as number);
    const suffix = locale.year === '年' ? '年' : '';

    const options: React.ReactElement<any>[] = [];
    for (let index = start; index < end; index++) {
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

  getMonthSelectElement(month: number, months: number[]) {
    const props = this.props;
    const { prefixCls, fullscreen } = props;
    const options: React.ReactElement<any>[] = [];

    for (let index = 0; index < 12; index++) {
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
    const newValue = this.props.value.clone();
    newValue.year(parseInt(year, 10));

    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  onMonthChange = (month: string) => {
    const newValue = this.props.value.clone();
    newValue.month(parseInt(month, 10));
    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onTypeChange = this.props.onTypeChange;
    if (onTypeChange) {
      onTypeChange(e.target.value);
    }
  }

  getCalenderHeaderNode = (node: HTMLDivElement) => {
    this.calenderHeaderNode = node;
  }

  render() {
    const { type, value, prefixCls, locale, fullscreen } = this.props;
    const yearSelect = this.getYearSelectElement(value.year());
    const monthSelect = type === 'date' ?
      this.getMonthSelectElement(value.month(), this.getMonthsLocale(value)) : null;
    const size = (fullscreen ? 'default' : 'small') as any;
    const typeSwitch = (
      <Group onChange={this.onTypeChange} value={type} size={size}>
        <Button value="date">{locale.month}</Button>
        <Button value="month">{locale.year}</Button>
      </Group>
    );

    return (
      <div className={`${prefixCls}-header`} ref={this.getCalenderHeaderNode}>
        {yearSelect}
        {monthSelect}
        {typeSwitch}
      </div>
    );
  }
}
