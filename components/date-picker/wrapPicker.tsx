import React from 'react';
import { PropTypes } from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import classNames from 'classnames';
import defaultLocale from './locale/zh_CN';
import assign from 'object-assign';
import warning from 'warning';

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
        onOpenChange() {
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

    handleOpenChange(open) {
      const { onOpenChange, toggleOpen } = this.props;
      onOpenChange(open);

      if (toggleOpen) {
        warning(
          false,
          '`toggleOpen` is deprecated and will be removed in the future, ' +
          'please use `onOpenChange` instead'
        );
        toggleOpen({open});
      }
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

      const timeFormat = (props.showTime && props.showTime.format) || 'HH:mm:ss';
      const rcTimePickerProps = {
        format: timeFormat,
        showSecond: timeFormat.indexOf('ss') >= 0,
        showHour: timeFormat.indexOf('HH') >= 0,
      };
      const timePickerCls = classNames({
        [`${prefixCls}-time-picker-1-column`]: !(rcTimePickerProps.showSecond || rcTimePickerProps.showHour),
        [`${prefixCls}-time-picker-2-columns`]: rcTimePickerProps.showSecond !== rcTimePickerProps.showHour,
      });
      const timePicker = props.showTime ? (
        <TimePickerPanel
          {...rcTimePickerProps}
          {...props.showTime}
          prefixCls={`${prefixCls}-time-picker`}
          className={timePickerCls}
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
          onOpenChange={this.handleOpenChange}
        />
      );
    },
  });
  return PickerWrapper;
}
