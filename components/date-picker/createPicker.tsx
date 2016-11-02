import React from 'react';
import moment from 'moment';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import assign from 'object-assign';
import omit from 'omit.js';
import Icon from '../icon';

export interface PickerProps {
  value?: moment.Moment;
  prefixCls: string;
}

export default function createPicker(TheCalendar) {
  // use class typescript error
  const CalenderWrapper = React.createClass<any, any>({
    getDefaultProps() {
      return {
        prefixCls: 'ant-calendar',
        allowClear: true,
      };
    },

    getInitialState() {
      const props = this.props;
      return {
        value: props.value || props.defaultValue,
        tempValue: undefined,
      };
    },

    componentWillReceiveProps(nextProps: PickerProps) {
      if (nextProps.value !== undefined) {
        this.setState({
          value: nextProps.value,
          tempValue: nextProps.value,
        });
      }
    },

    clearSelection(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ value: null });
      this.handleChange(null);
    },

    handleChange(value) {
      const props = this.props;
      if (props.value === undefined) {
        this.setState({ value });
      }
      props.onChange(value, (value && value.format(props.format)) || '');
    },

    handleTempChange(tempValue) {
      this.setState({ tempValue });
    },

    // Clear temp value when hide picker panel
    handleOpenChange(open) {
      if (!open) {
        this.setState({
          tempValue: undefined,
        });
      }
      if (this.props.onOpenChange) {
        this.props.onOpenChange(open);
      }
    },

    render() {
      const props = omit(this.props, ['onChange']);
      const prefixCls = props.prefixCls;
      const locale = props.locale;

      const placeholder = ('placeholder' in props)
        ? props.placeholder : locale.lang.placeholder;

      const disabledTime = props.showTime ? props.disabledTime : null;

      const calendarClassName = classNames({
        [`${prefixCls}-time`]: props.showTime,
        [`${prefixCls}-month`]: MonthCalendar === TheCalendar,
      });

      // 需要选择时间时，点击 ok 时才触发 onChange
      let pickerChangeHandler: Object = {};
      let calendarHandler: Object = {};
      if (props.showTime) {
        calendarHandler = {
          onOk: this.handleChange,
          // fix https://github.com/ant-design/ant-design/issues/1902
          onSelect: (value, cause) => {
            if (cause && cause.source === 'todayButton') {
              this.handleChange(value);
            } else {
              this.handleTempChange(value);
            }
          },
        };
      } else {
        pickerChangeHandler = {
          onChange: this.handleChange,
        };
      }

      const calendar = (
        <TheCalendar
          disabledDate={props.disabledDate}
          disabledTime={disabledTime}
          locale={locale.lang}
          timePicker={props.timePicker}
          defaultValue={props.defaultPickerValue || moment()}
          dateInputPlaceholder={placeholder}
          prefixCls={prefixCls}
          className={calendarClassName}
          onOk={props.onOk}
          format={props.format}
          {...calendarHandler}
        />
      );

      // default width for showTime
      const pickerStyle: { width?: number } = {};
      if (props.showTime) {
        pickerStyle.width = 180;
      }

      const clearIcon = (!props.disabled && props.allowClear && this.state.value) ?
        <Icon type="cross-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
        /> : null;
      return (
        <span className={props.pickerClass} style={assign({}, pickerStyle, props.style)}>
          <RcDatePicker
            {...props}
            {...pickerChangeHandler}
            onOpenChange={this.handleOpenChange}
            calendar={calendar}
            value={this.state.tempValue || this.state.value}
            prefixCls={`${prefixCls}-picker-container`}
            style={props.popupStyle}
          >
            {
              ({ value }) => {
                return (
                  <span>
                    <input
                      disabled={props.disabled}
                      readOnly
                      value={(value && value.format(props.format)) || ''}
                      placeholder={placeholder}
                      className={props.pickerInputClass}
                    />
                    {clearIcon}
                    <span className={`${prefixCls}-picker-icon`} />
                  </span>
                );
              }
            }
          </RcDatePicker>
        </span>
      );
    },
  });

  return CalenderWrapper;
}
