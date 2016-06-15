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
    }

    static contextTypes = {
      antLocale: PropTypes.object,
    }

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

    toggleOpen = ({ open }) => {
      this.props.toggleOpen({ open });
    }

    render() {
      const props = this.props;
      const pickerClass = classNames({
        'ant-calendar-picker': true,
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
          {...props}
          pickerClass={pickerClass}
          pickerInputClass={pickerInputClass}
          locale={locale}
          timePicker={timePicker}
          toggleOpen={this.toggleOpen}
          getFormatter={this.getFormatter}
          parseDateFromValue={this.parseDateFromValue}
        />
      );
    }
  };
}
