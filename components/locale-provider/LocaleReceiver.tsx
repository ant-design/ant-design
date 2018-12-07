import * as React from 'react';
import * as PropTypes from 'prop-types';
import defaultLocaleData from './default';

const defaultComponentName = 'global';

export interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: object | Function;
  children: (locale: object, localeCode?: string) => React.ReactElement<any>;
}

export interface LocaleReceiverContext {
  antLocale?: { [key: string]: any };
}

export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
  static defaultProps = {
    componentName: defaultComponentName,
    defaultLocale: defaultLocaleData[defaultComponentName],
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: LocaleReceiverContext;

  getLocale() {
    const { componentName, defaultLocale } = this.props;
    const { antLocale } = this.context;
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return {
      ...(typeof defaultLocale === 'function' ? defaultLocale() : defaultLocale),
      ...(localeFromContext || {}),
    };
  }

  getLocaleCode() {
    const { antLocale } = this.context;
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  }

  render() {
    return this.props.children(this.getLocale(), this.getLocaleCode());
  }
}
