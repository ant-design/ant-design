import React, { PropTypes } from 'react';

export interface ComponentProps {
  locale?: any;
}

export interface ComponentContext {
  antLocale?: { [key: string]: any };
}

export default (componentName: string, defaultLocale) => (
  function<P>(Component: typeof React.Component): React.ComponentClass<P> {
    return class extends Component<P & ComponentProps, any> {
      static contextTypes = {
        antLocale: PropTypes.object,
      };

      context: ComponentContext;

      getLocale() {
        const { antLocale } = this.context;
        return this.props.locale || (antLocale && antLocale[componentName]) || defaultLocale;
      }
    };
  }
);
