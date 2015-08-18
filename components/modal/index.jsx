import React from 'react';
import Dialog from 'rc-dialog';
function noop() {
}

function wrap(standard, fallback) {
  return function (el, evtName, listener, useCapture) {
    if (el[standard]) {
      el[standard](evtName, listener, useCapture);
    } else if (el[fallback]) {
      el[fallback]('on' + evtName, listener);
    }
  };
}

let eventListener = {
  add: wrap('addEventListener', 'attachEvent'),
  remove: wrap('removeEventListener', 'detachEvent')
};

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-modal',
      onOk: noop,
      onCancel: noop
    };
  },

  getInitialState() {
    return {
      confirmLoading: false,
      visible: this.props.visible
    };
  },

  onDocumentMousemove(e) {
    this.mousePosition = {
      x: e.pageX,
      y: e.pageY
    };
  },

  componentWillMount() {
    eventListener.add(document, 'mousemove', this.onDocumentMousemove);
  },

  componentWillUnmount() {
    eventListener.remove(document, 'mousemove', this.onDocumentMousemove);
  },

  handleCancel() {
    this.props.onCancel();
    this.setState({
      visible: false
    });
  },

  handleOk() {
    this.setState({
      confirmLoading: true
    });
    this.props.onOk();
  },

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      let newState = {
        visible: nextProps.visible
      };
      // 隐藏后去除按钮 loading 效果
      if (!nextProps.visible) {
        newState.confirmLoading = false;
      }
      this.setState(newState);
    }
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
    return <Dialog transitionName="zoom" onClose={this.handleCancel}
      maskAnimation="fade" width="500" footer={footer} {...props}
      visible={visible} mousePosition={this.mousePosition} />;
  }
});
