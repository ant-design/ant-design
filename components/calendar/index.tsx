import React from 'react';
import { PropTypes } from 'react';
import moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import { PREFIX_CLS } from './Constants';
import Header from './Header';
import getLocale from '../_util/getLocale';
declare const require: Function;

function noop() { return null; }

function zerofixed(v) {
  if (v < 10) {
    return `0${v}`;
  }
  return `${v}`;
}

export interface CalendarContext {
  antLocale?: {
    Calendar?: any
  };
}

export interface CalendarProps {
  prefixCls?: string;
  className?: string;
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  mode?: 'month' | 'year';
  fullscreen?: boolean;
  dateCellRender?: (date: moment.Moment) => React.ReactNode;
  monthCellRender?: (date: moment.Moment) => React.ReactNode;
  locale?: any;
  style?: React.CSSProperties;
  onPanelChange?: (date: moment.Moment, mode: string) => void;
}

export default class Calendar extends React.Component<CalendarProps, any> {
  static defaultProps = {
    locale: {},
    fullscreen: true,
    prefixCls: PREFIX_CLS,
    mode: 'month',
  };

  static propTypes = {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    fullscreen: PropTypes.bool,
    locale: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onPanelChange: PropTypes.func,
    value: PropTypes.object,
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: CalendarContext;

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue || moment();
    if (!(value instanceof moment)) {
      throw new Error(
        'The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' +
        'see: http://u.ant.design/calendar-value'
      );
    }
    this.state = {
      value,
      mode: props.mode,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  monthCellRender = (value) => {
    const { prefixCls, monthCellRender = noop as Function } = this.props;
    return (
      <div className={`${prefixCls}-month`}>
        <div className={`${prefixCls}-value`}>
          {value.localeData().monthsShort(value)}
        </div>
        <div className={`${prefixCls}-content`}>
          {monthCellRender(value)}
        </div>
      </div>
    );
  }

  dateCellRender = (value) => {
    const { prefixCls, dateCellRender = noop as Function } = this.props;
    return (
      <div className={`${prefixCls}-date`}>
        <div className={`${prefixCls}-value`}>
          {zerofixed(value.date())}
        </div>
        <div className={`${prefixCls}-content`}>
          {dateCellRender(value)}
        </div>
      </div>
    );
  }

  setValue = (value) => {
    if (!('value' in this.props) && this.state.value !== value) {
      this.setState({ value });
    }
    const onPanelChange = this.props.onPanelChange;
    if (onPanelChange) {
      onPanelChange(value, this.state.mode);
    }
  }

  setType = (type) => {
    const mode = (type === 'date') ? 'month' : 'year';
    if (this.state.mode !== mode) {
      this.setState({ mode });
      const onPanelChange = this.props.onPanelChange;
      if (onPanelChange) {
        onPanelChange(this.state.value, mode);
      }
    }
  }

  render() {
    const props = this.props;
    const { value, mode } = this.state;
    const { prefixCls, style, className, fullscreen } = props;
    const type = (mode === 'year') ? 'month' : 'date';
    const locale = getLocale(
      props, this.context, 'Calendar',
      () => require('./locale/zh_CN')
    );

    let cls = className || '';
    if (fullscreen) {
      cls += (` ${prefixCls}-fullscreen`);
    }

    return (
      <div className={cls} style={style}>
        <Header
          fullscreen={fullscreen}
          type={type}
          value={value}
          locale={locale.lang}
          prefixCls={prefixCls}
          onTypeChange={this.setType}
          onValueChange={this.setValue}
        />
        <FullCalendar
          {...props}
          Select={noop}
          locale={locale.lang}
          type={type}
          prefixCls={prefixCls}
          showHeader={false}
          value={value}
          monthCellRender={this.monthCellRender}
          dateCellRender={this.dateCellRender}
        />
      </div>
    );
  }
}
