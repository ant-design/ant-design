import * as React from 'react';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import defaultLocaleData from './default';
import LocaleContext from './context';
import { Locale } from '.';

interface LocaleInterface {
  [key: string]: any;
}

export interface LocaleReceiverContext {
  antLocale?: LocaleInterface;
}

type LocaleComponent = keyof Locale;
export function useLocaleReceiver<T extends LocaleComponent>(
  componentName: T,
  defaultLocale?: Locale[T] | Function,
  locale?: Locale[T],
): [Locale[T]] {
  const antLocale = React.useContext(LocaleContext);

  const componentLocale = React.useMemo(() => {
    const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};

    return merge(
      cloneDeep(
        typeof defaultLocale === 'function' ? (defaultLocale as Function)() : defaultLocale,
      ),
      (defaultLocaleData as LocaleInterface)[componentName || 'global'],
      localeFromContext,
      locale,
    );
  }, [componentName, defaultLocale, antLocale, locale]);

  return [componentLocale];
}

export interface LocaleReceiverProps {
  componentName?: LocaleComponent;
  defaultLocale?: object | Function;
  locale?: object;
  children: (locale: object, localeCode?: string, fullLocale?: object) => JSX.Element;
}

const LocaleReceiver = ({
  children,
  locale,
  defaultLocale,
  componentName = 'global',
}: LocaleReceiverProps): JSX.Element => {
  const antLocale = React.useContext(LocaleContext);
  const [componentLocale] = useLocaleReceiver(componentName, defaultLocale, locale);

  function getLocaleCode() {
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  }

  return children(componentLocale, getLocaleCode(), antLocale);
};

export default LocaleReceiver;
