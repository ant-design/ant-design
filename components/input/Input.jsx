import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import calculateNodeHeight from './calculateNodeHeight';
import omit from 'object.omit';

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

export default class Input extends Component {
  static defaultProps = {
    defaultValue: '',
    disabled: false,
    prefixCls: 'ant-input',
    type: 'text',
    onPressEnter() {},
    onKeyDown() {},
    onChange() {},
    autosize: false,
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
    autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      textareaStyles: null,
    };
  }

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
    if (e.keyCode === 13) {
      this.props.onPressEnter(e);
    }
    this.props.onKeyDown(e);
  }

  handleTextareaChange = (e) => {
    if (!('value' in this.props)) {
      this.resizeTextarea();
    }
    this.props.onChange(e);
  }

  resizeTextarea = () => {
    const { type, autosize } = this.props;
    if (type !== 'textarea' || !autosize || !this.refs.input) {
      return;
    }
    const minRows = autosize ? autosize.minRows : null;
    const maxRows = autosize ? autosize.maxRows : null;
    const textareaStyles = calculateNodeHeight(this.refs.input, false, minRows, maxRows);
    this.setState({ textareaStyles });
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

    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(this.props, [
      'prefixCls',
      'onPressEnter',
      'autosize',
      'addonBefore',
      'addonAfter',
    ]);

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
            style={{
              ...props.style,
              ...this.state.textareaStyles,
            }}
            className={inputClassName}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleTextareaChange}
            ref="input"
          />
        );
      default:
        return (
          <input
            {...otherProps}
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
