import * as React from 'react';
import type { Locale } from '.';
import type { LocaleContextProps } from './context';
import LocaleContext from './context';
import defaultLocaleData from '../locale/en_US';

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface LocaleReceiverProps<C extends LocaleComponentName = LocaleComponentName> {
  componentName?: C;
  defaultLocale?: Locale[C] | (() => Locale[C]);
  children: (
    locale: NonNullable<Locale[C]>,
    localeCode: string,
    fullLocale: Locale,
  ) => React.ReactElement;
}

const LocaleReceiver = <C extends LocaleComponentName = LocaleComponentName>(
  props: LocaleReceiverProps<C>,
) => {
  const { componentName = 'global' as C, defaultLocale, children } = props;
  const antLocale = React.useContext<LocaleContextProps | undefined>(LocaleContext);

  const getLocale = React.useMemo<NonNullable<Locale[C]>>(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = antLocale?.[componentName] ?? {};
    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);

  const getLocaleCode = React.useMemo<string>(() => {
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode!;
  }, [antLocale]);

  return children(getLocale, getLocaleCode, antLocale!);
};

export default LocaleReceiver;

export const useLocaleReceiver = <C extends LocaleComponentName = LocaleComponentName>(
  componentName: C,
  defaultLocale?: Locale[C] | (() => Locale[C]),
): [Locale[C]] => {
  const antLocale = React.useContext<LocaleContextProps | undefined>(LocaleContext);

  const getLocale = React.useMemo<NonNullable<Locale[C]>>(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = antLocale?.[componentName] ?? {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);

  return [getLocale];
};
