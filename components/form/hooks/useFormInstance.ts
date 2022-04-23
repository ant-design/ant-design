import { useContext } from 'react';
import { FormContext } from '../context';
import { FormInstance } from './useForm';

export default function useFormInstance<Value = any>(): FormInstance<Value> {
  const { form } = useContext(FormContext);

  return form!;
}
