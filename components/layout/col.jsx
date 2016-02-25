import React, { PropTypes } from 'react';
import classNames from 'classnames';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const Col = React.createClass({
  propTypes: {
    span: stringOrNumber,
    order: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: PropTypes.string,
    children: PropTypes.node,
  },
  render() {
    const { span, order, offset, push, pull, className, ...others } = this.props;
    const classes = classNames({
      [`col-${span}`]: span,
      [`col-order-${order}`]: order,
      [`col-offset-${offset}`]: offset,
      [`col-push-${push}`]: push,
      [`col-pull-${pull}`]: pull,
      [className]: !!className,
    });
    return <div {...others} className={classes}>{ this.props.children }</div>;
  },
});

export default Col;
