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
      onChange() {},  // onChange 可用于 Validator
      locale: {},
      align: {
        offset: [0, -8],
      },
      open: false,
      disabled: false,
      hourOptions: undefined,
      minuteOptions: undefined,
      secondOptions: undefined,
    };
  },

  render() {
    const { defaultValue, format, placeholder, align, disabled, hourOptions, minuteOptions, secondOptions } = this.props;
    const prefixCls = 'ant-timepicker';
    const formatter = new DateTimeFormat(format);

    let showValue = undefined;
    if (defaultValue) {
      showValue = formatter.parse(defaultValue, {
        locale: defaultValue.locale,
        obeyCount: true,
      });
    }

    return (
      <TimePicker prefixCls={prefixCls} locale={TimePickerLocale} formatter={formatter} hourOptions={hourOptions} minuteOptions={minuteOptions} secondOptions={secondOptions} disabled={disabled} align={align} placeholder={placeholder} value={showValue} />
    );
  }

});

export default AntTimepicker;
