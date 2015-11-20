import React from 'react';
import Tooltip from 'rc-tooltip';
import Icon from '../icon';
import Button from '../button';
const prefixCls = 'ant-popover';

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
      onConfirm: function () {
      },
      onCancel: function () {
      }
    };
  },
  confirm() {
    this.props.onConfirm.call(this);
    this.setState({
      visible: false
    });
  },
  cancel() {
    this.props.onCancel.call(this);
    this.setState({
      visible: false
    });
  },
  onVisibleChange(v) {
    this.setState({
      visible: v
    });
  },
  render() {
    const overlay = <div>
      <div className={prefixCls + '-content'}>
        <p className={prefixCls + '-message'}>
          <Icon type="exclamation-circle" />
          {this.props.title}
        </p>

        <div className={prefixCls + '-buttons'}>
          <Button onClick={this.cancel} type="ghost" size="small">取消</Button>
          <Button onClick={this.confirm} type="primary" size="small">确定</Button>
        </div>
      </div>
    </div>;

    const transitionName = ({
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
    })[this.props.placement];

    return (
      <Tooltip placement={this.props.placement}
               overlayStyle={this.props.overlayStyle}
               prefixCls={prefixCls}
               onVisibleChange={this.onVisibleChange}
               transitionName={transitionName}
               visible={this.state.visible}
               trigger={this.props.trigger}
               overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
});
