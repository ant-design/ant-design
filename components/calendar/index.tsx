import React from 'react';
import { PropTypes } from 'react';
import moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import defaultLocale from './locale/zh_CN';
import { PREFIX_CLS } from './Constants';
import Header from './Header';
import assign from 'object-assign';

function noop() { return null; }

function zerofixed(v) {
  if (v < 10) {
    return `0${v}`;
  }
  return `${v}`;
}

interface CalendarContext {
  antLocale?: {
    Calendar?: any
  };
}

export interface CalendarProps {
  prefixCls?: string;
  className?: string;
  value?: Date;
  defaultValue?: Date;
  mode?: 'month' | 'year';
  fullscreen?: boolean;
  dateCellRender?: (date) => React.ReactNode;
  monthCellRender?: (month) => React.ReactNode;
  locale?: any;
  style?: React.CSSProperties;
  onPanelChange?: (date: Date, mode: string) => void;
}

export default class Calendar extends React.Component<CalendarProps, any> {
  static defaultProps = {
    monthCellRender: noop,
    dateCellRender: noop,
    locale: {},
    fullscreen: true,
    prefixCls: PREFIX_CLS,
    onPanelChange: noop,
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
    value: PropTypes.instanceOf(Date),
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: CalendarContext;

  constructor(props, context) {
    super(props);
    this.state = {
      value: this.parseDateFromValue(props.value || new Date(), this.getLocale(context)),
      mode: props.mode,
    };
  }

  parseDateFromValue(value, locale) {
    return moment(value).locale(locale.momentLocale);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if ('value' in nextProps) {
      this.setState({
        value: this.parseDateFromValue(nextProps.value, this.getLocale(nextContext)),
      });
    } else if (this.context !== nextContext) {
      this.setState({
        value: this.parseDateFromValue(this.state.value, this.getLocale(nextContext)),
      });
    }
  }

  getLocale = (context) => {
    const props = this.props;
    let locale = defaultLocale;
    if (context && context.antLocale && context.antLocale.Calendar) {
      locale = context.antLocale.Calendar;
    }
    // 统一合并为完整的 Locale
    const result = assign({}, locale, props.locale);
    result.lang = assign({}, locale.lang, props.locale.lang);
    return result;
  }

  monthCellRender = (value) => {
    const prefixCls = this.props.prefixCls;
    return (
      <div className={`${prefixCls}-month`}>
        <div className={`${prefixCls}-value`}>
          {value.localeData().monthsShort(value)}
        </div>
        <div className={`${prefixCls}-content`}>
          {this.props.monthCellRender(value)}
        </div>
      </div>
    );
  }

  dateCellRender = (value) => {
    const prefixCls = this.props.prefixCls;
    return (
      <div className={`${prefixCls}-date`}>
        <div className={`${prefixCls}-value`}>
          {zerofixed(value.date())}
        </div>
        <div className={`${prefixCls}-content`}>
          {this.props.dateCellRender(value)}
        </div>
      </div>
    );
  }

  setValue = (value) => {
    if (!('value' in this.props) && this.state.value !== value) {
      this.setState({ value });
    }
    this.props.onPanelChange(value, this.state.mode);
  }

  setType = (type) => {
    const mode = (type === 'date') ? 'month' : 'year';
    if (this.state.mode !== mode) {
      this.setState({ mode });
      this.props.onPanelChange(this.state.value, mode);
    }
  }

  render() {
    const props = this.props;
    const { value, mode } = this.state;
    const { prefixCls, style, className, fullscreen } = props;
    const type = (mode === 'year') ? 'month' : 'date';
    const locale = this.getLocale(this.context);

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
