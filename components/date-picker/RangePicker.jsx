import React from 'react';
import GregorianCalendar from 'gregorian-calendar';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';

export default class RangePicker extends React.Component {
  static defaultProps = {
    defaultValue: [],
  }

  constructor(props) {
    super(props);
    const { value, defaultValue, parseDateFromValue } = this.props;
    const start = (value && value[0]) || defaultValue[0];
    const end = (value && value[1]) || defaultValue[1];
    this.state = {
      value: [
        parseDateFromValue(start),
        parseDateFromValue(end),
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value || [];
      const start = nextProps.parseDateFromValue(value[0]);
      const end = nextProps.parseDateFromValue(value[1]);
      this.setState({
        value: [start, end],
      });
    }
  }

  handleChange = (value) => {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({ value });
    }
    const startDate = value[0] ? new Date(value[0].getTime()) : null;
    const endDate = value[1] ? new Date(value[1].getTime()) : null;
    const startDateString = value[0] ? props.getFormatter().format(value[0]) : '';
    const endDateString = value[1] ? props.getFormatter().format(value[1]) : '';
    props.onChange([startDate, endDate], [startDateString, endDateString]);
  }

  render() {
    const props = this.props;
    const locale = props.locale;
    // 以下两行代码
    // 给没有初始值的日期选择框提供本地化信息
    // 否则会以周日开始排
    let defaultCalendarValue = new GregorianCalendar(locale);
    defaultCalendarValue.setTime(Date.now());

    const { disabledDate, showTime, getCalendarContainer,
      transitionName, disabled, popupStyle, align, style, onOk } = this.props;
    const state = this.state;

    const calendarClassName = classNames({
      'ant-calendar-time': showTime,
    });

    let pickerChangeHandler = {
      onChange: this.handleChange,
    };

    let calendarHandler = {
      onOk: this.handleChange,
    };

    if (props.timePicker) {
      pickerChangeHandler.onChange = (value) => {
        // Click clear button
        if (value === null || value.length === 0) {
          this.handleChange(value);
        }
      };
    } else {
      calendarHandler = {};
    }

    const startPlaceholder = ('startPlaceholder' in this.props)
      ? props.startPlaceholder : locale.lang.rangePlaceholder[0];
    const endPlaceholder = ('endPlaceholder' in props)
      ? props.endPlaceholder : locale.lang.rangePlaceholder[1];

    const calendar = (
      <RangeCalendar
        prefixCls="ant-calendar"
        className={calendarClassName}
        timePicker={props.timePicker}
        disabledDate={disabledDate}
        dateInputPlaceholder={[startPlaceholder, endPlaceholder]}
        locale={locale.lang}
        onOk={onOk}
        defaultValue={[defaultCalendarValue, defaultCalendarValue]}
        {...calendarHandler}
      />
    );

    return (<span className={props.pickerClass} style={style}>
      <RcDatePicker
        formatter={props.getFormatter()}
        transitionName={transitionName}
        disabled={disabled}
        calendar={calendar}
        value={state.value}
        prefixCls="ant-calendar-picker-container"
        style={popupStyle}
        align={align}
        getCalendarContainer={getCalendarContainer}
        onOpen={props.toggleOpen}
        onClose={props.toggleOpen}
        {...pickerChangeHandler}
      >
        {
          ({ value }) => {
            const start = value[0];
            const end = value[1];
            return (
              <span className={props.pickerInputClass} disabled={disabled}>
                <input
                  disabled={disabled}
                  onChange={props.handleInputChange}
                  value={start ? props.getFormatter().format(start) : ''}
                  placeholder={startPlaceholder}
                  className="ant-calendar-range-picker-input" />
                <span className="ant-calendar-range-picker-separator"> ~ </span>
                <input
                  disabled={disabled}
                  onChange={props.handleInputChange}
                  value={end ? props.getFormatter().format(end) : ''}
                  placeholder={endPlaceholder}
                  className="ant-calendar-range-picker-input" />
                <span className="ant-calendar-picker-icon" />
              </span>
            );
          }
        }
      </RcDatePicker>
    </span>);
  }
}
