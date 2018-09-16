import * as React from 'react';
import Alert from './';

export default class ErrorBoundary extends React.Component<{}, any> {
  state = {
    error: undefined,
    info: {
      componentStack: '',
    },
  };

  componentDidCatch(error: Error | null, info: object) {
    this.setState({ error, info });
  }

  render() {
    const { children } = this.props;
    const { error, info } = this.state;
    if (error) {
      // You can render any custom fallback UI
      return (
        <Alert
          type="error"
          message={(error as Error).toString()}
          description={(info && info.componentStack) ? info.componentStack : null}
        />
      );
    }
    return children;
  }
}
