import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import TimePicker from 'rc-time-picker/lib/TimePicker';
import objectAssign from 'object-assign';
import defaultLocale from './locale/zh_CN';
import classNames from 'classnames';

const AntTimePicker = React.createClass({
  getDefaultProps() {
    return {
      format: 'HH:mm:ss',
      prefixCls: 'ant-time-picker',
      onChange() {},
      locale: {},
      align: {
        offset: [0, -2],
      },
      open: false,
      disabled: false,
      disabledHours: undefined,
      disabledMinutes: undefined,
      disabledSeconds: undefined,
      hideDisabledOptions: false,
      size: 'default',
      placement: 'bottomLeft',
      transitionName: 'slide-up',
    };
  },

  getFormatter() {
    return new DateTimeFormat(this.props.format);
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
  parseTimeFromValue(value) {
    if (value) {
      return this.getFormatter().parse(value, {
        locale: this.getLocale(),
        obeyCount: true,
      });
    }
    return undefined;
  },

  handleChange(value) {
    this.props.onChange(value ? new Date(value.getTime()) : null);
  },

  getLocale() {
    // 统一合并为完整的 Locale
    let locale = objectAssign({}, defaultLocale, this.props.locale);
    locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
    return locale;
  },

  render() {
    const props = objectAssign({}, this.props);
    props.placeholder = ('placeholder' in this.props)
      ? props.placeholder : this.getLocale().lang.placeholder;
    if (props.defaultValue) {
      props.defaultValue = this.parseTimeFromValue(props.defaultValue);
    } else {
      delete props.defaultValue;
    }
    if (props.value) {
      props.value = this.parseTimeFromValue(props.value);
    } else {
      delete props.value;
    }
    let className = classNames({
      [props.className]: !!props.className,
      [props.prefixCls + '-' + props.size]: true,
    });
    if (props.format.indexOf('ss') < 0) {
      props.showSecond = false;
    }
    if (props.format.indexOf('HH') < 0) {
      props.showHour = false;
    }

    return (
      <TimePicker
        {...props}
        className={className}
        gregorianCalendarLocale={this.getLocale()}
        formatter={this.getFormatter()}
        onChange={this.handleChange}
      />
    );
  }

});

export default AntTimePicker;
