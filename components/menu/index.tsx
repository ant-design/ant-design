import * as React from 'react';
import RcMenu, { Divider, ItemGroup } from 'rc-menu';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import animation from '../_util/openAnimation';
import warning from '../_util/warning';
import { polyfill } from 'react-lifecycles-compat';

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

export type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';

export type MenuTheme = 'light' | 'dark';

export interface MenuProps {
  id?: string;
  theme?: MenuTheme;
  mode?: MenuMode;
  selectable?: boolean;
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
  subMenuCloseDelay?: number;
  subMenuOpenDelay?: number;
  focusable?: boolean;
  onMouseEnter?: (e: MouseEvent) => void;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  overflowedIndicator?: React.ReactNode;
}

export interface MenuState {
  openKeys: string[];
}

class Menu extends React.Component<MenuProps, MenuState> {
  static Divider = Divider;
  static Item = Item;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;
  static defaultProps: Partial<MenuProps> = {
    className: '',
    theme: 'light', // or dark
    focusable: false,
  };
  static childContextTypes = {
    inlineCollapsed: PropTypes.bool,
    antdMenuTheme: PropTypes.string,
  };
  static contextTypes = {
    siderCollapsed: PropTypes.bool,
    collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static getDerivedStateFromProps(nextProps: MenuProps) {
    if ('openKeys' in nextProps) {
      return { openKeys: nextProps.openKeys! };
    }
    return null;
  }

  context: any;
  switchingModeFromInline: boolean;
  inlineOpenKeys: string[] = [];
  contextSiderCollapsed: boolean = true;

  constructor(props: MenuProps) {
    super(props);

    warning(
      !('onOpen' in props || 'onClose' in props),
      'Menu',
      '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, ' +
        'see: https://u.ant.design/menu-on-open-change.',
    );

    warning(
      !('inlineCollapsed' in props && props.mode !== 'inline'),
      'Menu',
      '`inlineCollapsed` should only be used when `mode` is inline.',
    );

    let openKeys;
    if ('openKeys' in props) {
      openKeys = props.openKeys;
    } else if ('defaultOpenKeys' in props) {
      openKeys = props.defaultOpenKeys;
    }

    this.state = {
      openKeys: openKeys || [],
    };
  }

  getChildContext() {
    return {
      inlineCollapsed: this.getInlineCollapsed(),
      antdMenuTheme: this.props.theme,
    };
  }

  componentDidUpdate(prevProps: MenuProps) {
    if (prevProps.mode === 'inline' && this.props.mode !== 'inline') {
      this.switchingModeFromInline = true;
    }
    if (
      (this.props.inlineCollapsed && !prevProps.inlineCollapsed) ||
      (this.getInlineCollapsed() && this.contextSiderCollapsed)
    ) {
      this.contextSiderCollapsed = false;
      this.switchingModeFromInline = true;
      this.inlineOpenKeys = this.state.openKeys;
      this.setState({ openKeys: [] });
    }
    if (
      (!this.props.inlineCollapsed && prevProps.inlineCollapsed) ||
      (!this.getInlineCollapsed() && !this.contextSiderCollapsed)
    ) {
      this.contextSiderCollapsed = true;
      this.setState({ openKeys: this.inlineOpenKeys });
      this.inlineOpenKeys = [];
    }
  }

  restoreModeVerticalFromInline() {
    if (this.switchingModeFromInline) {
      this.switchingModeFromInline = false;
      this.setState({});
    }
  }

  // Restore vertical mode when menu is collapsed responsively when mounted
  // https://github.com/ant-design/ant-design/issues/13104
  // TODO: not a perfect solution, looking a new way to avoid setting switchingModeFromInline in this situation
  handleMouseEnter = (e: MouseEvent) => {
    this.restoreModeVerticalFromInline();
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter(e);
    }
  };

  handleTransitionEnd = (e: TransitionEvent) => {
    // when inlineCollapsed menu width animation finished
    // https://github.com/ant-design/ant-design/issues/12864
    const widthCollapsed = e.propertyName === 'width' && e.target === e.currentTarget;

    // Fix SVGElement e.target.className.indexOf is not a function
    // https://github.com/ant-design/ant-design/issues/15699
    const { className } = e.target as (HTMLElement | SVGElement);
    // SVGAnimatedString.animVal should be identical to SVGAnimatedString.baseVal, unless during an animation.
    const classNameValue =
      Object.prototype.toString.call(className) === '[object SVGAnimatedString]'
        ? className.animVal
        : className;

    // Fix for <Menu style={{ width: '100%' }} />, the width transition won't trigger when menu is collapsed
    // https://github.com/ant-design/ant-design-pro/issues/2783
    const iconScaled = e.propertyName === 'font-size' && classNameValue.indexOf('anticon') >= 0;
    if (widthCollapsed || iconScaled) {
      this.restoreModeVerticalFromInline();
    }
  };

  handleClick = (e: ClickParam) => {
    this.handleOpenChange([]);

    const { onClick } = this.props;
    if (onClick) {
      onClick(e);
    }
  };

  handleOpenChange = (openKeys: string[]) => {
    this.setOpenKeys(openKeys);

    const { onOpenChange } = this.props;
    if (onOpenChange) {
      onOpenChange(openKeys);
    }
  };

  setOpenKeys(openKeys: string[]) {
    if (!('openKeys' in this.props)) {
      this.setState({ openKeys });
    }
  }

  getRealMenuMode() {
    const inlineCollapsed = this.getInlineCollapsed();
    if (this.switchingModeFromInline && inlineCollapsed) {
      return 'inline';
    }
    const { mode } = this.props;
    return inlineCollapsed ? 'vertical' : mode;
  }

  getInlineCollapsed() {
    const { inlineCollapsed } = this.props;
    if (this.context.siderCollapsed !== undefined) {
      return this.context.siderCollapsed;
    }
    if (this.contextSiderCollapsed) {
      return false;
    }
    return inlineCollapsed;
  }

  getMenuOpenAnimation(menuMode: MenuMode) {
    const { openAnimation, openTransitionName } = this.props;
    let menuOpenAnimation = openAnimation || openTransitionName;
    if (openAnimation === undefined && openTransitionName === undefined) {
      if (menuMode === 'horizontal') {
        menuOpenAnimation = 'slide-up';
      } else if (menuMode === 'inline') {
        menuOpenAnimation = animation;
      } else {
        // When mode switch from inline
        // submenu should hide without animation
        if (this.switchingModeFromInline) {
          menuOpenAnimation = '';
          this.switchingModeFromInline = false;
        } else {
          menuOpenAnimation = 'zoom-big';
        }
      }
    }
    return menuOpenAnimation;
  }

  renderMenu = ({ getPopupContainer, getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, theme } = this.props;
    const menuMode = this.getRealMenuMode();
    const menuOpenAnimation = this.getMenuOpenAnimation(menuMode!);

    const prefixCls = getPrefixCls('menu', customizePrefixCls);
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

    // https://github.com/ant-design/ant-design/issues/8587
    const { collapsedWidth } = this.context;
    if (
      this.getInlineCollapsed() &&
      (collapsedWidth === 0 || collapsedWidth === '0' || collapsedWidth === '0px')
    ) {
      return null;
    }

    return (
      <RcMenu
        getPopupContainer={getPopupContainer}
        {...this.props}
        {...menuProps}
        prefixCls={prefixCls}
        onTransitionEnd={this.handleTransitionEnd}
        onMouseEnter={this.handleMouseEnter}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderMenu}</ConfigConsumer>;
  }
}

polyfill(Menu);

export default Menu;
