'use strict';

var React = require('react');
var Calendar = require('rc-calendar');
var Datepicker = Calendar.Picker;
var GregorianCalendar = require('gregorian-calendar');
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');
var CalendarLocale = require('rc-calendar/lib/locale/zh-cn');
var DateTimeFormat = require('gregorian-calendar-format');
// 和顶部文案保持一致
require('gregorian-calendar-format/lib/locale/zh-cn').shortMonths =
  ['1月', '2月', '3月', '4月', '5月', '6月',
   '7月', '8月', '9月', '10月', '11月', '12月'];
var defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());

module.exports = React.createClass({
  getInitialState: function () {
    return {
      value: ''
    };
  },
  getDefaultProps: function () {
    return {
      format: 'yyyy-MM-dd',
      placeholder: '请选择日期'
    };
  },
  componentDidMount: function () {
    var state = {};
    if (this.props.value) {
      var value = new GregorianCalendar(zhCn);
      value.setTime(new Date(this.props.value));
      state.value = value;
    }
    state.disabled = this.props.disabled || function() {};
    this.setState(state);
  },
  handleChange: function() {
    this.props.onSelect(new Date(this.state.value.getTime()));
  },
  render: function () {
    var calendar = (
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
