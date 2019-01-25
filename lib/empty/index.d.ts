import * as React from 'react';
export interface TransferLocale {
    description: string;
}
export interface EmptyProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    image?: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
}
declare const Empty: React.SFC<EmptyProps>;
export default Empty;
