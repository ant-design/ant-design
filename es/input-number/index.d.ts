import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';
export declare type OmitAttrs = 'defaultValue' | 'onChange' | 'size';
export interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitAttrs> {
    prefixCls?: string;
    min?: number;
    max?: number;
    value?: number;
    step?: number | string;
    defaultValue?: number;
    tabIndex?: number;
    onChange?: (value: number | undefined) => void;
    disabled?: boolean;
    size?: 'large' | 'small' | 'default';
    formatter?: (value: number | string | undefined) => string;
    parser?: (displayValue: string | undefined) => number;
    decimalSeparator?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    className?: string;
    name?: string;
    id?: string;
    precision?: number;
}
export default class InputNumber extends React.Component<InputNumberProps, any> {
    static defaultProps: {
        step: number;
    };
    private inputNumberRef;
    focus(): void;
    blur(): void;
    renderInputNumber: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
