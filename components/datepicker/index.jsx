import React from 'react';
import Calendar, {MonthCalendar, Picker as Datepicker} from 'rc-calendar';
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

function createPicker(TheCalendar) {
  return React.createClass({
    getInitialState() {
      let value;
      if (this.props.value) {
        value = new GregorianCalendar(zhCn);
        value.setTime(new Date(this.props.value).valueOf());
      }
      return {
        value: value
      };
    },
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        let value = null;
        if (nextProps.value) {
          value = new GregorianCalendar(zhCn);
          value.setTime(new Date(nextProps.value).valueOf());
        }
        this.setState({
          value: value
        });
      }
    },
    getDefaultProps() {
      return {
        format: 'yyyy-MM-dd',
        placeholder: '请选择日期',
        transitionName: 'slide-up',
        onSelect() {
        }
      };
    },
    handleChange(v) {
      this.setState({
        value: v
      });
      this.props.onSelect(new Date(v.getTime()));
    },
    render() {
      let calendar = (
        <TheCalendar
          disabledDate={this.props.disabledDate}
          locale={CalendarLocale}
          orient={['top', 'left']}
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
      let defaultValue;
      if (this.props.defaultValue) {
        defaultValue = new GregorianCalendar(zhCn);
        defaultValue.setTime(new Date(this.props.defaultValue).valueOf());
      }
      return (
        <Datepicker
          transitionName={this.props.transitionName}
          disabled={this.props.disabled}
          trigger={<span className="ant-calendar-picker-icon" />}
          calendar={calendar}
          adjustOrientOnCalendarOverflow={{x: true, y: false}}
          formatter={new DateTimeFormat(this.props.format)}
          value={this.state.value}
          defaultValue={defaultValue}
          prefixCls="ant-calendar-picker"
          style={this.props.style}
          onChange={this.handleChange}>
          <input
            placeholder={this.props.placeholder}
            className={'ant-calendar-picker-input ant-input' + sizeClass}/>
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
    return <Calendar {...this.props}/>;
  }
});

AntDatePicker.Calendar = AntCalendar;
AntDatePicker.MonthPicker = AntMonthPicker;

export default AntDatePicker;
