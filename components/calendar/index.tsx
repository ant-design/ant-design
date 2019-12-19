import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import { polyfill } from 'react-lifecycles-compat';
import Header, { HeaderRender } from './Header';
import enUS from './locale/en_US';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import interopDefault from '../_util/interopDefault';

export { HeaderProps } from './Header';

function noop() {
  return null;
}

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
  onChange?: (date?: moment.Moment) => void;
  disabledDate?: (current: moment.Moment) => boolean;
  validRange?: [moment.Moment, moment.Moment];
  headerRender?: HeaderRender;
}

export interface CalendarState {
  value: moment.Moment;
  mode?: CalendarMode;
}

class Calendar extends React.Component<CalendarProps, CalendarState> {
  static defaultProps = {
    locale: {},
    fullscreen: true,
    onSelect: noop,
    onPanelChange: noop,
    onChange: noop,
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
    value: PropTypes.object as PropTypes.Requireable<moment.Moment>,
    onSelect: PropTypes.func,
    onChange: PropTypes.func,
    headerRender: PropTypes.func,
  };

  static getDerivedStateFromProps(nextProps: CalendarProps) {
    const newState = {} as CalendarState;
    if ('value' in nextProps) {
      newState.value = nextProps.value!;
    }
    if ('mode' in nextProps) {
      newState.mode = nextProps.mode;
    }
    return Object.keys(newState).length > 0 ? newState : null;
  }

  prefixCls?: string;

  constructor(props: CalendarProps) {
    super(props);

    const value = props.value || props.defaultValue || interopDefault(moment)();
    if (!interopDefault(moment).isMoment(value)) {
      throw new Error(
        'The value/defaultValue of Calendar must be a moment object after `antd@2.0`, ' +
          'see: https://u.ant.design/calendar-value',
      );
    }
    this.state = {
      value,
      mode: props.mode || 'month',
    };
  }

  onHeaderValueChange = (value: moment.Moment) => {
    this.setValue(value, 'changePanel');
  };

  onHeaderTypeChange = (mode: CalendarMode) => {
    this.setState({ mode });
    this.onPanelChange(this.state.value, mode);
  };

  onPanelChange(value: moment.Moment, mode: CalendarMode | undefined) {
    const { onPanelChange, onChange } = this.props;
    if (onPanelChange) {
      onPanelChange(value, mode);
    }
    if (onChange && value !== this.state.value) {
      onChange(value);
    }
  }

  onSelect = (value: moment.Moment) => {
    this.setValue(value, 'select');
  };

  setValue = (value: moment.Moment, way: 'select' | 'changePanel') => {
    const prevValue = this.props.value || this.state.value;
    const { mode } = this.state;

    if (!('value' in this.props)) {
      this.setState({ value });
    }
    if (way === 'select') {
      if (prevValue && prevValue.month() !== value.month()) {
        this.onPanelChange(value, mode);
      }
      if (this.props.onSelect) {
        this.props.onSelect(value);
      }
    } else if (way === 'changePanel') {
      this.onPanelChange(value, mode);
    }
  };

  getDateRange = (
    validRange: [moment.Moment, moment.Moment],
    disabledDate?: (current: moment.Moment) => boolean,
  ) => (current: moment.Moment) => {
    if (!current) {
      return false;
    }
    const [startDate, endDate] = validRange;
    const inRange = !current.isBetween(startDate, endDate, 'days', '[]');
    if (disabledDate) {
      return disabledDate(current) || inRange;
    }
    return inRange;
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

  monthCellRender = (value: moment.Moment) => {
    const { monthCellRender = noop as Function } = this.props;
    const { prefixCls } = this;
    return (
      <div className={`${prefixCls}-month`}>
        <div className={`${prefixCls}-value`}>{value.localeData().monthsShort(value)}</div>
        <div className={`${prefixCls}-content`}>{monthCellRender(value)}</div>
      </div>
    );
  };

  dateCellRender = (value: moment.Moment) => {
    const { dateCellRender = noop as Function } = this.props;
    const { prefixCls } = this;
    return (
      <div className={`${prefixCls}-date`}>
        <div className={`${prefixCls}-value`}>{zerofixed(value.date())}</div>
        <div className={`${prefixCls}-content`}>{dateCellRender(value)}</div>
      </div>
    );
  };

  renderCalendar = (locale: any, localeCode: string) => {
    const { state, props } = this;
    const { value, mode } = state;
    if (value && localeCode) {
      value.locale(localeCode);
    }
    const {
      prefixCls: customizePrefixCls,
      style,
      className,
      fullscreen,
      headerRender,
      dateFullCellRender,
      monthFullCellRender,
    } = props;
    const monthCellRender = monthFullCellRender || this.monthCellRender;
    const dateCellRender = dateFullCellRender || this.dateCellRender;

    let { disabledDate } = props;

    if (props.validRange) {
      disabledDate = this.getDateRange(props.validRange, disabledDate);
    }

    return (
      <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => {
          const prefixCls = getPrefixCls('fullcalendar', customizePrefixCls);

          // To support old version react.
          // Have to add prefixCls on the instance.
          // https://github.com/facebook/react/issues/12397
          this.prefixCls = prefixCls;

          let cls = className || '';
          if (fullscreen) {
            cls += ` ${prefixCls}-fullscreen`;
          }

          return (
            <div className={cls} style={style}>
              <Header
                fullscreen={fullscreen}
                type={mode}
                headerRender={headerRender}
                value={value}
                locale={locale.lang}
                prefixCls={prefixCls}
                onTypeChange={this.onHeaderTypeChange}
                onValueChange={this.onHeaderValueChange}
                validRange={props.validRange}
              />
              <FullCalendar
                {...props}
                disabledDate={disabledDate}
                Select={noop}
                locale={locale.lang}
                type={mode === 'year' ? 'month' : 'date'}
                prefixCls={prefixCls}
                showHeader={false}
                value={value}
                monthCellRender={monthCellRender}
                dateCellRender={dateCellRender}
                onSelect={this.onSelect}
              />
            </div>
          );
        }}
      </ConfigConsumer>
    );
  };

  render() {
    return (
      <LocaleReceiver componentName="Calendar" defaultLocale={this.getDefaultLocale}>
        {this.renderCalendar}
      </LocaleReceiver>
    );
  }
}

polyfill(Calendar);

export default Calendar;
