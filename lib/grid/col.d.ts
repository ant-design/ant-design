import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumerProps } from '../config-provider';
declare type ColSpanType = number | string;
export interface ColSize {
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
}
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    span?: ColSpanType;
    order?: ColSpanType;
    offset?: ColSpanType;
    push?: ColSpanType;
    pull?: ColSpanType;
    xs?: ColSpanType | ColSize;
    sm?: ColSpanType | ColSize;
    md?: ColSpanType | ColSize;
    lg?: ColSpanType | ColSize;
    xl?: ColSpanType | ColSize;
    xxl?: ColSpanType | ColSize;
    prefixCls?: string;
}
export default class Col extends React.Component<ColProps, {}> {
    static propTypes: {
        span: PropTypes.Requireable<number>;
        order: PropTypes.Requireable<number>;
        offset: PropTypes.Requireable<number>;
        push: PropTypes.Requireable<number>;
        pull: PropTypes.Requireable<number>;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        xs: PropTypes.Requireable<number | object>;
        sm: PropTypes.Requireable<number | object>;
        md: PropTypes.Requireable<number | object>;
        lg: PropTypes.Requireable<number | object>;
        xl: PropTypes.Requireable<number | object>;
        xxl: PropTypes.Requireable<number | object>;
    };
    renderCol: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
