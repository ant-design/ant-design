import * as React from 'react';
import type { Locale } from '.';
import type { LocaleContextProps } from './context';
import LocaleContext from './context';
import defaultLocaleData from './en_US';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

const useLocale = <C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
  defaultLocale?: Locale[C] | (() => Locale[C]),
): Locale[C] => {
  const antLocale = React.useContext<LocaleContextProps | undefined>(LocaleContext);
  return React.useMemo<NonNullable<Locale[C]>>(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = antLocale?.[componentName] ?? {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);
};

export default useLocale;
