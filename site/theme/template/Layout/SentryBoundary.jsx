import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

// Temp remove sentry since this break the demo:
// https://github.com/ant-design/ant-design/issues/14576
// Sentry.init({
//   dsn: 'https://41977dd48e5b4da2aa3600ccbe7dda6d@sentry.io/1375756',
// });

export default class SentryBoundary extends Component {
  state = { error: null };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;
    if (error) {
      // render fallback UI
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>;
    }
    // when there's not an error, render children untouched
    return children;
  }
}
