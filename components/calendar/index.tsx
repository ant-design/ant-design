import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import { PREFIX_CLS } from './Constants';
import Header from './Header';
import { getComponentLocale, getLocaleCode } from '../_util/getLocale';
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
    Calendar?: any,
  };
}

export type CalendarMode = 'month' | 'year';

export interface CalendarProps {
  prefixCls?: string;
  className?: string;
  value?: moment.Moment;
  defaultValue?: moment.Moment;
  mode?: CalendarMode;
  fullscreen?: boolean;
  dateCellRender?: (date: moment.Moment) => React.ReactNode;
  monthCellRender?: (date: moment.Moment) => React.ReactNode;
  dateFullCellRender?: (date: moment.Moment) => React.ReactNode;
  monthFullCellRender?: (date: moment.Moment) => React.ReactNode;
  locale?: any;
  style?: React.CSSProperties;
  onPanelChange?: (date?: moment.Moment, mode?: CalendarMode) => void;
  onSelect?: (date?: moment.Moment) => void;
}

export interface CalendarState {
  value?: moment.Moment;
  mode?: CalendarMode;
}

export default class Calendar extends React.Component<CalendarProps, CalendarState> {
  static defaultProps = {
    locale: {},
    fullscreen: true,
    prefixCls: PREFIX_CLS,
    mode: 'month',
    onSelect: noop,
    onPanelChange: noop,
  };

  static propTypes = {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    monthFullCellRender: PropTypes.func,
    dateFullCellRender: PropTypes.func,
    fullscreen: PropTypes.bool,
    locale: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onPanelChange: PropTypes.func,
    value: PropTypes.object,
    onSelect: PropTypes.func,
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: CalendarContext;

  constructor(props, context) {
    super(props, context);
    // Make sure that moment locale had be set correctly.
    getComponentLocale(props, context, 'Calendar', () => require('./locale/zh_CN'));

    const value = props.value || props.defaultValue || moment();
    if (!moment.isMoment(value)) {
      throw new Error(
        'The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' +
        'see: http://u.ant.design/calendar-value',
      );
    }
    this.state = {
      value,
      mode: props.mode,
    };
  }

  componentWillReceiveProps(nextProps: CalendarProps) {
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

  setValue = (value, way: 'select' | 'changePanel') => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (way === 'select') {
      if (this.props.onSelect) {
        this.props.onSelect(value);
      }
    } else if (way === 'changePanel') {
      this.onPanelChange(value, this.state.mode);
    }
  }

  setType = (type) => {
    const mode = (type === 'date') ? 'month' : 'year';
    if (this.state.mode !== mode) {
      this.setState({ mode });
      this.onPanelChange(this.state.value, mode);
    }
  }

  onHeaderValueChange = (value) => {
    this.setValue(value, 'changePanel');
  }

  onHeaderTypeChange = (type) => {
    this.setType(type);
  }

  onPanelChange(value, mode) {
    const { onPanelChange } = this.props;
    if (onPanelChange) {
      onPanelChange(value, mode);
    }
  }

  onSelect = (value) => {
    this.setValue(value, 'select');
  }

  render() {
    const { state, props, context } = this;
    const { value, mode } = state;
    const localeCode = getLocaleCode(context);
    if (value && localeCode) {
      value.locale(localeCode);
    }
    const { prefixCls, style, className, fullscreen, dateFullCellRender, monthFullCellRender } = props;
    const type = (mode === 'year') ? 'month' : 'date';
    const locale = getComponentLocale(props, context, 'Calendar', () => require('./locale/zh_CN'));

    let cls = className || '';
    if (fullscreen) {
      cls += (` ${prefixCls}-fullscreen`);
    }

    const monthCellRender = monthFullCellRender || this.monthCellRender;
    const dateCellRender = dateFullCellRender || this.dateCellRender;

    return (
      <div className={cls} style={style}>
        <Header
          fullscreen={fullscreen}
          type={type}
          value={value}
          locale={locale.lang}
          prefixCls={prefixCls}
          onTypeChange={this.onHeaderTypeChange}
          onValueChange={this.onHeaderValueChange}
        />
        <FullCalendar
          {...props}
          Select={noop}
          locale={locale.lang}
          type={type}
          prefixCls={prefixCls}
          showHeader={false}
          value={value}
          monthCellRender={monthCellRender}
          dateCellRender={dateCellRender}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
