import * as React from 'react';
import * as PropTypes from 'prop-types';
import RadioGroup from './group';
import RadioButton from './radioButton';
import { RadioProps, RadioChangeEvent, RadioGroupContext } from './interface';
import { ConfigConsumerProps } from '../config-provider';
export default class Radio extends React.Component<RadioProps, {}> {
    static Group: typeof RadioGroup;
    static Button: typeof RadioButton;
    static defaultProps: {
        type: string;
    };
    static contextTypes: {
        radioGroup: PropTypes.Requireable<any>;
    };
    context: any;
    private rcCheckbox;
    shouldComponentUpdate(nextProps: RadioProps, nextState: {}, nextContext: RadioGroupContext): boolean;
    focus(): void;
    blur(): void;
    saveCheckbox: (node: any) => void;
    onChange: (e: RadioChangeEvent) => void;
    renderRadio: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
