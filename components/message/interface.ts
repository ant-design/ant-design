import type * as React from 'react';

export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface ArgsProps {
  content: React.ReactNode;
  duration?: number;
  type?: NoticeType;
  // prefixCls?: string;
  // rootPrefixCls?: string;
  // getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export type JointContent = React.ReactNode | ArgsProps;

export interface MessageType extends PromiseLike<any> {
  (): void;
}

export type TypeOpen = (
  content: JointContent,
  duration?: number,
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
