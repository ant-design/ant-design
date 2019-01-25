import * as React from 'react';
import { ButtonType, NativeButtonProps } from '../button/button';
export interface ActionButtonProps {
    type?: ButtonType;
    actionFn?: (...args: any[]) => any | PromiseLike<any>;
    closeModal: Function;
    autoFocus?: boolean;
    buttonProps?: NativeButtonProps;
}
export interface ActionButtonState {
    loading: boolean;
}
export default class ActionButton extends React.Component<ActionButtonProps, ActionButtonState> {
    timeoutId: number;
    constructor(props: ActionButtonProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onClick: () => void;
    render(): JSX.Element;
}
