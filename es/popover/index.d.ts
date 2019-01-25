import * as React from 'react';
import { AbstractTooltipProps, TooltipPlacement, TooltipTrigger } from '../tooltip';
import { ConfigConsumerProps } from '../config-provider';
export interface PopoverProps extends AbstractTooltipProps {
    title?: React.ReactNode;
    content?: React.ReactNode;
}
export default class Popover extends React.Component<PopoverProps, {}> {
    static defaultProps: {
        placement: TooltipPlacement;
        transitionName: string;
        trigger: TooltipTrigger;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        overlayStyle: {};
    };
    private tooltip;
    getPopupDomNode(): any;
    getOverlay(prefixCls: string): JSX.Element;
    saveTooltip: (node: any) => void;
    renderPopover: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
