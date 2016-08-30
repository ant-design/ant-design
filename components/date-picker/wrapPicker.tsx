import React from 'react';
import { PropTypes } from 'react';
import moment from 'moment';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import classNames from 'classnames';
import defaultLocale from './locale/zh_CN';
import assign from 'object-assign';

export default function wrapPicker(Picker, defaultFormat?) {
  const PickerWrapper = React.createClass({
    getDefaultProps() {
      return {
        format: defaultFormat || 'YYYY-MM-DD',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange() {
        },
        onOk() {
        },
        toggleOpen() {
        },
        locale: {},
        align: {
          offset: [0, -9],
        },
      };
    },

    contextTypes: {
      antLocale: PropTypes.object,
    },

    getLocale() {
      const props = this.props;
      let locale = defaultLocale;
      const context = this.context;
      if (context.antLocale && context.antLocale.DatePicker) {
        locale = context.antLocale.DatePicker;
      }
      // 统一合并为完整的 Locale
      const result = assign({}, locale, props.locale);
      result.lang = assign({}, locale.lang, props.locale.lang);
      return result;
    },

    getFormatter() {
      const format = this.props.format;
      return {
        format(value) {
          return moment(value).format(format);
        },
      };
    },

    parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return moment(value, this.props.format);
        } else if (value instanceof Date) {
          return moment(value);
        }
      }
      return value;
    },

    toggleOpen ({open}) {
      this.props.toggleOpen({open});
    },

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
        format: timeFormat || 'HH:mm:ss',
        showSecond: timeFormat && timeFormat.indexOf('ss') >= 0,
        showHour: timeFormat && timeFormat.indexOf('HH') >= 0,
      };
      const timePicker = props.showTime ? (
        <TimePickerPanel
          {...rcTimePickerProps}
          {...props.showTime}
          prefixCls="ant-calendar-time-picker"
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
    },
  });
  return PickerWrapper;
}
