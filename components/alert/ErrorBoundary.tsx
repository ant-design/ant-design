import * as React from 'react';

import isNonNullable from '../_util/isNonNullable';
import Alert from './Alert';

export interface ErrorBoundaryProps {
  title?: React.ReactNode;
  /**
   * @deprecated please use `title` instead.
   */
  message?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}

export interface ErrorBoundaryStates {
  error?: Error | null;
  info?: React.ErrorInfo;
}

class ErrorBoundary extends React.PureComponent<ErrorBoundaryProps, ErrorBoundaryStates> {
  state: ErrorBoundaryStates = {
    error: undefined,
    info: {},
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error, info });
  }

  render() {
    const { message, title, description, id, children } = this.props;
    const { error, info } = this.state;
    const mergedTitle = title ?? message;
    const componentStack = info?.componentStack || null;
    const errorMessage = isNonNullable(mergedTitle) ? mergedTitle : error?.toString();
    const errorDescription = isNonNullable(description) ? description : componentStack;
    if (error) {
      return (
        <Alert
          id={id}
          type="error"
          title={errorMessage}
          description={
            <pre style={{ fontSize: '0.9em', overflowX: 'auto' }}>{errorDescription}</pre>
          }
        />
      );
    }
    return children;
  }
}

export default ErrorBoundary;
