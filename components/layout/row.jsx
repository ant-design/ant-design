import React from 'react';
import rcUtil from 'rc-util';

const Row = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    align: React.PropTypes.string,
    justify: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
  },
  render() {
    const { type, justify, align, className, ...others } = this.props;
    const classes = rcUtil.classSet({
      'row': true,
      ['row-' + type]: type,
      ['row-' + type + '-' + justify]: justify,
      ['row-' + type + '-' + align]: align,
      [className]: className,
    });
    return <div {...others} className={classes}>{ this.props.children }</div>;
  },
});

export default Row;
