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
    if (this.props.value) {
      var value = new GregorianCalendar(zhCn);
      value.setTime(new Date(this.props.value));
      this.setState({value: value});
    }
  },
  handleChange: function() {
    var props = this.props;
    this.props.onSelect(new Date(this.state.value.getTime()));
  },
  render: function () {
    var state = this.state;
    var formatter = new DateTimeFormat(this.props.format);
    var calendar = (
      <Calendar
      locale={CalendarLocale}
      orient={['top', 'left']}
      showClear={true} />
      );
      return (
        <DatePicker
          formatter={formatter} calendar={calendar}
          value={this.state.value} onChange={this.props.onSelect}>
          <input className="rc-calendar-picker-input"/>
        </DatePicker>
      );
  }
});
