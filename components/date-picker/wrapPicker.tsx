import * as React from 'react';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { generateShowHourMinuteSecond } from '../time-picker';
import enUS from './locale/en_US';

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
    }

    handleFocus = (e: React.FocusEventHandler<HTMLInputElement>) => {
      const { onFocus } = this.props;
      if (onFocus) {
        onFocus(e);
      }
    }

    handleBlur = (e: React.FocusEventHandler<HTMLInputElement>) => {
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur(e);
      }
    }

    focus() {
      this.picker.focus();
    }

    blur() {
      this.picker.blur();
    }

    savePicker = (node: any) => {
      this.picker = node;
    }

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
    }

    renderPicker = (locale: any, localeCode: string) => {
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
          ref={this.savePicker}
          pickerClass={pickerClass}
          pickerInputClass={pickerInputClass}
          locale={locale}
          localeCode={localeCode}
          timePicker={timePicker}
          onOpenChange={this.handleOpenChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
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
