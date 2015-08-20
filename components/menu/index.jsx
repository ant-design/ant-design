import Menu from 'rc-menu';
import React from 'react';

const AntMenu = React.createClass({
  getDefaultProps(){
    return {
      prefixCls: 'ant-menu'
    };
  },

  render(){
    return <Menu {...this.props}/>;
  }
});

AntMenu.Divider = Menu.Divider;
AntMenu.Item = Menu.Item;
AntMenu.SubMenu = Menu.SubMenu;

export default AntMenu;
