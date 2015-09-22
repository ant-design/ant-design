import React from 'react';
import Dialog from 'rc-dialog';
import { Dom } from 'rc-util';
import confirm from './confirm';

function noop() {
}

let mousePosition;
let mousePositionEventBinded;

let AntModal = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-modal',
      onOk: noop,
      onCancel: noop,
      width: 520,
      transitionName: 'zoom',
      maskAnimation: 'fade'
    };
  },

  getInitialState() {
    return {
      confirmLoading: false,
      visible: this.props.visible
    };
  },

  handleCancel() {
    this.props.onCancel();
  },

  handleOk() {
    this.setState({
      confirmLoading: true
    });
    this.props.onOk();
  },

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if ('visible' in nextProps) {
      newState.visible = nextProps.visible;
      // 隐藏后默认去除按钮 loading 效果
      if (!nextProps.visible) {
        newState.confirmLoading = false;
      }
    }
    if ('confirmLoading' in nextProps) {
      newState.confirmLoading = nextProps.confirmLoading;
    }
    this.setState(newState);
  },

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    Dom.addEventListener(document.body, 'click', function onDocumentMousemove(e) {
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
  },

  render() {
    let loadingClass = this.state.confirmLoading ? ' ant-btn-loading' : '';
    let props = this.props;
    let defaultFooter = [
      <button key="cancel" type="button" className="ant-btn ant-btn-lg" onClick={this.handleCancel}>取 消</button>,
      <button key="confirm"
        type="button"
        className={'ant-btn ant-btn-primary ant-btn-lg' + loadingClass}
        onClick={this.handleOk}>
        确 定
      </button>
    ];
    let footer = props.footer || defaultFooter;
    let visible = this.state.visible;
    return <Dialog onClose={this.handleCancel} footer={footer} {...props}
      visible={visible} mousePosition={mousePosition} />;
  }
});

AntModal.info = function (props) {
  props.iconClassName = 'anticon-info-circle';
  props.okCancel = false;
  return confirm(props);
};

AntModal.success = function (props) {
  props.iconClassName = 'anticon-check-circle';
  props.okCancel = false;
  return confirm(props);
};

AntModal.error = function (props) {
  props.iconClassName = 'anticon-exclamation-circle';
  props.okCancel = false;
  return confirm(props);
};

AntModal.confirm = function (props) {
  props.okCancel = true;
  return confirm(props);
};

export default AntModal;
