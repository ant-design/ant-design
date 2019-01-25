import * as React from 'react';
import Grid from './Grid';
import Meta from './Meta';
import { ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';
export { CardGridProps } from './Grid';
export { CardMetaProps } from './Meta';
export declare type CardType = 'inner';
export declare type CardSize = 'default' | 'small';
export interface CardTabListType {
    key: string;
    tab: React.ReactNode;
    disabled?: boolean;
}
export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    prefixCls?: string;
    title?: React.ReactNode;
    extra?: React.ReactNode;
    bordered?: boolean;
    headStyle?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    loading?: boolean;
    noHovering?: boolean;
    hoverable?: boolean;
    children?: React.ReactNode;
    id?: string;
    className?: string;
    size?: CardSize;
    type?: CardType;
    cover?: React.ReactNode;
    actions?: React.ReactNode[];
    tabList?: CardTabListType[];
    onTabChange?: (key: string) => void;
    activeTabKey?: string;
    defaultActiveTabKey?: string;
}
export interface CardState {
    widerPadding: boolean;
}
export default class Card extends React.Component<CardProps, CardState> {
    static Grid: typeof Grid;
    static Meta: typeof Meta;
    state: {
        widerPadding: boolean;
    };
    private resizeEvent;
    private updateWiderPaddingCalled;
    private container;
    componentDidMount(): void;
    componentWillUnmount(): void;
    updateWiderPadding(): void;
    onTabChange: (key: string) => void;
    saveRef: (node: HTMLDivElement) => void;
    isContainGrid(): undefined;
    getAction(actions: React.ReactNode[]): JSX.Element[] | null;
    getCompatibleHoverable(): boolean | undefined;
    renderCard: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
