import * as React from 'react';
import { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import isCssAnimationSupported from '../_util/isCssAnimationSupported';
import warning from 'warning';
import splitObject from '../_util/splitObject';
import omit from 'object.omit';

export interface SpinProps {
  prefixCls?: string;
  className?: string;
  spinning?: boolean;
  size?: 'small' | 'default' | 'large';
  tip?: string;
}

export default class Spin extends React.Component<SpinProps, any> {
  static defaultProps = {
    prefixCls: 'ant-spin',
    spinning: true,
    size: 'default',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
  };

  debounceTimeout: number;

  constructor(props) {
    super(props);
    const spinning = this.getSpinning(props);
    this.state = {
      spinning,
    };
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
    const currentSpinning = this.getSpinning(this.props);
    const spinning = this.getSpinning(nextProps);
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (currentSpinning && !spinning) {
      this.debounceTimeout = setTimeout(() => this.setState({ spinning }), 500);
    } else {
      this.setState({ spinning });
    }
  }

  render() {
    const [{
      className, size, prefixCls, tip,
    }, restProps] = splitObject(this.props,
      ['className', 'size', 'prefixCls', 'tip']);
    const { spinning } = this.state;

    const spinClassName = classNames({
      [prefixCls]: true,
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-spinning`]: spinning,
      [`${prefixCls}-show-text`]: !!this.props.tip,
      [className]: !!className,
    });

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(restProps, [
      'spinning',
    ]);

    const spinElement = (
      <div {...divProps} className={spinClassName}>
        <span className={`${prefixCls}-dot`} />
        <div className={`${prefixCls}-text`}>{tip || '加载中...'}</div>
      </div>
    );

    if (this.isNestedPattern()) {
      return (
        <div {...divProps} className={spinning ? (`${prefixCls}-nested-loading`) : ''}>
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
