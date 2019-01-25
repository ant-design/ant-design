import * as React from 'react';
export interface GroupProps {
    className?: string;
    size?: 'large' | 'small' | 'default';
    children?: any;
    style?: React.CSSProperties;
    onMouseEnter?: React.MouseEventHandler<HTMLSpanElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLSpanElement>;
    onFocus?: React.FocusEventHandler<HTMLSpanElement>;
    onBlur?: React.FocusEventHandler<HTMLSpanElement>;
    prefixCls?: string;
    compact?: boolean;
}
declare const Group: React.StatelessComponent<GroupProps>;
export default Group;
