import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MonthCalendar from 'rc-calendar/lib/MonthCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import omit from 'omit.js';
import assign from 'object-assign';
import Icon from '../icon';
import { getLocaleCode } from '../_util/getLocale';
import warning from '../_util/warning';

export interface PickerProps {
  value?: moment.Moment;
  prefixCls: string;
}

export default function createPicker(TheCalendar): any {
  return class CalenderWrapper extends React.Component<any, any> {
    static contextTypes = {
      antLocale: PropTypes.object,
    };

    static defaultProps = {
      prefixCls: 'ant-calendar',
      allowClear: true,
      showToday: true,
    };

    constructor(props) {
      super(props);
      const value = props.value || props.defaultValue;
      if (value && !moment.isMoment(value)) {
        throw new Error(
          'The value/defaultValue of DatePicker or MonthPicker must be ' +
          'a moment object after `antd@2.0`, see: http://u.ant.design/date-picker-value',
        );
      }
      this.state = {
        value,
      };
    }

    componentWillReceiveProps(nextProps: PickerProps) {
      if ('value' in nextProps) {
        this.setState({
          value: nextProps.value,
        });
      }
    }

    clearSelection = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.handleChange(null);
    }

    handleChange = (value) => {
      const props = this.props;
      if (!('value' in props)) {
        this.setState({ value });
      }
      props.onChange(value, (value && value.format(props.format)) || '');
    }

    render() {
      const { value } = this.state;
      const props = omit(this.props, ['onChange']);
      const { prefixCls, locale } = props;

      const placeholder = ('placeholder' in props)
        ? props.placeholder : locale.lang.placeholder;

      const disabledTime = props.showTime ? props.disabledTime : null;

      const calendarClassName = classNames({
        [`${prefixCls}-time`]: props.showTime,
        [`${prefixCls}-month`]: MonthCalendar === TheCalendar,
      });

      let pickerChangeHandler: Object = {};
      let calendarHandler: Object = {};
      if (props.showTime) {
        calendarHandler = {
          // fix https://github.com/ant-design/ant-design/issues/1902
          onSelect: this.handleChange,
        };
      } else {
        pickerChangeHandler = {
          onChange: this.handleChange,
        };
      }

      warning(!('onOK' in props), 'It should be `DatePicker[onOk]` or `MonthPicker[onOk]`, instead of `onOK`!');
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
        pickerStyle.width = (props.style && props.style.width) || 154;
      }

      const clearIcon = (!props.disabled && props.allowClear && value) ? (
        <Icon
          type="cross-circle"
          className={`${prefixCls}-picker-clear`}
          onClick={this.clearSelection}
        />
      ) : null;

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

      const pickerValue = value;
      const localeCode = getLocaleCode(this.context);
      if (pickerValue && localeCode) {
        pickerValue.locale(localeCode);
      }
      return (
        <span className={props.pickerClass} style={assign({}, props.style, pickerStyle)}>
          <RcDatePicker
            {...props}
            {...pickerChangeHandler}
            calendar={calendar}
            value={pickerValue}
            prefixCls={`${prefixCls}-picker-container`}
            style={props.popupStyle}
          >
            {input}
          </RcDatePicker>
        </span>
      );
    }
  };
}
