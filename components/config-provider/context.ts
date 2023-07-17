import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { ValidateMessages } from 'rc-field-form/lib/interface';
import * as React from 'react';
import type { Options } from 'scroll-into-view-if-needed';
import type { BadgeProps } from '../badge';
import type { ButtonProps } from '../button';
import type { RequiredMark } from '../form/Form';
import type { InputProps } from '../input';
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

export interface ComponentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface BadgeConfig extends ComponentStyleConfig {
  classNames?: BadgeProps['classNames'];
  styles?: BadgeProps['styles'];
}

export interface ButtonConfig extends ComponentStyleConfig {
  classNames?: ButtonProps['classNames'];
  styles?: ButtonProps['styles'];
}

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
  input?: ComponentStyleConfig & {
    autoComplete?: string;
    classNames?: InputProps['classNames'];
    styles?: InputProps['styles'];
  };
  pagination?: ComponentStyleConfig & { showSizeChanger?: boolean };
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
  form?: ComponentStyleConfig & {
    requiredMark?: RequiredMark;
    colon?: boolean;
    scrollToFirstError?: Options | boolean;
    validateMessages?: ValidateMessages;
  };
  theme?: ThemeConfig;
  select?: ComponentStyleConfig & {
    showSearch?: boolean;
  };
  alert?: ComponentStyleConfig;
  anchor?: ComponentStyleConfig;
  button?: ButtonConfig;
  divider?: ComponentStyleConfig;
  drawer?: ComponentStyleConfig;
  calendar?: ComponentStyleConfig;
  carousel?: ComponentStyleConfig;
  cascader?: ComponentStyleConfig;
  collapse?: ComponentStyleConfig;
  typography?: ComponentStyleConfig;
  skeleton?: ComponentStyleConfig;
  spin?: ComponentStyleConfig;
  segmented?: ComponentStyleConfig;
  steps?: ComponentStyleConfig;
  statistic?: ComponentStyleConfig;
  image?: ComponentStyleConfig;
  layout?: ComponentStyleConfig;
  list?: ComponentStyleConfig;
  mentions?: ComponentStyleConfig;
  modal?: ComponentStyleConfig;
  progress?: ComponentStyleConfig;
  result?: ComponentStyleConfig;
  slider?: ComponentStyleConfig;
  breadcrumb?: ComponentStyleConfig;
  menu?: ComponentStyleConfig;
  checkbox?: ComponentStyleConfig;
  descriptions?: ComponentStyleConfig;
  empty?: ComponentStyleConfig;
  badge?: BadgeConfig;
  radio?: ComponentStyleConfig;
  rate?: ComponentStyleConfig;
  switch?: ComponentStyleConfig;
  transfer?: ComponentStyleConfig;
  avatar?: ComponentStyleConfig;
  message?: ComponentStyleConfig;
  tag?: ComponentStyleConfig;
  table?: ComponentStyleConfig;
  card?: ComponentStyleConfig;
  tabs?: ComponentStyleConfig;
  timeline?: ComponentStyleConfig;
  timePicker?: ComponentStyleConfig;
  upload?: ComponentStyleConfig;
  notification?: ComponentStyleConfig;
  tree?: ComponentStyleConfig;
  colorPicker?: ComponentStyleConfig;
  datePicker?: ComponentStyleConfig;
}

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `ant-${suffixCls}` : 'ant';
};

// zombieJ: 🚨 Do not pass `defaultRenderEmpty` here since it will cause circular dependency.
export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
  iconPrefixCls: defaultIconPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;
