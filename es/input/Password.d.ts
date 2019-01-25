import * as React from 'react';
import { InputProps } from './Input';
export interface PasswordProps extends InputProps {
    readonly inputPrefixCls?: string;
    readonly action: string;
    visibilityToggle?: boolean;
}
export interface PasswordState {
    visible: boolean;
}
export default class Password extends React.Component<PasswordProps, PasswordState> {
    static defaultProps: {
        inputPrefixCls: string;
        prefixCls: string;
        action: string;
        visibilityToggle: boolean;
    };
    state: PasswordState;
    onChange: () => void;
    getIcon(): React.ReactElement<any>;
    render(): JSX.Element;
}
