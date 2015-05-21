require('rc-calendar/assets/index.css');
var React = require('react');
var Calendar = require('rc-calendar');
var DatePicker = Calendar.Picker;
var GregorianCalendar = require('gregorian-calendar');
var zhCn = require('gregorian-calendar/lib/locale/zh-cn');

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
  render: function () {
    var state = this.state;
    var calendar = (
      <Calendar
      orient={['top', 'left']}
      showTime={this.state.showTime} showClear={true} />
      );
      return (
        <DatePicker
          trigger={<span className="datepicker-icon" />}
          formatter={this.props.formatter} calendar={calendar}
          value={this.state.value} onChange={this.handleChange}>
          <input type="text" className="datepicker-input" />
        </DatePicker>
      );
  }
});
