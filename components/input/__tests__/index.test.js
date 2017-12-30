import React from 'react';
import { mount } from 'enzyme';
import Input from '..';
import Form from '../../form';
import focusTest from '../../../tests/shared/focusTest';

const { TextArea } = Input;

describe('Input', () => {
  focusTest(Input);

  it('should support maxLength', () => {
    const wrapper = mount(
      <Input maxLength="3" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

focusTest(TextArea);

describe('TextArea', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should auto calculate height according to content length', () => {
    const wrapper = mount(
      <TextArea value="" readOnly autosize />
    );
    const mockFunc = jest.spyOn(wrapper.instance(), 'resizeTextarea');
    wrapper.setProps({ value: '1111\n2222\n3333' });
    jest.runAllTimers();
    expect(mockFunc).toHaveBeenCalledTimes(1);
    wrapper.setProps({ value: '1111' });
    jest.runAllTimers();
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it('should support disabled', () => {
    const wrapper = mount(
      <TextArea disabled />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support maxLength', () => {
    const wrapper = mount(
      <TextArea maxLength="10" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('As Form Control', () => {
  it('should be reset when wrapped in form.getFieldDecorator without initialValue', () => {
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

describe('Input.Search', () => {
  it('should support suffix', () => {
    const wrapper = mount(
      <Input.Search suffix="suffix" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
