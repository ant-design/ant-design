import React from 'react';
import RcMenu, { Divider, SubMenu, ItemGroup } from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';
import Item from './MenuItem';

export interface SelectParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: any;
  selectedKeys: Array<string>;
}

export interface ClickParam {
  key: string;
  keyPath: Array<string>;
  item: any;
  domEvent: any;
}

export interface MenuProps {
  id?: string;
  /** `light` `dark` */
  theme?: 'light' | 'dark';
  /** enum: `vertical` `horizontal` `inline` */
  mode?: 'vertical' | 'horizontal' | 'inline';
  selectedKeys?: Array<string>;
  defaultSelectedKeys?: Array<string>;
  openKeys?: Array<string>;
  defaultOpenKeys?: Array<string>;
  onOpenChange?: (openKeys: string[]) => void;
  onSelect?: (param: SelectParam) => void;
  onDeselect?: (param: SelectParam) => void;
  onClick?: (param: ClickParam) => void;
  style?: React.CSSProperties;
  openAnimation?: string | Object;
  openTransitionName?: string | Object;
  className?: string;
  prefixCls?: string;
  multiple?: boolean;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
}

export default class Menu extends React.Component<MenuProps, any> {
  static Divider = Divider;
  static Item = Item;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;
  static defaultProps = {
    prefixCls: 'ant-menu',
    className: '',
    theme: 'light',  // or dark
  };
  static childContextTypes = {
    inlineCollapsed: PropTypes.bool,
  };
  static contextTypes = {
    siderCollapsed: PropTypes.bool,
  };
  switchModeFromInline: boolean;
  inlineOpenKeys = [];
  constructor(props) {
    super(props);

    warning(
      !('onOpen' in props || 'onClose' in props),
      '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' +
      'see: http://u.ant.design/menu-on-open-change.',
    );

    warning(
      !('inlineCollapsed' in props && props.mode !== 'inline'),
      '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.',
    );

    let openKeys;
    if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    } else if ('openKeys' in props) {
      openKeys = props.openKeys;
    }

    this.state = {
      openKeys: openKeys || [],
    };
  }
  getChildContext() {
    return {
      inlineCollapsed: this.getInlineCollapsed(),
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.mode === 'inline' &&
        nextProps.mode !== 'inline') {
      this.switchModeFromInline = true;
    }
    if ((nextProps.inlineCollapsed && !this.props.inlineCollapsed) ||
        (nextContext.siderCollapsed && !this.context.siderCollapsed)) {
      this.switchModeFromInline = true;
      this.inlineOpenKeys = this.state.openKeys;
      this.setOpenKeys([]);
    }
    if ((!nextProps.inlineCollapsed && this.props.inlineCollapsed) ||
        (!nextContext.siderCollapsed && this.context.siderCollapsed)) {
      this.setOpenKeys(this.inlineOpenKeys);
      this.inlineOpenKeys = [];
    }
    if ('openKeys' in nextProps) {
      this.setState({ openKeys: nextProps.openKeys });
    }
  }
  handleClick = (e) => {
    this.setOpenKeys([]);

    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  }
  handleOpenChange = (openKeys: string[]) => {
    this.setOpenKeys(openKeys);

    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  }
  setOpenKeys(openKeys) {
    if (!('openKeys' in this.props)) {
      this.setState({ openKeys });
    }
  }
  getRealMenuMode() {
    const { mode } = this.props;
    return this.getInlineCollapsed() ? 'vertical' : mode;
  }
  getInlineCollapsed() {
    const { inlineCollapsed } = this.props;
    if (this.context.siderCollapsed !== undefined) {
      return this.context.siderCollapsed;
    }
    return inlineCollapsed;
  }
  getMenuOpenAnimation() {
    const { openAnimation, openTransitionName } = this.props;
    const menuMode = this.getRealMenuMode();
    let menuOpenAnimation = openAnimation || openTransitionName;
    if (openAnimation === undefined && openTransitionName === undefined) {
      switch (menuMode) {
        case 'horizontal':
          menuOpenAnimation = 'slide-up';
          break;
        case 'vertical':
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchModeFromInline) {
            menuOpenAnimation = '';
            this.switchModeFromInline = false;
          } else {
            menuOpenAnimation = 'zoom-big';
          }
          break;
        case 'inline':
          menuOpenAnimation = animation;
          break;
        default:
      }
    }
    return menuOpenAnimation;
  }
  render() {
    const { prefixCls, className, theme } = this.props;
    const menuMode = this.getRealMenuMode();
    const menuOpenAnimation = this.getMenuOpenAnimation();

    const menuClassName = classNames(className, `${prefixCls}-${theme}`, {
      [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed(),
    });

    const menuProps: MenuProps = {
      openKeys: this.state.openKeys,
      onOpenChange: this.handleOpenChange,
      className: menuClassName,
      mode: menuMode,
    };

    if (menuMode !== 'inline') {
      // closing vertical popup submenu after click it
      menuProps.onClick = this.handleClick;
      menuProps.openTransitionName = menuOpenAnimation;
    } else {
      menuProps.openAnimation = menuOpenAnimation;
    }

    return <RcMenu {...this.props} {...menuProps} />;
  }
}
