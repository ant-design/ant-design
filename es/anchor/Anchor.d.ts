import * as React from 'react';
import * as PropTypes from 'prop-types';
import AnchorLink from './AnchorLink';
import { ConfigConsumerProps } from '../config-provider';
declare function getDefaultContainer(): Window;
export declare type AnchorContainer = HTMLElement | Window;
export interface AnchorProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    offsetTop?: number;
    bounds?: number;
    affix?: boolean;
    showInkInFixed?: boolean;
    getContainer?: () => AnchorContainer;
    onClick?: (e: React.MouseEvent<HTMLElement>, link: {
        title: React.ReactNode;
        href: string;
    }) => void;
}
export interface AnchorState {
    activeLink: null | string;
}
export interface AnchorDefaultProps extends AnchorProps {
    prefixCls: string;
    affix: boolean;
    showInkInFixed: boolean;
    getContainer: () => AnchorContainer;
}
export interface AntAnchor {
    registerLink: (link: string) => void;
    unregisterLink: (link: string) => void;
    activeLink: string | null;
    scrollTo: (link: string) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>, link: {
        title: React.ReactNode;
        href: string;
    }) => void;
}
export default class Anchor extends React.Component<AnchorProps, AnchorState> {
    static Link: typeof AnchorLink;
    static defaultProps: {
        affix: boolean;
        showInkInFixed: boolean;
        getContainer: typeof getDefaultContainer;
    };
    static childContextTypes: {
        antAnchor: PropTypes.Requireable<object>;
    };
    state: {
        activeLink: null;
    };
    private inkNode;
    private links;
    private scrollEvent;
    private animating;
    private prefixCls?;
    getChildContext(): {
        antAnchor: AntAnchor;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    handleScroll: () => void;
    handleScrollTo: (link: string) => void;
    getCurrentAnchor(offsetTop?: number, bounds?: number): string;
    updateInk: () => void;
    saveInkNode: (node: HTMLSpanElement) => void;
    renderAnchor: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
