import React from 'react';

const Row = React.createClass({
  propType: {
    type: React.PropTypes.string,
    align: React.PropTypes.string,
    justify: React.PropTypes.string,
    children: React.PropTypes.node,
  },

  render() {
    const { type, justify, align } = this.props;
    let className = 'row';

    if (type || justify || align) {
      className += ` row-flex`;
    }

    if (justify) {
      className += ` row-flex-${justify}`;
    }

    if (align) {
      className += ` row-flex-${align}`;
    }

    return <div {...this.props} className={className}>{ this.props.children }</div>
  },
});

export default Row;