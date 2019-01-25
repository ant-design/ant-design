import * as React from 'react';
import { ConfigConsumerProps } from '../config-provider';
export interface CheckableTagProps {
    prefixCls?: string;
    className?: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
}
export default class CheckableTag extends React.Component<CheckableTagProps> {
    handleClick: () => void;
    renderCheckableTag: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
