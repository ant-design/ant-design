import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumerProps } from '../config-provider';
export { ScrollNumberProps } from './ScrollNumber';
export interface BadgeProps {
    /** Number to show in badge */
    count?: React.ReactNode;
    showZero?: boolean;
    /** Max count to show */
    overflowCount?: number;
    /** whether to show red dot without number */
    dot?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    scrollNumberPrefixCls?: string;
    className?: string;
    status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
    text?: string;
    offset?: [number | string, number | string];
    title?: string;
}
export default class Badge extends React.Component<BadgeProps, any> {
    static defaultProps: {
        count: null;
        showZero: boolean;
        dot: boolean;
        overflowCount: number;
    };
    static propTypes: {
        count: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        showZero: PropTypes.Requireable<boolean>;
        dot: PropTypes.Requireable<boolean>;
        overflowCount: PropTypes.Requireable<number>;
    };
    getBadgeClassName(prefixCls: string): string;
    isZero(): boolean;
    isDot(): true | "default" | "error" | "success" | "warning" | "processing" | undefined;
    isHidden(): boolean;
    getNumberedDispayCount(): string | number | null;
    getDispayCount(): string | number | null;
    getScrollNumberTitle(): string | number | undefined;
    getStyleWithOffset(): React.CSSProperties | undefined;
    renderStatusText(prefixCls: string): JSX.Element | null;
    renderDispayComponent(): React.ReactElement<any> | undefined;
    renderBadgeNumber(prefixCls: string, scrollNumberPrefixCls: string): JSX.Element | null;
    renderBadge: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
