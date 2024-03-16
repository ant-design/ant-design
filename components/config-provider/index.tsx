import * as React from 'react';
import { createTheme } from '@ant-design/cssinjs';
import IconContext from '@ant-design/icons/lib/components/Context';
import useMemo from 'rc-util/lib/hooks/useMemo';
import { merge } from 'rc-util/lib/utils/set';

import warning, { WarningContext } from '../_util/warning';
import type { WarningContextProps } from '../_util/warning';
import ValidateMessagesContext from '../form/validateMessagesContext';
import type { Locale } from '../locale';
import LocaleProvider, { ANT_MARK } from '../locale';
import type { LocaleContextProps } from '../locale/context';
import LocaleContext from '../locale/context';
import defaultLocale from '../locale/en_US';
import { defaultTheme, DesignTokenContext } from '../theme/context';
import defaultSeedToken from '../theme/themes/seed';
import type {
  AlertConfig,
  BadgeConfig,
  ButtonConfig,
  CardConfig,
  CollapseConfig,
  ComponentStyleConfig,
  ConfigConsumerProps,
  CSPConfig,
  DirectionType,
  DrawerConfig,
  FlexConfig,
  FormConfig,
  ImageConfig,
  InputConfig,
  MenuConfig,
  ModalConfig,
  NotificationConfig,
  PaginationConfig,
  PopupOverflow,
  SelectConfig,
  SpaceConfig,
  TableConfig,
  TabsConfig,
  TagConfig,
  TextAreaConfig,
  Theme,
  ThemeConfig,
  TourConfig,
  TransferConfig,
  WaveConfig,
} from './context';
import { ConfigConsumer, ConfigContext, defaultIconPrefixCls } from './context';
import { registerTheme } from './cssVariables';
import type { RenderEmptyHandler } from './defaultRenderEmpty';
import { DisabledContextProvider } from './DisabledContext';
import useConfig from './hooks/useConfig';
import useTheme from './hooks/useTheme';
import MotionWrapper from './MotionWrapper';
import PropWarning from './PropWarning';
import type { SizeType } from './SizeContext';
import SizeContext, { SizeContextProvider } from './SizeContext';
import useStyle from './style';

/**
 * Since too many feedback using static method like `Modal.confirm` not getting theme, we record the
 * theme register info here to help developer get warning info.
 */
let existThemeConfig = false;

export const warnContext: (componentName: string) => void =
  process.env.NODE_ENV !== 'production'
    ? (componentName: string) => {
        warning(
          !existThemeConfig,
          componentName,
          `Static function can not consume context like dynamic theme. Please use 'App' component instead.`,
        );
      }
    : /* istanbul ignore next */
      null!;

export {
  ConfigConsumer,
  ConfigContext,
  defaultIconPrefixCls,
  type ConfigConsumerProps,
  type CSPConfig,
  type DirectionType,
  type RenderEmptyHandler,
  type ThemeConfig,
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
];

// These props is used by `useContext` directly in sub component
const PASSED_PROPS: Exclude<
  keyof ConfigConsumerProps,
  'rootPrefixCls' | 'getPrefixCls' | 'warning'
>[] = [
  'getTargetContainer',
  'getPopupContainer',
  'renderEmpty',
  'input',
  'pagination',
  'form',
  'select',
  'button',
];

export interface ConfigProviderProps {
  getTargetContainer?: () => HTMLElement | Window;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  prefixCls?: string;
  iconPrefixCls?: string;
  children?: React.ReactNode;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  form?: FormConfig;
  input?: InputConfig;
  textArea?: TextAreaConfig;
  select?: SelectConfig;
  pagination?: PaginationConfig;
  locale?: Locale;
  componentSize?: SizeType;
  componentDisabled?: boolean;
  direction?: DirectionType;
  space?: SpaceConfig;
  virtual?: boolean;
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean;
  popupMatchSelectWidth?: boolean;
  popupOverflow?: PopupOverflow;
  theme?: ThemeConfig;
  warning?: WarningContextProps;
  alert?: AlertConfig;
  anchor?: ComponentStyleConfig;
  button?: ButtonConfig;
  calendar?: ComponentStyleConfig;
  carousel?: ComponentStyleConfig;
  cascader?: ComponentStyleConfig;
  collapse?: CollapseConfig;
  divider?: ComponentStyleConfig;
  drawer?: DrawerConfig;
  typography?: ComponentStyleConfig;
  skeleton?: ComponentStyleConfig;
  spin?: ComponentStyleConfig;
  segmented?: ComponentStyleConfig;
  statistic?: ComponentStyleConfig;
  steps?: ComponentStyleConfig;
  image?: ImageConfig;
  layout?: ComponentStyleConfig;
  list?: ComponentStyleConfig;
  mentions?: ComponentStyleConfig;
  modal?: ModalConfig;
  progress?: ComponentStyleConfig;
  result?: ComponentStyleConfig;
  slider?: ComponentStyleConfig;
  breadcrumb?: ComponentStyleConfig;
  menu?: MenuConfig;
  checkbox?: ComponentStyleConfig;
  descriptions?: ComponentStyleConfig;
  empty?: ComponentStyleConfig;
  badge?: BadgeConfig;
  radio?: ComponentStyleConfig;
  rate?: ComponentStyleConfig;
  switch?: ComponentStyleConfig;
  transfer?: TransferConfig;
  avatar?: ComponentStyleConfig;
  message?: ComponentStyleConfig;
  tag?: TagConfig;
  table?: TableConfig;
  card?: CardConfig;
  tabs?: TabsConfig;
  timeline?: ComponentStyleConfig;
  timePicker?: ComponentStyleConfig;
  upload?: ComponentStyleConfig;
  notification?: NotificationConfig;
  tree?: ComponentStyleConfig;
  colorPicker?: ComponentStyleConfig;
  datePicker?: ComponentStyleConfig;
  rangePicker?: ComponentStyleConfig;
  dropdown?: ComponentStyleConfig;
  flex?: FlexConfig;
  /**
   * Wave is special component which only patch on the effect of component interaction.
   */
  wave?: WaveConfig;
  tour?: TourConfig;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
  legacyLocale: Locale;
}

type holderRenderType = (children: React.ReactNode) => React.ReactNode;

export const defaultPrefixCls = 'ant';

let globalPrefixCls: string;
let globalIconPrefixCls: string;
let globalTheme: ThemeConfig;
let globalHolderRender: holderRenderType | undefined;

function getGlobalPrefixCls() {
  return globalPrefixCls || defaultPrefixCls;
}

function getGlobalIconPrefixCls() {
  return globalIconPrefixCls || defaultIconPrefixCls;
}

function isLegacyTheme(theme: Theme | ThemeConfig): theme is Theme {
  return Object.keys(theme).some((key) => key.endsWith('Color'));
}

interface GlobalConfigProps {
  prefixCls?: string;
  iconPrefixCls?: string;
  theme?: Theme | ThemeConfig;
  holderRender?: holderRenderType;
}

const setGlobalConfig = (props: GlobalConfigProps) => {
  const { prefixCls, iconPrefixCls, theme, holderRender } = props;
  if (prefixCls !== undefined) {
    globalPrefixCls = prefixCls;
  }
  if (iconPrefixCls !== undefined) {
    globalIconPrefixCls = iconPrefixCls;
  }
  if ('holderRender' in props) {
    globalHolderRender = holderRender;
  }

  if (theme) {
    if (isLegacyTheme(theme)) {
      warning(
        false,
        'ConfigProvider',
        '`config` of css variable theme is not work in v5. Please use new `theme` config instead.',
      );
      registerTheme(getGlobalPrefixCls(), theme);
    } else {
      globalTheme = theme;
    }
  }
};

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) {
      return customizePrefixCls;
    }
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getIconPrefixCls: getGlobalIconPrefixCls,
  getRootPrefixCls: () => {
    // If Global prefixCls provided, use this
    if (globalPrefixCls) {
      return globalPrefixCls;
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  },
  getTheme: () => globalTheme,
  holderRender: globalHolderRender,
});

const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
  const {
    children,
    csp: customCsp,
    autoInsertSpaceInButton,
    alert,
    anchor,
    form,
    locale,
    componentSize,
    direction,
    space,
    virtual,
    dropdownMatchSelectWidth,
    popupMatchSelectWidth,
    popupOverflow,
    legacyLocale,
    parentContext,
    iconPrefixCls: customIconPrefixCls,
    theme,
    componentDisabled,
    segmented,
    statistic,
    spin,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    menu,
    pagination,
    input,
    textArea,
    empty,
    badge,
    radio,
    rate,
    switch: SWITCH,
    transfer,
    avatar,
    message,
    tag,
    table,
    card,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    rangePicker,
    flex,
    wave,
    dropdown,
    warning: warningConfig,
    tour,
  } = props;

  // =================================== Context ===================================
  const getPrefixCls = React.useCallback(
    (suffixCls: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;

      if (customizePrefixCls) {
        return customizePrefixCls;
      }

      const mergedPrefixCls = prefixCls || parentContext.getPrefixCls('');

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    },
    [parentContext.getPrefixCls, props.prefixCls],
  );

  const iconPrefixCls = customIconPrefixCls || parentContext.iconPrefixCls || defaultIconPrefixCls;
  const csp = customCsp || parentContext.csp;

  useStyle(iconPrefixCls, csp);

  const mergedTheme = useTheme(theme, parentContext.theme, { prefixCls: getPrefixCls('') });

  if (process.env.NODE_ENV !== 'production') {
    existThemeConfig = existThemeConfig || !!mergedTheme;
  }

  const baseConfig = {
    csp,
    autoInsertSpaceInButton,
    alert,
    anchor,
    locale: locale || legacyLocale,
    direction,
    space,
    virtual,
    popupMatchSelectWidth: popupMatchSelectWidth ?? dropdownMatchSelectWidth,
    popupOverflow,
    getPrefixCls,
    iconPrefixCls,
    theme: mergedTheme,
    segmented,
    statistic,
    spin,
    calendar,
    carousel,
    cascader,
    collapse,
    typography,
    checkbox,
    descriptions,
    divider,
    drawer,
    skeleton,
    steps,
    image,
    input,
    textArea,
    layout,
    list,
    mentions,
    modal,
    progress,
    result,
    slider,
    breadcrumb,
    menu,
    pagination,
    empty,
    badge,
    radio,
    rate,
    switch: SWITCH,
    transfer,
    avatar,
    message,
    tag,
    table,
    card,
    tabs,
    timeline,
    timePicker,
    upload,
    notification,
    tree,
    colorPicker,
    datePicker,
    rangePicker,
    flex,
    wave,
    dropdown,
    warning: warningConfig,
    tour,
  };

  const config: ConfigConsumerProps = {
    ...parentContext,
  };

  Object.keys(baseConfig).forEach((key: keyof typeof baseConfig) => {
    if (baseConfig[key] !== undefined) {
      (config as any)[key] = baseConfig[key];
    }
  });

  // Pass the props used by `useContext` directly with child component.
  // These props should merged into `config`.
  PASSED_PROPS.forEach((propName) => {
    const propValue = props[propName];
    if (propValue) {
      (config as any)[propName] = propValue;
    }
  });

  // https://github.com/ant-design/ant-design/issues/27617
  const memoedConfig = useMemo(
    () => config,
    config,
    (prevConfig, currentConfig) => {
      const prevKeys = Object.keys(prevConfig) as Array<keyof typeof config>;
      const currentKeys = Object.keys(currentConfig) as Array<keyof typeof config>;
      return (
        prevKeys.length !== currentKeys.length ||
        prevKeys.some((key) => prevConfig[key] !== currentConfig[key])
      );
    },
  );

  const memoIconContextValue = React.useMemo(
    () => ({ prefixCls: iconPrefixCls, csp }),
    [iconPrefixCls, csp],
  );

  let childNode = (
    <>
      <PropWarning dropdownMatchSelectWidth={dropdownMatchSelectWidth} />
      {children}
    </>
  );

  const validateMessages = React.useMemo(
    () =>
      merge(
        defaultLocale.Form?.defaultValidateMessages || {},
        memoedConfig.locale?.Form?.defaultValidateMessages || {},
        memoedConfig.form?.validateMessages || {},
        form?.validateMessages || {},
      ),
    [memoedConfig, form?.validateMessages],
  );

  if (Object.keys(validateMessages).length > 0) {
    childNode = (
      <ValidateMessagesContext.Provider value={validateMessages}>
        {childNode}
      </ValidateMessagesContext.Provider>
    );
  }

  if (locale) {
    childNode = (
      <LocaleProvider locale={locale} _ANT_MARK__={ANT_MARK}>
        {childNode}
      </LocaleProvider>
    );
  }

  if (iconPrefixCls || csp) {
    childNode = (
      <IconContext.Provider value={memoIconContextValue}>{childNode}</IconContext.Provider>
    );
  }

  if (componentSize) {
    childNode = <SizeContextProvider size={componentSize}>{childNode}</SizeContextProvider>;
  }

  // =================================== Motion ===================================
  childNode = <MotionWrapper>{childNode}</MotionWrapper>;

  // ================================ Dynamic theme ================================
  const memoTheme = React.useMemo(() => {
    const { algorithm, token, components, cssVar, ...rest } = mergedTheme || {};
    const themeObj =
      algorithm && (!Array.isArray(algorithm) || algorithm.length > 0)
        ? createTheme(algorithm)
        : defaultTheme;

    const parsedComponents: any = {};
    Object.entries(components || {}).forEach(([componentName, componentToken]) => {
      const parsedToken: typeof componentToken & { theme?: typeof defaultTheme } = {
        ...componentToken,
      };
      if ('algorithm' in parsedToken) {
        if (parsedToken.algorithm === true) {
          parsedToken.theme = themeObj;
        } else if (
          Array.isArray(parsedToken.algorithm) ||
          typeof parsedToken.algorithm === 'function'
        ) {
          parsedToken.theme = createTheme(parsedToken.algorithm);
        }
        delete parsedToken.algorithm;
      }
      parsedComponents[componentName] = parsedToken;
    });

    const mergedToken = {
      ...defaultSeedToken,
      ...token,
    };

    return {
      ...rest,
      theme: themeObj,

      token: mergedToken,
      components: parsedComponents,
      override: {
        override: mergedToken,
        ...parsedComponents,
      },
      cssVar: cssVar as Exclude<ThemeConfig['cssVar'], boolean>,
    };
  }, [mergedTheme]);

  if (theme) {
    childNode = (
      <DesignTokenContext.Provider value={memoTheme}>{childNode}</DesignTokenContext.Provider>
    );
  }

  // ================================== Warning ===================================
  if (memoedConfig.warning) {
    childNode = (
      <WarningContext.Provider value={memoedConfig.warning}>{childNode}</WarningContext.Provider>
    );
  }

  // =================================== Render ===================================
  if (componentDisabled !== undefined) {
    childNode = (
      <DisabledContextProvider disabled={componentDisabled}>{childNode}</DisabledContextProvider>
    );
  }

  return <ConfigContext.Provider value={memoedConfig}>{childNode}</ConfigContext.Provider>;
};

const ConfigProvider: React.FC<ConfigProviderProps> & {
  /** @private internal Usage. do not use in your production */
  ConfigContext: typeof ConfigContext;
  /** @deprecated Please use `ConfigProvider.useConfig().componentSize` instead */
  SizeContext: typeof SizeContext;
  config: typeof setGlobalConfig;
  useConfig: typeof useConfig;
} = (props) => {
  const context = React.useContext<ConfigConsumerProps>(ConfigContext);
  const antLocale = React.useContext<LocaleContextProps | undefined>(LocaleContext);
  return <ProviderChildren parentContext={context} legacyLocale={antLocale!} {...props} />;
};

ConfigProvider.ConfigContext = ConfigContext;
ConfigProvider.SizeContext = SizeContext;
ConfigProvider.config = setGlobalConfig;
ConfigProvider.useConfig = useConfig;

Object.defineProperty(ConfigProvider, 'SizeContext', {
  get: () => {
    warning(
      false,
      'ConfigProvider',
      'ConfigProvider.SizeContext is deprecated. Please use `ConfigProvider.useConfig().componentSize` instead.',
    );
    return SizeContext;
  },
});

if (process.env.NODE_ENV !== 'production') {
  ConfigProvider.displayName = 'ConfigProvider';
}

export default ConfigProvider;
