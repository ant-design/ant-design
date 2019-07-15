import * as React from 'react';
import Dialog from 'rc-dialog';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { getConfirmLocale } from './locale';
import Icon from '../icon';
import Button from '../button';
import { ButtonType, NativeButtonProps } from '../button/button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

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
  setTimeout(() => (mousePosition = null), 100);
};

// 只有点击事件支持从鼠标位置动画展开
if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  addEventListener(document.documentElement, 'click', getClickPosition);
}

export interface ModalProps {
  /** 对话框是否可见*/
  visible?: boolean;
  /** 确定按钮 loading*/
  confirmLoading?: boolean;
  /** 标题*/
  title?: React.ReactNode | string;
  /** 是否显示右上角的关闭按钮*/
  closable?: boolean;
  /** 点击确定回调*/
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  afterClose?: () => void;
  /** 垂直居中 */
  centered?: boolean;
  /** 宽度*/
  width?: string | number;
  /** 底部内容*/
  footer?: React.ReactNode;
  /** 确认按钮文字*/
  okText?: React.ReactNode;
  /** 确认按钮类型*/
  okType?: ButtonType;
  /** 取消按钮文字*/
  cancelText?: React.ReactNode;
  /** 点击蒙层是否允许关闭*/
  maskClosable?: boolean;
  /** 强制渲染 Modal*/
  forceRender?: boolean;
  okButtonProps?: NativeButtonProps;
  cancelButtonProps?: NativeButtonProps;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: (instance: React.ReactInstance) => HTMLElement;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  wrapProps?: any;
  prefixCls?: string;
}

export interface ModalFuncProps {
  prefixCls?: string;
  className?: string;
  visible?: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  // TODO: find out exact types
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  okButtonProps?: NativeButtonProps;
  cancelButtonProps?: NativeButtonProps;
  centered?: boolean;
  width?: string | number;
  iconClassName?: string;
  okText?: React.ReactNode;
  okType?: ButtonType;
  cancelText?: React.ReactNode;
  icon?: React.ReactNode;
  /* Deprecated */
  iconType?: string;
  mask?: boolean;
  maskClosable?: boolean;
  zIndex?: number;
  okCancel?: boolean;
  style?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  type?: string;
  keyboard?: boolean;
  getContainer?: (instance: React.ReactInstance) => HTMLElement;
  autoFocusButton?: null | 'ok' | 'cancel';
  transitionName?: string;
  maskTransitionName?: string;
}

export type ModalFunc = (
  props: ModalFuncProps,
) => {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
};

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

export default class Modal extends React.Component<ModalProps, {}> {
  static info: ModalFunc;
  static success: ModalFunc;
  static error: ModalFunc;
  static warn: ModalFunc;
  static warning: ModalFunc;
  static confirm: ModalFunc;
  static destroyAll: () => void;

  static defaultProps = {
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false,
    okType: 'primary' as ButtonType,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    centered: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool,
    footer: PropTypes.node,
    title: PropTypes.node,
    closable: PropTypes.bool,
  };

  handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel(e);
    }
  };

  handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const onOk = this.props.onOk;
    if (onOk) {
      onOk(e);
    }
  };

  renderFooter = (locale: ModalLocale) => {
    const { okText, okType, cancelText, confirmLoading } = this.props;
    return (
      <div>
        <Button onClick={this.handleCancel} {...this.props.cancelButtonProps}>
          {cancelText || locale.cancelText}
        </Button>
        <Button
          type={okType}
          loading={confirmLoading}
          onClick={this.handleOk}
          {...this.props.okButtonProps}
        >
          {okText || locale.okText}
        </Button>
      </div>
    );
  };

  renderModal = ({
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
  }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      footer,
      visible,
      wrapClassName,
      centered,
      getContainer,
      ...restProps
    } = this.props;

    const prefixCls = getPrefixCls('modal', customizePrefixCls);
    const defaultFooter = (
      <LocaleReceiver componentName="Modal" defaultLocale={getConfirmLocale()}>
        {this.renderFooter}
      </LocaleReceiver>
    );

    const closeIcon = (
      <span className={`${prefixCls}-close-x`}>
        <Icon className={`${prefixCls}-close-icon`} type="close" />
      </span>
    );

    return (
      <Dialog
        {...restProps}
        getContainer={getContainer || getContextPopupContainer}
        prefixCls={prefixCls}
        wrapClassName={classNames({ [`${prefixCls}-centered`]: !!centered }, wrapClassName)}
        footer={footer === undefined ? defaultFooter : footer}
        visible={visible}
        mousePosition={mousePosition}
        onClose={this.handleCancel}
        closeIcon={closeIcon}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderModal}</ConfigConsumer>;
  }
}
