require('rc-calendar/assets/index.css');
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var GregorianCalendar = require('gregorian-calendar');
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');
var CalendarLocale = require('rc-calendar/lib/locale/zh-cn');
var DateTimeFormat = require('gregorian-calendar-format');

module.exports = React.createClass({
  getInitialState: function () {
    var value = new GregorianCalendar(zhCn);
    value.setTime(Date.now());
    return {
      time: Date.now(),
      showTime: true,
      value: value
    };
  },
  getDefaultProps: function () {
    return {
      format: 'yyyy-MM-dd'
    };
  },
  render: function () {
    var state = this.state;
    var formatter = new DateTimeFormat(this.props.format);
    var calendar = (
      <Calendar
      locale={CalendarLocale}
      orient={['top', 'left']}
      showTime={this.state.showTime} showClear={true} />
      );
      return (
        <DatePicker
          formatter={formatter} calendar={calendar}
          value={this.state.value} onChange={this.handleChange}>
          <input type="text" className="datepicker-input" />
        </DatePicker>
      );
  }
});
