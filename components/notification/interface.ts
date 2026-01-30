import type * as React from 'react';

import type { ClosableType, SemanticType } from '../_util/hooks';

interface DivProps extends React.HTMLProps<HTMLDivElement> {
  'data-testid'?: string;
}

export const NotificationPlacements = [
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
] as const;

export type NotificationPlacement = (typeof NotificationPlacements)[number];

export type IconType = 'success' | 'info' | 'error' | 'warning';

export type NotificationSemanticType = {
  classNames?: {
    root?: string;
    title?: string;
    description?: string;
    actions?: string;
    icon?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    actions?: React.CSSProperties;
    icon?: React.CSSProperties;
  };
};

export type NotificationClassNamesType = SemanticType<
  ArgsProps,
  NotificationSemanticType['classNames']
>;

export type NotificationStylesType = SemanticType<ArgsProps, NotificationSemanticType['styles']>;

export interface ArgsProps {
  /** @deprecated Please use `title` instead */
  message?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** @deprecated Please use `actions` instead */
  btn?: React.ReactNode;
  actions?: React.ReactNode;
  key?: React.Key;
  onClose?: () => void;
  duration?: number | false;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  icon?: React.ReactNode;
  placement?: NotificationPlacement;
  style?: React.CSSProperties;
  className?: string;
  classNames?: NotificationClassNamesType;
  styles?: NotificationStylesType;
  readonly type?: IconType;
  onClick?: () => void;
  closeIcon?: React.ReactNode;
  closable?: boolean | (Exclude<ClosableType, boolean> & { onClose?: () => void });
  props?: DivProps;
  role?: 'alert' | 'status';
}

type StaticFn = (args: ArgsProps) => void;

export interface NotificationInstance {
  success: StaticFn;
  error: StaticFn;
  info: StaticFn;
  warning: StaticFn;
  open: StaticFn;
  destroy: (key?: React.Key) => void;
}

export interface GlobalConfigProps {
  top?: number;
  bottom?: number;
  duration?: number | false;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  prefixCls?: string;
  getContainer?: () => HTMLElement | ShadowRoot;
  placement?: NotificationPlacement;
  closeIcon?: React.ReactNode;
  closable?: ClosableType;
  rtl?: boolean;
  maxCount?: number;
  props?: DivProps;
}

export interface NotificationConfig {
  top?: number;
  bottom?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement | ShadowRoot;
  placement?: NotificationPlacement;
  maxCount?: number;
  rtl?: boolean;
  stack?: boolean | { threshold?: number };
  duration?: number | false;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  closeIcon?: React.ReactNode;
  classNames?: NotificationClassNamesType;
  styles?: NotificationStylesType;
}
