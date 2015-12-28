import React from 'react';
import GregorianCalendar from 'gregorian-calendar';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';
import TimePicker from 'rc-time-picker';
import classNames from 'classnames';
import PickerMixin from './PickerMixin';

export default React.createClass({
  getDefaultProps() {
    return {
      defaultValue: [],
      format: 'yyyy-MM-dd',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
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
    const {value, defaultValue} = this.props;
    const start = (value && value[0]) || defaultValue[0];
    const end = (value && value[1]) || defaultValue[1];
    return {
      value: [
        this.parseDateFromValue(start),
        this.parseDateFromValue(end)
      ]
    };
  },
  mixins: [ PickerMixin ],
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const start = this.parseDateFromValue(nextProps.value[0]);
      const end = this.parseDateFromValue(nextProps.value[1]);
      this.setState({
        value: [start, end]
      });
    }
  },
  handleChange(value) {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const startTime = value[0] ? new Date(value[0].getTime()) : null;
    const endTime = value[1] ? new Date(value[1].getTime()) : null;
    this.props.onChange([startTime, endTime]);
  },
  render() {
    const locale = this.getLocale();
    // 以下两行代码
    // 给没有初始值的日期选择框提供本地化信息
    // 否则会以周日开始排
    let defaultCalendarValue = new GregorianCalendar(locale);
    defaultCalendarValue.setTime(Date.now());

    const {disabledDate, showTime, size, startPlaceholder, endPlaceholder,
           transitionName, disabled, popupStyle, align, style} = this.props;
    const state = this.state;

    const timePicker = showTime
      ? <TimePicker prefixCls="ant-time-picker"
          placeholder={locale.lang.timePlaceholder}
          transitionName="slide-up" />
      : null;

    const calendarClassName = classNames({
      ['ant-calendar-time']: this.props.showTime,
    });

    const calendar = <RangeCalendar prefixCls="ant-calendar"
                        className={calendarClassName}
                        timePicker={timePicker}
                        disabledDate={disabledDate}
                        dateInputPlaceholder={[startPlaceholder, endPlaceholder]}
                        locale={locale.lang}
                        defaultValue={defaultCalendarValue}
                        showClear />;

    const pickerClass = classNames({
      'ant-calendar-picker': true,
      'ant-calendar-picker-open': state.open
    });

    const pickerInputClass = classNames({
      'ant-calendar-range-picker': true,
      'ant-input': true,
      'ant-input-lg': size === 'large',
      'ant-input-sm': size === 'small',
    });

    return (<span className={pickerClass} style={style}>
      <DatePicker
        transitionName={transitionName}
        disabled={disabled}
        calendar={calendar}
        value={state.value}
        prefixCls="ant-calendar-picker-container"
        style={popupStyle}
        align={align}
        onOpen={this.toggleOpen}
        onClose={this.toggleOpen}
        onChange={this.handleChange}>
        {
          ({value}) => {
            const start = value[0];
            const end = value[1];
            return (
              <span className={pickerInputClass} disabled={disabled}>
                <input disabled={disabled}
                  onChange={this.handleInputChange}
                  value={start && this.getFormatter().format(start)}
                  placeholder={startPlaceholder}
                  className="ant-calendar-range-picker-input" />
                <span className="ant-calendar-range-picker-separator"> ~ </span>
                <input disabled={disabled}
                  onChange={this.handleInputChange}
                  value={end && this.getFormatter().format(end)}
                  placeholder={endPlaceholder}
                  className="ant-calendar-range-picker-input" />
                <span className="ant-calendar-picker-icon" />
              </span>
            );
          }
        }
      </DatePicker>
    </span>);
  }
});
