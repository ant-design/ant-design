import * as React from 'react';
import { ButtonHTMLType } from '../button/button';
import { ButtonGroupProps } from '../button/button-group';
import { ConfigConsumerProps } from '../config-provider';
import { DropDownProps } from './dropdown';
declare type DropdownButtonType = 'primary' | 'ghost' | 'dashed';
export interface DropdownButtonProps extends ButtonGroupProps, DropDownProps {
    type?: DropdownButtonType;
    htmlType?: ButtonHTMLType;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    href?: string;
    children?: any;
}
export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
    static defaultProps: {
        placement: "bottomLeft" | "bottomRight" | "topLeft" | "topCenter" | "topRight" | "bottomCenter" | undefined;
        type: DropdownButtonType;
    };
    renderButton: ({ getPopupContainer: getContextPopupContainer, getPrefixCls, }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export {};
