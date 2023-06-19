import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import type { ChangeEventHandler, TextareaHTMLAttributes } from 'react';
import React, { useState } from 'react';
import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import type { RenderOptions } from '../../../tests/utils';
import { fireEvent, pureRender, render, triggerResize, waitFakeTimer } from '../../../tests/utils';
import type { TextAreaRef } from '../TextArea';

const { TextArea } = Input;

focusTest(TextArea, { refFocus: true });

describe('TextArea', () => {
  const originalGetComputedStyle = window.getComputedStyle;
  beforeAll(() => {
    Object.defineProperty(window, 'getComputedStyle', {
      value: (node: Element) => ({
        getPropertyValue: (prop: PropertyKey) =>
          prop === 'box-sizing'
            ? originalGetComputedStyle(node)[prop as unknown as number] || 'border-box'
            : originalGetComputedStyle(node)[prop as unknown as number],
      }),
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'getComputedStyle', { value: originalGetComputedStyle });
  });

  it('should auto calculate height according to content length', async () => {
    jest.useFakeTimers();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const ref = React.createRef<TextAreaRef>();

    const onInternalAutoSize = jest.fn();
    const genTextArea = (props = {}) => (
      <TextArea
        value=""
        readOnly
        autoSize={{ minRows: 2, maxRows: 6 }}
        wrap="off"
        ref={ref}
        {...props}
        {...{ onInternalAutoSize }}
      />
    );

    const { container, rerender } = pureRender(genTextArea());
    await waitFakeTimer();
    expect(onInternalAutoSize).toHaveBeenCalledTimes(1);

    rerender(genTextArea({ value: '1111\n2222\n3333' }));
    await waitFakeTimer();
    expect(onInternalAutoSize).toHaveBeenCalledTimes(2);

    rerender(genTextArea({ value: '1111' }));
    await waitFakeTimer();
    expect(onInternalAutoSize).toHaveBeenCalledTimes(3);

    expect(container.querySelector('textarea')?.style.overflow).toBeFalsy();

    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should support onPressEnter and onKeyDown', () => {
    const fakeHandleKeyDown = jest.fn();
    const fakeHandlePressEnter = jest.fn();
    const { container } = render(
      <TextArea onKeyDown={fakeHandleKeyDown} onPressEnter={fakeHandlePressEnter} />,
    );
    /** KeyCode 65 is A */
    fireEvent.keyDown(container.querySelector('textarea')!, { keyCode: 65 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(1);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(0);

    /** KeyCode 13 is Enter */
    fireEvent.keyDown(container.querySelector('textarea')!, { keyCode: 13 });
    expect(fakeHandleKeyDown).toHaveBeenCalledTimes(2);
    expect(fakeHandlePressEnter).toHaveBeenCalledTimes(1);
  });

  it('should support disabled', () => {
    const { asFragment } = render(<TextArea disabled />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  describe('maxLength', () => {
    it('should support maxLength', () => {
      const { asFragment } = render(<TextArea maxLength={10} />);
      expect(asFragment().firstChild).toMatchSnapshot();
    });

    it('maxLength should not block control', () => {
      const { container } = render(<TextArea maxLength={1} value="light" />);
      expect(container.querySelector('textarea')?.value).toEqual('light');
    });

    it('should limit correctly when in control', () => {
      const Demo = () => {
        const [val, setVal] = React.useState('');
        return <TextArea maxLength={1} value={val} onChange={(e) => setVal(e.target.value)} />;
      };

      const { container } = render(<Demo />);
      fireEvent.change(container.querySelector('textarea')!, { target: { value: 'light' } });

      expect(container.querySelector('textarea')?.value).toEqual('l');
    });

    it('should exceed maxLength when use IME', () => {
      const onChange = jest.fn();

      const { container } = render(<TextArea maxLength={1} onChange={onChange} />);
      fireEvent.compositionStart(container.querySelector('textarea')!);
      fireEvent.change(container.querySelector('textarea')!, { target: { value: 'zhu' } });
      fireEvent.compositionEnd(container.querySelector('textarea')!, {
        currentTarget: { value: '竹' },
      });
      fireEvent.change(container.querySelector('textarea')!, { target: { value: '竹' } });

      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ target: expect.objectContaining({ value: '竹' }) }),
      );
    });

    // 字符输入
    it('should not cut off string when cursor position is not at the end', () => {
      const onChange = jest.fn();
      const { container } = render(
        <TextArea maxLength={6} defaultValue="123456" onChange={onChange} />,
      );
      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 1, value: 'w123456' },
      });
      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 3, value: 'w123456' },
      });
      expect(container.querySelector('textarea')?.value).toBe('123456');
    });

    // 拼音输入
    // 1. 光标位于最后，且当前字符数未达到6个，若选中的字符 + 原字符的长度超过6个，则将最终的字符按照maxlength截断
    it('when the input method is pinyin and the cursor is at the end, should use maxLength to crop', () => {
      const onChange = jest.fn();
      const { container } = render(
        <TextArea maxLength={6} defaultValue="1234" onChange={onChange} />,
      );
      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 4, value: '1234' },
      });
      fireEvent.compositionStart(container.querySelector('textarea')!);

      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 9, value: '1234z z z' },
      });
      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 7, value: '1234组织者' },
      });

      fireEvent.compositionEnd(container.querySelector('textarea')!);

      expect(container.querySelector('textarea')?.value).toBe('1234组织');
    });

    // 2. 光标位于中间或开头，且当前字符数未达到6个，若选中的字符 + 原字符的长度超过6个，则显示原有字符
    it('when the input method is Pinyin and the cursor is in the middle, should display the original string', () => {
      const onChange = jest.fn();
      const { container } = render(
        <TextArea maxLength={6} defaultValue="1234" onChange={onChange} />,
      );
      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 2, value: '1234' },
      });
      fireEvent.compositionStart(container.querySelector('textarea')!);

      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 2, value: '12z z z34' },
      });
      fireEvent.change(container.querySelector('textarea')!, {
        target: { selectionStart: 5, value: '12组织者34' },
      });

      fireEvent.compositionEnd(container.querySelector('textarea')!);

      expect(container.querySelector('textarea')?.value).toBe('1234');
    });
  });

  it('handleKeyDown', () => {
    const onPressEnter = jest.fn();
    const onKeyDown = jest.fn();
    const { container } = render(
      <TextArea onPressEnter={onPressEnter} onKeyDown={onKeyDown} aria-label="textarea" />,
    );
    fireEvent.keyDown(container.querySelector('textarea')!, { keyCode: 13 });

    expect(onPressEnter).toHaveBeenCalled();
    expect(onKeyDown).toHaveBeenCalled();
  });

  it('should trigger onResize', async () => {
    jest.useFakeTimers();
    const onResize = jest.fn();
    const ref = React.createRef<TextAreaRef>();
    const { container } = render(<TextArea ref={ref} onResize={onResize} autoSize />);
    await waitFakeTimer();

    triggerResize(container.querySelector('textarea')!);
    await waitFakeTimer();

    expect(onResize).toHaveBeenCalledWith(
      expect.objectContaining({ width: expect.any(Number), height: expect.any(Number) }),
    );

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should disabled trigger onResize', async () => {
    const { container } = render(<TextArea showCount style={{ resize: 'none' }} />);
    expect(container.innerHTML).toContain('resize: none;');
    const { container: container2 } = render(<TextArea showCount />);
    expect(container2.innerHTML).not.toContain('resize: none;');
  });

  it('should works same as Input', () => {
    const { container: inputContainer, rerender: inputRerender } = render(<Input value="111" />);
    const { container: textareaContainer, rerender: textareaRerender } = render(
      <TextArea value="111" />,
    );
    inputRerender(<Input value={undefined} />);
    textareaRerender(<TextArea value={undefined} />);
    expect(textareaContainer.querySelector('textarea')?.value).toBe(
      inputContainer.querySelector('input')?.value,
    );
  });

  describe('should support showCount', () => {
    it('maxLength', () => {
      const { container } = render(<TextArea maxLength={5} showCount value="12345" />);
      expect(container.querySelector('textarea')?.value).toBe('12345');
      expect(
        container.querySelector('.ant-input-textarea-show-count')?.getAttribute('data-count'),
      ).toBe('5 / 5');
    });

    it('control exceed maxLength', () => {
      const { container } = render(<TextArea maxLength={5} showCount value="12345678" />);
      expect(container.querySelector('textarea')?.value).toBe('12345678');
      expect(
        container.querySelector('.ant-input-textarea-show-count')?.getAttribute('data-count'),
      ).toBe('8 / 5');
    });

    describe('emoji', () => {
      it('should minimize value between emoji length and maxLength', () => {
        const { container } = render(<TextArea maxLength={1} showCount value="👀" />);
        expect(container.querySelector('textarea')?.value).toBe('👀');
        expect(
          container.querySelector('.ant-input-textarea-show-count')?.getAttribute('data-count'),
        ).toBe('1 / 1');

        // fix: 当 maxLength 长度为 2 的时候，输入 emoji 之后 showCount 会显示 1/2，但是不能再输入了
        // zombieJ: 逻辑统一了，emoji 现在也可以正确计数了
        const { container: container1 } = render(<TextArea maxLength={2} showCount value="👀" />);
        expect(
          container1.querySelector('.ant-input-textarea-show-count')?.getAttribute('data-count'),
        ).toBe('1 / 2');
      });

      it('defaultValue should slice', () => {
        const { container } = render(<TextArea maxLength={1} defaultValue="🧐cut" />);
        expect(container.querySelector('textarea')?.value).toBe('🧐');
      });

      // 修改TextArea value截取规则后新增单测
      it('slice emoji', () => {
        const { container } = render(<TextArea maxLength={5} showCount value="1234😂" />);
        expect(container.querySelector('textarea')?.value).toBe('1234😂');
        expect(
          container.querySelector('.ant-input-textarea-show-count')?.getAttribute('data-count'),
        ).toBe('5 / 5');
      });
    });

    it('className & style patch to outer', () => {
      const { container } = render(
        <TextArea className="bamboo" style={{ background: 'red' }} showCount />,
      );

      // Outer
      expect(container.querySelector('span')?.classList.contains('bamboo')).toBeTruthy();
      expect(container.querySelector('span')?.style.background).toEqual('red');

      // Inner
      expect(container.querySelector('.ant-input')?.classList.contains('bamboo')).toBeFalsy();
      expect(container.querySelector<HTMLDivElement>('.ant-input')?.style.background).toBeFalsy();
    });

    it('count formatter', () => {
      const { container } = render(
        <TextArea
          maxLength={5}
          showCount={{
            formatter: ({ value, count, maxLength }) => `${value}, ${count}, ${maxLength}`,
          }}
          value="12345"
        />,
      );
      expect(container.querySelector('textarea')?.value).toBe('12345');
      expect(
        container.querySelector('.ant-input-textarea-show-count')?.getAttribute('data-count'),
      ).toBe('12345, 5, 5');
    });
  });

  it('should support size', async () => {
    const { asFragment, container } = render(<TextArea size="large" />);
    expect(container.querySelector('textarea')?.classList.contains('ant-input-lg')).toBe(true);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('set mouse cursor position', () => {
    const defaultValue = '11111';
    const valLength = defaultValue.length;
    const ref = React.createRef<TextAreaRef>();
    render(<TextArea autoFocus ref={ref} defaultValue={defaultValue} />);
    ref.current?.resizableTextArea?.textArea.setSelectionRange(valLength, valLength);
    expect(ref.current?.resizableTextArea?.textArea.selectionStart).toEqual(5);
    expect(ref.current?.resizableTextArea?.textArea.selectionEnd).toEqual(5);
  });
});

describe('TextArea allowClear', () => {
  it('should change type when click', () => {
    const { asFragment, container } = render(<TextArea allowClear />);
    fireEvent.change(container.querySelector('textarea')!, { target: { value: '111' } });
    expect(container.querySelector('textarea')?.value).toEqual('111');
    expect(asFragment().firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(container.querySelector('textarea')?.value).toEqual('');
  });

  it('should not show icon if value is undefined, null or empty string', () => {
    const wrappers = [null, undefined, ''].map((val) =>
      render(
        <TextArea allowClear value={val as TextareaHTMLAttributes<HTMLTextAreaElement>['value']} />,
      ),
    );
    wrappers.forEach(({ asFragment, container }) => {
      expect(container.querySelector('textarea')?.value).toEqual('');
      expect(container.querySelector('.ant-input-clear-icon-hidden')).toBeTruthy();
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  it('should not show icon if defaultValue is undefined, null or empty string', () => {
    const wrappers = [null, undefined, ''].map((val) =>
      render(
        <TextArea
          allowClear
          defaultValue={val as TextareaHTMLAttributes<HTMLTextAreaElement>['value']}
        />,
      ),
    );
    wrappers.forEach(({ asFragment, container }) => {
      expect(container.querySelector('textarea')?.value).toEqual('');
      expect(container.querySelector('.ant-input-clear-icon-hidden')).toBeTruthy();
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  it('should trigger event correctly', () => {
    let argumentEventObjectType;
    let argumentEventObjectValue;
    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      argumentEventObjectType = e.type;
      argumentEventObjectValue = e.target.value;
    };
    const { container } = render(<TextArea allowClear defaultValue="111" onChange={onChange} />);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(argumentEventObjectType).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(container.querySelector('textarea')?.value).toBe('');
  });

  it('should trigger event correctly on controlled mode', () => {
    let argumentEventObjectType;
    let argumentEventObjectValue;
    const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      argumentEventObjectType = e.type;
      argumentEventObjectValue = e.target.value;
    };
    const { container } = render(<TextArea allowClear value="111" onChange={onChange} />);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(argumentEventObjectType).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(container.querySelector('textarea')?.value).toBe('111');
  });

  it('should focus textarea after clear', () => {
    const { container, unmount } = render(<TextArea allowClear defaultValue="111" />, {
      container: document.body,
    });
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(document.activeElement).toBe(container.querySelector('textarea'));
    unmount();
  });

  it('should not support allowClear when it is disabled', () => {
    const { container } = render(<TextArea allowClear defaultValue="111" disabled />);
    expect(container.querySelector('.ant-input-clear-icon-hidden')).toBeTruthy();
  });

  it('not block input when `value` is undefined', () => {
    const { container, rerender } = render(<Input value={undefined} />);
    fireEvent.change(container.querySelector('input')!, { target: { value: 'Bamboo' } });
    expect(container.querySelector('input')?.value).toEqual('Bamboo');

    // Controlled
    rerender(<Input value="Light" />);
    fireEvent.change(container.querySelector('input')!, { target: { value: 'Bamboo' } });
    expect(container.querySelector('input')?.value).toEqual('Light');
  });

  it('scroll to bottom when autoSize', async () => {
    jest.useFakeTimers();
    const ref = React.createRef<TextAreaRef>();
    const { container, unmount } = render(<Input.TextArea ref={ref} autoSize />, {
      container: document.body,
      legacyRoot: true,
    } as RenderOptions);
    fireEvent.focus(container.querySelector('textarea')!);
    container.querySelector('textarea')?.focus();

    const setSelectionRangeFn = jest.spyOn(
      container.querySelector('textarea')!,
      'setSelectionRange',
    );
    fireEvent.input(container.querySelector('textarea')!, { target: { value: '\n1' } });
    const target = ref.current?.resizableTextArea?.textArea!;
    triggerResize(target);
    await waitFakeTimer();
    expect(setSelectionRangeFn).toHaveBeenCalled();
    unmount();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  // https://github.com/ant-design/ant-design/issues/26308
  it('should display defaultValue when value is undefined', () => {
    const { container } = render(<Input.TextArea defaultValue="Light" value={undefined} />);
    expect(container.querySelector('textarea')?.value).toBe('Light');
  });

  it('onChange event should return HTMLTextAreaElement', () => {
    const onChange = jest.fn();
    const { container } = render(<Input.TextArea onChange={onChange} allowClear />);

    function isNativeElement() {
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ target: expect.any(HTMLTextAreaElement) }),
      );

      onChange.mockReset();
    }

    // Change
    fireEvent.change(container.querySelector('textarea')!, { target: { value: 'bamboo' } });
    isNativeElement();

    // Composition End
    fireEvent.change(container.querySelector('textarea')!, { target: { value: 'light' } });
    fireEvent.compositionEnd(container.querySelector('textarea')!);
    isNativeElement();

    // Reset
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    isNativeElement();
  });

  // https://github.com/ant-design/ant-design/issues/31927
  it('should correctly when useState', () => {
    const App = () => {
      const [query, setQuery] = useState('');
      return (
        <TextArea
          allowClear
          value={query}
          onChange={(e) => {
            setQuery(() => e.target.value);
          }}
        />
      );
    };

    const { container, unmount } = render(<App />);
    container.querySelector('textarea')?.focus();
    fireEvent.change(container.querySelector('textarea')!, { target: { value: '111' } });
    expect(container.querySelector('textarea')?.value).toEqual('111');

    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(container.querySelector('textarea')?.value).toEqual('');

    unmount();
  });

  // https://github.com/ant-design/ant-design/issues/31200
  it('should not lost focus when clear input', () => {
    const onBlur = jest.fn();
    const { container, unmount } = render(
      <TextArea allowClear defaultValue="value" onBlur={onBlur} />,
      {
        container: document.body,
      },
    );
    container.querySelector('textarea')?.focus();
    fireEvent.mouseDown(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.mouseUp(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.focus(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(onBlur).not.toHaveBeenCalled();
    unmount();
  });

  it('should focus text area after clear', () => {
    const { container, unmount } = render(<TextArea allowClear defaultValue="111" />, {
      container: document.body,
    });
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(document.activeElement).toBe(container.querySelector('textarea'));
    unmount();
  });

  it('should display boolean value as string', () => {
    const { container, rerender } = render(
      <TextArea value={true as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>['value']} />,
    );
    expect(container.querySelector('textarea')?.value).toBe('true');
    rerender(
      <TextArea value={false as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>['value']} />,
    );
    expect(container.querySelector('textarea')?.value).toBe('false');
  });

  it('should focus when clearBtn is clicked in controlled case', () => {
    const handleFocus = jest.fn();

    const textareaSpy = spyElementPrototypes(HTMLTextAreaElement, {
      focus: handleFocus,
    });

    const Demo: React.FC = () => {
      const [value, setValue] = React.useState('');
      return <Input.TextArea allowClear value={value} onChange={(e) => setValue(e.target.value)} />;
    };

    const { container } = render(<Demo />);
    fireEvent.change(container.querySelector('textarea')!, { target: { value: 'test' } });
    expect(container.querySelector('.ant-input-clear-icon')?.className).not.toContain(
      'ant-input-clear-icon-hidden',
    );
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    textareaSpy.mockRestore();
  });

  it('should support custom clearIcon', () => {
    const { container } = render(<TextArea allowClear={{ clearIcon: 'clear' }} />);
    expect(container.querySelector('.ant-input-clear-icon')?.textContent).toBe('clear');
  });

  it('classNames and styles should work', () => {
    const { container } = render(
      <>
        <TextArea
          className="custom-class"
          style={{ background: 'red' }}
          classNames={{
            textarea: 'custom-textarea',
            count: 'custom-count',
          }}
          styles={{
            textarea: {
              color: 'red',
            },
            count: {
              color: 'blue',
            },
          }}
        />
        <TextArea
          showCount
          className="custom-class"
          style={{ background: 'red' }}
          classNames={{
            textarea: 'custom-textarea',
            count: 'custom-count',
          }}
          styles={{
            textarea: {
              color: 'red',
            },
            count: {
              color: 'blue',
            },
          }}
        />
      </>,
    );
    expect(container).toMatchSnapshot();
  });
});
