import React from 'react';
import warning from 'warning';

export default class AntValidation extends React.Component {
  render() {
    warning(false, '`Validation` is removed, please use `Form` which has supported validation after antd@0.12.0,' +
    ' or you can just import Validation from \'rc-form-validation\' for compatibility');
    return null;
  }
}

AntValidation.Validator = () => {};
AntValidation.FieldMixin = {
  setField() {},
};
