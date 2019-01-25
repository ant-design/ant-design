import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CheckboxChangeEvent } from './Checkbox';
import { ConfigConsumerProps } from '../config-provider';
export declare type CheckboxValueType = string | number | boolean;
export interface CheckboxOptionType {
    label: React.ReactNode;
    value: CheckboxValueType;
    disabled?: boolean;
    onChange?: (e: CheckboxChangeEvent) => void;
}
export interface AbstractCheckboxGroupProps {
    prefixCls?: string;
    className?: string;
    options?: Array<CheckboxOptionType | string>;
    disabled?: boolean;
    style?: React.CSSProperties;
}
export interface CheckboxGroupProps extends AbstractCheckboxGroupProps {
    defaultValue?: Array<CheckboxValueType>;
    value?: Array<CheckboxValueType>;
    onChange?: (checkedValue: Array<CheckboxValueType>) => void;
}
export interface CheckboxGroupState {
    value: any;
}
export interface CheckboxGroupContext {
    checkboxGroup: {
        toggleOption: (option: CheckboxOptionType) => void;
        value: any;
        disabled: boolean;
    };
}
declare class CheckboxGroup extends React.Component<CheckboxGroupProps, CheckboxGroupState> {
    static defaultProps: {
        options: never[];
    };
    static propTypes: {
        defaultValue: PropTypes.Requireable<any[]>;
        value: PropTypes.Requireable<any[]>;
        options: PropTypes.Validator<any[]>;
        onChange: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static childContextTypes: {
        checkboxGroup: PropTypes.Requireable<any>;
    };
    static getDerivedStateFromProps(nextProps: CheckboxGroupProps): {
        value: CheckboxValueType[];
    } | null;
    constructor(props: CheckboxGroupProps);
    getChildContext(): {
        checkboxGroup: {
            toggleOption: (option: CheckboxOptionType) => void;
            value: any;
            disabled: boolean | undefined;
        };
    };
    shouldComponentUpdate(nextProps: CheckboxGroupProps, nextState: CheckboxGroupState): boolean;
    getOptions(): CheckboxOptionType[];
    toggleOption: (option: CheckboxOptionType) => void;
    renderGroup: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default CheckboxGroup;
