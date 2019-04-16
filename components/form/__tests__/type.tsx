/* tslint:disable */
import * as React from 'react';
import Form, { FormComponentProps, FormCreateOption } from '../Form';

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
interface WithOwnPropsProps {
  name: string;
}

class WithOwnProps extends React.Component<WithOwnPropsProps & FormComponentProps, any> {
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
interface WithCreateOptionsProps {
  username: string;
}

class WithCreateOptions extends React.Component<WithCreateOptionsProps & FormComponentProps, {}> {
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
