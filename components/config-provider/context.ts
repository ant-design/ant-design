import type { DerivativeFunc } from '@ant-design/cssinjs';
import * as React from 'react';
import type { Options } from 'scroll-into-view-if-needed';
import type { ButtonProps } from '../button';
import type { RequiredMark } from '../form/Form';
import type { Locale } from '../locale';
import type { SpaceProps } from '../space';
import type { AliasToken, MapToken, OverrideToken, SeedToken } from '../theme/interface';
import type { SizeType } from './SizeContext';
import type { RenderEmptyHandler } from './defaultRenderEmpty';

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

interface componentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
  classNames?: ButtonProps['classNames'];
  styles?: ButtonProps['styles'];
}

export interface ButtonConfig extends componentStyleConfig {}

export type PopupOverflow = 'viewport' | 'scroll';

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  iconPrefixCls: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  input?: {
    autoComplete?: string;
  };
  pagination?: {
    showSizeChanger?: boolean;
  };
  locale?: Locale;
  pageHeader?: {
    ghost: boolean;
  };
  direction?: DirectionType;
  space?: {
    size?: SizeType | number;
    className?: SpaceProps['className'];
    classNames?: SpaceProps['classNames'];
    style?: SpaceProps['style'];
    styles?: SpaceProps['styles'];
  };
  virtual?: boolean;
  popupMatchSelectWidth?: boolean;
  popupOverflow?: PopupOverflow;
  form?: {
    requiredMark?: RequiredMark;
    colon?: boolean;
    scrollToFirstError?: Options | boolean;
  };
  theme?: ThemeConfig;
  select?: {
    showSearch?: boolean;
  };
  button?: ButtonConfig;
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
