import type React from 'react';
import type { DialogProps } from '@rc-component/dialog';

import type {
  ClosableType,
  MaskType,
  SemanticClassNamesType,
  SemanticStylesType,
} from '../_util/hooks';
import type { Breakpoint } from '../_util/responsiveObserver';
import type { ButtonProps, LegacyButtonType } from '../button/Button';
import type { DirectionType } from '../config-provider';
import type { FocusableConfig, OmitFocusType } from '../drawer/useFocusable';

export type SemanticName = keyof ModalSemanticClassNames & keyof ModalSemanticStyles;

export type ModalSemanticClassNames = {
  root?: string;
  header?: string;
  body?: string;
  footer?: string;
  container?: string;
  title?: string;
  wrapper?: string;
  mask?: string;
};

export type ModalSemanticStyles = {
  root?: React.CSSProperties;
  header?: React.CSSProperties;
  body?: React.CSSProperties;
  footer?: React.CSSProperties;
  container?: React.CSSProperties;
  title?: React.CSSProperties;
  wrapper?: React.CSSProperties;
  mask?: React.CSSProperties;
};

export type ModalClassNamesType = SemanticClassNamesType<ModalProps, ModalSemanticClassNames>;

export type ModalStylesType = SemanticStylesType<ModalProps, ModalSemanticStyles>;

interface ModalCommonProps
  extends Omit<
    DialogProps,
    | 'footer'
    | 'width'
    | 'onClose'
    | 'animation'
    | 'maskAnimation'
    | 'transitionName'
    | 'maskTransitionName'
    | 'mask'
    | 'classNames'
    | 'styles'
    | OmitFocusType
  > {
  footer?:
    | React.ReactNode
    | ((
        originNode: React.ReactNode,
        extra: { OkBtn: React.FC; CancelBtn: React.FC },
      ) => React.ReactNode);
  closable?:
    | boolean
    | (Exclude<ClosableType, boolean> & { onClose?: () => void; afterClose?: () => void });
  classNames?: ModalClassNamesType;
  styles?: ModalStylesType;
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
  width?: string | number | Partial<Record<Breakpoint, string | number>>;
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
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyOnClose?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  zIndex?: number;
  /** @deprecated Please use `styles.body` instead */
  bodyStyle?: React.CSSProperties;
  /** @deprecated Please use `styles.mask` instead */
  maskStyle?: React.CSSProperties;
  mask?: MaskType;
  keyboard?: boolean;
  wrapProps?: any;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  children?: React.ReactNode;
  mousePosition?: MousePosition;
  /**
   * @since 5.18.0
   */
  loading?: boolean;

  // Focusable
  /** @deprecated Please use `focusable.focusTriggerAfterClose` instead */
  focusTriggerAfterClose?: boolean;
  focusable?: FocusableConfig;
}

type getContainerFunc = () => HTMLElement;

export interface ModalFuncProps extends ModalCommonProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  open?: boolean;
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
  mask?: MaskType;
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
