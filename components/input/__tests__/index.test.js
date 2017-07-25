import React from 'react';
import { mount } from 'enzyme';
import Input from '..';
import Form from '../../form';

const { TextArea } = Input;

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('TextArea', () => {
  it('should auto calculate height according to content length', async () => {
    const wrapper = mount(
      <TextArea value="" readOnly autosize />
    );
    const mockFunc = jest.spyOn(wrapper.node, 'resizeTextarea');
    wrapper.setProps({ value: '1111\n2222\n3333' });
    await delay(0);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    wrapper.setProps({ value: '1111' });
    await delay(0);
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it('should support disabled', async () => {
    const wrapper = mount(
      <TextArea disabled />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('As Form Control', () => {
  it('should be reset when wrapped in form.getFieldDecorator without initialValue', async () => {
    class Demo extends React.Component {
      reset = () => {
        this.props.form.resetFields();
      }
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form>
            <Form.Item>
              {getFieldDecorator('input')(<Input />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('textarea')(<Input.TextArea />)}
            </Form.Item>
            <button onClick={this.reset}>reset</button>
          </Form>
        );
      }
    }
    const DemoForm = Form.create()(Demo);
    const wrapper = mount(<DemoForm />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    wrapper.find('textarea').simulate('change', { target: { value: '222' } });
    expect(wrapper.find('input').prop('value')).toBe('111');
    expect(wrapper.find('textarea').prop('value')).toBe('222');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('input').prop('value')).toBe('');
    expect(wrapper.find('textarea').prop('value')).toBe('');
  });
});
