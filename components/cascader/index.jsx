import React from 'react';
import RcCascader from 'rc-cascader';
import Input from '../input';
import Icon from '../icon';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';

export default class Cascader extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-cascader',
    placeholder: 'Please select',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    onChange() {},
    options: [],
    displayRender: label => label.join(' / '),
    disabled: false,
    allowClear: true,
    onPopupVisibleChange() {},
  }

  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }
    this.state = {
      value: value || [],
      popupVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value || [] });
    }
  }

  handleChange = (value, selectedOptions) => {
    this.setValue(value, selectedOptions);
  }

  handlePopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
    this.props.onPopupVisibleChange(popupVisible);
  }

  setValue = (value, selectedOptions = []) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.props.onChange(value, selectedOptions);
  }

  getLabel() {
    const { options, displayRender } = this.props;
    const selectedOptions = arrayTreeFilter(options, (o, level) => o.value === this.state.value[level]);
    const label = selectedOptions.map(o => o.label);
    return displayRender(label, selectedOptions);
  }

  clearSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setValue([]);
    this.setState({ popupVisible: false });
  }

  render() {
    const props = this.props;
    const { prefixCls, children, placeholder, size, disabled,
            className, style, allowClear, ...otherProps } = props;
    const sizeCls = classNames({
      'ant-input-lg': size === 'large',
      'ant-input-sm': size === 'small',
    });
    const clearIcon = (allowClear && !disabled && this.state.value.length > 0) ?
      <Icon type="cross-circle"
        className={`${prefixCls}-picker-clear`}
        onClick={this.clearSelection} /> : null;
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: this.state.popupVisible,
    });
    const pickerCls = classNames({
      [className]: !!className,
      [`${prefixCls}-picker`]: true,
      [`${prefixCls}-picker-disabled`]: disabled,
    });

    // Fix bug of https://github.com/facebook/react/pull/5004
    delete otherProps.onChange;

    return (
      <RcCascader {...props}
        value={this.state.value}
        popupVisible={this.state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        onChange={this.handleChange}>
        {children ||
          <span
            style={style}
            className={pickerCls}>
            <Input {...otherProps}
              placeholder={this.state.value && this.state.value.length > 0 ? null : placeholder}
              className={`${prefixCls}-input ant-input ${sizeCls}`}
              value={null}
              disabled={disabled}
              readOnly />
            <span className={`${prefixCls}-picker-label`}>{this.getLabel()}</span>
            {clearIcon}
            <Icon type="down" className={arrowCls} />
          </span>
        }
      </RcCascader>
    );
  }
}
