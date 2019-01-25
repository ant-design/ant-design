import { ConfigConsumerProps } from '../config-provider';
import * as React from 'react';
import * as PropTypes from 'prop-types';
export declare type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export declare type BreakpointMap = Partial<Record<Breakpoint, string>>;
declare const RowAligns: ["top", "middle", "bottom"];
declare const RowJustify: ["start", "end", "center", "space-around", "space-between"];
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    gutter?: number | Partial<Record<Breakpoint, number>>;
    type?: 'flex';
    align?: (typeof RowAligns)[number];
    justify?: (typeof RowJustify)[number];
    prefixCls?: string;
}
export interface RowState {
    screens: BreakpointMap;
}
export default class Row extends React.Component<RowProps, RowState> {
    static defaultProps: {
        gutter: number;
    };
    static propTypes: {
        type: PropTypes.Requireable<"flex">;
        align: PropTypes.Requireable<"top" | "middle" | "bottom">;
        justify: PropTypes.Requireable<"start" | "center" | "end" | "space-around" | "space-between">;
        className: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        gutter: PropTypes.Requireable<number | object>;
        prefixCls: PropTypes.Requireable<string>;
    };
    state: RowState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getGutter(): number | undefined;
    renderRow: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
