import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://2a2c2568315846dab9083a32e37f61fc@sentry.io/1375737',
});

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
