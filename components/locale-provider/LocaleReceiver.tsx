import * as React from 'react';
import defaultLocaleData from './default';
import LocaleContext from './context';
import { Locale } from '.';

export interface LocaleReceiverProps<C extends keyof Locale = keyof Locale> {
  componentName: C;
  defaultLocale?: Locale[C] | (() => Locale[C]);
  children: (locale: Exclude<Locale[C], undefined>, localeCode?: string, fullLocale?: object) => React.ReactNode;
}


export default class LocaleReceiver<C extends keyof Locale = keyof Locale> extends React.Component<LocaleReceiverProps<C>> {
  static defaultProps = {
    componentName: 'global',
  };

  static contextType = LocaleContext;

  getLocale(): Exclude<Locale[C], undefined> {
    const { componentName, defaultLocale } = this.props;
    const locale =
      defaultLocale || defaultLocaleData[componentName ?? 'global'];
    const antLocale = this.context;
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {}),
    };
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
    const locale = defaultLocale || defaultLocaleData[componentName || 'global'];
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};

    return {
      ...(typeof locale === 'function' ? (locale as Function)() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);

  return [componentLocale];
}
