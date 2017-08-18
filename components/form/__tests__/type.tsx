/* tslint:disable */
import React from 'react';
import Form, { FormComponentProps } from '../Form';

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

const WithOwnPropsForm = Form.create()(WithOwnProps);

<WithOwnPropsForm name="foo" />;
