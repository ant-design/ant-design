import React, { PropTypes } from 'react';

export interface ComponentProps {
  locale?: any;
}

export interface ComponentContext {
  antLocale?: { [key: string]: any };
}

export default function<P, S>(componentName: string, defaultLocale) {
  return class Localizable extends React.Component<P & ComponentProps, S> {
    static contextTypes = {
      antLocale: PropTypes.object,
    };
    context: ComponentContext;
    getLocale() {
      const { antLocale } = this.context;
      const localeFromContext = antLocale && antLocale[componentName];
      const localeFromProps: any = this.props.locale || {};
      return {
        ...defaultLocale,
        ...(localeFromContext || {}),
        ...localeFromProps,
      };
    }
  };
}
