import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export default class Input extends Component {
  static defaultProps = {
    defaultValue: '',
    disabled: false,
    prefixCls: 'ant-input',
    type: 'text',
    onPressEnter() {},
    onKeyDown() {},
  }

  static propTypes = {
    type: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.onPressEnter(e);
    }
    this.props.onKeyDown(e);
  }

  renderLabledInput(children) {
    const props = this.props;
    const wrapperClassName = `${props.prefixCls}-group`;
    const addonClassName = `${wrapperClassName}-addon`;
    const addonBefore = props.addonBefore ? (
      <span className={addonClassName}>
        {props.addonBefore}
      </span>
    ) : null;

    const addonAfter = props.addonAfter ? (
      <span className={addonClassName}>
        {props.addonAfter}
      </span>
    ) : null;

    const className = classNames({
      [`${props.prefixCls}-wrapper`]: true,
      [wrapperClassName]: (addonBefore || addonAfter),
    });

    return (
      <span className={className}>
        {addonBefore}
        {children}
        {addonAfter}
      </span>
    );
  }

  renderInput() {
    const props = { ...this.props };
    const prefixCls = props.prefixCls;
    if (!props.type) {
      return props.children;
    }

    const inputClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-sm`]: props.size === 'small',
      [`${prefixCls}-lg`]: props.size === 'large',
      [props.className]: !!props.className,
    });

    if ('value' in props) {
      props.value = fixControlledValue(props.value);
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      delete props.defaultValue;
    }

    switch (props.type) {
      case 'textarea':
        return (
          <textarea
            {...props}
            className={inputClassName}
            onKeyDown={this.handleKeyDown}
            ref="input"
          />
        );
      default:
        return (
          <input
            {...props}
            className={inputClassName}
            onKeyDown={this.handleKeyDown}
            ref="input"
          />
        );
    }
  }

  render() {
    return this.renderLabledInput(this.renderInput());
  }
}
