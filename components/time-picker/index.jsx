import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import defaultLocale from './locale/zh_CN';
import classNames from 'classnames';
import GregorianCalendar from 'gregorian-calendar';

export default class TimePicker extends React.Component {
  static defaultProps = {
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
  }

  static contextTypes = {
    antLocale: React.PropTypes.object,
  }

  getFormatter() {
    return new DateTimeFormat(this.props.format, this.getLocale().format);
  }

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
  }

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
  }

  handleChange = (value) => {
    this.props.onChange(
      value ? new Date(value.getTime()) : null,
      value ? this.getFormatter().format(value) : '',
    );
  }

  getLocale() {
    let locale = defaultLocale;
    if (this.context.antLocale && this.context.antLocale.TimePicker) {
      locale = this.context.antLocale.TimePicker;
    }
    // 统一合并为完整的 Locale
    return { ...locale, ...this.props.locale };
  }

  render() {
    const locale = this.getLocale();
    const props = { ...this.props };
    props.placeholder = ('placeholder' in this.props)
      ? props.placeholder : locale.placeholder;
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
      <RcTimePicker
        {...props}
        className={className}
        locale={locale}
        formatter={this.getFormatter()}
        onChange={this.handleChange}
      />
    );
  }
}
