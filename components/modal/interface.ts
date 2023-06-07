import type { ButtonProps, LegacyButtonType } from '../button/button';
import type { DirectionType } from '../config-provider';

export interface ModalProps {
  /** Whether the modal dialog is visible or not */
  open?: boolean;
  /** Whether to apply loading visual effect for OK button or not */
  confirmLoading?: boolean;
  /** The modal dialog's title */
  title?: React.ReactNode;
  /** Whether a close (x) button is visible on top right of the modal dialog or not */
  closable?: boolean;
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
  /** Footer content */
  footer?: React.ReactNode;
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
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
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
}

type getContainerFunc = () => HTMLElement;

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  open?: boolean;
  /** @deprecated Please use `open` instead. */
  visible?: boolean;
  title?: React.ReactNode;
  closable?: boolean;
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
  maskStyle?: React.CSSProperties;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  keyboard?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  direction?: DirectionType;
  bodyStyle?: React.CSSProperties;
  closeIcon?: React.ReactNode;
  footer?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export type MousePosition = { x: number; y: number } | null;
