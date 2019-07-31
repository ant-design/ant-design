import React from 'react';
import { mount } from 'enzyme';
import Form from '..';

describe('Form', () => {
  it('should display two message', () => {
    const rules = [
      {
        pattern: /^\w+$/,
        message: 'Error message 1',
      },
      {
        pattern: /^\w+$/,
        message: 'Error message 2',
      },
    ];
    let myForm;
    const Form1 = Form.create()(({ form }) => {
      myForm = form;
      return (
        <Form>
          <Form.Item label="Account">
            {form.getFieldDecorator('account', { initialValue: '+=-/', rules })(<input />)}
          </Form.Item>
        </Form>
      );
    });

    const wrapper = mount(<Form1 />);
    myForm.validateFields();

    wrapper.update();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should display custom message', () => {
    const rules = [
      {
        pattern: /^$/,
        message: (
          <span>
            Account does not exist,{' '}
            <a rel="noopener noreferrer" href="https://www.alipay.com/" target="_blank">
              Forgot account?
            </a>
          </span>
        ),
      },
    ];
    let myForm;
    const Form1 = Form.create()(({ form }) => {
      myForm = form;
      return (
        <Form>
          <Form.Item label="Account">
            {form.getFieldDecorator('account', { initialValue: 'antd', rules })(<input />)}
          </Form.Item>
        </Form>
      );
    });

    const wrapper = mount(<Form1 />);
    myForm.validateFields();

    wrapper.update();
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('support error message with reactNode', () => {
    let myForm;
    const Form1 = Form.create()(({ form }) => {
      myForm = form;
      return (
        <Form>
          <Form.Item label="Account">{form.getFieldDecorator('account')(<input />)}</Form.Item>
        </Form>
      );
    });

    const wrapper = mount(<Form1 />);

    myForm.setFields({
      account: {
        errors: [<div>Error 1</div>, <div>Error 2</div>],
      },
    });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should print warning for not generating help and validateStatus automatically', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const Form1 = Form.create()(({ form }) => {
      return (
        <Form>
          <Form.Item label="Account">
            {form.getFieldDecorator('account')(<input />)}
            {form.getFieldDecorator('account')(<input />)}
          </Form.Item>
        </Form>
      );
    });

    mount(<Form1 />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Form.Item] Cannot generate `validateStatus` and `help` automatically, while there are more than one `getFieldDecorator` in it.',
    );
    errorSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/14911
  it('should not print warning for not generating help and validateStatus automatically when help or validateStatus is specified', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const Form1 = Form.create()(({ form }) => {
      return (
        <Form>
          <Form.Item label="Account" help="custom help information">
            {form.getFieldDecorator('account')(<input />)}
            {form.getFieldDecorator('account')(<input />)}
          </Form.Item>
        </Form>
      );
    });

    mount(<Form1 />);
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
