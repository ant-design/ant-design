import * as React from 'react';
import * as moment from 'moment';
import { polyfill } from 'react-lifecycles-compat';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import omit from 'omit.js';
import Icon from '../icon';
import warning from '../_util/warning';
import interopDefault from '../_util/interopDefault';
import getDataOrAriaProps from '../_util/getDataOrAriaProps';

export interface PickerProps {
  value?: moment.Moment;
  open?: boolean;
  prefixCls: string;
}

export interface PickerState {
  open: boolean;
  value: moment.Moment | null;
  showDate: moment.Moment | null;
}

export default function createPicker(TheCalendar: React.ComponentClass): any {
  class CalenderWrapper extends React.Component<any, PickerState> {
    static defaultProps = {
      prefixCls: 'ant-calendar',
      allowClear: true,
      showToday: true,
    };

    static getDerivedStateFromProps(nextProps: PickerProps, prevState: PickerState) {
      const state: Partial<PickerState> = {};
      let open: boolean = prevState.open;

      if ('open' in nextProps) {
        state.open = nextProps.open;
        open = nextProps.open || false;
      }
      if ('value' in nextProps) {
        state.value = nextProps.value;
        if (
          nextProps.value !== prevState.value ||
          (!open && nextProps.value !== prevState.showDate)
        ) {
          state.showDate = nextProps.value;
        }
      }
      return Object.keys(state).length > 0 ? state : null;
    }

    private input: any;

    constructor(props: any) {
      super(props);
      const value = props.value || props.defaultValue;
      if (value && !interopDefault(moment).isMoment(value)) {
        throw new Error(
          'The value/defaultValue of DatePicker or MonthPicker must be ' +
          'a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value',
        );
      }
      this.state = {
        value,
        showDate: value,
        open: false,
      };
    }

    renderFooter = (...args: any[]) => {
      const { prefixCls, renderExtraFooter } = this.props;
      return renderExtraFooter ? (
        <div className={`${prefixCls}-footer-extra`}>
          {renderExtraFooter(...args)}
        </div>
      ) : null;
    }

    clearSelection = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      this.handleChange(null);
    }

    handleChange = (value: moment.Moment | null) => {
      const props = this.props;
      if (!('value' in props)) {
        this.setState({
          value,
          showDate: value,
        });
      }
      props.onChange(value, (value && value.format(props.format)) || '');
      this.focus();
    }

    handleCalendarChange = (value: moment.Moment) => {
      this.setState({ showDate: value });
    }

    handleOpenChange = (open: boolean) => {
      const { onOpenChange } = this.props;
      if (!('open' in this.props)) {
        this.setState({ open });
      }

      if (onOpenChange) {
        onOpenChange(open);
      }
    };

    focus() {
      this.input.focus();
    }

    blur() {
      this.input.blur();
    }

    saveInput = (node: any) => {
      this.input = node;
    }

    render() {
      const { value, showDate, open } = this.state;
      const props = omit(this.props, ['onChange']);
      const { prefixCls, locale, localeCode, suffixIcon } = props;

      const placeholder = ('placeholder' in props)
        ? props.placeholder : locale.lang.placeholder;

      const disabledTime = props.showTime ? props.disabledTime : null;

      const calendarClassName = classNames({
        [`${prefixCls}-time`]: props.showTime,
        [`${prefixCls}-month`]: MonthCalendar === TheCalendar,
      });

      if (value && localeCode) {
        value.locale(localeCode);
      }

      let pickerProps: Object = {};
      let calendarProps: any = {};
      const pickerStyle: { width?: number } = {};
      if (props.showTime) {
        calendarProps = {
          // fix https://github.com/ant-design/ant-design/issues/1902
          onSelect: this.handleChange,
        };
        pickerStyle.width = 195;
      } else {
        pickerProps = {
          onChange: this.handleChange,
        };
      }
      if ('mode' in props) {
        calendarProps.mode = props.mode;
      }

      warning(!('onOK' in props), 'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!');
      const calendar = (
        <TheCalendar
          {...calendarProps}
          disabledDate={props.disabledDate}
          disabledTime={disabledTime}
          locale={locale.lang}
          timePicker={props.timePicker}
          defaultValue={props.defaultPickerValue || interopDefault(moment)()}
          dateInputPlaceholder={placeholder}
          prefixCls={prefixCls}
          className={calendarClassName}
          onOk={props.onOk}
          dateRender={props.dateRender}
          format={props.format}
          showToday={props.showToday}
          monthCellContentRender={props.monthCellContentRender}
          renderFooter={this.renderFooter}
          onPanelChange={props.onPanelChange}
          onChange={this.handleCalendarChange}
          value={showDate}
        />
      );

      const clearIcon = (!props.disabled && props.allowClear && value) ? (
        <Icon
          type="close-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
          theme="filled"
        />
      ) : null;

      const inputIcon = suffixIcon && (
        React.isValidElement<{ className?: string }>(suffixIcon)
          ? React.cloneElement(
            suffixIcon,
            {
              className: classNames({
                [suffixIcon.props.className!]: suffixIcon.props.className,
                [`${prefixCls}-picker-icon`]: true,
              }),
            },
          ) : <span className={`${prefixCls}-picker-icon`}>{suffixIcon}</span>) || (
          <Icon type="calendar" className={`${prefixCls}-picker-icon`} />
        );

      const dataOrAriaProps = getDataOrAriaProps(props);
      const input = ({ value: inputValue }: { value: moment.Moment | null }) => (
        <div>
          <input
            ref={this.saveInput}
            disabled={props.disabled}
            readOnly
            value={(inputValue && inputValue.format(props.format)) || ''}
            placeholder={placeholder}
            className={props.pickerInputClass}
            tabIndex={props.tabIndex}
            {...dataOrAriaProps}
          />
          {clearIcon}
          {inputIcon}
        </div>
      );

      return (
        <span
          id={props.id}
          className={classNames(props.className, props.pickerClass)}
          style={{ ...pickerStyle, ...props.style }}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          <RcDatePicker
            {...props}
            {...pickerProps}
            calendar={calendar}
            value={value}
            prefixCls={`${prefixCls}-picker-container`}
            style={props.popupStyle}
            open={open}
            onOpenChange={this.handleOpenChange}
          >
            {input}
          </RcDatePicker>
        </span>
      );
    }
  }
  polyfill(CalenderWrapper);
  return CalenderWrapper;
}
