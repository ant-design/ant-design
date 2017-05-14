import React from 'react';
import Dialog from 'rc-dialog';
import PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Button from '../button';

let mousePosition;
let mousePositionEventBinded;

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
  onOk?: (e: React.MouseEvent<any>) => void;
  /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
  onCancel?: (e: React.MouseEvent<any>) => void;
  afterClose?: () => void;
  /** 宽度*/
  width?: string | number;
  /** 底部内容*/
  footer?: React.ReactNode;
  /** 确认按钮文字*/
  okText?: string;
  /** 取消按钮文字*/
  cancelText?: string;
  /** 点击蒙层是否允许关闭*/
  maskClosable?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
}

export interface ModalContext {
  antLocale?: {
    Modal?: any,
  };
}

export interface ModalFuncProps {
  visible?: boolean;
  title?: React.ReactNode | string;
  content?: React.ReactNode | string;
  onOk?: (func: Function) => any;
  onCancel?: (func: Function) => any;
  width?: string | number;
  iconClassName?: string;
  okText?: string;
  cancelText?: string;
  iconType?: string;
}
export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void,
};

export default class Modal extends React.Component<ModalProps, any> {
  static info: ModalFunc;
  static success: ModalFunc;
  static error: ModalFunc;
  static warn: ModalFunc;
  static warning: ModalFunc;
  static confirm: ModalFunc;

  static defaultProps = {
    prefixCls: 'ant-modal',
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.node,
    cancelText: PropTypes.node,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool,
    align: PropTypes.object,
    footer: PropTypes.node,
    title: PropTypes.node,
    closable: PropTypes.bool,
  };

  static contextTypes = {
    antLocale: PropTypes.object,
  };

  context: ModalContext;

  handleCancel = (e) => {
    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel(e);
    }
  }

  handleOk = (e) => {
    const onOk = this.props.onOk;
    if (onOk) {
      onOk(e);
    }
  }

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    addEventListener(document.documentElement, 'click', (e) => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY,
      };
      // 100ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 100);
    });
    mousePositionEventBinded = true;
  }

  render() {
    let { okText, cancelText, confirmLoading, footer, visible } = this.props;

    if (this.context.antLocale && this.context.antLocale.Modal) {
      okText = okText || this.context.antLocale.Modal.okText;
      cancelText = cancelText || this.context.antLocale.Modal.cancelText;
    }

    const defaultFooter = [(
      <Button
        key="cancel"
        size="large"
        onClick={this.handleCancel}
      >
        {cancelText || '取消'}
      </Button>
    ), (
      <Button
        key="confirm"
        type="primary"
        size="large"
        loading={confirmLoading}
        onClick={this.handleOk}
      >
        {okText || '确定'}
      </Button>
    )];

    return (
      <Dialog
        onClose={this.handleCancel}
        footer={footer === undefined ? defaultFooter : footer}
        {...this.props}
        visible={visible}
        mousePosition={mousePosition}
      />
    );
  }
}
