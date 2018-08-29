import * as React from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import { WrappedFormUtils, FormComponentProps } from './Form';

interface CreateProps {
  children: (form: WrappedFormUtils) => React.ReactNode;
}

class Create extends React.Component<CreateProps> {
  public render() {
    const { children, ...options } = this.props;
    const WrappedComponent = createDOMForm(options)(({ form }: FormComponentProps) => children(form));
    return <WrappedComponent/>;
  }
}

export default Create;
