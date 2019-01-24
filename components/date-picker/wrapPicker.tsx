import * as React from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import classNames from 'classnames';
import enUS from './locale/en_US';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { generateShowHourMinuteSecond } from '../time-picker';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

function getColumns({ showHour, showMinute, showSecond, use12Hours }: any) {
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

export default function wrapPicker(Picker: React.ComponentClass<any>, defaultFormat?: string): any {
  return class PickerWrapper extends React.Component<any, any> {
    static defaultProps = {
      format: defaultFormat || 'YYYY-MM-DD',
      transitionName: 'slide-up',
      popupStyle: {},
      onChange() {},
      onOk() {},
      onOpenChange() {},
      locale: {},
    };

    private picker: any;

    componentDidMount() {
      const { autoFocus, disabled } = this.props;
      if (autoFocus && !disabled) {
        this.focus();
      }
    }

    handleOpenChange = (open: boolean) => {
      const { onOpenChange } = this.props;
      onOpenChange(open);
    };

    handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      const { onFocus } = this.props;
      if (onFocus) {
        onFocus(e);
      }
    };

    handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur(e);
      }
    };

    handleMouseEnter: React.MouseEventHandler<HTMLInputElement> = e => {
      const { onMouseEnter } = this.props;
      if (onMouseEnter) {
        onMouseEnter(e);
      }
    };

    handleMouseLeave: React.MouseEventHandler<HTMLInputElement> = e => {
      const { onMouseLeave } = this.props;
      if (onMouseLeave) {
        onMouseLeave(e);
      }
    };

    focus() {
      this.picker.focus();
    }

    blur() {
      this.picker.blur();
    }

    savePicker = (node: any) => {
      this.picker = node;
    };

    getDefaultLocale = () => {
      const result = {
        ...enUS,
        ...this.props.locale,
      };
      result.lang = {
        ...result.lang,
        ...(this.props.locale || {}).lang,
      };
      return result;
    };

    renderPicker = (locale: any, localeCode: string) => {
      return (
        <ConfigConsumer>
          {({ getPrefixCls }: ConfigConsumerProps) => {
            const {
              prefixCls: customizePrefixCls,
              inputPrefixCls: customizeInputPrefixCls,
              size,
              disabled,
              showTime,
            } = this.props;
            const prefixCls = getPrefixCls('calendar', customizePrefixCls);
            const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
            const pickerClass = classNames(`${prefixCls}-picker`, {
              [`${prefixCls}-picker-${size}`]: !!size,
            });
            const pickerInputClass = classNames(`${prefixCls}-picker-input`, inputPrefixCls, {
              [`${inputPrefixCls}-lg`]: size === 'large',
              [`${inputPrefixCls}-sm`]: size === 'small',
              [`${inputPrefixCls}-disabled`]: disabled,
            });

            const timeFormat = (showTime && showTime.format) || 'HH:mm:ss';
            const rcTimePickerProps = {
              ...generateShowHourMinuteSecond(timeFormat),
              format: timeFormat,
              use12Hours: showTime && showTime.use12Hours,
            };
            const columns = getColumns(rcTimePickerProps);
            const timePickerCls = `${prefixCls}-time-picker-column-${columns}`;
            const timePicker = showTime ? (
              <TimePickerPanel
                {...rcTimePickerProps}
                {...showTime}
                prefixCls={`${prefixCls}-time-picker`}
                className={timePickerCls}
                placeholder={locale.timePickerLocale.placeholder}
                transitionName="slide-up"
              />
            ) : null;

            return (
              <Picker
                {...this.props}
                ref={this.savePicker}
                pickerClass={pickerClass}
                pickerInputClass={pickerInputClass}
                locale={locale}
                localeCode={localeCode}
                timePicker={timePicker}
                onOpenChange={this.handleOpenChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              />
            );
          }}
        </ConfigConsumer>
      );
    };

    render() {
      return (
        <LocaleReceiver componentName="DatePicker" defaultLocale={this.getDefaultLocale}>
          {this.renderPicker}
        </LocaleReceiver>
      );
    }
  };
}
