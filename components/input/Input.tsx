import React from 'react';
import { Component, PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
import assign from 'object-assign';
import omit from 'omit.js';

function fixControlledValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
};

export interface InputProps {
  prefixCls?: string;
  className?: string;
  type?: string;
  id?: number | string;
  name?: string;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  size?: 'large' | 'default' | 'small';
  disabled?: boolean;
  readOnly?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  onKeyDown?: React.FormEventHandler<any>;
  onChange?: React.FormEventHandler<any>;
  onPressEnter?: React.FormEventHandler<any>;
  onClick?: React.FormEventHandler<any>;
  onFocus?: React.FormEventHandler<any>;
  onBlur?: React.FormEventHandler<any>;
  autosize?: boolean | AutoSizeType;
  autoComplete?: 'on' | 'off';
  style?: React.CSSProperties;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  spellCheck?: boolean;
}

export default class Input extends Component<InputProps, any> {
  static Group: any;
  static Search: any;
  static defaultProps = {
    disabled: false,
    prefixCls: 'ant-input',
    type: 'text',
    autosize: false,
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

  nextFrameActionId: number;
  refs: {
    input: any;
  };

  state = {
    textareaStyles: null,
    isFocus: false,
  };

  componentDidMount() {
    this.resizeTextarea();
  }

  componentWillReceiveProps(nextProps) {
    // Re-render with the new content then recalculate the height as required.
    if (this.props.value !== nextProps.value) {
      if (this.nextFrameActionId) {
        clearNextFrameAction(this.nextFrameActionId);
      }
      this.nextFrameActionId = onNextFrame(this.resizeTextarea);
    }
  }

  handleKeyDown = (e) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  }

  handleTextareaChange = (e) => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(e);
    }
  }

  resizeTextarea = () => {
    const { type, autosize } = this.props;
    if (type !== 'textarea' || !autosize || !this.refs.input) {
      return;
    }
    const minRows = autosize ? (autosize as AutoSizeType).minRows : null;
    const maxRows = autosize ? (autosize as AutoSizeType).maxRows : null;
    const textareaStyles = calculateNodeHeight(this.refs.input, false, minRows, maxRows);
    this.setState({ textareaStyles });
  }

  focus() {
    this.refs.input.focus();
  }

  renderLabeledInput(children) {
    const props = this.props;

    // Not wrap when there is not addons
    if (props.type === 'textarea' || (!props.addonBefore && !props.addonAfter)) {
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

  renderLabeledIcon(children) {
    const { props } = this;

    if (props.type === 'textarea' || !('prefix' in props || 'suffix' in props)) {
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
      <span className={`${props.prefixCls}-affix-wrapper`} style={props.style}>
        {prefix}
        {cloneElement(children, { style: null })}
        {suffix}
      </span>
    );
  }

  renderInput() {
    const props = assign({}, this.props);
    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'autosize',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
    ]);

    const prefixCls = props.prefixCls;
    if (!props.type) {
      return props.children;
    }

    const inputClassName = classNames(prefixCls, {
      [`${prefixCls}-sm`]: props.size === 'small',
      [`${prefixCls}-lg`]: props.size === 'large',
    }, props.className);

    if ('value' in props) {
      otherProps.value = fixControlledValue(props.value);
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      delete otherProps.defaultValue;
    }

    switch (props.type) {
      case 'textarea':
        return (
          <textarea
            {...otherProps}
            style={assign({}, props.style, this.state.textareaStyles)}
            className={inputClassName}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleTextareaChange}
            ref="input"
          />
        );
      default:
        return this.renderLabeledIcon(
          <input
            {...otherProps}
            className={inputClassName}
            onKeyDown={this.handleKeyDown}
            ref="input"
          />,
        );
    }
  }

  render() {
    return this.renderLabeledInput(this.renderInput());
  }
}
