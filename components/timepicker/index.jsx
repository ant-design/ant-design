import React from 'react';
import DateTimeFormat from 'gregorian-calendar-format';
import TimePicker from 'rc-time-picker/lib/TimePicker';

// import defaultLocale from './locale';
import TimePickerLocale from 'rc-time-picker/lib/locale/zh_CN';

const AntTimepicker = React.createClass({
  getDefaultProps() {
    return {
      format: 'HH:mm:ss',
      placeholder: '请选择时间',
      prefixCls: 'ant-timepicker',
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
        locale: defaultValue.locale,
        obeyCount: true,
      });
    }
    return undefined;
  },

  render() {
    const { format } = this.props;
    const formatter = new DateTimeFormat(format);

    return (
      <TimePicker
        {...this.props}
        locale={TimePickerLocale}
        inputClassName={`ant-input ${this.getSizeClass()}`}
        formatter={formatter}
        defaultValue={this.getDefaultValue(formatter)}
      />
    );
  }

});

export default AntTimepicker;
