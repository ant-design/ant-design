import * as React from 'react';

import { FormContext } from '../context';
import type { FormInstance } from './useForm';

export default function useFormInstance<Value = any>(): FormInstance<Value> {
  const { form } = React.useContext(FormContext);

  return form!;
}
