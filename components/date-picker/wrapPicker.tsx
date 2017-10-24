import React from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { generateShowHourMinuteSecond } from '../time-picker';
import warning from '../_util/warning';
declare const require: Function;

function getColumns({ showHour, showMinute, showSecond, use12Hours }) {
  let column = 0;
  if (showHour) {
    column += 1;
  }
  if (showMinute) {
    column += 1;
  }
  if (showSecond) {
    column += 1;
  }
  if (use12Hours) {
    column += 1;
  }
  return column;
}

export default function wrapPicker(Picker, defaultFormat?: string): any {
  return class PickerWrapper extends React.Component<any, any> {
    static defaultProps = {
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
      prefixCls: 'ant-calendar',
      inputPrefixCls: 'ant-input',
    };

    handleOpenChange = (open) => {
      const { onOpenChange, toggleOpen } = this.props;
      onOpenChange(open);

      if (toggleOpen) {
        warning(
          false,
          '`toggleOpen` is deprecated and will be removed in the future, ' +
          'please use `onOpenChange` instead, see: https://u.ant.design/date-picker-on-open-change',
        );
        toggleOpen({ open });
      }
    }

    getDefaultLocale() {
      const locale = require('./locale/en_US');
      return locale.default || locale;
    }

    renderPicker = (locale, localeCode) => {
      const props = this.props;
      const { prefixCls, inputPrefixCls } = props;
      const pickerClass = classNames(`${prefixCls}-picker`, {
        [`${prefixCls}-picker-${props.size}`]: !!props.size,
      });
      const pickerInputClass = classNames(`${prefixCls}-picker-input`, inputPrefixCls, {
        [`${inputPrefixCls}-lg`]: props.size === 'large',
        [`${inputPrefixCls}-sm`]: props.size === 'small',
        [`${inputPrefixCls}-disabled`]: props.disabled,
      });

      const timeFormat = (props.showTime && props.showTime.format) || 'HH:mm:ss';
      const rcTimePickerProps = {
        ...generateShowHourMinuteSecond(timeFormat),
        format: timeFormat,
        use12Hours: (props.showTime && props.showTime.use12Hours),
      };
      const columns = getColumns(rcTimePickerProps);
      const timePickerCls = `${prefixCls}-time-picker-column-${columns}`;
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
          localeCode={localeCode}
          timePicker={timePicker}
          onOpenChange={this.handleOpenChange}
        />
      );
    }

    render() {
      return (
        <LocaleReceiver
          componentName="DatePicker"
          defaultLocale={this.getDefaultLocale}
        >
          {this.renderPicker}
        </LocaleReceiver>
      );
    }
  };
}
