import React from 'react';
import Calendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import Datepicker from 'rc-calendar/lib/Picker';
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
// 否则会以周日开始排
let defaultCalendarValue = new GregorianCalendar(zhCn);
defaultCalendarValue.setTime(Date.now());

function createPicker(TheCalendar) {
  return React.createClass({
    getDefaultProps() {
      return {
        format: 'yyyy-MM-dd',
        placeholder: '请选择日期',
        transitionName: 'slide-up',
        onSelect: null, //向前兼容
        calendarStyle: {},
        onChange() {
        }  //onChange可用于Validator
      };
    },
    getInitialState() {
      return {
        value: this.parseDateFromValue(this.props.value)
      };
    },
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: this.parseDateFromValue(nextProps.value)
        });
      }
    },
    getFormatter() {
      const formats = this.formats = this.formats || {};
      const format = this.props.format;
      if (formats[format]) {
        return formats[format];
      }
      formats[format] = new DateTimeFormat(format);
      return formats[format];
    },
    parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return new DateTimeFormat(this.props.format).parse(value, zhCn);
        } else if (value instanceof Date) {
          let date = new GregorianCalendar(zhCn);
          date.setTime(value);
          return date;
        }
      }
      return null;
    },
    handleInputChange() {},
    handleChange(v) {
      this.setState({
        value: v
      });
      let timeValue = null;
      if (v) {
        timeValue = new Date(v.getTime());
      }
      //onSelect为向前兼容.
      if (this.props.onSelect) {
        require('util-deprecate')(this.props.onSelect, 'onSelect property of Datepicker is deprecated, use onChange instead')(timeValue);
      }
      this.props.onChange(timeValue);
    },
    render() {
      const calendar = (
        <TheCalendar
          style={this.props.calendarStyle}
          disabledDate={this.props.disabledDate}
          locale={CalendarLocale}
          defaultValue={defaultCalendarValue}
          showTime={this.props.showTime}
          prefixCls="ant-calendar"
          showOk={this.props.showTime}
          showClear={false} />
      );
      let sizeClass = '';
      if (this.props.size === 'large') {
        sizeClass = ' ant-input-lg';
      } else if (this.props.size === 'small') {
        sizeClass = ' ant-input-sm';
      }
      let defaultValue = this.parseDateFromValue(this.props.defaultValue);
      return (
        <Datepicker
          transitionName={this.props.transitionName}
          disabled={this.props.disabled}
          calendar={calendar}
          value={this.state.value}
          defaultValue={defaultValue}
          prefixCls="ant-calendar-picker"
          style={this.props.style}
          onChange={this.handleChange}>
          {
            ({value}) => {
              return ([<input
                disabled={this.props.disabled}
                onChange={this.handleInputChange}
                value={value && this.getFormatter().format(value)}
                placeholder={this.props.placeholder}
                className={'ant-calendar-picker-input ant-input' + sizeClass} />,
                <span className="ant-calendar-picker-icon" />]);
            }
          }
        </Datepicker>
      );
    }
  });
}

const AntDatePicker = createPicker(Calendar);
const AntMonthPicker = createPicker(MonthCalendar);

const AntCalendar = React.createClass({
  getDefaultProps() {
    return {
      locale: CalendarLocale,
      prefixCls: 'ant-calendar',
    };
  },
  render() {
    return <Calendar {...this.props} />;
  }
});

AntDatePicker.Calendar = AntCalendar;
AntDatePicker.MonthPicker = AntMonthPicker;

export default AntDatePicker;
