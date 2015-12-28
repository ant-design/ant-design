import React from 'react';
import Tooltip from 'rc-tooltip';
import Icon from '../icon';
import Button from '../button';

const prefixCls = 'ant-popover';
const noop = function() {};
const transitionNames = {
  top: 'zoom-down',
  bottom: 'zoom-up',
  left: 'zoom-right',
  right: 'zoom-left',
  topLeft: 'zoom-down',
  bottomLeft: 'zoom-up',
  leftTop: 'zoom-right',
  rightTop: 'zoom-left',
  topRight: 'zoom-down',
  bottomRight: 'zoom-up',
  leftBottom: 'zoom-right',
  rightBottom: 'zoom-left',
};

export default React.createClass({
  getInitialState() {
    return {
      visible: false
    };
  },
  getDefaultProps() {
    return {
      transitionName: '',
      placement: 'top',
      trigger: 'click',
      overlayStyle: {},
      onConfirm: noop,
      onCancel: noop,
      okText: '确定',
      cancelText: '取消',
      onVisibleChange() {},
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  },
  confirm() {
    this.setVisible(false);
    this.props.onConfirm.call(this);
  },
  cancel() {
    this.setVisible(false);
    this.props.onCancel.call(this);
  },
  onVisibleChange(visible) {
    this.setVisible(visible);
    this.props.onVisibleChange(visible);
  },
  setVisible(visible) {
    if (!('visible' in this.props)) {
      this.setState({ visible });
    }
  },
  render() {
    const {title, okText, cancelText, placement, overlayStyle, trigger} = this.props;
    const overlay = <div>
      <div className={prefixCls + '-content'}>
        <p className={prefixCls + '-message'}>
          <Icon type="exclamation-circle" />
          {title}
        </p>
        <div className={prefixCls + '-buttons'}>
          <Button onClick={this.cancel} type="ghost" size="small">{cancelText}</Button>
          <Button onClick={this.confirm} type="primary" size="small">{okText}</Button>
        </div>
      </div>
    </div>;

    const transitionName = transitionNames[placement];

    return (
      <Tooltip placement={placement}
               overlayStyle={overlayStyle}
               prefixCls={prefixCls}
               onVisibleChange={this.onVisibleChange}
               transitionName={transitionName}
               visible={this.state.visible}
               trigger={trigger}
               overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
});
