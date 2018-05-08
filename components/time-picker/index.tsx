import * as React from 'react';
import * as moment from 'moment';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from './locale/en_US';
import interopDefault from '../_util/interopDefault';

export function generateShowHourMinuteSecond(format: string) {
  // Ref: http://momentjs.com/docs/#/parsing/string-format/
  return {
    showHour: (
      format.indexOf('H') > -1 ||
        format.indexOf('h') > -1 ||
        format.indexOf('k') > -1
    ),
    showMinute: format.indexOf('m') > -1,
    showSecond: format.indexOf('s') > -1,
  };
}

export interface TimePickerProps {
  className?: string;
  size?: 'large' | 'default' | 'small';
  value?: moment.Moment;
  defaultValue?: moment.Moment | moment.Moment[];
  open?: boolean;
  format?: string;
  onChange?: (time: moment.Moment, timeString: string) => void;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
  prefixCls?: string;
  hideDisabledOptions?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  style?: React.CSSProperties;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  addon?: Function;
  use12Hours?: boolean;
  focusOnOpen?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  allowEmpty?: boolean;
  inputReadOnly?: boolean;
  clearText?: string;
  defaultOpenValue?: moment.Moment;
  popupClassName?: string;
}

export interface TimePickerLocale {
  placeholder: string;
}

export default class TimePicker extends React.Component<TimePickerProps, any> {
  static defaultProps = {
    prefixCls: 'ant-time-picker',
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
    focusOnOpen: true,
  };

  private timePickerRef: typeof RcTimePicker;

  constructor(props: TimePickerProps) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' +
        'see: https://u.ant.design/time-picker-value',
      );
    }
    this.state = {
      value,
    };
  }

  componentWillReceiveProps(nextProps: TimePickerProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = (value: moment.Moment) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange, format = 'HH:mm:ss' } = this.props;
    if (onChange) {
      onChange(value, (value && value.format(format)) || '');
    }
  }

  handleOpenClose = ({ open }: { open: boolean }) => {
    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(open);
    }
  }

  saveTimePicker = (timePickerRef: typeof RcTimePicker) => {
    this.timePickerRef = timePickerRef;
  }

  focus() {
    this.timePickerRef.focus();
  }

  blur() {
    this.timePickerRef.blur();
  }

  getDefaultFormat() {
    const { format, use12Hours } = this.props;
    if (format) {
      return format;
    } else if (use12Hours) {
      return 'h:mm:ss a';
    }
    return 'HH:mm:ss';
  }

  renderTimePicker = (locale: TimePickerLocale) => {
    const props = {
      ...this.props,
    };
    delete props.defaultValue;

    const format = this.getDefaultFormat();
    const className = classNames(props.className, {
      [`${props.prefixCls}-${props.size}`]: !!props.size,
    });

    const addon = (panel: React.ReactElement<any>) => (
      props.addon ? (
        <div className={`${props.prefixCls}-panel-addon`}>
          {props.addon(panel)}
        </div>
      ) : null
    );

    return (
      <RcTimePicker
        {...generateShowHourMinuteSecond(format)}
        {...props}
        ref={this.saveTimePicker}
        format={format}
        className={className}
        value={this.state.value}
        placeholder={props.placeholder === undefined ? locale.placeholder : props.placeholder}
        onChange={this.handleChange}
        onOpen={this.handleOpenClose}
        onClose={this.handleOpenClose}
        addon={addon}
      />
    );
  }

  render() {
    return (
      <LocaleReceiver
        componentName="TimePicker"
        defaultLocale={defaultLocale}
      >
        {this.renderTimePicker}
      </LocaleReceiver>
    );
  }
}
