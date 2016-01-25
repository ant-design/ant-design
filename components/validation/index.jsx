import React from 'react';
import Validation from 'rc-form-validation';
import warning from 'warning';

export default class AntValidation extends React.Component {
  validate(callback) {
    this.refs.validation.validate(callback);
  }

  reset() {
    this.refs.validation.reset();
  }

  forceValidate(fields, callback) {
    this.refs.validation.forceValidate(fields, callback);
  }

  render() {
    warning(false, '`Validation` is deprecated, please use `Form` which has supported validation after antd@0.12.0.');
    return <Validation {...this.props} ref="validation" />;
  }
}

AntValidation.Validator = Validation.Validator;
AntValidation.FieldMixin = Validation.FieldMixin;
