import * as React from 'react';
declare type EventType = React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>;
declare type getContainerFunc = () => HTMLElement;
declare const PlacementTypes: ["top", "right", "bottom", "left"];
declare type placementType = (typeof PlacementTypes)[number];
export interface DrawerProps {
    closable?: boolean;
    destroyOnClose?: boolean;
    getContainer?: string | HTMLElement | getContainerFunc;
    maskClosable?: boolean;
    mask?: boolean;
    maskStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    bodyStyle?: React.CSSProperties;
    title?: React.ReactNode;
    visible?: boolean;
    width?: number | string;
    height?: number | string;
    wrapClassName?: string;
    zIndex?: number;
    prefixCls?: string;
    push?: boolean;
    placement?: placementType;
    onClose?: (e: EventType) => void;
    className?: string;
}
export interface IDrawerState {
    push?: boolean;
}
declare const _default: React.FunctionComponent<DrawerProps>;
export default _default;
