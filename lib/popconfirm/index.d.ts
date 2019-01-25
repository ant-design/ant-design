import * as React from 'react';
import { AbstractTooltipProps } from '../tooltip';
import { ButtonType, NativeButtonProps } from '../button/button';
import { ConfigConsumerProps } from '../config-provider';
export interface PopconfirmProps extends AbstractTooltipProps {
    title: React.ReactNode;
    onConfirm?: (e?: React.MouseEvent<any>) => void;
    onCancel?: (e?: React.MouseEvent<any>) => void;
    okText?: React.ReactNode;
    okType?: ButtonType;
    cancelText?: React.ReactNode;
    okButtonProps?: NativeButtonProps;
    cancelButtonProps?: NativeButtonProps;
    icon?: React.ReactNode;
    onVisibleChange?: (visible: boolean, e?: React.MouseEvent<any>) => void;
}
export interface PopconfirmState {
    visible?: boolean;
}
export interface PopconfirmLocale {
    okText: string;
    cancelText: string;
}
declare class Popconfirm extends React.Component<PopconfirmProps, PopconfirmState> {
    static defaultProps: {
        transitionName: string;
        placement: "left" | "right" | "top" | "bottom" | "bottomLeft" | "bottomRight" | "topLeft" | "topRight" | "leftTop" | "leftBottom" | "rightTop" | "rightBottom" | undefined;
        trigger: "click" | "focus" | "contextMenu" | "hover" | undefined;
        okType: "default" | "dashed" | "primary" | "ghost" | "danger" | undefined;
        icon: JSX.Element;
    };
    static getDerivedStateFromProps(nextProps: PopconfirmProps): {
        visible: boolean | undefined;
    } | null;
    private tooltip;
    constructor(props: PopconfirmProps);
    getPopupDomNode(): any;
    onConfirm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onVisibleChange: (visible: boolean) => void;
    setVisible(visible: boolean, e?: React.MouseEvent<HTMLButtonElement>): void;
    saveTooltip: (node: any) => void;
    renderOverlay: (prefixCls: string, popconfirmLocale: PopconfirmLocale) => JSX.Element;
    renderConfirm: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default Popconfirm;
