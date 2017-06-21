import React from 'react';
import PropTypes from 'prop-types';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
import Radio from './radio';

export type RadioButtonProps = AbstractCheckboxProps;

export default class RadioButton extends React.Component<RadioButtonProps, any> {
  static defaultProps = {
    prefixCls: 'ant-radio-button',
  };

  static contextTypes = {
    radioGroup: PropTypes.any,
  };

  render() {
    let radioProps: RadioButtonProps = { ...this.props };
    if (this.context.radioGroup) {
      radioProps.onChange = this.context.radioGroup.onChange;
      radioProps.checked = this.props.value === this.context.radioGroup.value;
      radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
    }

    return (
      <Radio {...radioProps} />
    );
  }
}
