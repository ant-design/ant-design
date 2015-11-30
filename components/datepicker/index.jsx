import React from 'react';
import Calendar from 'rc-calendar';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import Datepicker from 'rc-calendar/lib/Picker';
import GregorianCalendar from 'gregorian-calendar';
import defaultLocale from './locale/zh_CN';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import DateTimeFormat from 'gregorian-calendar-format';
import objectAssign from 'object-assign';

function createPicker(TheCalendar, defaultFormat) {
  return React.createClass({
    getDefaultProps() {
      return {
        format: defaultFormat || 'yyyy-MM-dd',
        transitionName: 'slide-up',
        popupStyle: {},
        onSelect: null, // 向前兼容
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
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: this.parseDateFromValue(nextProps.value)
        });
      }
    },
    getLocale() {
      // 统一合并为完整的 Locale
      let locale = objectAssign({}, defaultLocale, this.props.locale);
      locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
      return locale;
    },
    getFormatter() {
      const formats = this.formats = this.formats || {};
      const format = this.props.format;
      if (formats[format]) {
        return formats[format];
      }
      formats[format] = new DateTimeFormat(format, this.getLocale().lang.format);
      return formats[format];
    },
    parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return this.getFormatter().parse(value, {locale: this.getLocale()});
        } else if (value instanceof Date) {
          let date = new GregorianCalendar(this.getLocale());
          date.setTime(value);
          return date;
        }
      } else if (value === null) {
        return value;
      }
      return undefined;
    },
    // remove input readonly warning
    handleInputChange() {
    },
    toggleOpen(e) {
      this.setState({
        open: e.open
      });
    },
    handleChange(value) {
      this.setState({value});
      const timeValue = value ? new Date(value.getTime()) : null;
      // onSelect 为向前兼容.
      if (this.props.onSelect) {
        require('util-deprecate')(
          this.props.onSelect,
          'onSelect property of Datepicker is deprecated, use onChange instead'
        )(timeValue);
      }
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
      const calendar = (
        <TheCalendar
          disabledDate={this.props.disabledDate}
          locale={locale.lang}
          defaultValue={defaultCalendarValue}
          dateInputPlaceholder={placeholder}
          showTime={this.props.showTime}
          prefixCls="ant-calendar"
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
        <Datepicker
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
        </Datepicker>
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
AntDatePicker.MonthPicker = AntMonthPicker;

export default AntDatePicker;
