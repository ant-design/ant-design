import * as React from 'react';
import { AdjustOverflow, PlacementsConfig } from './placements';
import { ConfigConsumerProps } from '../config-provider';
export { AdjustOverflow, PlacementsConfig };
export declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
export declare type TooltipTrigger = 'hover' | 'focus' | 'click' | 'contextMenu';
export interface TooltipAlignConfig {
    points?: [string, string];
    offset?: [number | string, number | string];
    targetOffset?: [number | string, number | string];
    overflow?: {
        adjustX: boolean;
        adjustY: boolean;
    };
    useCssRight?: boolean;
    useCssBottom?: boolean;
    useCssTransform?: boolean;
}
export interface AbstractTooltipProps {
    prefixCls?: string;
    overlayClassName?: string;
    style?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    placement?: TooltipPlacement;
    builtinPlacements?: Object;
    defaultVisible?: boolean;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    transitionName?: string;
    trigger?: TooltipTrigger;
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    getTooltipContainer?: (triggerNode: Element) => HTMLElement;
    getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
    children?: React.ReactNode;
    align?: TooltipAlignConfig;
}
export declare type RenderFunction = () => React.ReactNode;
export interface TooltipProps extends AbstractTooltipProps {
    title?: React.ReactNode | RenderFunction;
    overlay?: React.ReactNode | RenderFunction;
}
declare class Tooltip extends React.Component<TooltipProps, any> {
    static defaultProps: {
        placement: TooltipPlacement;
        transitionName: string;
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        arrowPointAtCenter: boolean;
        autoAdjustOverflow: boolean;
    };
    static getDerivedStateFromProps(nextProps: TooltipProps): {
        visible: boolean | undefined;
    } | null;
    private tooltip;
    constructor(props: TooltipProps);
    onVisibleChange: (visible: boolean) => void;
    getPopupDomNode(): any;
    getPlacements(): any;
    getDisabledCompatibleChildren(element: React.ReactElement<any>): React.ReactElement<any>;
    isNoTitle(): boolean;
    onPopupAlign: (domNode: HTMLElement, align: any) => void;
    saveTooltip: (node: any) => void;
    renderTooltip: ({ getPopupContainer: getContextPopupContainer, getPrefixCls, }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default Tooltip;
