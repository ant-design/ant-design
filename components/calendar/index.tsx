import * as React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { PREFIX_CLS } from './Constants';
import Header from './Header';
import callMoment from '../_util/callMoment';

declare const require: Function;

export { HeaderProps } from './Header';

function noop() { return null; }

function zerofixed(v: number) {
  if (v < 10) {
    return `0${v}`;
  }
  return `${v}`;
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
  disabledDate?: (current: moment.Moment) => boolean;
}

export interface CalendarState {
  value: moment.Moment;
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

  constructor(props: CalendarProps) {
    super(props);

    const value = props.value || props.defaultValue || callMoment(moment);
    if (!moment.isMoment(value)) {
      throw new Error(
        'The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' +
        'see: https://u.ant.design/calendar-value',
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
        value: nextProps.value!,
      });
    }
  }

  monthCellRender = (value: moment.Moment) => {
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

  dateCellRender = (value: moment.Moment) => {
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

  getDefaultLocale() {
    const locale = require('./locale/en_US');
    return locale.default || locale;
  }

  setValue = (value: moment.Moment, way: 'select' | 'changePanel') => {
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

  setType = (type: string) => {
    const mode = (type === 'date') ? 'month' : 'year';
    if (this.state.mode !== mode) {
      this.setState({ mode });
      this.onPanelChange(this.state.value, mode);
    }
  }

  onHeaderValueChange = (value: moment.Moment) => {
    this.setValue(value, 'changePanel');
  }

  onHeaderTypeChange = (type: string) => {
    this.setType(type);
  }

  onPanelChange(value: moment.Moment, mode: CalendarMode | undefined) {
    const { onPanelChange } = this.props;
    if (onPanelChange) {
      onPanelChange(value, mode);
    }
  }

  onSelect = (value: moment.Moment) => {
    this.setValue(value, 'select');
  }

  renderCalendar = (locale: any, localeCode: string) => {
    const { state, props } = this;
    const { value, mode } = state;
    if (value && localeCode) {
      value.locale(localeCode);
    }
    const { prefixCls, style, className, fullscreen, dateFullCellRender, monthFullCellRender } = props;
    const type = (mode === 'year') ? 'month' : 'date';

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

  render() {
    return (
      <LocaleReceiver
        componentName="Calendar"
        defaultLocale={this.getDefaultLocale}
      >
        {this.renderCalendar}
      </LocaleReceiver>
    );
  }
}
