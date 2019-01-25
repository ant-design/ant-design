import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RadioChangeEvent } from './interface';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
import { ConfigConsumerProps } from '../config-provider';
export declare type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;
export default class RadioButton extends React.Component<RadioButtonProps, any> {
    static contextTypes: {
        radioGroup: PropTypes.Requireable<any>;
    };
    context: any;
    renderRadioButton: ({ getPrefixCls }: ConfigConsumerProps) => JSX.Element;
    render(): JSX.Element;
}
