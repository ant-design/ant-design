import React from 'react';
import { classSet } from 'rc-util';

let AntSpin = React.createClass({
  getDefaultProps() {
    return {
      size: 'default',
      type: 'default'
    };
  },

  propTypes: {
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'default', 'large']),
    type: React.PropTypes.oneOf(['default', 'primary'])
  },

  render() {
    const prefix = 'ant-spin';
    const {type, size, className, ...others} = this.props;
    const sizeCls = ({
      'large': 'lg',
      'small': 'sm'
    })[size] || '';

    let componentClassName = classSet({
      'ant-spin': true,
      [`${prefix}-${type}`]: type,
      [`${prefix}-${sizeCls}`]: sizeCls,
      [className]: !!className
    });

    return (
      <div {...this.props} className={ componentClassName }>
        <span className="ant-spin-dot ant-spin-dot-first" />
        <span className="ant-spin-dot ant-spin-dot-second" />
        <span className="ant-spin-dot ant-spin-dot-third" />
      </div>
    );
  }
});

export default AntSpin;
