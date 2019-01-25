import * as React from 'react';
export interface DividerProps {
    prefixCls?: string;
    type?: 'horizontal' | 'vertical';
    orientation?: 'left' | 'right' | '';
    className?: string;
    children?: React.ReactNode;
    dashed?: boolean;
    style?: React.CSSProperties;
}
declare const Divider: React.SFC<DividerProps>;
export default Divider;
