import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export interface AbstractInputProps {
  prefixCls?: string;
  className?: string;
  defaultValue?: any;
  value?: any;
  style?: React.CSSProperties;
}

export interface InputProps extends AbstractInputProps {
  placeholder?: string;
  type?: string;
  id?: number | string;
  name?: string;
  size?: 'large' | 'default' | 'small';
  disabled?: boolean;
  readOnly?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  onPressEnter?: React.FormEventHandler<any>;
  onKeyDown?: React.FormEventHandler<any>;
  onChange?: React.FormEventHandler<any>;
  onClick?: React.FormEventHandler<any>;
  onFocus?: React.FormEventHandler<any>;
  onBlur?: React.FormEventHandler<any>;
  autoComplete?: 'on' | 'off';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  spellCheck?: boolean;
  autoFocus?: boolean;
}

export default class Input extends Component<InputProps, any> {
  static Group: typeof Group;
  static Search: typeof Search;
  static TextArea: typeof TextArea;

  static defaultProps = {
    prefixCls: 'ant-input',
    type: 'text',
    disabled: false,
  };

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
    autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
  };

  refs: {
    input: HTMLInputElement;
  };

  handleKeyDown = (e) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  focus() {
    this.refs.input.focus();
  }

  blur() {
    this.refs.input.blur();
  }

  getInputClassName() {
    const { prefixCls, size, disabled } = this.props;
    return classNames(prefixCls, {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-disabled`]: disabled,
    });
  }

  renderLabeledInput(children) {
    const props = this.props;
    // Not wrap when there is not addons
    if ((!props.addonBefore && !props.addonAfter)) {
      return children;
    }

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

    const className = classNames(`${props.prefixCls}-wrapper`, {
      [wrapperClassName]: (addonBefore || addonAfter),
    });

    // Need another wrapper for changing display:table to display:inline-block
    // and put style prop in wrapper
    if (addonBefore || addonAfter) {
      return (
        <span
          className={`${props.prefixCls}-group-wrapper`}
          style={props.style}
        >
          <span className={className}>
            {addonBefore}
            {cloneElement(children, { style: null })}
            {addonAfter}
          </span>
        </span>
      );
    }
    return (
      <span className={className}>
        {addonBefore}
        {children}
        {addonAfter}
      </span>
    );
  }

  renderLabeledIcon(children) {
    const { props } = this;
    if (!('prefix' in props || 'suffix' in props)) {
      return children;
    }

    const prefix = props.prefix ? (
      <span className={`${props.prefixCls}-prefix`}>
        {props.prefix}
      </span>
    ) : null;

    const suffix = props.suffix ? (
      <span className={`${props.prefixCls}-suffix`}>
        {props.suffix}
      </span>
    ) : null;

    return (
      <span
        className={classNames(props.className, `${props.prefixCls}-affix-wrapper`)}
        style={props.style}
      >
        {prefix}
        {cloneElement(children, { style: null, className: this.getInputClassName() })}
        {suffix}
      </span>
    );
  }

  renderInput() {
    const { value, className } = this.props;
    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
    ]);

    if ('value' in this.props) {
      otherProps.value = fixControlledValue(value);
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      delete otherProps.defaultValue;
    }
    return this.renderLabeledIcon(
      <input
        {...otherProps}
        className={classNames(this.getInputClassName(), className)}
        onKeyDown={this.handleKeyDown}
        ref="input"
      />,
    );
  }

  render() {
    if (this.props.type === 'textarea') {
      return <TextArea {...this.props as any} ref="input" />;
    }
    return this.renderLabeledInput(this.renderInput());
  }
}
