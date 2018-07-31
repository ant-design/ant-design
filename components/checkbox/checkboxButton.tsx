import * as React from 'react';
import PropTypes from 'prop-types';
import Checkbox, { AbstractCheckboxProps, CheckboxChangeEvent } from './Checkbox';


export type CheckboxButtonProps = AbstractCheckboxProps<CheckboxChangeEvent>;

export default class CheckboxButton extends React.Component<CheckboxButtonProps, any> {
  static defaultProps = {
    prefixCls: 'ant-checkbox-button',
  };

  static contextTypes = {
    checkboxGroup: PropTypes.any,
  };

  render() {
    const checkboxProps: CheckboxButtonProps = { ...this.props };
    if (this.context.checkboxGroup) {
      checkboxProps.onChange = this.context.checkboxGroup.onChange;
      checkboxProps.checked = this.props.value === this.context.checkboxGroup.value;
      checkboxProps.disabled = this.props.disabled || this.context.checkboxGroup.disabled;
    }

    return (
      <Checkbox {...checkboxProps} />
    );
  }
}
