// TODO: remove this lint
// SFC has specified a displayName, but not worked.
/* eslint-disable react/display-name */
import * as React from 'react';
import { FormProvider as RcFormProvider } from 'rc-field-form';
import { ValidateMessages } from 'rc-field-form/lib/interface';
import { RenderEmptyHandler } from './renderEmpty';
import LocaleProvider, { Locale, ANT_MARK } from '../locale-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer, ConfigContext, CSPConfig, ConfigConsumerProps } from './context';

export { RenderEmptyHandler, ConfigContext, ConfigConsumer, CSPConfig, ConfigConsumerProps };

export const configConsumerProps = [
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
];

export interface ConfigProviderProps {
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: {
    validateMessages?: ValidateMessages;
  };
  locale?: Locale;
  pageHeader?: {
    ghost: boolean;
  };
}

class ConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = 'ant' } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  };

  renderProvider = (context: ConfigConsumerProps, legacyLocale: Locale) => {
    const {
      children,
      getPopupContainer,
      renderEmpty,
      csp,
      autoInsertSpaceInButton,
      form,
      locale,
      pageHeader,
    } = this.props;

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: this.getPrefixCls,
      csp,
      autoInsertSpaceInButton,
    };

    if (getPopupContainer) {
      config.getPopupContainer = getPopupContainer;
    }

    if (renderEmpty) {
      config.renderEmpty = renderEmpty;
    }

    if (pageHeader) {
      config.pageHeader = pageHeader;
    }

    let childNode = children;

    // Additional Form provider
    if (form && form.validateMessages) {
      childNode = (
        <RcFormProvider validateMessages={form.validateMessages}>{children}</RcFormProvider>
      );
    }

    return (
      <ConfigContext.Provider value={config}>
        <LocaleProvider locale={locale || legacyLocale} _ANT_MARK__={ANT_MARK}>
          {childNode}
        </LocaleProvider>
      </ConfigContext.Provider>
    );
  };

  render() {
    return (
      <LocaleReceiver>
        {(_, __, legacyLocale) => (
          <ConfigConsumer>
            {context => this.renderProvider(context, legacyLocale as Locale)}
          </ConfigConsumer>
        )}
      </LocaleReceiver>
    );
  }
}

export default ConfigProvider;
