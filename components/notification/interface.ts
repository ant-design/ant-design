import type * as React from 'react';

import type { ClosableType } from '../_util/hooks/useClosable';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';

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

export type SemanticName = 'root' | 'title' | 'description' | 'actions' | 'icon';

export type NotificationClassNamesType = SemanticClassNamesType<ArgsProps, SemanticName>;
export type NotificationStylesType = SemanticStylesType<ArgsProps, SemanticName>;

// Resolved types for mergeSemantic result (function already resolved)
// Extract the resolved type from NotificationClassNamesType by removing function variant
export type ResolvedNotificationClassNamesType = Partial<Record<SemanticName, string>>;

export type ResolvedNotificationStylesType = Partial<Record<SemanticName, React.CSSProperties>>;

export interface ArgsProps {
  /** @deprecated Please use `title` instead */
  message?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** @deprecated Please use `actions` instead */
  btn?: React.ReactNode;
  actions?: React.ReactNode;
  key?: React.Key;
  onClose?: () => void;
  duration?: number | null;
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
  closable?:
    | boolean
    | (Exclude<ClosableType, boolean> & {
        onClose?: () => void;
      });
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
  duration?: number;
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
  duration?: number;
  showProgress?: boolean;
  pauseOnHover?: boolean;
  closeIcon?: React.ReactNode;
  classNames?: NotificationClassNamesType;
  styles?: NotificationStylesType;
}
