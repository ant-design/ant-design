import { FieldContext } from 'rc-field-form';
import * as React from 'react';

export default () => {
  const { prefixName } = React.useContext(FieldContext);
  return prefixName;
};
