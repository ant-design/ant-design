var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var GregorianCalendar = require('gregorian-calendar');
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');
var CalendarLocale = require('rc-calendar/lib/locale/zh-cn');
var DateTimeFormat = require('gregorian-calendar-format');
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
    var props = this.props;
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
      showClear={false} />
    );
    return (
      <DatePicker
        trigger={<span className="rc-calendar-picker-icon" />}
        calendar={calendar}
        formatter={new DateTimeFormat(this.props.format)}
        value={this.state.value}
        onChange={this.props.onSelect}>
        <input placeholder={this.props.placeholder} className="rc-calendar-picker-input" />
      </DatePicker>
    );
  }
});
