import React from 'react';
import RcCalendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import GregorianCalendar from 'gregorian-calendar';
import RangePicker from './RangePicker';
import PickerMixin from './PickerMixin';
import Calendar from './Calendar';
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
        },
        onOk() {
        },
        locale: {},
        align: {
          offset: [0, -9],
        },
        open: false,
      };
    },
    getInitialState() {
      return {
        value: this.parseDateFromValue(this.props.value || this.props.defaultValue)
      };
    },
    mixins: [PickerMixin],
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
      this.props.onChange(timeValue, value ? this.getFormatter().format(value) : '');
    },
    render() {
      const props = this.props;
      const locale = this.getLocale();
      // 以下两行代码
      // 给没有初始值的日期选择框提供本地化信息
      // 否则会以周日开始排
      let defaultCalendarValue = new GregorianCalendar(locale);
      defaultCalendarValue.setTime(Date.now());

      const placeholder = ('placeholder' in props)
        ? props.placeholder : locale.lang.placeholder;

      const timePicker = props.showTime ? (<TimePicker
        prefixCls="ant-time-picker"
        placeholder={locale.lang.timePlaceholder}
        transitionName="slide-up" />)
        : null;

      const disabledTime = props.showTime ? props.disabledTime : null;

      const calendarClassName = classNames({
        ['ant-calendar-time']: props.showTime,
        ['ant-calendar-month']: MonthCalendar === TheCalendar,
      });

      let pickerChangeHandler = {
        onChange: this.handleChange,
      };

      let calendarHandler = {
        onOk: this.handleChange,
      };

      if (props.showTime) {
        pickerChangeHandler.onChange = (value) => {
          // Click clear button
          if (value === null) {
            this.handleChange(value);
          }
        };
      } else {
        calendarHandler = {};
      }

      const calendar = (
        <TheCalendar
          disabledDate={props.disabledDate}
          disabledTime={disabledTime}
          locale={locale.lang}
          timePicker={timePicker}
          defaultValue={defaultCalendarValue}
          dateInputPlaceholder={placeholder}
          prefixCls="ant-calendar"
          className={calendarClassName}
          {...calendarHandler} />
      );

      const pickerClass = classNames({
        'ant-calendar-picker': true,
        'ant-calendar-picker-open': this.state.open,
      });

      const inputClass = classNames({
        'ant-calendar-picker-input': true,
        'ant-input': true,
        'ant-input-lg': props.size === 'large',
        'ant-input-sm': props.size === 'small',
      });

      // default width for showTime
      const pickerStyle = {};
      if (props.showTime) {
        pickerStyle.width = 180;
      }

      return (
        <span className={pickerClass} style={{ ...pickerStyle, ...props.style }}>
          <RcDatePicker
            transitionName={props.transitionName}
            disabled={props.disabled}
            calendar={calendar}
            value={this.state.value}
            prefixCls="ant-calendar-picker-container"
            style={props.popupStyle}
            align={props.align}
            getCalendarContainer={props.getCalendarContainer}
            onOpen={this.toggleOpen}
            onClose={this.toggleOpen}
            {...pickerChangeHandler}
          >
            {
              ({ value }) => {
                return (
                  <span>
                    <input
                      disabled={props.disabled}
                      onChange={this.handleInputChange}
                      value={value && this.getFormatter().format(value)}
                      placeholder={placeholder}
                      className={inputClass} />
                    <span className="ant-calendar-picker-icon" />
                  </span>
                );
              }
            }
          </RcDatePicker>
        </span>
      );
    }
  });
}

const DatePicker = createPicker(RcCalendar);
const MonthPicker = createPicker(MonthCalendar, 'yyyy-MM');

DatePicker.Calendar = Calendar;
DatePicker.RangePicker = RangePicker;
DatePicker.MonthPicker = MonthPicker;

export default DatePicker;
