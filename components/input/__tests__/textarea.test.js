import React from 'react';
import { mount } from 'enzyme';
import RcTextArea from 'rc-textarea';
import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import { sleep } from '../../../tests/utils';

const { TextArea } = Input;

focusTest(TextArea, { refFocus: true });

describe('TextArea', () => {
  const originalGetComputedStyle = window.getComputedStyle;
  beforeAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: node => ({
        getPropertyValue: prop => {
          if (prop === 'box-sizing') {
            return originalGetComputedStyle(node)[prop] || 'border-box';
          }
          return originalGetComputedStyle(node)[prop];
        },
      }),
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: originalGetComputedStyle,
    });
  });

  it('should auto calculate height according to content length', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const ref = React.createRef();

    const wrapper = mount(
      <TextArea value="" readOnly autoSize={{ minRows: 2, maxRows: 6 }} wrap="off" ref={ref} />,
    );
    const mockFunc = jest.spyOn(ref.current.resizableTextArea, 'resizeTextarea');
    wrapper.setProps({ value: '1111\n2222\n3333' });
    await sleep(0);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    wrapper.setProps({ value: '1111' });
    await sleep(0);
    expect(mockFunc).toHaveBeenCalledTimes(2);
    wrapper.update();
    expect(wrapper.find('textarea').props().style.overflow).toBeFalsy();

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('should support onPressEnter and onKeyDown', () => {
    const fakeHandleKeyDown = jest.fn();
    const fakeHandlePressEnter = jest.fn();
    const wrapper = mount(
      <TextArea onKeyDown={fakeHandleKeyDown} onPressEnter={fakeHandlePressEnter} />,
    );
    /** KeyCode 65 is A */
    wrapper.find('textarea').simulate('keydown', { keyCode: 65 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(1);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(0);

    /** KeyCode 13 is Enter */
    wrapper.find('textarea').simulate('keydown', { keyCode: 13 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(2);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(1);
  });

  it('should support disabled', () => {
    const wrapper = mount(<TextArea disabled />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support maxLength', () => {
    const wrapper = mount(<TextArea maxLength={10} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should prevent input if maxLength is 0', () => {
    const wrapper = mount(<TextArea maxLength={0} />);
    wrapper.find('textarea').simulate('change', { target: { value: '111' } });
    expect(wrapper.find('textarea').prop('value')).toBe('');
  });

  it('when prop value not in this.props, resizeTextarea should be called', async () => {
    const ref = React.createRef();
    const wrapper = mount(<TextArea aria-label="textarea" ref={ref} />);
    const resizeTextarea = jest.spyOn(ref.current.resizableTextArea, 'resizeTextarea');
    wrapper.find('textarea').simulate('change', {
      target: {
        value: 'test',
      },
    });
    expect(resizeTextarea).toHaveBeenCalled();
  });

  it('handleKeyDown', () => {
    const onPressEnter = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <TextArea onPressEnter={onPressEnter} onKeyDown={onKeyDown} aria-label="textarea" />,
    );
    wrapper.find(RcTextArea).instance().handleKeyDown({ keyCode: 13 });
    expect(onPressEnter).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should trigger onResize', async () => {
    const onResize = jest.fn();
    const wrapper = mount(<TextArea onResize={onResize} autoSize />);
    await sleep(100);
    wrapper
      .find('ResizeObserver')
      .instance()
      .onResize([
        {
          target: {
            getBoundingClientRect() {
              return {};
            },
          },
        },
      ]);
    await Promise.resolve();

    expect(onResize).toHaveBeenCalledWith(
      expect.objectContaining({
        width: expect.any(Number),
        height: expect.any(Number),
      }),
    );
  });
  // TODO:FAIL
  //   it('should works same as Input', async () => {
  //     const input = mount(<Input value="111" />);
  //     const textarea = mount(<TextArea value="111" />);
  //     input.setProps({ value: undefined },()=>{
  //         console.log(input.state('value'));
  //     });
  //     textarea.setProps({ value: undefined });
  //     expect(textarea.getDOMNode().value).toBe(input.state('value'));
  //   });

  describe('should support showCount', () => {
    it('maxLength', () => {
      const wrapper = mount(<TextArea maxLength={5} showCount value="12345678" />);
      const textarea = wrapper.find('.ant-input-textarea');
      expect(wrapper.find('textarea').prop('value')).toBe('12345');
      expect(textarea.prop('data-count')).toBe('5 / 5');
    });

    // 修改TextArea value截取规则后新增单测
    it('slice emoji', () => {
      const wrapper = mount(<TextArea maxLength={5} showCount value="1234😂" />);
      const textarea = wrapper.find('.ant-input-textarea');
      expect(wrapper.find('textarea').prop('value')).toBe('1234😂');
      expect(textarea.prop('data-count')).toBe('5 / 5');
    });

    it('className & style patch to outer', () => {
      const wrapper = mount(
        <TextArea className="bamboo" style={{ background: 'red' }} showCount />,
      );

      // Outer
      expect(wrapper.find('div').first().hasClass('bamboo')).toBeTruthy();
      expect(wrapper.find('div').first().props().style.background).toEqual('red');

      // Inner
      expect(wrapper.find('.ant-input').hasClass('bamboo')).toBeFalsy();
      expect(wrapper.find('.ant-input').props().style.background).toBeFalsy();
    });

    it('count formatter', () => {
      const wrapper = mount(
        <TextArea
          maxLength={5}
          showCount={{ formatter: ({ count, maxLength }) => `${count}, ${maxLength}` }}
          value="12345678"
        />,
      );
      const textarea = wrapper.find('.ant-input-textarea');
      expect(wrapper.find('textarea').prop('value')).toBe('12345');
      expect(textarea.prop('data-count')).toBe('5, 5');
    });
  });

  it('should support size', async () => {
    const wrapper = mount(<TextArea size="large" />);
    expect(wrapper.find('textarea').hasClass('ant-input-lg')).toBe(true);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('set mouse cursor position', () => {
    const defaultValue = '11111';
    const valLength = defaultValue.length;
    const ref = React.createRef();
    mount(<TextArea autoFocus ref={ref} defaultValue={defaultValue} />);
    ref.current.resizableTextArea.textArea.setSelectionRange(valLength, valLength);
    expect(ref.current.resizableTextArea.textArea.selectionStart).toEqual(5);
    expect(ref.current.resizableTextArea.textArea.selectionEnd).toEqual(5);
  });
});

describe('TextArea allowClear', () => {
  it('should change type when click', () => {
    const wrapper = mount(<TextArea allowClear />);
    wrapper.find('textarea').simulate('change', { target: { value: '111' } });
    expect(wrapper.find('textarea').getDOMNode().value).toEqual('111');
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.ant-input-clear-icon').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find('textarea').getDOMNode().value).toEqual('');
  });

  it('should not show icon if value is undefined, null or empty string', () => {
    const wrappers = [null, undefined, ''].map(val => mount(<TextArea allowClear value={val} />));
    wrappers.forEach(wrapper => {
      expect(wrapper.find('textarea').getDOMNode().value).toEqual('');
      expect(wrapper.find('.ant-input-clear-icon-hidden').exists()).toBeTruthy();
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('should not show icon if defaultValue is undefined, null or empty string', () => {
    const wrappers = [null, undefined, ''].map(val =>
      mount(<TextArea allowClear defaultValue={val} />),
    );
    wrappers.forEach(wrapper => {
      expect(wrapper.find('textarea').getDOMNode().value).toEqual('');
      expect(wrapper.find('.ant-input-clear-icon-hidden').exists()).toBeTruthy();
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('should trigger event correctly', () => {
    let argumentEventObject;
    let argumentEventObjectValue;
    const onChange = e => {
      argumentEventObject = e;
      argumentEventObjectValue = e.target.value;
    };
    const wrapper = mount(<TextArea allowClear defaultValue="111" onChange={onChange} />);
    wrapper.find('.ant-input-clear-icon').at(0).simulate('click');
    expect(argumentEventObject.type).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(wrapper.find('textarea').at(0).getDOMNode().value).toBe('');
  });

  it('should trigger event correctly on controlled mode', () => {
    let argumentEventObject;
    let argumentEventObjectValue;
    const onChange = e => {
      argumentEventObject = e;
      argumentEventObjectValue = e.target.value;
    };
    const wrapper = mount(<TextArea allowClear value="111" onChange={onChange} />);
    wrapper.find('.ant-input-clear-icon').at(0).simulate('click');
    expect(argumentEventObject.type).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(wrapper.find('textarea').at(0).getDOMNode().value).toBe('111');
  });

  it('should focus textarea after clear', () => {
    const wrapper = mount(<TextArea allowClear defaultValue="111" />, { attachTo: document.body });
    wrapper.find('.ant-input-clear-icon').at(0).simulate('click');
    expect(document.activeElement).toBe(wrapper.find('textarea').at(0).getDOMNode());
    wrapper.unmount();
  });

  it('should not support allowClear when it is disabled', () => {
    const wrapper = mount(<TextArea allowClear defaultValue="111" disabled />);
    expect(wrapper.find('.ant-input-clear-icon-hidden').exists()).toBeTruthy();
  });

  it('not block input when `value` is undefined', () => {
    const wrapper = mount(<Input value={undefined} />);
    wrapper.find('input').simulate('change', { target: { value: 'Bamboo' } });
    expect(wrapper.find('input').props().value).toEqual('Bamboo');

    // Controlled
    wrapper.setProps({ value: 'Light' });
    wrapper.find('input').simulate('change', { target: { value: 'Bamboo' } });
    expect(wrapper.find('input').props().value).toEqual('Bamboo');
  });

  describe('click focus', () => {
    it('click outside should also get focus', () => {
      const wrapper = mount(<Input suffix={<span className="test-suffix" />} />);
      const onFocus = jest.spyOn(wrapper.find('input').instance(), 'focus');
      wrapper.find('.test-suffix').simulate('mouseUp');
      expect(onFocus).toHaveBeenCalled();
    });

    it('not get focus if out of component', () => {
      const wrapper = mount(<Input suffix={<span className="test-suffix" />} />);
      const onFocus = jest.spyOn(wrapper.find('input').instance(), 'focus');
      const ele = document.createElement('span');
      document.body.appendChild(ele);
      wrapper.find('.test-suffix').simulate('mouseUp', {
        target: ele,
      });
      expect(onFocus).not.toHaveBeenCalled();
      document.body.removeChild(ele);
    });
  });

  it('scroll to bottom when autoSize', async () => {
    const wrapper = mount(<Input.TextArea autoSize />, { attachTo: document.body });
    wrapper.find('textarea').simulate('focus');
    wrapper.find('textarea').getDOMNode().focus();
    const setSelectionRangeFn = jest.spyOn(
      wrapper.find('textarea').getDOMNode(),
      'setSelectionRange',
    );
    wrapper.find('textarea').simulate('input', { target: { value: '\n1' } });
    await sleep(100);
    expect(setSelectionRangeFn).toHaveBeenCalled();
    wrapper.unmount();
  });

  // https://github.com/ant-design/ant-design/issues/26308
  it('should display defaultValue when value is undefined', () => {
    const wrapper = mount(<Input.TextArea defaultValue="Light" value={undefined} />);
    expect(wrapper.find('textarea').at(0).getDOMNode().value).toBe('Light');
  });
});
