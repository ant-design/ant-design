import * as React from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { WrappedFormUtils, FormComponentProps, FormCreateOption } from './Form';

interface CreateProps extends FormCreateOption<CreateProps> {
  children: (form: WrappedFormUtils) => React.ReactNode;
}

const Create = ({ children, ...options }: CreateProps) => {
  const WrappedComponent = createDOMForm(options)(({ form }: FormComponentProps) => children(form));
  return <WrappedComponent/>;
};

export default Create;
