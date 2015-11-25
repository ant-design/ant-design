import React from 'react';
import classNames from 'classnames';

const Col = React.createClass({
  propTypes: {
    span: React.PropTypes.string,
    order: React.PropTypes.string,
    offset: React.PropTypes.string,
    push: React.PropTypes.string,
    pull: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
  },
  render() {
    const {span, order, offset, push, pull, className, ...others} = this.props;
    const classes = classNames({
      ['col-' + span]: span,
      ['col-order-' + order]: order,
      ['col-offset-' + offset]: offset,
      ['col-push-' + push]: push,
      ['col-pull-' + pull]: pull,
      [className]: className,
    });
    return <div {...others} className={classes}>{ this.props.children }</div>;
  },
});

export default Col;
