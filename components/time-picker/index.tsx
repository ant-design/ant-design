import React from 'react';
import moment from 'moment';
import RcTimePicker from 'rc-time-picker/lib/TimePicker';
import classNames from 'classnames';
import assign from 'object-assign';
import defaultLocale from './locale/zh_CN';

// TimePicker
export interface TimePickerProps {
  className?: string;
  size?: 'large' | 'default' | 'small';
  /** 默认时间 */
  value?: moment.Moment;
  /** 初始默认时间 */
  defaultValue?: moment.Moment;
  /** 展示的时间格式 : "HH:mm:ss"、"HH:mm"、"mm:ss" */
  format?: string;
  /** 时间发生变化的回调 */
  onChange?: (time: moment.Moment, timeString: string) => void;
  /** 禁用全部操作 */
  disabled?: boolean;
  /** 没有值的时候显示的内容 */
  placeholder?: string;
  /** 隐藏禁止选择的选项 */
  hideDisabledOptions?: boolean;
  /** 禁止选择部分小时选项 */
  disabledHours?: Function;
  /** 禁止选择部分分钟选项 */
  disabledMinutes?: Function;
  /** 禁止选择部分秒选项 */
  disabledSeconds?: Function;
  style?: React.CSSProperties;
  getPopupContainer?: (trigger: any) => any;
  addon?: Function;
}

export interface TimePickerContext {
  antLocale?: {
    TimePicker?: any,
  };
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
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: TimePickerContext;

  constructor(props) {
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

  componentWillReceiveProps(nextProps) {
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

  getLocale() {
    const antLocale = this.context.antLocale;
    const timePickerLocale = (antLocale && antLocale.TimePicker) || defaultLocale;
    return timePickerLocale;
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
