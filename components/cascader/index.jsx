import React from 'react';
import Cascader from 'rc-cascader';
import Input from '../input';
import Icon from '../icon';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';

class AntCascader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
      popupVisible: false,
    };
    [
      'handleChange',
      'handlePopupVisibleChange',
      'setValue',
      'getLabel',
      'clearSelection',
    ].forEach((method) => this[method] = this[method].bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value || [] });
    }
  }
  handleChange(value, selectedOptions) {
    this.setValue(value, selectedOptions);
  }
  handlePopupVisibleChange(popupVisible) {
    this.setState({ popupVisible });
    this.props.onPopupVisibleChange(popupVisible);
  }
  setValue(value, selectedOptions = []) {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.props.onChange(value, selectedOptions);
  }
  getLabel() {
    const { options, displayRender } = this.props;
    const label = arrayTreeFilter(options, (o, level) => o.value === this.state.value[level])
      .map(o => o.label);
    return displayRender(label);
  }
  clearSelection(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setValue([]);
    this.setState({ popupVisible: false });
  }
  render() {
    const { prefixCls, children, placeholder, size, disabled,
            className, style, allowClear, ...otherProps } = this.props;
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
      <Cascader {...this.props}
        value={this.state.value}
        popupVisible={this.state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        onChange={this.handleChange}>
        {children ||
          <span
            style={style}
            className={pickerCls}>
            <Input {...otherProps}
              placeholder={placeholder}
              className={`${prefixCls}-input ant-input ${sizeCls}`}
              style={{ width: '100%' }}
              value={this.getLabel()}
              disabled={disabled}
              readOnly />
            {clearIcon}
            <Icon type="down" className={arrowCls} />
          </span>
        }
      </Cascader>
    );
  }
}

AntCascader.defaultProps = {
  prefixCls: 'ant-cascader',
  placeholder: '请选择',
  transitionName: 'slide-up',
  popupPlacement: 'bottomLeft',
  onChange() {},
  options: [],
  displayRender(label) {
    return label.join(' / ');
  },
  disabled: false,
  allowClear: true,
  onPopupVisibleChange() {},
};

export default AntCascader;
