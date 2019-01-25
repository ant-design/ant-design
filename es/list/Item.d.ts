import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ListGridType } from './index';
import { ConfigConsumerProps } from '../config-provider';
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    prefixCls?: string;
    style?: React.CSSProperties;
    extra?: React.ReactNode;
    actions?: React.ReactNode[];
    grid?: ListGridType;
}
export interface ListItemMetaProps {
    avatar?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
    description?: React.ReactNode;
    prefixCls?: string;
    style?: React.CSSProperties;
    title?: React.ReactNode;
}
export declare const Meta: (props: ListItemMetaProps) => JSX.Element;
export default class Item extends React.Component<ListItemProps, any> {
    static Meta: typeof Meta;
    static contextTypes: {
        grid: PropTypes.Requireable<any>;
    };
    context: any;
    renderItem: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
