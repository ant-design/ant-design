import * as React from 'react';
export interface TimeLineItemProps {
    prefixCls?: string;
    className?: string;
    color?: string;
    dot?: React.ReactNode;
    pending?: boolean;
    style?: React.CSSProperties;
}
declare const TimelineItem: React.SFC<TimeLineItemProps>;
export default TimelineItem;
