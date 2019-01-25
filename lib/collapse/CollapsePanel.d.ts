import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
export interface CollapsePanelProps {
    key: string;
    header: React.ReactNode;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    showArrow?: boolean;
    prefixCls?: string;
    forceRender?: boolean;
    id?: string;
}
export default class CollapsePanel extends React.Component<CollapsePanelProps, {}> {
    renderCollapsePanel: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
