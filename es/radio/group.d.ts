import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RadioGroupProps, RadioGroupState, RadioChangeEvent, RadioGroupButtonStyle } from './interface';
import { ConfigConsumerProps } from '../config-provider';
declare class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
    static defaultProps: {
        disabled: boolean;
        buttonStyle: RadioGroupButtonStyle;
    };
    static childContextTypes: {
        radioGroup: PropTypes.Requireable<any>;
    };
    static getDerivedStateFromProps(nextProps: RadioGroupProps): {
        value: any;
    } | null;
    constructor(props: RadioGroupProps);
    getChildContext(): {
        radioGroup: {
            onChange: (ev: RadioChangeEvent) => void;
            value: any;
            disabled: boolean | undefined;
            name: string | undefined;
        };
    };
    shouldComponentUpdate(nextProps: RadioGroupProps, nextState: RadioGroupState): boolean;
    onRadioChange: (ev: RadioChangeEvent) => void;
    renderGroup: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
export default RadioGroup;
