import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SpinProps } from '../spin';
import { ConfigConsumerProps } from '../config-provider';
import { PaginationConfig } from '../pagination';
import Item from './Item';
export { ListItemProps, ListItemMetaProps } from './Item';
export declare type ColumnCount = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 24;
export declare type ColumnType = 'gutter' | 'column' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export interface ListGridType {
    gutter?: number;
    column?: ColumnCount;
    xs?: ColumnCount;
    sm?: ColumnCount;
    md?: ColumnCount;
    lg?: ColumnCount;
    xl?: ColumnCount;
    xxl?: ColumnCount;
}
export declare type ListSize = 'small' | 'default' | 'large';
export interface ListProps {
    bordered?: boolean;
    className?: string;
    children?: React.ReactNode;
    dataSource: any;
    extra?: React.ReactNode;
    grid?: ListGridType;
    id?: string;
    itemLayout?: string;
    loading?: boolean | SpinProps;
    loadMore?: React.ReactNode;
    pagination?: PaginationConfig | false;
    prefixCls?: string;
    rowKey?: any;
    renderItem: any;
    size?: ListSize;
    split?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    locale?: ListLocale;
}
export interface ListLocale {
    emptyText: string;
}
export default class List extends React.Component<ListProps> {
    static Item: typeof Item;
    static childContextTypes: {
        grid: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        dataSource: never[];
        bordered: boolean;
        split: boolean;
        loading: boolean;
        pagination: false | PaginationConfig | undefined;
    };
    state: {
        paginationCurrent: number;
    };
    defaultPaginationProps: {
        current: number;
        pageSize: number;
        onChange: (page: number, pageSize: number) => void;
        total: number;
    };
    private keys;
    getChildContext(): {
        grid: ListGridType | undefined;
    };
    renderItem: (item: React.ReactElement<any>, index: number) => any;
    isSomethingAfterLastItem(): boolean;
    renderEmpty: (prefixCls: string, renderEmpty: (componentName?: string | undefined) => React.ReactNode) => JSX.Element;
    renderList: ({ getPrefixCls, renderEmpty }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
