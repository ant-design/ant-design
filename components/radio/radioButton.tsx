import React from 'react';
import Radio from './radio';

export interface RadioButtonProps {
  value: string | number;
  style?: React.CSSProperties;
}

export default class RadioButton extends React.Component<RadioButtonProps, any> {
  static __ANT_RADIO_BUTTON = true;

  static defaultProps = {
    prefixCls: 'ant-radio-button',
  };
  render() {
    return (
      <Radio {...this.props} />
    );
  }
}
