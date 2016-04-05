import React, { PropTypes } from 'react';
import Dialog from 'rc-dialog';
import { Dom } from 'rc-util';
import Button from '../button';

function noop() {}

let mousePosition;
let mousePositionEventBinded;

export default class Modal extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-modal',
    onOk: noop,
    onCancel: noop,
    width: 520,
    transitionName: 'zoom',
    maskTransitionName: 'fade',
    confirmLoading: false,
    visible: false,
  }

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
  }

  static contextTypes = {
    antLocale: React.PropTypes.object,
  }

  handleCancel = (e) => {
    this.props.onCancel(e);
  }

  handleOk = () => {
    this.props.onOk();
  }

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    Dom.addEventListener(document.documentElement, 'click', (e) => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      };
      // 20ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 20);
    });
    mousePositionEventBinded = true;
  }

  render() {
    let props = this.props;

    let { okText, cancelText } = props;
    if (this.context.antLocale && this.context.antLocale.Modal) {
      okText = okText || this.context.antLocale.Modal.okText;
      cancelText = cancelText || this.context.antLocale.Modal.cancelText;
    }

    let defaultFooter = [
      <Button key="cancel"
        type="ghost"
        size="large"
        onClick={this.handleCancel}>
        {cancelText || '取消'}
      </Button>,
      <Button key="confirm"
        type="primary"
        size="large"
        loading={props.confirmLoading}
        onClick={this.handleOk}>
        {okText || '确定'}
      </Button>
    ];
    let footer = props.footer || defaultFooter;
    return (
      <Dialog onClose={this.handleCancel} footer={footer} {...props}
        visible={props.visible} mousePosition={mousePosition} />
    );
  }
}
