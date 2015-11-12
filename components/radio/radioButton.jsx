import React from 'react';
import AntRadio from './radio';

const RadioButton = React.createClass({
  getDefaultProps() {
    return {
      className: 'ant-radio-button'
    };
  },
  render() {
    return (
      <AntRadio {...this.props} />
    );
  }
});

export default RadioButton;
