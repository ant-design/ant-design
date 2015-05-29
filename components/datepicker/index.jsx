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
      value: value
    };
  },
  getDefaultProps: function () {
    return {
      format: 'yyyy-MM-dd'
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
      showClear={true} />
      );
      return (
        <DatePicker
          trigger={<span className="rc-calendar-picker-icon" />}
          calendar={calendar}
          formatter={new DateTimeFormat(this.props.format)}
          value={this.state.value}
          onChange={this.props.onSelect}>
          <input className="rc-calendar-picker-input" />
        </DatePicker>
      );
  }
});
