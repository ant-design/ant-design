import React from 'react';
import { Alert } from 'antd';

export default class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { children } = this.props;
    const { error, info } = this.state;
    if (error) {
      // You can render any custom fallback UI
      return <Alert type="error" message={error.toString()} description={info.componentStack} />;
    }
    return children;
  }
}
