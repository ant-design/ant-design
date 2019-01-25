import * as React from 'react';
import { InputProps } from '../input';
import { AbstractSelectProps, SelectValue, OptionProps, OptGroupProps } from '../select';
import { ConfigConsumerProps } from '../config-provider';
export interface DataSourceItemObject {
    value: string;
    text: string;
}
export declare type DataSourceItemType = string | DataSourceItemObject | React.ReactElement<OptionProps> | React.ReactElement<OptGroupProps>;
export interface AutoCompleteInputProps {
    onChange?: React.FormEventHandler<any>;
    value: any;
}
export declare type ValidInputElement = HTMLInputElement | HTMLTextAreaElement | React.ReactElement<AutoCompleteInputProps>;
export interface AutoCompleteProps extends AbstractSelectProps {
    value?: SelectValue;
    defaultValue?: SelectValue;
    dataSource?: DataSourceItemType[];
    autoFocus?: boolean;
    backfill?: boolean;
    optionLabelProp?: string;
    onChange?: (value: SelectValue) => void;
    onSelect?: (value: SelectValue, option: Object) => any;
    onBlur?: (value: SelectValue) => void;
    onFocus?: () => void;
    children?: ValidInputElement | React.ReactElement<InputProps> | React.ReactElement<OptionProps> | Array<React.ReactElement<OptionProps>>;
}
export default class AutoComplete extends React.Component<AutoCompleteProps, {}> {
    static Option: React.ClassicComponentClass<OptionProps>;
    static OptGroup: React.ClassicComponentClass<OptGroupProps>;
    static defaultProps: {
        transitionName: string;
        optionLabelProp: string;
        choiceTransitionName: string;
        showSearch: boolean;
        filterOption: boolean;
    };
    private select;
    getInputElement: () => JSX.Element;
    focus(): void;
    blur(): void;
    saveSelect: (node: any) => void;
    renderAutoComplete: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
