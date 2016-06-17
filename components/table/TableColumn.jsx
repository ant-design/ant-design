import React, { Component } from 'react';

export default class TableColumn extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    dataIndex: React.PropTypes.string,
    render: React.PropTypes.func,
  };

  render() {
    return null;
  }
}
