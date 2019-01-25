import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumerProps } from '../config-provider';
export interface SwitchProps {
    prefixCls?: string;
    size?: 'small' | 'default';
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => any;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    autoFocus?: boolean;
    style?: React.CSSProperties;
}
export default class Switch extends React.Component<SwitchProps, {}> {
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        size: PropTypes.Requireable<"small" | "default" | undefined>;
        className: PropTypes.Requireable<string>;
    };
    private rcSwitch;
    focus(): void;
    blur(): void;
    saveSwitch: (node: any) => void;
    renderSwitch: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
