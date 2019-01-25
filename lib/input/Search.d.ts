import * as React from 'react';
import Input, { InputProps } from './Input';
import { ConfigConsumerProps } from '../config-provider';
export interface SearchProps extends InputProps {
    inputPrefixCls?: string;
    onSearch?: (value: string, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => any;
    enterButton?: boolean | React.ReactNode;
}
export default class Search extends React.Component<SearchProps, any> {
    static defaultProps: {
        enterButton: boolean;
    };
    private input;
    onSearch: (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement, MouseEvent>) => void;
    focus(): void;
    blur(): void;
    saveInput: (node: Input) => void;
    getButtonOrIcon(prefixCls: string): React.ReactElement<any>;
    renderSearch: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
