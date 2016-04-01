import React from 'react';
import warning from 'warning';

export default class Validation extends React.Component {
  componentDidMount() {
    warning(false, '`Validation` is removed, please use `Form` which has supported validation after antd@0.12.0,' +
      ' or you can just import Validation from \'rc-form-validation\' for compatibility');
  }
  render() {
    return null;
  }
}

Validation.Validator = () => {};
Validation.FieldMixin = {
  setField() {},
};
