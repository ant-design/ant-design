import React from 'react';
import classNames from 'classnames';

export default class Group extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
  }

  render() {
    const className = classNames({
      'ant-input-group': true,
      [this.props.className]: !!this.props.className,
    });
    return (
      <span className={className} style={this.props.style}>
        {this.props.children}
      </span>
    );
  }
}
