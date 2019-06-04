import React from 'react';
import { mount } from 'enzyme';
/* eslint-disable import/no-unresolved */
import Form from '../../form';
import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import calculateNodeHeight, { calculateNodeStyling } from '../calculateNodeHeight';

const { TextArea } = Input;

describe('Input', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  focusTest(Input);

  it('should support maxLength', () => {
    const wrapper = mount(<Input maxLength={3} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('select()', () => {
    const wrapper = mount(<Input />);
    wrapper.instance().select();
  });

  describe('focus trigger warning', () => {
    it('not trigger', () => {
      const wrapper = mount(<Input suffix="bamboo" />);
      wrapper
        .find('input')
        .instance()
        .focus();
      wrapper.setProps({
        suffix: 'light',
      });
      expect(errorSpy).not.toHaveBeenCalled();
    });
    it('trigger warning', () => {
      const wrapper = mount(<Input />);
      wrapper
        .find('input')
        .instance()
        .focus();
      wrapper.setProps({
        suffix: 'light',
      });
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Input] When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ',
      );
    });
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

  it('should support onPressEnter and onKeyDown', () => {
    const fakeHandleKeyDown = jest.fn();
    const fakeHandlePressEnter = jest.fn();
    const wrapper = mount(
      <TextArea onKeyDown={fakeHandleKeyDown} onPressEnter={fakeHandlePressEnter} />,
    );
    /** keyCode 65 is A */
    wrapper.find('textarea').simulate('keydown', { keyCode: 65 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(1);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(0);

    /** keyCode 13 is Enter */
    wrapper.find('textarea').simulate('keydown', { keyCode: 13 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(2);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(1);
  });

  it('should support disabled', () => {
    const wrapper = mount(<TextArea disabled />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support maxLength', () => {
    const wrapper = mount(<TextArea maxLength={10} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calculateNodeStyling works correctly', () => {
    const wrapper = document.createElement('textarea');
    wrapper.id = 'test';
    wrapper.wrap = 'wrap';
    calculateNodeStyling(wrapper, true);
    const value = calculateNodeStyling(wrapper, true);
    expect(value).toEqual({
      borderSize: 2,
      boxSizing: '',
      paddingSize: 4,
      sizingStyle:
        'letter-spacing:normal;line-height:normal;padding-top:2px;padding-bottom:2px;font-family:-webkit-small-control;font-weight:;font-size:;font-variant:;text-rendering:auto;text-transform:none;width:;text-indent:0;padding-left:2px;padding-right:2px;border-width:1px;box-sizing:',
    });
  });

  it('boxSizing === "border-box"', () => {
    const wrapper = document.createElement('textarea');
    wrapper.style.boxSizing = 'border-box';
    const { height } = calculateNodeHeight(wrapper);
    expect(height).toBe(2);
  });

  it('boxSizing === "content-box"', () => {
    const wrapper = document.createElement('textarea');
    wrapper.style.boxSizing = 'content-box';
    const { height } = calculateNodeHeight(wrapper);
    expect(height).toBe(-4);
  });

  it('minRows or maxRows is not null', () => {
    const wrapper = document.createElement('textarea');
    expect(calculateNodeHeight(wrapper, 1, 1)).toEqual({
      height: 0,
      maxHeight: 9007199254740991,
      minHeight: -4,
      overflowY: undefined,
    });
    wrapper.style.boxSizing = 'content-box';
    expect(calculateNodeHeight(wrapper, 1, 1)).toEqual({
      height: -4,
      maxHeight: 9007199254740991,
      minHeight: -4,
      overflowY: undefined,
    });
  });

  it('when prop value not in this.props, resizeTextarea should be called', () => {
    const wrapper = mount(<TextArea aria-label="textarea" />);
    const resizeTextarea = jest.spyOn(wrapper.instance(), 'resizeTextarea');
    wrapper.find('textarea').simulate('change', 'test');
    expect(resizeTextarea).toHaveBeenCalled();
  });

  it('handleKeyDown', () => {
    const onPressEnter = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <TextArea onPressEnter={onPressEnter} onKeyDown={onKeyDown} aria-label="textarea" />,
    );
    wrapper.instance().handleKeyDown({ keyCode: 13 });
    expect(onPressEnter).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
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
    expect(wrapper.find('.anticon-eye-invisible').length).toBe(1);
  });

  it('should keep focus state', () => {
    const wrapper = mount(<Input.Password defaultValue="111" autoFocus />);
    expect(document.activeElement).toBe(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode(),
    );
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('mousedown');
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(document.activeElement).toBe(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode(),
    );
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

  it('should not show icon if value is undefined, null or empty string', () => {
    const wrappers = [null, undefined, ''].map(val => mount(<Input allowClear value={val} />));
    wrappers.forEach(wrapper => {
      expect(wrapper.find('input').getDOMNode().value).toEqual('');
      expect(wrapper.find('.ant-input-clear-icon').exists()).toEqual(false);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should not show icon if defaultValue is undefined, null or empty string', () => {
    const wrappers = [null, undefined, ''].map(val =>
      mount(<Input allowClear defaultValue={val} />),
    );
    wrappers.forEach(wrapper => {
      expect(wrapper.find('input').getDOMNode().value).toEqual('');
      expect(wrapper.find('.ant-input-clear-icon').exists()).toEqual(false);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should trigger event correctly', () => {
    let argumentEventObject;
    let argumentEventObjectValue;
    const onChange = e => {
      argumentEventObject = e;
      argumentEventObjectValue = e.target.value;
    };
    const wrapper = mount(<Input allowClear defaultValue="111" onChange={onChange} />);
    wrapper
      .find('.ant-input-clear-icon')
      .at(0)
      .simulate('click');
    expect(argumentEventObject.type).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode().value,
    ).toBe('');
  });

  it('should trigger event correctly on controlled mode', () => {
    let argumentEventObject;
    let argumentEventObjectValue;
    const onChange = e => {
      argumentEventObject = e;
      argumentEventObjectValue = e.target.value;
    };
    const wrapper = mount(<Input allowClear value="111" onChange={onChange} />);
    wrapper
      .find('.ant-input-clear-icon')
      .at(0)
      .simulate('click');
    expect(argumentEventObject.type).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode().value,
    ).toBe('111');
  });

  it('should focus input after clear', () => {
    const wrapper = mount(<Input allowClear defaultValue="111" />);
    wrapper
      .find('.ant-input-clear-icon')
      .at(0)
      .simulate('click');
    expect(document.activeElement).toBe(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode(),
    );
  });
});
