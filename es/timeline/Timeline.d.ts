import * as React from 'react';
import { TimeLineItemProps } from './TimelineItem';
import { ConfigConsumerProps } from '../config-provider';
export interface TimelineProps {
    prefixCls?: string;
    className?: string;
    /** 指定最后一个幽灵节点是否存在或内容 */
    pending?: React.ReactNode;
    pendingDot?: React.ReactNode;
    style?: React.CSSProperties;
    reverse?: boolean;
    mode?: 'left' | 'alternate' | 'right';
}
export default class Timeline extends React.Component<TimelineProps, any> {
    static Item: React.SFC<TimeLineItemProps>;
    static defaultProps: {
        reverse: boolean;
        mode: string;
    };
    renderTimeline: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
