import React from 'react';

export default class Portal extends React.Component {
  componentDidMount() {
    this.createContainer();
  }

  createContainer() {
    this.container = true;
    this.forceUpdate();
  }

  render() {
    if (this.container) {
      return this.props.children;
    }
    return null;
  }
}
