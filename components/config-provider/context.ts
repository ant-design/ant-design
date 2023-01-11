import * as React from 'react';
import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { Options } from 'scroll-into-view-if-needed';
import type { RequiredMark } from '../form/Form';
import type { Locale } from '../locale';
import type { AliasToken, MapToken, OverrideToken, SeedToken } from '../theme/interface';
import type { RenderEmptyHandler } from './defaultRenderEmpty';
import type { SizeType } from './SizeContext';

export const defaultIconPrefixCls = 'anticon';

export interface Theme {
  primaryColor?: string;
  infoColor?: string;
  successColor?: string;
  processingColor?: string;
  errorColor?: string;
  warningColor?: string;
}

export interface CSPConfig {
  nonce?: string;
}

export type DirectionType = 'ltr' | 'rtl' | undefined;

export type MappingAlgorithm = DerivativeFunc<SeedToken, MapToken>;

export interface ThemeConfig {
  token?: Partial<AliasToken>;
  components?: OverrideToken;
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
  hashed?: boolean;
  inherit?: boolean;
}

export interface ComponentsConfig {
  button?: {
    className?: string;
  };
  form?: {
    requiredMark?: RequiredMark;
    colon?: boolean;
    scrollToFirstError?: Options | boolean;
  };
  input?: {
    autoComplete?: string;
  };
  pagination?: {
    showSizeChanger?: boolean;
  };
  select?: {
    showSearch?: boolean;
  };
  space?: {
    size?: SizeType | number;
  };
}

export interface ConfigConsumerProps extends ComponentsConfig {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  iconPrefixCls: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  locale?: Locale;
  direction?: DirectionType;
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
  theme?: ThemeConfig;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

// zombieJ: 🚨 Do not pass `defaultRenderEmpty` here since it will cause circular dependency.
export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;
