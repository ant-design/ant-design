import React from 'react';
import moment from 'moment';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import RcDatePicker from 'rc-calendar/lib/Picker';
import classNames from 'classnames';
import Icon from '../icon';

export default class RangePicker extends React.Component<any, any> {
  static defaultProps = {
    prefixCls: 'ant-calendar',
    allowClear: true,
    showToday: false,
  };

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue || [];
    if (
      value[0] && !(value[0] instanceof moment) ||
      value[1] && !(value[1] instanceof moment)
    ) {
      throw new Error(
        'The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, ' +
        'see: http://u.ant.design/date-picker-value'
      );
    }
    this.state = {
      value,
      open: props.open,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || [],
      });
    }
    if ('open' in nextProps) {
      this.setState({
        open: nextProps.open,
      });
    }
  }

  clearSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ value: [] });
    this.handleChange([]);
  }

  handleChange = (value) => {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({ value });
    }
    props.onChange(value, [
      (value[0] && value[0].format(props.format)) || '',
      (value[1] && value[1].format(props.format)) || '',
    ]);
  }

  handleOpenChange = (open) => {
    this.setState({ open });

    const onOpenChange = this.props.onOpenChange;
    if (onOpenChange) {
      onOpenChange(open);
    }
  }

  setValue(value) {
    this.handleChange(value);
    if (!this.props.showTime) {
      this.setState({ open: false });
    }
  }

  renderFooter = () => {
    const { prefixCls, ranges } = this.props;
    if (!ranges) {
      return null;
    }

    const operations = Object.keys(ranges).map((range) => {
      const value = ranges[range];
      return <a key={range} onClick={() => this.setValue(value)}>{range}</a>;
    });
    return (
      <div className={`${prefixCls}-range-quick-selector`}>
        {operations}
      </div>
    );
  }

  render() {
    const props = this.props;
    const {
      disabledDate, disabledTime, showTime, showToday,
      ranges, prefixCls, popupStyle,
      style, onOk, locale, format,
    } = props;
    const state = this.state;

    const calendarClassName = classNames({
      [`${prefixCls}-time`]: showTime,
      [`${prefixCls}-range-with-ranges`]: ranges,
    });

    // 需要选择时间时，点击 ok 时才触发 onChange
    let pickerChangeHandler = {
      onChange: this.handleChange,
    };
    let calendarHandler: Object = {
      onOk: this.handleChange,
    };
    if (props.timePicker) {
      pickerChangeHandler.onChange = value => this.handleChange(value);
    } else {
      calendarHandler = {};
    }

    const startPlaceholder = ('placeholder' in props)
      ? props.placeholder[0] : locale.lang.rangePlaceholder[0];
    const endPlaceholder = ('placeholder' in props)
      ? props.placeholder[1] : locale.lang.rangePlaceholder[1];

    const calendar = (
      <RangeCalendar
        {...calendarHandler}
        format={format}
        prefixCls={prefixCls}
        className={calendarClassName}
        renderFooter={this.renderFooter}
        timePicker={props.timePicker}
        disabledDate={disabledDate}
        disabledTime={disabledTime}
        dateInputPlaceholder={[startPlaceholder, endPlaceholder]}
        locale={locale.lang}
        onOk={onOk}
        defaultValue={props.defaultPickerValue || [moment(), moment()]}
        showToday={showToday}
      />
    );

    const clearIcon = (!props.disabled && props.allowClear && state.value && (state.value[0] || state.value[1]))
      ? <Icon
        type="cross-circle"
        className={`${prefixCls}-picker-clear`}
        onClick={this.clearSelection}
      /> : null;

    const input = ({ value }) => {
      const start = value[0];
      const end = value[1];
      return (
        <span className={props.pickerInputClass} disabled={props.disabled}>
          <input
            disabled={props.disabled}
            readOnly
            value={(start && start.format(props.format)) || ''}
            placeholder={startPlaceholder}
            className={`${prefixCls}-range-picker-input`}
          />
          <span className={`${prefixCls}-range-picker-separator`}> ~ </span>
          <input
            disabled={props.disabled}
            readOnly
            value={(end && end.format(props.format)) || ''}
            placeholder={endPlaceholder}
            className={`${prefixCls}-range-picker-input`}
          />
          {clearIcon}
          <span className={`${prefixCls}-picker-icon`} />
        </span>
      );
    };

    return (<span className={props.pickerClass} style={style}>
      <RcDatePicker
        {...props}
        {...pickerChangeHandler}
        calendar={calendar}
        value={state.value}
        open={state.open}
        onOpenChange={this.handleOpenChange}
        prefixCls={`${prefixCls}-picker-container`}
        style={popupStyle}
      >
        {input}
      </RcDatePicker>
    </span>);
  }
}
