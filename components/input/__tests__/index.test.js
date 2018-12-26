import React from 'react';
import { mount } from 'enzyme';
import Input from '..';
import Form from '../../form';
import focusTest from '../../../tests/shared/focusTest';

const { TextArea } = Input;

describe('Input', () => {
  focusTest(Input);

  it('should support maxLength', () => {
    const wrapper = mount(<Input maxLength={3} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('select()', () => {
    const wrapper = mount(<Input />);
    wrapper.instance().select();
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
    const wrapper = mount(<TextArea value="" readOnly autosize />);
    const mockFunc = jest.spyOn(wrapper.instance(), 'resizeTextarea');
    wrapper.setProps({ value: '1111\n2222\n3333' });
    jest.runAllTimers();
    expect(mockFunc).toHaveBeenCalledTimes(1);
    wrapper.setProps({ value: '1111' });
    jest.runAllTimers();
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it('should support disabled', () => {
    const wrapper = mount(<TextArea disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support maxLength', () => {
    const wrapper = mount(<TextArea maxLength={10} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('As Form Control', () => {
  it('should be reset when wrapped in form.getFieldDecorator without initialValue', () => {
    class Demo extends React.Component {
      reset = () => {
        const { form } = this.props;
        form.resetFields();
      };

      render() {
        const {
          form: { getFieldDecorator },
        } = this.props;
        return (
          <Form>
            <Form.Item>{getFieldDecorator('input')(<Input />)}</Form.Item>
            <Form.Item>{getFieldDecorator('textarea')(<Input.TextArea />)}</Form.Item>
            <button type="button" onClick={this.reset}>
              reset
            </button>
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
    const wrapper = mount(<Input.Search suffix="suffix" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('Input.Password', () => {
  it('should change type when click', () => {
    const wrapper = mount(<Input.Password />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    expect(wrapper).toMatchSnapshot();
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('visibilityToggle should work', () => {
    const wrapper = mount(<Input.Password visibilityToggle={false} />);
    expect(wrapper.find('.anticon-eye').length).toBe(0);
    wrapper.setProps({ visibilityToggle: true });
    expect(wrapper.find('.anticon-eye').length).toBe(1);
  });
});

describe('Input allowClear', () => {
  it('should change type when click', () => {
    const wrapper = mount(<Input allowClear />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    expect(wrapper.find('input').getDOMNode().value).toEqual('111');
    expect(wrapper).toMatchSnapshot();
    wrapper
      .find('.ant-input-clear-icon')
      .at(0)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('input').getDOMNode().value).toEqual('');
  });
});
