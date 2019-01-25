import * as React from 'react';
import CollapsePanel from './CollapsePanel';
import { ConfigConsumerProps } from '../config-provider';
export interface CollapseProps {
    activeKey?: Array<string> | string;
    defaultActiveKey?: Array<string>;
    /** 手风琴效果 */
    accordion?: boolean;
    destroyInactivePanel?: boolean;
    onChange?: (key: string | string[]) => void;
    style?: React.CSSProperties;
    className?: string;
    bordered?: boolean;
    prefixCls?: string;
}
export default class Collapse extends React.Component<CollapseProps, any> {
    static Panel: typeof CollapsePanel;
    static defaultProps: {
        bordered: boolean;
        openAnimation: {
            appear(): void;
            enter(node: HTMLElement, done: () => void): any;
            leave(node: HTMLElement, done: () => void): any;
        };
    };
    renderExpandIcon: () => JSX.Element;
    renderCollapse: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
