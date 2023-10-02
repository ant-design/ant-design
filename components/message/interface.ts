import type * as React from 'react';

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
  rtl?: boolean;
}

export interface ArgsProps {
  content: React.ReactNode;
  duration?: number;
  type?: NoticeType;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export type JointContent = React.ReactNode | ArgsProps;

export interface MessageType extends PromiseLike<boolean> {
  (): void;
}

export type TypeOpen = (
  content: JointContent,
  duration?: number | VoidFunction, // Also can use onClose directly
  onClose?: VoidFunction,
) => MessageType;

export interface MessageInstance {
  info: TypeOpen;
  success: TypeOpen;
  error: TypeOpen;
  warning: TypeOpen;
  loading: TypeOpen;
  open(args: ArgsProps): MessageType;
  destroy(key?: React.Key): void;
}
