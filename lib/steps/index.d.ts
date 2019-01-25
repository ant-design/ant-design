import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ConfigConsumerProps } from '../config-provider';
export interface StepsProps {
    prefixCls?: string;
    iconPrefix?: string;
    className?: string;
    current?: number;
    initial?: number;
    labelPlacement?: 'horizontal' | 'vertical';
    status?: 'wait' | 'process' | 'finish' | 'error';
    size?: 'default' | 'small';
    direction?: 'horizontal' | 'vertical';
    progressDot?: boolean | Function;
    style?: React.CSSProperties;
}
export interface StepProps {
    description?: React.ReactNode;
    icon?: React.ReactNode;
    status?: 'wait' | 'process' | 'finish' | 'error';
    title?: React.ReactNode;
}
export default class Steps extends React.Component<StepsProps, any> {
    static Step: React.ClassicComponentClass<StepProps>;
    static defaultProps: {
        current: number;
    };
    static propTypes: {
        prefixCls: PropTypes.Requireable<string>;
        iconPrefix: PropTypes.Requireable<string>;
        current: PropTypes.Requireable<number>;
    };
    renderSteps: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
