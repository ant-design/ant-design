import * as React from 'react';
import Dialog from 'rc-dialog';
import classNames from 'classnames';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import useModal from './useModal';
import { getConfirmLocale } from './locale';
import Button from '../button';
import { LegacyButtonType, ButtonProps, convertLegacyProps } from '../button/button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigContext, DirectionType } from '../config-provider';
import { canUseDocElement } from '../_util/styleChecker';
import { getTransitionName } from '../_util/motion';

let mousePosition: { x: number; y: number } | null;
export const destroyFns: Array<() => void> = [];

// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
};

// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) {
  document.documentElement.addEventListener('click', getClickPosition, true);
}

export interface ModalProps {
  /** 对话框是否可见 */
  visible?: boolean;
  /** 确定按钮 loading */
  confirmLoading?: boolean;
  /** 标题 */
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean;
  /** 点击确定回调 */
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调 */
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: () => void;
  /** 垂直居中 */
  centered?: boolean;
  /** 宽度 */
  width?: string | number;
  /** 底部内容 */
  footer?: React.ReactNode;
  /** 确认按钮文字 */
  okText?: React.ReactNode;
  /** 确认按钮类型 */
  okType?: LegacyButtonType;
  /** 取消按钮文字 */
  cancelText?: React.ReactNode;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 强制渲染 Modal */
  forceRender?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: string | HTMLElement | getContainerFunc | false | null;
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
}

type getContainerFunc = () => HTMLElement;

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
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
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  icon?: React.ReactNode;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  keyboard?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false | null;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
  direction?: DirectionType;
  bodyStyle?: React.CSSProperties;
  closeIcon?: React.ReactNode;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusTriggerAfterClose?: boolean;
}

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

interface ModalInterface extends React.FC<ModalProps> {
  useModal: typeof useModal;
}

const Modal: ModalInterface = props => {
  const { getPopupContainer: getContextPopupContainer, getPrefixCls, direction } = React.useContext(
    ConfigContext,
  );

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    onCancel?.(e);
  };

  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };

  const renderFooter = (locale: ModalLocale) => {
    const { okText, okType, cancelText, confirmLoading } = props;
    return (
      <>
        <Button onClick={handleCancel} {...props.cancelButtonProps}>
          {cancelText || locale.cancelText}
        </Button>
        <Button
          {...convertLegacyProps(okType)}
          loading={confirmLoading}
          onClick={handleOk}
          {...props.okButtonProps}
        >
          {okText || locale.okText}
        </Button>
      </>
    );
  };

  const {
    prefixCls: customizePrefixCls,
    footer,
    visible,
    wrapClassName,
    centered,
    getContainer,
    closeIcon,
    focusTriggerAfterClose = true,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('modal', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const defaultFooter = (
    <LocaleReceiver componentName="Modal" defaultLocale={getConfirmLocale()}>
      {renderFooter}
    </LocaleReceiver>
  );

  const closeIconToRender = (
    <span className={`${prefixCls}-close-x`}>
      {closeIcon || <CloseOutlined className={`${prefixCls}-close-icon`} />}
    </span>
  );

  const wrapClassNameExtended = classNames(wrapClassName, {
    [`${prefixCls}-centered`]: !!centered,
    [`${prefixCls}-wrap-rtl`]: direction === 'rtl',
  });
  return (
    <Dialog
      {...restProps}
      getContainer={getContainer === undefined ? getContextPopupContainer : getContainer}
      prefixCls={prefixCls}
      wrapClassName={wrapClassNameExtended}
      footer={footer === undefined ? defaultFooter : footer}
      visible={visible}
      mousePosition={mousePosition}
      onClose={handleCancel}
      closeIcon={closeIconToRender}
      focusTriggerAfterClose={focusTriggerAfterClose}
      transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
      maskTransitionName={getTransitionName(rootPrefixCls, 'fade', props.maskTransitionName)}
    />
  );
};

Modal.useModal = useModal;

Modal.defaultProps = {
  width: 520,
  confirmLoading: false,
  visible: false,
  okType: 'primary' as LegacyButtonType,
};

export default Modal;
