import * as React from 'react';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import defaultLocaleData from './default';
import LocaleContext from './context';
import { Locale } from '.';

export interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: object | Function;
  locale?: object;
  children: (locale: object, localeCode?: string, fullLocale?: object) => React.ReactNode;
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

  static contextType = LocaleContext;

  getLocale() {
    const { componentName, defaultLocale, locale } = this.props;
    const antLocale = this.context;

    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};

    return merge(
      cloneDeep(
        typeof defaultLocale === 'function' ? (defaultLocale as Function)() : defaultLocale || {},
      ),
      (defaultLocaleData as LocaleInterface)[componentName || 'global'],
      localeFromContext,
      locale,
    );
  }

  getLocaleCode() {
    const antLocale = this.context;
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  }

  render() {
    return this.props.children(this.getLocale(), this.getLocaleCode(), this.context);
  }
}

type LocaleComponent = keyof Locale;
export function useLocaleReceiver<T extends LocaleComponent>(
  componentName: T,
  defaultLocale?: Locale[T] | Function,
): [Locale[T]] {
  const antLocale = React.useContext(LocaleContext);

  const componentLocale = React.useMemo(() => {
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};

    return merge(
      cloneDeep(
        typeof defaultLocale === 'function' ? (defaultLocale as Function)() : defaultLocale,
      ),
      cloneDeep(localeFromContext),
      (defaultLocaleData as LocaleInterface)[componentName || 'global'],
    );
  }, [componentName, defaultLocale, antLocale]);

  return [componentLocale];
}
