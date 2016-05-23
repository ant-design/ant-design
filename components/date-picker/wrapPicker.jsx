import React, { PropTypes } from 'react';
import TimePicker from 'rc-time-picker';
import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import classNames from 'classnames';
import defaultLocale from './locale/zh_CN';

export default function wrapPicker(Picker, defaultFormat) {
  return class PickerWrapper extends React.Component {
    static defaultProps = {
      format: defaultFormat || 'yyyy-MM-dd',
      transitionName: 'slide-up',
      popupStyle: {},
      onChange() {},
      onOk() {},
      toggleOpen() {},
      locale: {},
      align: {
        offset: [0, -9],
      },
      open: false,
    }

    static contextTypes = {
      antLocale: PropTypes.object,
    }

    constructor(props) {
      super(props);

      this.state = {};
    }

    // remove input readonly warning
    handleInputChange() {}

    getLocale() {
      const props = this.props;
      let locale = defaultLocale;
      const context = this.context;
      if (context.antLocale && context.antLocale.DatePicker) {
        locale = context.antLocale.DatePicker;
      }
      // 统一合并为完整的 Locale
      const result = { ...locale, ...props.locale };
      result.lang = { ...locale.lang, ...props.locale.lang };
      return result;
    }

    getFormatter = () => {
      const format = this.props.format;
      const formatter = new DateTimeFormat(format, this.getLocale().lang.format);
      return formatter;
    }

    parseDateFromValue = (value) => {
      if (value) {
        if (typeof value === 'string') {
          return this.getFormatter().parse(value, { locale: this.getLocale() });
        } else if (value instanceof Date) {
          let date = new GregorianCalendar(this.getLocale());
          date.setTime(+value);
          return date;
        }
      }
      return value;
    }

    toggleOpen = (e) => {
      this.setState({
        open: e.open,
      });
      this.props.toggleOpen(e);
    }

    render() {
      const props = this.props;
      const state = this.state;
      const pickerClass = classNames({
        'ant-calendar-picker': true,
        'ant-calendar-picker-open': state.open,
      });
      const pickerInputClass = classNames({
        'ant-calendar-range-picker': true,
        'ant-input': true,
        'ant-input-lg': props.size === 'large',
        'ant-input-sm': props.size === 'small',
      });

      const locale = this.getLocale();

      const timeFormat = props.showTime && props.showTime.format;
      const rcTimePickerProps = {
        formatter: new DateTimeFormat(timeFormat || 'HH:mm:ss', locale.timePickerLocale.format),
        showSecond: timeFormat && timeFormat.indexOf('ss') >= 0,
        showHour: timeFormat && timeFormat.indexOf('HH') >= 0,
      };
      const timePicker = props.showTime ? (
        <TimePicker
          {...rcTimePickerProps}
          {...props.showTime}
          prefixCls="ant-time-picker"
          placeholder={locale.timePickerLocale.placeholder}
          locale={locale.timePickerLocale}
          transitionName="slide-up"
          />
      ) : null;

      return (
        <Picker
          {...this.props}
          pickerClass={pickerClass}
          pickerInputClass={pickerInputClass}
          locale={locale}
          timePicker={timePicker}
          toggleOpen={this.toggleOpen}
          handleInputChange={this.handleInputChange}
          getFormatter={this.getFormatter}
          parseDateFromValue={this.parseDateFromValue}
        />
      );
    }
  };
}
