import React from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';
import warning from 'warning';

export default class Spin extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-spin',
    spinning: true,
  }

  constructor(props) {
    super(props);
    const spinning = this.getSpinning(props);
    this.state = {
      spinning,
    };
  }

  static propTypes = {
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'default', 'large']),
  }

  isNestedPattern() {
    return !!(this.props && this.props.children);
  }

  componentDidMount() {
    warning(!('spining' in this.props), '`spining` property of Popover is a spell mistake, use `spinning` instead.');
    if (!isCssAnimationSupported()) {
      // Show text in IE8/9
      findDOMNode(this).className += ` ${this.props.prefixCls}-show-text`;
    }
  }

  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
  }

  getSpinning(props) {
    // Backwards support
    if ('spining' in props) {
      warning(false, '`spining` property of Spin is a spell mistake, use `spinning` instead.');
      return props.spining;
    }
    return props.spinning;
  }

  componentWillReceiveProps(nextProps) {
    const spinning = this.getSpinning(nextProps);
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (spinning) {
      this.debounceTimeout = setTimeout(() => this.setState({ spinning }), 250);
    } else {
      this.setState({ spinning });
    }
  }

  render() {
    const { className, size, prefixCls, tip, ...restProps } = this.props;
    const { spinning } = this.state;

    const spinClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-spinning`]: spinning,
      [`${prefixCls}-show-text`]: !!this.props.tip,
      [className]: !!className,
    });

    const spinElement = (
      <div {...restProps} className={spinClassName}>
        <span className={`${prefixCls}-dot ${prefixCls}-dot-first`} />
        <span className={`${prefixCls}-dot ${prefixCls}-dot-second`} />
        <span className={`${prefixCls}-dot ${prefixCls}-dot-third`} />
        <div className={`${prefixCls}-text`}>{tip || '加载中...'}</div>
      </div>
    );

    if (this.isNestedPattern()) {
      return (
        <div {...restProps} className={spinning ? (`${prefixCls}-nested-loading`) : ''}>
          {spinElement}
          <div className={`${prefixCls}-container`}>
            {this.props.children}
          </div>
        </div>
      );
    }
    return spinElement;
  }
}
