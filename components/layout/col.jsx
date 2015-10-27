import React from 'react';

const Col = React.createClass({
  propTypes: {
    span: React.PropTypes.string,
    order: React.PropTypes.string,
    offset: React.PropTypes.string,
    push: React.PropTypes.string,
    pull: React.PropTypes.string,
    children: React.PropTypes.node,
  },

  render() {
    const {span, order, offset, push, pull } = this.props;
    let className = `col-${span}`;

    if (order) {
      className += ` col-order-${order}`;
    }

    if (offset) {
      className += ` col-offset-${offset}`;
    }

    if (push) {
      className += ` col-push-${push}`;
    }

    if (pull) {
      className += ` col-pull-${pull}`;
    }
    return <div {...this.props} className={className}>{ this.props.children }</div>;
  },
});

export default Col;
