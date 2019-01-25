import * as React from 'react';
import { Component } from 'react';
import { ConfigConsumerProps } from '../config-provider';
export interface ScrollNumberProps {
    prefixCls?: string;
    className?: string;
    count?: string | number | null;
    displayComponent?: React.ReactElement<any>;
    component?: string;
    onAnimated?: Function;
    style?: React.CSSProperties;
    title?: string | number | null;
}
export interface ScrollNumberState {
    animateStarted?: boolean;
    count?: string | number | null;
}
export default class ScrollNumber extends Component<ScrollNumberProps, ScrollNumberState> {
    static defaultProps: {
        count: null;
        onAnimated(): void;
    };
    lastCount: any;
    constructor(props: ScrollNumberProps);
    getPositionByNum(num: number, i: number): number;
    componentWillReceiveProps(nextProps: ScrollNumberProps): void;
    renderNumberList(position: number): React.ReactElement<any>[];
    renderCurrentNumber(prefixCls: string, num: number, i: number): React.DetailedReactHTMLElement<{
        className: string;
        style: {
            transition: string | undefined;
            msTransform: string;
            WebkitTransform: string;
            transform: string;
        };
        key: number;
    }, HTMLElement>;
    renderNumberElement(prefixCls: string): string | number | React.DetailedReactHTMLElement<{
        className: string;
        style: {
            transition: string | undefined;
            msTransform: string;
            WebkitTransform: string;
            transform: string;
        };
        key: number;
    }, HTMLElement>[] | null | undefined;
    renderScrollNumber: ({ getPrefixCls }: ConfigConsumerProps) => React.ReactElement<any>;
    render(): JSX.Element;
}
