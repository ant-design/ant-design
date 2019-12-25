/* tslint:disable */
/* eslint-disable */
import * as React from 'react';
import Form, { FormComponentProps, FormCreateOption } from '../Form';

describe('Form TypeScript test', async () => {
  it('empty test case placeholder to avoid jest error', () => {
    // empty
  });
});

// test Form.create on component without own props
class WithoutOwnProps extends React.Component<any, any> {
  state = {
    foo: 'bar',
  };
  render() {
    return <div>foo</div>;
  }
}

const WithoutOwnPropsForm = Form.create()(WithoutOwnProps);

<WithoutOwnPropsForm />;

// test Form.create on component with own props
interface WithOwnPropsProps extends FormComponentProps {
  name: string;
}

class WithOwnProps extends React.Component<WithOwnPropsProps, any> {
  state = {
    foo: 'bar',
  };

  render() {
    return <div>foo</div>;
  }
}

const WithOwnPropsForm = Form.create<WithOwnPropsProps>()(WithOwnProps);

<WithOwnPropsForm name="foo" />;

// test Form.create with options
interface WithCreateOptionsProps extends FormComponentProps {
  username: string;
}

class WithCreateOptions extends React.Component<WithCreateOptionsProps, {}> {
  render() {
    return <div>foo</div>;
  }
}

const mapPropsToFields = (props: WithCreateOptionsProps) => {
  const { username } = props;

  return {
    username: Form.createFormField({ value: username }),
  };
};

const formOptions: FormCreateOption<WithCreateOptionsProps> = { mapPropsToFields };

const WithCreateOptionsForm = Form.create(formOptions)(WithCreateOptions);

<WithCreateOptionsForm username="foo" />;

// Should work with forwardRef & wrappedComponentRef
// https://github.com/ant-design/ant-design/issues/16229
if (React.forwardRef) {
  interface ForwardProps extends FormComponentProps {
    str: string;
  }

  const ForwardDemo = React.forwardRef(({ str }: ForwardProps, ref: React.Ref<HTMLDivElement>) => {
    return <div ref={ref}>{str || ''}</div>;
  });
  const WrappedForwardDemo = Form.create<ForwardProps>()(ForwardDemo);
  <WrappedForwardDemo str="" />;
}

interface WrappedRefProps extends FormComponentProps {
  str: string;
  test?: () => void;
}
class WrapRefDemo extends React.Component<WrappedRefProps> {
  public getForm() {
    return this.props.form;
  }
  public render() {
    return <div>{this.props.str || ''}</div>;
  }
}

const WrappedWrapRefDemo = Form.create<WrappedRefProps>()(WrapRefDemo);
<WrappedWrapRefDemo str="" wrappedComponentRef={() => null} />;
