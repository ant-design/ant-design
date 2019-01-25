import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ButtonType, NativeButtonProps } from '../button/button';
import { ConfigConsumerProps } from '../config-provider';
export declare const destroyFns: Array<() => void>;
export interface ModalProps {
    /** 对话框是否可见*/
    visible?: boolean;
    /** 确定按钮 loading*/
    confirmLoading?: boolean;
    /** 标题*/
    title?: React.ReactNode | string;
    /** 是否显示右上角的关闭按钮*/
    closable?: boolean;
    /** 点击确定回调*/
    onOk?: (e: React.MouseEvent<any>) => void;
    /** 点击模态框右上角叉、取消按钮、Props.maskClosable 值为 true 时的遮罩层或键盘按下 Esc 时的回调*/
    onCancel?: (e: React.MouseEvent<any>) => void;
    afterClose?: () => void;
    /** 垂直居中 */
    centered?: boolean;
    /** 宽度*/
    width?: string | number;
    /** 底部内容*/
    footer?: React.ReactNode;
    /** 确认按钮文字*/
    okText?: string;
    /** 确认按钮类型*/
    okType?: ButtonType;
    /** 取消按钮文字*/
    cancelText?: string;
    /** 点击蒙层是否允许关闭*/
    maskClosable?: boolean;
    /** 强制渲染 Modal*/
    forceRender?: boolean;
    okButtonProps?: NativeButtonProps;
    cancelButtonProps?: NativeButtonProps;
    destroyOnClose?: boolean;
    style?: React.CSSProperties;
    wrapClassName?: string;
    maskTransitionName?: string;
    transitionName?: string;
    className?: string;
    getContainer?: (instance: React.ReactInstance) => HTMLElement;
    zIndex?: number;
    bodyStyle?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    mask?: boolean;
    keyboard?: boolean;
    wrapProps?: any;
    prefixCls?: string;
}
export interface ModalFuncProps {
    prefixCls?: string;
    className?: string;
    visible?: boolean;
    title?: React.ReactNode;
    content?: React.ReactNode;
    onOk?: (...args: any[]) => any | PromiseLike<any>;
    onCancel?: (...args: any[]) => any | PromiseLike<any>;
    okButtonProps?: NativeButtonProps;
    cancelButtonProps?: NativeButtonProps;
    centered?: boolean;
    width?: string | number;
    iconClassName?: string;
    okText?: string;
    okType?: ButtonType;
    cancelText?: string;
    icon?: React.ReactNode;
    iconType?: string;
    maskClosable?: boolean;
    zIndex?: number;
    okCancel?: boolean;
    style?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    type?: string;
    keyboard?: boolean;
    getContainer?: (instance: React.ReactInstance) => HTMLElement;
    autoFocusButton?: null | 'ok' | 'cancel';
}
export declare type ModalFunc = (props: ModalFuncProps) => {
    destroy: () => void;
    update: (newConfig: ModalFuncProps) => void;
};
export interface ModalLocale {
    okText: string;
    cancelText: string;
    justOkText: string;
}
export default class Modal extends React.Component<ModalProps, {}> {
    static info: ModalFunc;
    static success: ModalFunc;
    static error: ModalFunc;
    static warn: ModalFunc;
    static warning: ModalFunc;
    static confirm: ModalFunc;
    static destroyAll: () => void;
    static defaultProps: {
        width: number;
        transitionName: string;
        maskTransitionName: string;
        confirmLoading: boolean;
        visible: boolean;
        okType: "default" | "dashed" | "primary" | "ghost" | "danger";
        okButtonDisabled: boolean;
        cancelButtonDisabled: boolean;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        onOk: PropTypes.Requireable<(...args: any[]) => any>;
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        okText: PropTypes.Requireable<string>;
        cancelText: PropTypes.Requireable<string>;
        centered: PropTypes.Requireable<boolean>;
        width: PropTypes.Requireable<string | number>;
        confirmLoading: PropTypes.Requireable<boolean>;
        visible: PropTypes.Requireable<boolean>;
        align: PropTypes.Requireable<object>;
        footer: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        title: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        closable: PropTypes.Requireable<boolean>;
    };
    handleCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleOk: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    componentDidMount(): void;
    renderFooter: (locale: ModalLocale) => JSX.Element;
    renderModal: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
