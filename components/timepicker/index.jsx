import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import TimePicker from 'rc-time-picker/lib/TimePicker';

import objectAssign from 'object-assign';
import defaultLocale from './locale/zh_CN';
import GregorianCalendar from 'gregorian-calendar';
import TimePickerLocale from 'rc-time-picker/lib/locale/zh_CN';

const AntTimepicker = React.createClass({

  getDefaultProps() {
    return {
      format: 'HH:mm:ss',
      placeholder: '请选择时间',
      onChange() {},  // onChange 可用于 Validator
      locale: {},
      align: {
        offset: [0, -1],
      },
      open: false,
      disabled: false,
      hourOptions: undefined,
      minuteOptions: undefined,
      secondOptions: undefined,
      size: '',
      placement: 'bottomLeft',
      transitionName: 'slide-up',
    };
  },

  getInitialState() {
    return {
      value: this.parseTimeFromValue(this.props.value || this.props.defaultValue)
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: this.parseTimeFromValue(nextProps.value)
      });
    }
  },

  /**
   * 获得输入框的 className
   */
  getSizeClass() {
    let sizeClass = '';
    if (this.props.size === 'large') {
      sizeClass = ' ant-input-lg';
    } else if (this.props.size === 'small') {
      sizeClass = ' ant-input-sm';
    }
    return sizeClass;
  },

  /**
   * 获得输入框的默认值
   */
  getDefaultValue(formatter) {
    const defaultValue = this.props.defaultValue;
    if (defaultValue) {
      return formatter.parse(defaultValue, {
        locale: this.getLocale(),
        obeyCount: true,
      });
    }
    return undefined;
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

  parseTimeFromValue(value) {
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

  render() {
    const { placeholder, align, disabled, hourOptions, minuteOptions, secondOptions, placement, transitionName, onChange } = this.props;
    const prefixCls = 'ant-timepicker';

    return (
      <TimePicker
        prefixCls={prefixCls}
        locale={TimePickerLocale}
        formatter={this.getFormatter()}
        hourOptions={hourOptions}
        minuteOptions={minuteOptions}
        secondOptions={secondOptions}
        disabled={disabled}
        align={align}
        placeholder={placeholder}
        inputClassName={`ant-input ${this.getSizeClass()}`}
        defaultValue={this.state.value}
        placement={placement}
        transitionName={transitionName}
        onChange={onChange}
      />
    );
  }

});

export default AntTimepicker;
