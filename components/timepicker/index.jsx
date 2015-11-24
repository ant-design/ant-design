import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import TimePicker from 'rc-time-picker/lib/TimePicker';
import objectAssign from 'object-assign';
import defaultLocale from './locale/zh_CN';

const AntTimepicker = React.createClass({
  getDefaultProps() {
    return {
      format: 'HH:mm:ss',
      prefixCls: 'ant-timepicker',
      onChange() {},
      locale: {},
      align: {
        offset: [0, -2],
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

  handleChange(value) {
    let args = null;
    if (value) {
      args = new Date(value.getTime());
    }
    this.props.onChange(args);
  },

  getLocale() {
    // 统一合并为完整的 Locale
    let locale = objectAssign({}, defaultLocale, this.props.locale);
    locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
    return locale;
  },

  render() {
    const { format } = this.props;
    const formatter = new DateTimeFormat(format);
    const placeholder = ('placeholder' in this.props)
      ? this.props.placeholder : this.getLocale().lang.placeholder;
    return (
      <TimePicker
        {...this.props}
        inputClassName={`ant-input ${this.getSizeClass()}`}
        formatter={formatter}
        defaultValue={this.getDefaultValue(formatter)}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }

});

export default AntTimepicker;
