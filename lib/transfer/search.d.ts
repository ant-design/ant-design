import * as React from 'react';
export interface TransferSearchProps {
    prefixCls?: string;
    placeholder?: string;
    onChange?: (e: React.FormEvent<any>) => void;
    handleClear?: (e: React.MouseEvent<any>) => void;
    value?: any;
    disabled?: boolean;
}
export default class Search extends React.Component<TransferSearchProps, any> {
    static defaultProps: {
        placeholder: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClear: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    render(): JSX.Element;
}
