import React from 'react';
import Menu from 'rc-menu';
import animation from '../common/openAnimation';

function noop() {
}

const AntMenu = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-menu',
      onClick: noop,
      onOpen: noop,
      onClose: noop,
      className: '',
      theme: 'light',  // or dark
    };
  },
  getInitialState() {
    return {
      openKeys: []
    };
  },
  handleClick(e) {
    this.setState({
      openKeys: []
    });
    this.props.onClick(e);
  },
  handleOpenKeys(e) {
    this.setState({
      openKeys: e.openKeys
    });
    this.props.onOpen();
  },
  handleCloseKeys(e) {
    this.setState({
      openKeys: e.openKeys
    });
    this.props.onClose();
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

    let props = {
      openKeys: this.state.openKeys,
      onClick: this.handleClick,
      onOpen: this.handleOpenKeys,
      onClose: this.handleCloseKeys,
    };
    const className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
    if (this.props.mode === 'inline') {
      return <Menu {...this.props} className={className} openAnimation={openAnimation} />;
    } else {
      return <Menu {...this.props} {...props} className={className} openTransitionName={openAnimation} />;
    }
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
