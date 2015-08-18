import React from 'react';
import Dialog from 'rc-dialog';
function noop() {
}

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
    return <Dialog transitionName="zoom" onClose={this.handleCancel} maskAnimation="fade"
                   width="500" footer={footer} {...props} visible={visible} />;
  }
});
