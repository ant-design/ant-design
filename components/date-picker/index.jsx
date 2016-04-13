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

      const timePicker = this.props.showTime ? (<TimePicker
        prefixCls="ant-time-picker"
        placeholder={locale.timePickerLocale.placeholder}
        locale={locale.timePickerLocale}
        transitionName="slide-up" />)
        : null;

      const disabledTime = this.props.showTime ? this.props.disabledTime : null;

      const calendarClassName = classNames({
        ['ant-calendar-time']: this.props.showTime,
        ['ant-calendar-month']: MonthCalendar === TheCalendar,
      });

      let pickerChangeHandler = {
        onChange: this.handleChange,
      };

      let calendarHandler = {
        onOk: this.handleChange,
      };

      if (this.props.showTime) {
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
          formatter={this.getFormatter()}
          disabledDate={this.props.disabledDate}
          disabledTime={disabledTime}
          locale={locale.lang}
          timePicker={timePicker}
          defaultValue={defaultCalendarValue}
          dateInputPlaceholder={placeholder}
          prefixCls="ant-calendar"
          className={calendarClassName}
          {...calendarHandler} />
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

      // default width for showTime
      const pickerStyle = {};
      if (this.props.showTime) {
        pickerStyle.width = 180;
      }

      return (
        <span className={pickerClass} style={{ ...pickerStyle, ...this.props.style }}>
          <DatePicker
            transitionName={this.props.transitionName}
            disabled={this.props.disabled}
            calendar={calendar}
            value={this.state.value}
            prefixCls="ant-calendar-picker-container"
            style={this.props.popupStyle}
            align={this.props.align}
            getCalendarContainer={this.props.getCalendarContainer}
            onOpen={this.toggleOpen}
            onClose={this.toggleOpen}
            {...pickerChangeHandler}
          >
            {
              ({ value }) => {
                return (
                  <span>
                    <input
                      disabled={this.props.disabled}
                      onChange={this.handleInputChange}
                      value={value && this.getFormatter().format(value)}
                      placeholder={placeholder}
                      className={`ant-calendar-picker-input ant-input${sizeClass}`} />
                    <span className="ant-calendar-picker-icon" />
                  </span>
                );
              }
            }
          </DatePicker>
        </span>
      );
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
