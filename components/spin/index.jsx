import React from 'react';
import { classSet } from 'rc-util';

let AntSpin = React.createClass({
  getDefaultProps() {
    return {
      size: 'sm',
      type: 'default'
    };
  },

  propTypes: {
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf(['sm', 'md', 'lg']),
    type: React.PropTypes.oneOf(['default', 'primary', 'inverted'])
  },

  render() {
    const props = this.props;
    
    let className = classSet({
      spin: 1,
      [`spin-${props.type}`]: 1,
      [`spin-${props.size}`]: 1,
      [props.className]: !!props.className
    });

    return (
      <div className={ className }>
        <span className="spin-dot spin-dot-first" />
        <span className="spin-dot spin-dot-second" />
        <span className="spin-dot spin-dot-third" />
      </div>
    );
  }
});

export default AntSpin;
