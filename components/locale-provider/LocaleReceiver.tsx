import * as React from 'react';
import * as PropTypes from 'prop-types';
import defaultLocaleData from './default';

export interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: object | Function;
  children: (locale: object, localeCode?: string) => React.ReactNode;
}

interface LocaleInterface {
  [key: string]: any;
}

export interface LocaleReceiverContext {
  antLocale?: LocaleInterface;
}

export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
  static defaultProps = {
    componentName: 'global',
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: LocaleReceiverContext;

  getLocale() {
    const { componentName, defaultLocale } = this.props;
    const locale: object | Function =
      defaultLocale || (defaultLocaleData as LocaleInterface)[componentName || 'global'];
    const { antLocale } = this.context;
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
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
