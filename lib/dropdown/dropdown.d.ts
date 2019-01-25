import * as React from 'react';
import DropdownButton from './dropdown-button';
import { ConfigConsumerProps } from '../config-provider';
declare const Placements: ["topLeft", "topCenter", "topRight", "bottomLeft", "bottomCenter", "bottomRight"];
declare type Placement = (typeof Placements)[number];
declare type OverlayFunc = () => React.ReactNode;
export interface DropDownProps {
    trigger?: ('click' | 'hover' | 'contextMenu')[];
    overlay: React.ReactNode | OverlayFunc;
    onVisibleChange?: (visible: boolean) => void;
    visible?: boolean;
    disabled?: boolean;
    align?: Object;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    prefixCls?: string;
    className?: string;
    transitionName?: string;
    placement?: Placement;
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    forceRender?: boolean;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    openClassName?: string;
}
export default class Dropdown extends React.Component<DropDownProps, any> {
    static Button: typeof DropdownButton;
    static defaultProps: {
        mouseEnterDelay: number;
        mouseLeaveDelay: number;
        placement: "bottomLeft" | "bottomRight" | "topLeft" | "topCenter" | "topRight" | "bottomCenter";
    };
    getTransitionName(): string;
    renderOverlay: (prefixCls: string) => {} | null | undefined;
    renderDropDown: ({ getPopupContainer: getContextPopupContainer, getPrefixCls, }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
