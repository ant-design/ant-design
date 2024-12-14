import type React from 'react';
import type { DialogProps } from 'rc-dialog';

import type { ButtonProps, LegacyButtonType } from '../button/button';
import type { DirectionType } from '../config-provider';

interface ModalCommonProps extends Omit<DialogProps, 'footer'> {
  footer?:
    | React.ReactNode
    | ((
        originNode: React.ReactNode,
        extra: { OkBtn: React.FC; CancelBtn: React.FC },
      ) => React.ReactNode);
}

export interface ModalProps extends ModalCommonProps {
  /** Whether the modal dialog is visible or not */
  open?: boolean;
  /** Whether to apply loading visual effect for OK button or not */
  confirmLoading?: boolean;
  /** The modal dialog's title */
  title?: React.ReactNode;
  /** Specify a function that will be called when a user clicks the OK button */
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Specify a function that will be called when a user clicks mask, close button on top right or Cancel button */
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterClose?: () => void;
  /** Callback when the animation ends when Modal is turned on and off */
  afterOpenChange?: (open: boolean) => void;
  /** Centered Modal */
  centered?: boolean;
  /** Width of the modal dialog */
  width?: string | number;
  /** Text of the OK button */
  okText?: React.ReactNode;
  /** Button `type` of the OK button */
  okType?: LegacyButtonType;
  /** Text of the Cancel button */
  cancelText?: React.ReactNode;
  /** Whether to close the modal dialog when the mask (area outside the modal) is clicked */
  maskClosable?: boolean;
  /** Force render Modal */
  forceRender?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  rootClassName?: string;
  classNames?: NonNullable<DialogProps['classNames']>;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  /** @deprecated Please use `styles.body` instead */
  bodyStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.mask` instead */
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  wrapProps?: any;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
  children?: React.ReactNode;
  mousePosition?: MousePosition;

  // Legacy
  /** @deprecated Please use `open` instead. */
  visible?: boolean;
  /**
   * @since 5.18.0
   */
  loading?: boolean;
}

type getContainerFunc = () => HTMLElement;

export interface ModalFuncProps extends ModalCommonProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  open?: boolean;
  /** @deprecated Please use `open` instead. */
  visible?: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  // TODO: find out exact types
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  afterClose?: () => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  centered?: boolean;
  width?: string | number;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  /** @deprecated Please use `styles.mask` instead */
  maskStyle?: React.CSSProperties;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  keyboard?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  direction?: DirectionType;
  /** @deprecated Please use `styles.body` instead */
  bodyStyle?: React.CSSProperties;
  closeIcon?: React.ReactNode;
  footer?: ModalProps['footer'];
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export type MousePosition = { x: number; y: number } | null;
