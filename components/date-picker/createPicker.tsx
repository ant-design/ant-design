import React from 'react';
import moment from 'moment';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
import Icon from '../icon';
import { getLocaleCode } from '../_util/getLocale';

export interface PickerProps {
  value?: moment.Moment;
  prefixCls: string;
}

export default function createPicker(TheCalendar) {
  // use class typescript error
  const CalenderWrapper = React.createClass<any, any>({
    contextTypes: {
      antLocale: React.PropTypes.object,
    },
    getDefaultProps() {
      return {
        prefixCls: 'ant-calendar',
        allowClear: true,
        showToday: true,
      };
    },

    getInitialState() {
      const props = this.props;
      const value = props.value || props.defaultValue;
      if (value && !moment.isMoment(value)) {
        throw new Error(
          'The value/defaultValue of DatePicker or MonthPicker must be ' +
          'a moment object after `antd@2.0`, see: http://u.ant.design/date-picker-value'
        );
      }
      return {
        value,
        tempValue: undefined,
      };
    },

    componentWillReceiveProps(nextProps: PickerProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value,
          tempValue: nextProps.value,
        });
      }
    },

    clearSelection(e) {
      e.preventDefault();
      e.stopPropagation();
      this.handleChange(null);
    },

    handleChange(value) {
      const props = this.props;
      if (!('value' in props)) {
        this.setState({ value });
      }
      props.onChange(value, (value && value.format(props.format)) || '');
    },

    handleTempChange(tempValue) {
      this.setState({ tempValue });
    },

    // Clear temp value and trigger onChange when hide DatePicker[showTime] panel
    handleOpenChange(open) {
      const { showTime, onOpenChange, onChange, format } = this.props;
      if (!open) {
        // tricky code to avoid triggering onChange multiple times
        // when click `Now` button
        let tempValue;
        this.setState(prevState => {
          tempValue = prevState.tempValue;
          const nextState = { tempValue: undefined } as any;
          if (showTime && tempValue) {
            nextState.value = tempValue;
            onChange(tempValue, (tempValue && tempValue.format(format)) || '');
          }
          return nextState;
        });
      }
      if (onOpenChange) {
        onOpenChange(open);
      }
    },

    render() {
      const { value, tempValue } = this.state;
      const props = omit(this.props, ['onChange']);
      const { prefixCls, locale } = props;

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
          // fix https://github.com/ant-design/ant-design/issues/1902
          onSelect: (selectedValue) => {
            this.handleTempChange(selectedValue);
          },
        };
      } else {
        pickerChangeHandler = {
          onChange: this.handleChange,
        };
      }

      const calendar = (
        <TheCalendar
          {...calendarHandler}
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
          showToday={props.showToday}
          monthCellContentRender={props.monthCellContentRender}
        />
      );

      // default width for showTime
      const pickerStyle = {} as any;
      if (props.showTime) {
        pickerStyle.minWidth = 154;
      }

      const clearIcon = (!props.disabled && props.allowClear && value) ?
        <Icon
          type="cross-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
        /> : null;

      const input = ({ value: inputValue }) => (
        <span>
          <input
            disabled={props.disabled}
            readOnly
            value={(inputValue && inputValue.format(props.format)) || ''}
            placeholder={placeholder}
            className={props.pickerInputClass}
          />
          {clearIcon}
          <span className={`${prefixCls}-picker-icon`} />
        </span>
      );

      const pickerValue = tempValue || value;
      const localeCode = getLocaleCode(this.context);
      if (pickerValue && localeCode) {
        pickerValue.locale(localeCode);
      }
      return (
        <span className={props.pickerClass} style={assign({}, props.style, pickerStyle)}>
          <RcDatePicker
            {...props}
            {...pickerChangeHandler}
            onOpenChange={this.handleOpenChange}
            calendar={calendar}
            value={pickerValue}
            prefixCls={`${prefixCls}-picker-container`}
            style={props.popupStyle}
          >
            {input}
          </RcDatePicker>
        </span>
      );
    },
  });

  return CalenderWrapper;
}
