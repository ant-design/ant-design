import React from 'react';
import { PropTypes } from 'react';
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
        prefixCls: 'ant-calendar',
        inputPrefixCls: 'ant-input',
      };
    },

    contextTypes: {
      antLocale: PropTypes.object,
    },

    getLocale() {
      const props = this.props;
      const context = this.context;
      let locale = defaultLocale;
      if (context.antLocale && context.antLocale.DatePicker) {
        locale = context.antLocale.DatePicker;
      }
      // 统一合并为完整的 Locale
      const result = assign({}, locale, props.locale);
      result.lang = assign({}, locale.lang, props.locale.lang);
      return result;
    },

    toggleOpen ({open}) {
      this.props.toggleOpen({open});
    },

    render() {
      const props = this.props;
      const { prefixCls, inputPrefixCls } = props;
      const pickerClass = classNames({
        [`${prefixCls}-picker`]: true,
      });
      const pickerInputClass = classNames({
        [`${prefixCls}-range-picker`]: true,
        [inputPrefixCls]: true,
        [`${inputPrefixCls}-lg`]: props.size === 'large',
        [`${inputPrefixCls}-sm`]: props.size === 'small',
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
          prefixCls={`${prefixCls}-time-picker`}
          placeholder={locale.timePickerLocale.placeholder}
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
        />
      );
    },
  });
  return PickerWrapper;
}
