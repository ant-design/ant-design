import React from 'react';
import Menu from 'rc-menu';
import animation from '../common/openAnimation';

const AntMenu = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-menu'
    };
  },
  render() {
    let openAnimation = '';
    switch (this.props.mode) {
    case 'horizontal':
      openAnimation = 'slide-up';
      break;
    case 'vertical':
      openAnimation = 'zoom-big';
      break;
    case 'inline':
      openAnimation = animation;
      break;
    default:
    }
    if (this.props.mode === 'inline') {
      return <Menu {...this.props} openAnimation={openAnimation} />;
    } else {
      return <Menu {...this.props} openTransitionName={openAnimation} />;
    }
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
