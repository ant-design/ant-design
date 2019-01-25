import * as React from 'react';
declare type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
export interface ThenableArgument {
    (_: any): any;
}
export interface MessageType {
    (): void;
    then: (fill: ThenableArgument, reject: ThenableArgument) => Promise<any>;
    promise: Promise<any>;
}
export interface ArgsProps {
    content: React.ReactNode;
    duration: number | null;
    type: NoticeType;
    onClose?: () => void;
    icon?: React.ReactNode;
}
declare type ConfigContent = React.ReactNode | string;
declare type ConfigDuration = number | (() => void);
export declare type ConfigOnClose = () => void;
export interface ConfigOptions {
    top?: number;
    duration?: number;
    prefixCls?: string;
    getContainer?: () => HTMLElement;
    transitionName?: string;
    maxCount?: number;
}
export interface MessageApi {
    info(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    success(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    error(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warn(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    warning(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    loading(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
    open(args: ArgsProps): MessageType;
    config(options: ConfigOptions): void;
    destroy(): void;
}
declare const _default: MessageApi;
export default _default;
