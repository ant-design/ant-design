import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import TimePicker from 'rc-time-picker/lib/TimePicker';
import objectAssign from 'object-assign';
import defaultLocale from './locale/zh_CN';
import classNames from 'classnames';
import GregorianCalendar from 'gregorian-calendar';

const AntTimePicker = React.createClass({
  getDefaultProps() {
    return {
      format: 'HH:mm:ss',
      prefixCls: 'ant-time-picker',
      onChange() {
      },
      locale: {},
      align: {
        offset: [0, -2],
      },
      disabled: false,
      disabledHours: undefined,
      disabledMinutes: undefined,
      disabledSeconds: undefined,
      hideDisabledOptions: false,
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
      if (typeof value === 'string') {
        return this.getFormatter().parse(value, {
          locale: this.getLocale().calendar,
          obeyCount: true,
        });
      } else if (value instanceof Date) {
        let date = new GregorianCalendar(this.getLocale().calendar);
        date.setTime(+value);
        return date;
      }
    }
    return value;
  },

  handleChange(value) {
    this.props.onChange(value ? new Date(value.getTime()) : null);
  },

  getLocale() {
    // 统一合并为完整的 Locale
    return objectAssign({}, defaultLocale, this.props.locale);
  },

  render() {
    const props = objectAssign({}, this.props);
    props.placeholder = ('placeholder' in this.props)
      ? props.placeholder : this.getLocale().placeholder;
    if (props.defaultValue) {
      props.defaultValue = this.parseTimeFromValue(props.defaultValue);
    } else {
      delete props.defaultValue;
    }
    if (props.value) {
      props.value = this.parseTimeFromValue(props.value);
    }
    let className = classNames({
      [props.className]: !!props.className,
      [`${props.prefixCls}-${props.size}`]: !!props.size,
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
        locale={this.getLocale()}
        formatter={this.getFormatter()}
        onChange={this.handleChange}
      />
    );
  }

});

export default AntTimePicker;
