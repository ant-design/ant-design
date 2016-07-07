import React from 'react';
import RcMenu, { Item, Divider, SubMenu, ItemGroup } from 'rc-menu';
import animation from '../_util/openAnimation';

function noop() {
}

export default class Menu extends React.Component {
  static Divider = Divider;
  static Item = Item;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;
  static defaultProps = {
    prefixCls: 'ant-menu',
    onClick: noop,
    onOpen: noop,
    onClose: noop,
    className: '',
    theme: 'light',  // or dark
  }
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.mode === 'inline' &&
        nextProps.mode !== 'inline') {
      this.switchModeFromInline = true;
    }
    if ('openKeys' in nextProps) {
      this.setOpenKeys(nextProps.openKeys);
    }
  }
  handleClick = (e) => {
    this.setOpenKeys([]);
    this.props.onClick(e);
  }
  handleOpenKeys = (e) => {
    const { openKeys } = e;
    this.setOpenKeys(openKeys);
    this.props.onOpen(e);
  }
  handleCloseKeys = (e) => {
    const { openKeys } = e;
    this.setOpenKeys(openKeys);
    this.props.onClose(e);
  }
  setOpenKeys(openKeys) {
    if (!('openKeys' in this.props)) {
      this.setState({ openKeys });
    }
  }
  render() {
    let openAnimation = this.props.openAnimation || this.props.openTransitionName;
    if (!openAnimation) {
      switch (this.props.mode) {
        case 'horizontal':
          openAnimation = 'slide-up';
          break;
        case 'vertical':
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchModeFromInline) {
            openAnimation = '';
            this.switchModeFromInline = false;
          } else {
            openAnimation = 'zoom-big';
          }
          break;
        case 'inline':
          openAnimation = animation;
          break;
        default:
      }
    }

    let props = {};
    const className = `${this.props.className} ${this.props.prefixCls}-${this.props.theme}`;
    if (this.props.mode !== 'inline') {
      // 这组属性的目的是
      // 弹出型的菜单需要点击后立即关闭
      // 另外，弹出型的菜单的受控模式没有使用场景
      props = {
        openKeys: this.state.openKeys,
        onClick: this.handleClick,
        onOpen: this.handleOpenKeys,
        onClose: this.handleCloseKeys,
        openTransitionName: openAnimation,
        className,
      };
    } else {
      props = {
        openAnimation,
        className,
      };
    }
    return <RcMenu {...this.props} {...props} />;
  }
}
