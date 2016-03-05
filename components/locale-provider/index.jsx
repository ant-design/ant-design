import React from 'react';

export default class LocaleProvider extends React.Component {
  getChildContext() {
    return {
      antLocale: this.props.locale,
    };
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

LocaleProvider.childContextTypes = {
  antLocale: React.PropTypes.object,
};

LocaleProvider.propTypes = {
  locale: React.PropTypes.object,
};
