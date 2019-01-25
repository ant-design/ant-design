import * as React from 'react';
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export declare type IconType = 'success' | 'info' | 'error' | 'warning';
export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    placement?: NotificationPlacement;
    getContainer?: () => HTMLElement;
}
export interface ArgsProps {
    message: React.ReactNode;
    description?: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    placement?: NotificationPlacement;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    readonly type?: IconType;
    onClick?: () => void;
}
export interface NotificationApi {
    success(args: ArgsProps): void;
    error(args: ArgsProps): void;
    info(args: ArgsProps): void;
    warn(args: ArgsProps): void;
    warning(args: ArgsProps): void;
    open(args: ArgsProps): void;
    close(key: string): void;
    config(options: ConfigProps): void;
    destroy(): void;
}
declare const _default: NotificationApi;
export default _default;
