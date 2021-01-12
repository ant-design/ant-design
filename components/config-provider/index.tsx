import * as React from 'react';
import { FormProvider as RcFormProvider } from 'rc-field-form';
import { ValidateMessages } from 'rc-field-form/lib/interface';
import { RenderEmptyHandler } from './renderEmpty';
import LocaleProvider, { Locale, ANT_MARK } from '../locale-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import {
  ConfigConsumer,
  ConfigContext,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
} from './context';
import { SizeType, SizeContextProvider } from './SizeContext';
import message from '../message';
import notification from '../notification';
import { RequiredMark } from '../form/Form';

export {
  RenderEmptyHandler,
  ConfigContext,
  ConfigConsumer,
  CSPConfig,
  DirectionType,
  ConfigConsumerProps,
};

export const configConsumerProps = [
  'getTargetContainer',
  'getPopupContainer',
  'rootPrefixCls',
  'getPrefixCls',
  'renderEmpty',
  'csp',
  'autoInsertSpaceInButton',
  'locale',
  'pageHeader',
  'form',
  'virtual',
  'input',
  'dropdownMatchSelectWidth',
  'space',
];

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  prefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: {
    validateMessages?: ValidateMessages;
    requiredMark?: RequiredMark;
  };
  input?: {
    autoComplete?: string;
  };
  locale?: Locale;
  pageHeader?: {
    ghost: boolean;
  };
  componentSize?: SizeType;
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
  };
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
  legacyLocale: Locale;
}

const ProviderChildren: React.FC<ProviderChildrenProps> = props => {
  const {
    children,
    getTargetContainer,
    getPopupContainer,
    renderEmpty,
    csp,
    autoInsertSpaceInButton,
    form,
    input,
    locale,
    pageHeader,
    componentSize,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    legacyLocale,
    parentContext,
  } = props;

  const getPrefixClsWrapper = (context: ConfigConsumerProps) => (
    suffixCls: string,
    customizePrefixCls?: string,
  ) => {
    const { prefixCls } = props;

    if (customizePrefixCls) return customizePrefixCls;

    const mergedPrefixCls = prefixCls || context.getPrefixCls('');

    return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
  };

  const getPrefixCls = React.useMemo(() => getPrefixClsWrapper(parentContext), [
    parentContext.getPrefixCls,
  ]);

  const getConfig = (): ConfigConsumerProps => {
    const config = {
      ...parentContext,
      csp,
      autoInsertSpaceInButton,
      locale: locale || legacyLocale,
      direction,
      space,
      virtual,
      dropdownMatchSelectWidth,
      getPrefixCls,
    };
    if (getTargetContainer) {
      config.getTargetContainer = getTargetContainer;
    }

    if (getPopupContainer) {
      config.getPopupContainer = getPopupContainer;
    }

    if (renderEmpty) {
      config.renderEmpty = renderEmpty;
    }

    if (pageHeader) {
      config.pageHeader = pageHeader;
    }

    if (input) {
      config.input = input;
    }

    if (form) {
      config.form = form;
    }

    return config;
  };

  const config = getConfig();

  // https://github.com/ant-design/ant-design/issues/27617
  const memoedConfig = React.useMemo(
    () => getConfig(),
    configConsumerProps.map(k => (config as Record<string, any>)[k]),
  );

  let childNode = children;
  // Additional Form provider
  let validateMessages: ValidateMessages = {};

  if (locale && locale.Form && locale.Form.defaultValidateMessages) {
    validateMessages = locale.Form.defaultValidateMessages;
  }
  if (form && form.validateMessages) {
    validateMessages = { ...validateMessages, ...form.validateMessages };
  }

  if (Object.keys(validateMessages).length > 0) {
    childNode = <RcFormProvider validateMessages={validateMessages}>{children}</RcFormProvider>;
  }

  const childrenWithLocale =
    locale === undefined ? (
      childNode
    ) : (
      <LocaleProvider locale={locale} _ANT_MARK__={ANT_MARK}>
        {childNode}
      </LocaleProvider>
    );

  return (
    <SizeContextProvider size={componentSize}>
      <ConfigContext.Provider value={memoedConfig}>{childrenWithLocale}</ConfigContext.Provider>
    </SizeContextProvider>
  );
};

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
} = props => {
  React.useEffect(() => {
    if (props.direction) {
      message.config({
        rtl: props.direction === 'rtl',
      });
      notification.config({
        rtl: props.direction === 'rtl',
      });
    }
  }, [props.direction]);

  return (
    <LocaleReceiver>
      {(_, __, legacyLocale) => (
        <ConfigConsumer>
          {context => (
            <ProviderChildren
              parentContext={context}
              legacyLocale={legacyLocale as Locale}
              {...props}
            />
          )}
        </ConfigConsumer>
      )}
    </LocaleReceiver>
  );
};

/** @private internal usage. do not use in your production */
ConfigProvider.ConfigContext = ConfigContext;
export default ConfigProvider;
