import type * as React from 'react';
import type { NotificationConfig as RcNotificationConfig } from 'rc-notification';

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

type SharedProps = Pick<
  RcNotificationConfig,
  | 'prefixCls'
  | 'getContainer'
  | 'maxCount'
  | 'stack'
  | 'duration'
  | 'showProgress'
  | 'pauseOnHover'
  | 'closable'
>;

export interface ArgsProps extends SharedProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  /** @deprecated Please use `actions` instead */
  btn?: React.ReactNode;
  actions?: React.ReactNode;
  key?: React.Key;
  onClose?: () => void;
  icon?: React.ReactNode;
  placement?: NotificationPlacement;
  style?: React.CSSProperties;
  className?: string;
  readonly type?: IconType;
  onClick?: () => void;
  /**
   * @private It may be internal, uncertain, so it's better not to use it.
   */
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

// Prevent destructive updates, We do not internally use.
export type GlobalConfigProps = NotificationConfig;

export interface NotificationConfig extends SharedProps {
  top?: number;
  bottom?: number;
  placement?: NotificationPlacement;
  rtl?: boolean;
  /**
   * @private It may be internal, uncertain, so it's better not to use it.
   */
  props?: DivProps;
}
