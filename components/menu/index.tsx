import * as React from "react";
import { findDOMNode } from "react-dom";
import RcMenu, { Divider, ItemGroup } from "rc-menu";
import classNames from "classnames";
import animation from "../_util/openAnimation";
import warning from "../_util/warning";
import SubMenu from "./SubMenu";
import Item from "./MenuItem";
import { Context as SiderContext } from "../layout/Sider";
import MenuContext from "./context";

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

export type MenuMode =
  | "vertical"
  | "vertical-left"
  | "vertical-right"
  | "horizontal"
  | "inline";

export type MenuTheme = "light" | "dark";

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
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  siderCollapsed?: boolean;
  collapsedWidth?: string | number;
}

export interface MenuState {
  openKeys: string[];
}

class Menu extends React.Component<MenuProps, MenuState> {
  static defaultProps = {
    prefixCls: "ant-menu",
    className: "",
    theme: "light" as MenuTheme // or dark
  };
  switchModeFromInline: boolean;
  leaveAnimationExecutedWhenInlineCollapsed: boolean;
  inlineOpenKeys: string[] = [];
  constructor(props: MenuProps) {
    super(props);

    warning(
      !("onOpen" in props || "onClose" in props),
      "`onOpen` and `onClose` are removed, please use `onOpenChange` instead, " +
        "see: https://u.ant.design/menu-on-open-change."
    );

    warning(
      !("inlineCollapsed" in props && props.mode !== "inline"),
      "`inlineCollapsed` should only be used when Menu's `mode` is inline."
    );

    let openKeys;
    if ("defaultOpenKeys" in props) {
      openKeys = props.defaultOpenKeys;
    } else if ("openKeys" in props) {
      openKeys = props.openKeys;
    }

    this.state = {
      openKeys: openKeys || []
    };
  }
  getContext() {
    return {
      inlineCollapsed: this.getInlineCollapsed(),
      antdMenuTheme: this.props.theme
    };
  }
  componentWillReceiveProps(nextProps: MenuProps) {
    const { prefixCls } = this.props;
    if (this.props.mode === "inline" && nextProps.mode !== "inline") {
      this.switchModeFromInline = true;
    }
    if ("openKeys" in nextProps) {
      this.setState({ openKeys: nextProps.openKeys! });
      return;
    }
    if ((nextProps.inlineCollapsed && !this.props.inlineCollapsed) ||
        (nextProps.siderCollapsed && !this.props.siderCollapsed)) {
      const menuNode = findDOMNode(this) as Element;
      this.switchModeFromInline =
        !!this.state.openKeys.length && !!menuNode.querySelectorAll(`.${prefixCls}-submenu-open`).length;
      this.inlineOpenKeys = this.state.openKeys;
      this.setState({ openKeys: [] });
    }
    if (
      (!nextProps.inlineCollapsed && this.props.inlineCollapsed) ||
      (!nextProps.siderCollapsed && this.props.siderCollapsed)
    ) {
      this.setState({ openKeys: this.inlineOpenKeys });
      this.inlineOpenKeys = [];
    }
  }
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
    if (!("openKeys" in this.props)) {
      this.setState({ openKeys });
    }
  }
  getRealMenuMode() {
    const inlineCollapsed = this.getInlineCollapsed();
    if (this.switchModeFromInline && inlineCollapsed) {
      return "inline";
    }
    const { mode } = this.props;
    return inlineCollapsed ? "vertical" : mode;
  }
  getInlineCollapsed() {
    const { inlineCollapsed, siderCollapsed } = this.props;
    if (siderCollapsed !== undefined) {
      return siderCollapsed;
    }
    return inlineCollapsed;
  }
  getMenuOpenAnimation(menuMode: MenuMode) {
    const { openAnimation, openTransitionName } = this.props;
    let menuOpenAnimation = openAnimation || openTransitionName;
    if (openAnimation === undefined && openTransitionName === undefined) {
      switch (menuMode) {
        case "horizontal":
          menuOpenAnimation = "slide-up";
          break;
        case "vertical":
        case "vertical-left":
        case "vertical-right":
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchModeFromInline) {
            menuOpenAnimation = "";
            this.switchModeFromInline = false;
          } else {
            menuOpenAnimation = "zoom-big";
          }
          break;
        case "inline":
          menuOpenAnimation = {
            ...animation,
            leave: (node: HTMLElement, done: () => void) =>
              animation.leave(node, () => {
                // Make sure inline menu leave animation finished before mode is switched
                this.switchModeFromInline = false;
                this.setState({});
                // when inlineCollapsed change false to true, all submenu will be unmounted,
                // so that we don't need handle animation leaving.
                if (this.getRealMenuMode() === "vertical") {
                  return;
                }
                done();
              })
          };
          break;
        default:
      }
    }
    return menuOpenAnimation;
  }

  render() {
    const { prefixCls, className, collapsedWidth, theme } = this.props;
    const menuMode = this.getRealMenuMode();
    const menuOpenAnimation = this.getMenuOpenAnimation(menuMode!);

    const menuClassName = classNames(className, `${prefixCls}-${theme}`, {
      [`${prefixCls}-inline-collapsed`]: this.getInlineCollapsed()
    });

    const menuProps: MenuProps = {
      openKeys: this.state.openKeys,
      onOpenChange: this.handleOpenChange,
      className: menuClassName,
      mode: menuMode
    };

    if (menuMode !== "inline") {
      // closing vertical popup submenu after click it
      menuProps.onClick = this.handleClick;
      menuProps.openTransitionName = menuOpenAnimation;
    } else {
      menuProps.openAnimation = menuOpenAnimation;
    }

    // https://github.com/ant-design/ant-design/issues/8587
    if (
      this.getInlineCollapsed() &&
      (collapsedWidth === 0 ||
        collapsedWidth === "0" ||
        collapsedWidth === "0px")
    ) {
      return null;
    }

    return (
      <MenuContext.Provider value={this.getContext()}>
        <RcMenu {...this.props} {...menuProps} />
      </MenuContext.Provider>
    );
  }
}

class WarpContext extends React.Component<MenuProps, MenuState> {
  static Divider = Divider;
  static Item = Item;
  static SubMenu = SubMenu;
  static ItemGroup = ItemGroup;
  render() {
    return (
      <SiderContext.Consumer>
        {value => <Menu {...value} {...this.props} />}
      </SiderContext.Consumer>
    );
  }
}
export default WarpContext;
