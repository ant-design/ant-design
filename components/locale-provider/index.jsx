import React from 'react';

export default class LocaleProvider extends React.Component {
  getChildContext() {
    return {
      locale: this.props.locale,
    };
  }
  render() {
    return React.cloneElement(this.props.children);
  }
}

LocaleProvider.childContextTypes = {
  locale: React.PropTypes.object,
};

LocaleProvider.propTypes = {
  locale: React.PropTypes.object,
};
