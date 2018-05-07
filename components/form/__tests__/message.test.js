import React from 'react';
import { mount } from 'enzyme';
import Form from '..';

describe('Form', () => {
  it('should display custom message', () => {
    const rules = [{
      pattern: /^$/,
      message: (<span>Account does not exist, <a rel="noopener noreferrer" href="https://www.alipay.com/" target="_blank">Forgot account?</a></span>),
    }];
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

    // expect(wrapper.getDOMNode().querySelectorAll('.ant-form-explain').length).toBe(1);
    expect(wrapper.find('.ant-form-explain').length).toBe(1);
    expect(wrapper.find('.ant-form-explain').at(0).getDOMNode().textContent.trim()).toBe('Account does not exist, Forgot account?');
  });
});
