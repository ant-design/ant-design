import * as React from 'react';
import type { Locale } from '.';
import type { LocaleContextProps } from './context';
import LocaleContext from './context';
import defaultLocaleData from './default';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface LocaleReceiverProps<C extends LocaleComponentName = LocaleComponentName> {
  componentName?: C;
  defaultLocale?: Locale[C] | (() => Locale[C]);
  children: (
    locale: NonNullable<Locale[C]>,
    localeCode: string,
    fullLocale: Locale,
  ) => React.ReactNode;
}

const LocaleReceiver = <C extends LocaleComponentName = LocaleComponentName>(
  props: LocaleReceiverProps<C>,
) => {
  const { componentName = 'global', defaultLocale, children } = props;
  const antLocale = React.useContext<LocaleContextProps | null>(LocaleContext);
  const getLocale = (): NonNullable<Locale[C]> => {
    const locale = (defaultLocale || defaultLocaleData[componentName]) as Locale[C];
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {}),
    };
  };
  const getLocaleCode = (): string => {
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode!;
  };
  return <>{children(getLocale(), getLocaleCode(), antLocale!)}</>;
};

export default LocaleReceiver;

export function useLocaleReceiver<T extends LocaleComponentName = LocaleComponentName>(
  componentName: T,
  defaultLocale?: Locale[T] | Function,
): [Locale[T]] {
  const antLocale = React.useContext<LocaleContextProps | null>(LocaleContext);

  const componentLocale = React.useMemo<Locale[T]>(() => {
    const locale = defaultLocale || defaultLocaleData[componentName || 'global'];
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);

  return [componentLocale];
}
