import React from 'react';
import Calendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import GregorianCalendar from 'gregorian-calendar';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import AntRangePicker from './RangePicker';
import PickerMixin from './PickerMixin';
import TimePicker from 'rc-time-picker';
import classNames from 'classnames';

function createPicker(TheCalendar, defaultFormat) {
  return React.createClass({
    getDefaultProps() {
      return {
        format: defaultFormat || 'yyyy-MM-dd',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange() {
        },  // onChange 可用于 Validator
        locale: {},
        align: {
          offset: [0, -9],
        },
        open: false
      };
    },
    getInitialState() {
      return {
        value: this.parseDateFromValue(this.props.value || this.props.defaultValue)
      };
    },
    mixins: [ PickerMixin ],
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: this.parseDateFromValue(nextProps.value)
        });
      }
    },
    handleChange(value) {
      if (!('value' in this.props)) {
        this.setState({ value });
      }
      const timeValue = value ? new Date(value.getTime()) : null;
      this.props.onChange(timeValue);
    },
    render() {
      const locale = this.getLocale();
      // 以下两行代码
      // 给没有初始值的日期选择框提供本地化信息
      // 否则会以周日开始排
      let defaultCalendarValue = new GregorianCalendar(locale);
      defaultCalendarValue.setTime(Date.now());

      const placeholder = ('placeholder' in this.props)
        ? this.props.placeholder : locale.lang.placeholder;

      const timePicker = this.props.showTime
        ? <TimePicker prefixCls="ant-time-picker"
            placeholder={locale.lang.timePlaceholder}
            transitionName="slide-up" />
        : null;

      const calendarClassName = classNames({
        ['ant-calendar-time']: this.props.showTime,
      });

      const calendar = (
        <TheCalendar
          disabledDate={this.props.disabledDate}
          locale={locale.lang}
          timePicker={timePicker}
          defaultValue={defaultCalendarValue}
          dateInputPlaceholder={placeholder}
          prefixCls="ant-calendar"
          className={calendarClassName}
          showOk={this.props.showTime}
          showClear />
      );

      let sizeClass = '';
      if (this.props.size === 'large') {
        sizeClass = ' ant-input-lg';
      } else if (this.props.size === 'small') {
        sizeClass = ' ant-input-sm';
      }

      let pickerClass = 'ant-calendar-picker';
      if (this.state.open) {
        pickerClass += ' ant-calendar-picker-open';
      }

      return <span className={pickerClass}>
        <DatePicker
          transitionName={this.props.transitionName}
          disabled={this.props.disabled}
          calendar={calendar}
          value={this.state.value}
          prefixCls="ant-calendar-picker-container"
          style={this.props.popupStyle}
          align={this.props.align}
          onOpen={this.toggleOpen}
          onClose={this.toggleOpen}
          onChange={this.handleChange}>
          {
            ({value}) => {
              return (
                <span>
                  <input disabled={this.props.disabled}
                         onChange={this.handleInputChange}
                         value={value && this.getFormatter().format(value)}
                         placeholder={placeholder}
                         style={this.props.style}
                         className={'ant-calendar-picker-input ant-input' + sizeClass}/>
                  <span className="ant-calendar-picker-icon"/>
                </span>
              );
            }
          }
        </DatePicker>
      </span>;
    }
  });
}

const AntDatePicker = createPicker(Calendar);
const AntMonthPicker = createPicker(MonthCalendar, 'yyyy-MM');

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
AntDatePicker.RangePicker = AntRangePicker;
AntDatePicker.MonthPicker = AntMonthPicker;

export default AntDatePicker;
