import * as React from 'react';
import defaultLocaleData from './default';
import LocaleContext from './context';

export interface LocaleReceiverProps {
  componentName?: string;
  defaultLocale?: object | Function;
  children: (locale: object, localeCode?: string, fullLocale?: object) => React.ReactNode;
}

interface LocaleInterface {
  [key: string]: any;
}

export interface LocaleReceiverContext {
  antLocale?: LocaleInterface;
}
const LocaleReceiver: React.FC<LocaleReceiverProps> = ({
  componentName = 'global',
  defaultLocale,
  children,
}) => {
  const antLocale = React.useContext(LocaleContext);
  const getLocale = () => {
    const locale: object | Function =
      defaultLocale || (defaultLocaleData as LocaleInterface)[componentName || 'global'];
    const localeFromContext =
      componentName && antLocale ? (antLocale as LocaleInterface)[componentName] : {};
    return {
      ...(typeof locale === 'function' ? locale() : locale),
      ...(localeFromContext || {}),
    };
  };

  const getLocaleCode = () => {
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  };

  return children(getLocale(), getLocaleCode(), antLocale) as React.ReactElement;
};

export default LocaleReceiver;
