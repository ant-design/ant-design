'use strict';

var React = require('react');
var Tooltip = require('rc-tooltip');
var prefixCls = 'ant-popover';

module.exports = React.createClass({
  getDefaultProps() {
    return {
      transitionName: '',
      placement: 'top',
      trigger: 'hover'
    };
  },
  render() {
    var overlay = <div>
      <div className={prefixCls + '-title'}>
        {this.props.title}
      </div>
      <div className={prefixCls + '-content'}>
        {this.props.overlay}
      </div>
    </div>;

    var transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];

    return (
      <Tooltip placement={this.props.placement}
        prefixCls={prefixCls}
        renderPopupToBody={false}
        transitionName={transitionName}
        trigger={this.props.trigger}
        overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
});
