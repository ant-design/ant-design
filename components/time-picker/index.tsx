import React from 'react';
import moment from 'moment';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import assign from 'object-assign';
import injectLocale from '../locale-provider/injectLocale';
import defaultLocale from './locale/zh_CN';

export interface TimePickerProps {
  className?: string;
  size?: 'large' | 'default' | 'small';
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  format?: string;
  onChange?: (time: moment.Moment, timeString: string) => void;
  disabled?: boolean;
  placeholder?: string;
  hideDisabledOptions?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  style?: React.CSSProperties;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  addon?: Function;
}

abstract class TimePicker extends React.Component<TimePickerProps, any> {
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
  };

  timePickerRef: any;

  constructor(props: TimePickerProps) {
    super(props);
    const value = props.value || props.defaultValue;
    if (value && !moment.isMoment(value)) {
      throw new Error(
        'The value/defaultValue of TimePicker must be a moment object after `antd@2.0`, ' +
        'see: http://u.ant.design/time-picker-value'
      );
    }
    this.state = {
      value,
    };
  }

  abstract getLocale()

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

  saveTimePicker = (timePickerRef) => {
    this.timePickerRef = timePickerRef;
  }

  focus() {
    this.timePickerRef.focus();
  }

  render() {
    const props = assign({ format: 'HH:mm:ss' }, this.props);
    delete props.defaultValue;

    const className = classNames(props.className, {
      [`${props.prefixCls}-${props.size}`]: !!props.size,
    });

    const addon = (panel) => (
      props.addon ? (
        <div className={`${props.prefixCls}-panel-addon`}>
          {props.addon(panel)}
        </div>
      ) : null
    );

    return (
      <RcTimePicker
        {...props}
        ref={this.saveTimePicker}
        className={className}
        value={this.state.value}
        placeholder={props.placeholder === undefined ? this.getLocale().placeholder : props.placeholder}
        showHour={props.format.indexOf('HH') > -1}
        showMinute={props.format.indexOf('mm') > -1}
        showSecond={props.format.indexOf('ss') > -1}
        onChange={this.handleChange}
        addon={addon}
      />
    );
  }
}

const injectTimePickerLocale = injectLocale('TimePicker', defaultLocale);
export default injectTimePickerLocale<TimePickerProps>(TimePicker as any);
