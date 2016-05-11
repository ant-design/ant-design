import React, { PropTypes } from 'react';
import { PREFIX_CLS } from './Constants';
import Select from '../select';
import { Group, Button } from '../radio';
const Option = Select.Option;

function noop() {}

export default class Header extends React.Component {
  static defaultProps = {
    prefixCls: `${PREFIX_CLS}-header`,
    yearSelectOffset: 10,
    yearSelectTotal: 20,
    onValueChange: noop,
    onTypeChange: noop,
  }

  static propTypes = {
    value: PropTypes.object,
    locale: PropTypes.object,
    yearSelectOffset: PropTypes.number,
    yearSelectTotal: PropTypes.number,
    onValueChange: PropTypes.func,
    onTypeChange: PropTypes.func,
    prefixCls: PropTypes.string,
    selectPrefixCls: PropTypes.string,
    type: PropTypes.string,
  }

  getYearSelectElement(year) {
    const { yearSelectOffset, yearSelectTotal, locale, prefixCls, fullscreen } = this.props;
    const start = year - yearSelectOffset;
    const end = start + yearSelectTotal;
    const suffix = locale.year === '年' ? '年' : '';

    const options = [];
    for (let index = start; index < end; index++) {
      options.push(<Option key={`${index}`}>{index + suffix}</Option>);
    }
    return (
      <Select
        style={{ width: 75 }}
        size={fullscreen ? null : 'small'}
        dropdownMatchSelectWidth={false}
        dropdownMenuStyle={{ minWidth: 103 }}
        className={`${prefixCls}-year-select`}
        onChange={this.onYearChange}
        value={String(year)}>
        {options}
      </Select>
    );
  }

  getMonthSelectElement(month) {
    const props = this.props;
    const months = props.locale.format.months;
    const { prefixCls, fullscreen } = props;
    const options = [];

    for (let index = 0; index < 12; index++) {
      options.push(<Option key={`${index}`}>{months[index]}</Option>);
    }

    return (
      <Select
        style={{ minWidth: 70 }}
        dropdownMenuStyle={{ minWidth: 125 }}
        size={fullscreen ? null : 'small'}
        dropdownMatchSelectWidth={false}
        className={`${prefixCls}-month-select`}
        value={String(month)}
        onChange={this.onMonthChange}>
        {options}
      </Select>
    );
  }

  onYearChange = (year) => {
    const newValue = this.props.value.clone();
    newValue.setYear(parseInt(year, 10));
    this.props.onValueChange(newValue);
  }

  onMonthChange = (month) => {
    const newValue = this.props.value.clone();
    newValue.setMonth(parseInt(month, 10));
    this.props.onValueChange(newValue);
  }

  onTypeChange = (e) => {
    this.props.onTypeChange(e.target.value);
  }

  render() {
    const { type, value, prefixCls, locale } = this.props;
    const yearSelect = this.getYearSelectElement(value.getYear());
    const monthSelect = type === 'date' ? this.getMonthSelectElement(value.getMonth()) : null;
    const typeSwitch = (
      <Group onChange={this.onTypeChange} value={type}>
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
