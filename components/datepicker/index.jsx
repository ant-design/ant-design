'use strict';

import React from 'react';
import Calendar from 'rc-calendar';
const Datepicker = Calendar.Picker;

import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh-cn';
import CalendarLocale from 'rc-calendar/lib/locale/zh-cn';
import DateTimeFormat from 'gregorian-calendar-format';

// 和顶部文案保持一致
import Locale from 'gregorian-calendar-format/lib/locale/zh-cn';
Locale.shortMonths = ['1月', '2月', '3月', '4月', '5月', '6月',
                      '7月', '8月', '9月', '10月', '11月', '12月'];

// 以下两行代码
// 给没有初始值的日期选择框提供本地化信息
let defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());

export default React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },
  getDefaultProps() {
    return {
      format: 'yyyy-MM-dd',
      placeholder: '请选择日期'
    };
  },
  componentDidMount() {
    let state = {};
    if (this.props.value) {
      let value = new GregorianCalendar(zhCn);
      value.setTime(new Date(this.props.value));
      state.value = value;
    }
    state.disabled = this.props.disabled || function() {};
    this.setState(state);
  },
  handleChange() {
    this.props.onSelect(new Date(this.state.value.getTime()));
  },
  render() {
    let calendar = (
      <Calendar
      disabledDate={this.state.disabled}
      locale={CalendarLocale}
      orient={['top', 'left']}
      defaultValue={defaultCalendarValue}
      showTime={this.props.showTime}
      prefixCls="ant-calendar"
      showOk={this.props.showTime}
      showClear={false} />
    );
    return (
      <Datepicker
        trigger={<span className="ant-calendar-picker-icon" />}
        calendar={calendar}
        formatter={new DateTimeFormat(this.props.format)}
        value={this.state.value}
        prefixCls="ant-calendar-picker"
        onChange={this.props.onSelect}>
        <input placeholder={this.props.placeholder} className="ant-calendar-picker-input" />
      </Datepicker>
    );
  }
});
