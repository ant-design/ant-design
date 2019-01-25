import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
export interface BackTopProps {
    visibilityHeight?: number;
    onClick?: React.MouseEventHandler<any>;
    target?: () => HTMLElement | Window;
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
}
export default class BackTop extends React.Component<BackTopProps, any> {
    static defaultProps: {
        visibilityHeight: number;
    };
    scrollEvent: any;
    constructor(props: BackTopProps);
    getCurrentScrollTop: () => number;
    scrollToTop: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setScrollTop(value: number): void;
    handleScroll: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderBackTop: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
