import React from 'react';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import GregorianCalendar from 'gregorian-calendar';
import classNames from 'classnames';

export default function createPicker(TheCalendar) {
  return class CalenderWrapper extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: this.props.parseDateFromValue(this.props.value || this.props.defaultValue),
      };
    }

    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.parseDateFromValue(nextProps.value),
        });
      }
    }

    handleChange = (value) => {
      const props = this.props;
      if (!('value' in props)) {
        this.setState({ value });
      }
      const timeValue = value ? new Date(value.getTime()) : null;
      props.onChange(timeValue, value ? props.getFormatter().format(value) : '');
    }

    render() {
      const props = this.props;
      const locale = props.locale;
      // 以下两行代码
      // 给没有初始值的日期选择框提供本地化信息
      // 否则会以周日开始排
      let defaultCalendarValue = new GregorianCalendar(locale);
      defaultCalendarValue.setTime(Date.now());

      const placeholder = ('placeholder' in props)
        ? props.placeholder : locale.lang.placeholder;

      const disabledTime = props.showTime ? props.disabledTime : null;

      const calendarClassName = classNames({
        'ant-calendar-time': props.showTime,
        'ant-calendar-month': MonthCalendar === TheCalendar,
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
          formatter={props.getFormatter()}
          disabledDate={props.disabledDate}
          disabledTime={disabledTime}
          locale={locale.lang}
          timePicker={props.timePicker}
          defaultValue={defaultCalendarValue}
          dateInputPlaceholder={placeholder}
          prefixCls="ant-calendar"
          className={calendarClassName}
          {...calendarHandler} />
      );

      // default width for showTime
      const pickerStyle = {};
      if (props.showTime) {
        pickerStyle.width = 180;
      }

      return (
        <span className={props.pickerClass} style={{ ...pickerStyle, ...props.style }}>
          <RcDatePicker
            transitionName={props.transitionName}
            disabled={props.disabled}
            calendar={calendar}
            value={this.state.value}
            prefixCls="ant-calendar-picker-container"
            style={props.popupStyle}
            align={props.align}
            getCalendarContainer={props.getCalendarContainer}
            onOpen={props.toggleOpen}
            onClose={props.toggleOpen}
            {...pickerChangeHandler}
          >
            {
              ({ value }) => {
                return (
                  <span>
                    <input
                      disabled={props.disabled}
                      onChange={props.handleInputChange}
                      value={value ? props.getFormatter().format(value) : ''}
                      placeholder={placeholder}
                      className={props.pickerInputClass} />
                    <span className="ant-calendar-picker-icon" />
                  </span>
                );
              }
            }
          </RcDatePicker>
        </span>
      );
    }
  };
}
