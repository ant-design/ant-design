import React from 'react';
import moment from 'moment';
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
  onValueChange?: (value) => void;
  onTypeChange?: (type: string) => void;
  value: any;
}

export default class Header extends React.Component<HeaderProps, any> {
  static defaultProps = {
    prefixCls: `${PREFIX_CLS}-header`,
    yearSelectOffset: 10,
    yearSelectTotal: 20,
  };

  getYearSelectElement(year) {
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

  getMonthSelectElement(month, months) {
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
      >
        {options}
      </Select>
    );
  }

  onYearChange = (year) => {
    const newValue = this.props.value.clone();
    newValue.year(parseInt(year, 10));

    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  onMonthChange = (month) => {
    const newValue = this.props.value.clone();
    newValue.month(parseInt(month, 10));
    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  onTypeChange = (e) => {
    const onTypeChange = this.props.onTypeChange;
    if (onTypeChange) {
      onTypeChange(e.target.value);
    }
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
      <div className={`${prefixCls}-header`}>
        {yearSelect}
        {monthSelect}
        {typeSwitch}
      </div>
    );
  }
}
