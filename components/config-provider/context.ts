import * as React from 'react';

import type { WarningContextProps } from '../_util/warning';
import type { ShowWaveEffect } from '../_util/wave/interface';
import type { AlertProps } from '../alert';
import type { BadgeProps } from '../badge';
import type { ButtonProps } from '../button';
import type { CardProps } from '../card';
import type { CollapseProps } from '../collapse';
import type { DrawerProps } from '../drawer';
import type { FlexProps } from '../flex/interface';
import type { FormProps } from '../form/Form';
import type { InputProps, TextAreaProps } from '../input';
import type { Locale } from '../locale';
import type { MenuProps } from '../menu';
import type { ModalProps } from '../modal';
import type { ArgsProps } from '../notification/interface';
import type { PaginationProps } from '../pagination';
import type { SelectProps } from '../select';
import type { SpaceProps } from '../space';
import type { TableProps } from '../table';
import type { TabsProps } from '../tabs';
import type { TagProps } from '../tag';
import type { AliasToken, MappingAlgorithm, OverrideToken } from '../theme/interface';
import type { TourProps } from '../tour/interface';
import type { TransferProps } from '../transfer';
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

type ComponentsConfig = {
  [key in keyof OverrideToken]?: OverrideToken[key] & {
    algorithm?: boolean | MappingAlgorithm | MappingAlgorithm[];
  };
};

export interface ThemeConfig {
  token?: Partial<AliasToken>;
  components?: ComponentsConfig;
  algorithm?: MappingAlgorithm | MappingAlgorithm[];
  hashed?: boolean;
  inherit?: boolean;
  cssVar?:
    | {
        /**
         * Prefix for css variable, default to `ant`.
         */
        prefix?: string;
        /**
         * Unique key for theme, should be set manually < react@18.
         */
        key?: string;
      }
    | boolean;
}

export interface ComponentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface TableConfig extends ComponentStyleConfig {
  expandable?: {
    expandIcon?: NonNullable<TableProps['expandable']>['expandIcon'];
  };
}

export interface ImageConfig extends ComponentStyleConfig {
  preview?: Partial<Record<'closeIcon', React.ReactNode>>;
}

export type CollapseConfig = ComponentStyleConfig & Pick<CollapseProps, 'expandIcon'>;

export type MenuConfig = ComponentStyleConfig & Pick<MenuProps, 'expandIcon'>;

export type TourConfig = Pick<TourProps, 'closeIcon'>;

export type ModalConfig = ComponentStyleConfig &
  Pick<ModalProps, 'classNames' | 'styles' | 'closeIcon'>;

export type TabsConfig = ComponentStyleConfig &
  Pick<TabsProps, 'indicator' | 'indicatorSize' | 'moreIcon' | 'addIcon' | 'removeIcon'>;

export type AlertConfig = ComponentStyleConfig & Pick<AlertProps, 'closable' | 'closeIcon'>;

export type BadgeConfig = ComponentStyleConfig & Pick<BadgeProps, 'classNames' | 'styles'>;

export type InputConfig = ComponentStyleConfig &
  Pick<InputProps, 'autoComplete' | 'classNames' | 'styles' | 'allowClear'>;

export type TextAreaConfig = ComponentStyleConfig &
  Pick<TextAreaProps, 'autoComplete' | 'classNames' | 'styles' | 'allowClear'>;

export type ButtonConfig = ComponentStyleConfig & Pick<ButtonProps, 'classNames' | 'styles'>;

export type NotificationConfig = ComponentStyleConfig & Pick<ArgsProps, 'closeIcon'>;

export type TagConfig = ComponentStyleConfig & Pick<TagProps, 'closeIcon'>;

export type CardConfig = ComponentStyleConfig & Pick<CardProps, 'classNames' | 'styles'>;

export type DrawerConfig = ComponentStyleConfig &
  Pick<DrawerProps, 'classNames' | 'styles' | 'closeIcon' | 'closable'>;

export type FlexConfig = ComponentStyleConfig & Pick<FlexProps, 'vertical'>;

export type TransferConfig = ComponentStyleConfig & Pick<TransferProps, 'selectionsIcon'>;

export type FormConfig = ComponentStyleConfig &
  Pick<FormProps, 'requiredMark' | 'colon' | 'scrollToFirstError' | 'validateMessages'>;

export type PaginationConfig = ComponentStyleConfig & Pick<PaginationProps, 'showSizeChanger'>;

export type SelectConfig = ComponentStyleConfig & Pick<SelectProps, 'showSearch'>;

export type SpaceConfig = ComponentStyleConfig & Pick<SpaceProps, 'size' | 'classNames' | 'styles'>;

export type PopupOverflow = 'viewport' | 'scroll';

export interface WaveConfig {
  disabled?: boolean;
  showEffect?: ShowWaveEffect;
}

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  iconPrefixCls: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  renderEmpty?: RenderEmptyHandler;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  input?: InputConfig;
  textArea?: TextAreaConfig;
  pagination?: PaginationConfig;
  locale?: Locale;
  direction?: DirectionType;
  space?: SpaceConfig;
  virtual?: boolean;
  popupMatchSelectWidth?: boolean;
  popupOverflow?: PopupOverflow;
  form?: FormConfig;
  theme?: ThemeConfig;
  select?: SelectConfig;
  alert?: AlertConfig;
  anchor?: ComponentStyleConfig;
  button?: ButtonConfig;
  divider?: ComponentStyleConfig;
  drawer?: DrawerConfig;
  calendar?: ComponentStyleConfig;
  carousel?: ComponentStyleConfig;
  cascader?: ComponentStyleConfig;
  collapse?: CollapseConfig;
  typography?: ComponentStyleConfig;
  skeleton?: ComponentStyleConfig;
  spin?: ComponentStyleConfig;
  segmented?: ComponentStyleConfig;
  steps?: ComponentStyleConfig;
  statistic?: ComponentStyleConfig;
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
  tour?: TourConfig;
  upload?: ComponentStyleConfig;
  notification?: NotificationConfig;
  tree?: ComponentStyleConfig;
  colorPicker?: ComponentStyleConfig;
  datePicker?: ComponentStyleConfig;
  rangePicker?: ComponentStyleConfig;
  dropdown?: ComponentStyleConfig;
  flex?: FlexConfig;
  wave?: WaveConfig;
  warning?: WarningContextProps;
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
