import * as React from 'react';
import * as PropTypes from 'prop-types';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import { ConfigConsumerProps } from '../config-provider';
import { SiderContext } from '../layout/Sider';
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
export declare type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
export declare type MenuTheme = 'light' | 'dark';
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
}
export interface MenuState {
    openKeys: string[];
}
export default class Menu extends React.Component<MenuProps, MenuState> {
    static Divider: any;
    static Item: typeof Item;
    static SubMenu: typeof SubMenu;
    static ItemGroup: any;
    static defaultProps: Partial<MenuProps>;
    static childContextTypes: {
        inlineCollapsed: PropTypes.Requireable<boolean>;
        antdMenuTheme: PropTypes.Requireable<string>;
    };
    static contextTypes: {
        siderCollapsed: PropTypes.Requireable<boolean>;
        collapsedWidth: PropTypes.Requireable<string | number>;
    };
    context: any;
    switchingModeFromInline: boolean;
    inlineOpenKeys: string[];
    constructor(props: MenuProps);
    getChildContext(): {
        inlineCollapsed: any;
        antdMenuTheme: "dark" | "light" | undefined;
    };
    componentWillReceiveProps(nextProps: MenuProps, nextContext: SiderContext): void;
    restoreModeVerticalFromInline(): void;
    handleMouseEnter: (e: MouseEvent) => void;
    handleTransitionEnd: (e: TransitionEvent) => void;
    handleClick: (e: ClickParam) => void;
    handleOpenChange: (openKeys: string[]) => void;
    setOpenKeys(openKeys: string[]): void;
    getRealMenuMode(): "inline" | "horizontal" | "vertical" | "vertical-left" | "vertical-right" | undefined;
    getInlineCollapsed(): any;
    getMenuOpenAnimation(menuMode: MenuMode): Object | undefined;
    renderMenu: ({ getPopupContainer, getPrefixCls }: ConfigConsumerProps) => JSX.Element | null;
    render(): JSX.Element;
}
