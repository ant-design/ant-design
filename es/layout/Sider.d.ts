import { ConfigConsumerProps } from '../config-provider';
import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type CollapseType = 'clickTrigger' | 'responsive';
export declare type SiderTheme = 'light' | 'dark';
export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    collapsible?: boolean;
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    reverseArrow?: boolean;
    onCollapse?: (collapsed: boolean, type: CollapseType) => void;
    trigger?: React.ReactNode;
    width?: number | string;
    collapsedWidth?: number | string;
    breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    theme?: SiderTheme;
    onBreakpoint?: (broken: boolean) => void;
}
export interface SiderState {
    collapsed?: boolean;
    below: boolean;
    belowShow?: boolean;
}
export interface SiderContext {
    siderCollapsed: boolean;
}
declare class Sider extends React.Component<SiderProps, SiderState> {
    static __ANT_LAYOUT_SIDER: any;
    static defaultProps: {
        collapsible: boolean;
        defaultCollapsed: boolean;
        reverseArrow: boolean;
        width: number;
        collapsedWidth: number;
        style: {};
        theme: SiderTheme;
    };
    static childContextTypes: {
        siderCollapsed: PropTypes.Requireable<boolean>;
        collapsedWidth: PropTypes.Requireable<string | number>;
    };
    static contextTypes: {
        siderHook: PropTypes.Requireable<object>;
    };
    static getDerivedStateFromProps(nextProps: SiderProps): {
        collapsed: boolean | undefined;
    } | null;
    context: any;
    private mql;
    private uniqueId;
    constructor(props: SiderProps);
    getChildContext(): {
        siderCollapsed: boolean | undefined;
        collapsedWidth: string | number | undefined;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    responsiveHandler: (mql: MediaQueryListEvent | MediaQueryList) => void;
    setCollapsed: (collapsed: boolean, type: CollapseType) => void;
    toggle: () => void;
    belowShowChange: () => void;
    renderSider: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default Sider;
