import React from 'react';
import { classSet } from 'rc-util';
import { isCssAnimationSupported } from 'css-animation';

const AntSpin = React.createClass({
  getDefaultProps() {
    return {
      size: 'default',
      spining: true
    };
  },

  propTypes: {
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'default', 'large'])
  },

  isNestedPattern() {
    return !!(this.props && this.props.children);
  },

  render() {
    const { className, size, ...others } = this.props;

    let spinClassName = classSet({
      'ant-spin': true,
      [`ant-spin-${size}`]: size,
      [className]: !!className,
      'ant-spin-spining': this.props.spining,
    });

    let spinElement;
    if (!isCssAnimationSupported) {
      // not support for animation, just use text instead
      spinElement = <div className={spinClassName}>加载中...</div>;
    } else {
      spinElement = (
        <div className={spinClassName}>
          <span className="ant-spin-dot ant-spin-dot-first" />
          <span className="ant-spin-dot ant-spin-dot-second" />
          <span className="ant-spin-dot ant-spin-dot-third" />
        </div>
      );
    }

    if (this.isNestedPattern()) {
      return (
        <div className={this.props.spining ? 'ant-spin-nested-loading' : ''}>
          {spinElement}
          <div className="ant-spin-container">
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return spinElement;
    }
  }
});

export default AntSpin;
