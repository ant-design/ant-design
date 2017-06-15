import React from 'react';
import PropTypes from 'prop-types';

export interface ComponentProps {
  locale?: any;
}

export interface ComponentContext {
  antLocale?: { [key: string]: any };
}

export default (componentName: string, defaultLocale) => (
  function<P>(Component: typeof React.Component): React.ComponentClass<P> {
    const ComponentWithStatics = Component as any;
    return class extends Component<P & ComponentProps, any> {
      static propTypes = ComponentWithStatics.propTypes;
      static defaultProps = ComponentWithStatics.defaultProps;
      static contextTypes = {
        ...(ComponentWithStatics.context || {}),
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
);
