import * as React from 'react';
import FieldForm, { FormInstance } from 'rc-field-form';

const Form = React.forwardRef<FormInstance>((props, ref) => {
  return <FieldForm {...props} ref={ref} />;
});

export default Form;
