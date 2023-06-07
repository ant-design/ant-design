import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { fireEvent, render } from '../../../tests/utils';
// eslint-disable-next-line import/no-unresolved
import type { InputProps, InputRef } from '..';
import Input from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { resetWarned } from '../../_util/warning';
import Form from '../../form';
import { triggerFocus } from '../Input';

describe('Input', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  mountTest(Input);
  mountTest(Input.Group);

  rtlTest(Input);
  rtlTest(Input.Group);

  it('should support maxLength', () => {
    const { asFragment } = render(<Input maxLength={3} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('select()', () => {
    const ref = React.createRef<InputRef>();
    render(<Input ref={ref} />);
    ref.current?.select();
  });

  it('should support size', () => {
    const { asFragment, container } = render(<Input size="large" />);
    expect(container.querySelector('input')?.classList.contains('ant-input-lg')).toBe(true);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support size in form', () => {
    const { asFragment, container } = render(
      <Form size="large">
        <Form.Item>
          <Input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('input')?.classList.contains('ant-input-lg')).toBe(true);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  describe('focus trigger warning', () => {
    it('not trigger', () => {
      const { container, rerender } = render(<Input suffix="bamboo" />);

      fireEvent.focus(container.querySelector('input')!);

      rerender(<Input suffix="light" />);
      expect(errorSpy).not.toHaveBeenCalled();
    });
    it('trigger warning', () => {
      const { container, rerender, unmount } = render(<Input />);
      container.querySelector('input')?.focus();
      rerender(<Input suffix="light" />);
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Input] When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ',
      );
      unmount();
    });
  });

  describe('click focus', () => {
    it('click outside should also get focus', () => {
      const { container } = render(<Input suffix={<span className="test-suffix" />} />);
      const onFocus = jest.spyOn(container.querySelector('input')!, 'focus');
      fireEvent.click(container.querySelector('.test-suffix')!);
      expect(onFocus).toHaveBeenCalled();
    });

    it('not get focus if out of component', () => {
      const holder = document.createElement('span');
      document.body.appendChild(holder);

      const Popup = () => createPortal(<span className="popup" />, holder);

      const { container } = render(
        <Input
          suffix={
            <span className="test-suffix">
              <Popup />
            </span>
          }
        />,
      );

      const onFocus = jest.spyOn(container.querySelector('input')!, 'focus');
      fireEvent.mouseDown(document.querySelector('.popup')!);
      fireEvent.mouseUp(document.querySelector('.popup')!);

      expect(onFocus).not.toHaveBeenCalled();
      document.body.removeChild(holder);
    });
  });

  it('set mouse cursor position', () => {
    const defaultValue = '11111';
    const valLength = defaultValue.length;
    const ref = React.createRef<InputRef>();
    const { container } = render(<Input ref={ref} autoFocus defaultValue={defaultValue} />);
    ref.current?.setSelectionRange(valLength, valLength);
    expect(container.querySelector('input')?.selectionStart).toEqual(5);
    expect(container.querySelector('input')?.selectionEnd).toEqual(5);
  });

  it('warning for Input.Group', () => {
    resetWarned();
    render(<Input.Group />);

    expect(errorSpy).toHaveBeenCalledWith(
      "Warning: [antd: Input.Group] 'Input.Group' is deprecated. Please use 'Space.Compact' instead.",
    );
  });
});

describe('prefix and suffix', () => {
  it('should support className when has suffix', () => {
    const { container } = render(<Input suffix="suffix" className="my-class-name" />);
    expect((container.firstChild as Element).className.includes('my-class-name')).toBe(true);
    expect(container.querySelector('input')?.className.includes('my-class-name')).toBe(false);
  });

  it('should support className when has prefix', () => {
    const { container } = render(<Input prefix="prefix" className="my-class-name" />);
    expect((container.firstChild as Element).className.includes('my-class-name')).toBe(true);
    expect(container.querySelector('input')?.className.includes('my-class-name')).toBe(false);
  });

  it('should support hidden when has prefix or suffix', () => {
    const { container } = render(
      <>
        <Input prefix="prefix" hidden className="prefix-with-hidden" />
        <Input suffix="suffix" hidden className="suffix-with-hidden" />
      </>,
    );

    expect(container.querySelector('.prefix-with-hidden')?.getAttribute('hidden')).toBe('');
    expect(container.querySelector('.suffix-with-hidden')?.getAttribute('hidden')).toBe('');
  });
});

describe('Input setting hidden', () => {
  it('should support hidden when has prefix or suffix or showCount or allowClear or addonBefore or addonAfter', () => {
    const { container } = render(
      <>
        <Input
          hidden
          className="input"
          showCount
          allowClear
          prefix="11"
          suffix="22"
          addonBefore="http://"
          addonAfter=".com"
          defaultValue="mysite1"
        />
        <Input.Search
          hidden
          className="input-search"
          showCount
          allowClear
          prefix="11"
          suffix="22"
          addonBefore="http://"
          addonAfter=".com"
          defaultValue="mysite1"
        />
        <Input.TextArea
          hidden
          className="input-textarea"
          showCount
          allowClear
          prefix="11"
          // @ts-ignore
          suffix="22"
          addonBefore="http://"
          addonAfter=".com"
          defaultValue="mysite1"
        />
        <Input.Password
          hidden
          className="input-password"
          showCount
          allowClear
          prefix="11"
          suffix="22"
          addonBefore="http://"
          addonAfter=".com"
          defaultValue="mysite1"
        />
      </>,
    );

    expect(container.querySelector('.input')?.getAttribute('hidden')).toBe('');
    expect(container.querySelector('.input-search')?.getAttribute('hidden')).toBe('');
    expect(container.querySelector('.input-textarea')?.getAttribute('hidden')).toBe('');
    expect(container.querySelector('.input-password')?.getAttribute('hidden')).toBe('');
  });
});

describe('As Form Control', () => {
  it('should be reset when wrapped in form.getFieldDecorator without initialValue', () => {
    const Demo = () => {
      const [form] = Form.useForm();
      const reset = () => {
        form.resetFields();
      };

      return (
        <Form form={form}>
          <Form.Item name="input">
            <Input />
          </Form.Item>
          <Form.Item name="textarea">
            <Input.TextArea />
          </Form.Item>
          <button type="button" onClick={reset}>
            reset
          </button>
        </Form>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.change(container.querySelector('input')!, { target: { value: '111' } });
    fireEvent.change(container.querySelector('textarea')!, { target: { value: '222' } });
    expect(container.querySelector('input')?.value).toBe('111');
    expect(container.querySelector('textarea')?.value).toBe('222');
    fireEvent.click(container.querySelector('button')!);
    expect(container.querySelector('input')?.value).toBe('');
    expect(container.querySelector('textarea')?.value).toBe('');
  });
});

describe('should support showCount', () => {
  it('maxLength', () => {
    const { container } = render(<Input maxLength={5} showCount value="12345" />);
    expect(container.querySelector('input')?.getAttribute('value')).toBe('12345');
    expect(container.querySelector('.ant-input-show-count-suffix')?.innerHTML).toBe('5 / 5');
  });

  it('control exceed maxLength', () => {
    const { container } = render(<Input maxLength={5} showCount value="12345678" />);
    expect(container.querySelector('input')?.getAttribute('value')).toBe('12345678');
    expect(container.querySelector('.ant-input-show-count-suffix')?.innerHTML).toBe('8 / 5');
  });

  describe('emoji', () => {
    it('should minimize value between emoji length and maxLength', () => {
      const { container } = render(<Input maxLength={1} showCount value="👀" />);
      expect(container.querySelector('input')?.getAttribute('value')).toBe('👀');
      expect(container.querySelector('.ant-input-show-count-suffix')?.innerHTML).toBe('1 / 1');

      const { container: container1 } = render(<Input maxLength={2} showCount value="👀" />);
      expect(container1.querySelector('.ant-input-show-count-suffix')?.innerHTML).toBe('1 / 2');
    });

    it('slice emoji', () => {
      const { container } = render(<Input maxLength={5} showCount value="1234😂" />);
      expect(container.querySelector('input')?.getAttribute('value')).toBe('1234😂');
      expect(container.querySelector('.ant-input-show-count-suffix')?.innerHTML).toBe('5 / 5');
    });
  });

  it('count formatter', () => {
    const { container } = render(
      <Input
        maxLength={5}
        showCount={{
          formatter: ({ value, count, maxLength }) => `${value}, ${count}, ${maxLength}`,
        }}
        value="12345"
      />,
    );
    expect(container.querySelector('input')?.getAttribute('value')).toBe('12345');
    expect(container.querySelector('.ant-input-show-count-suffix')?.innerHTML).toBe('12345, 5, 5');
  });
});

describe('Input allowClear', () => {
  it('should change type when click', () => {
    const { asFragment, container } = render(<Input allowClear />);
    fireEvent.change(container.querySelector('input')!, { target: { value: '111' } });
    expect(container.querySelector('input')?.value).toEqual('111');
    expect(asFragment().firstChild).toMatchSnapshot();
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(container.querySelector('input')?.value).toEqual('');
  });

  it('should not show icon if value is undefined, null or empty string', () => {
    // @ts-ignore
    const wrappers = [null, undefined, ''].map((val) => render(<Input allowClear value={val} />));
    wrappers.forEach(({ asFragment, container }) => {
      expect(container.querySelector('input')?.value).toEqual('');
      expect(container.querySelector('.ant-input-clear-icon-hidden')).toBeTruthy();
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  it('should not show icon if defaultValue is undefined, null or empty string', () => {
    const wrappers = [null, undefined, ''].map((val) =>
      // @ts-ignore
      render(<Input allowClear defaultValue={val} />),
    );
    wrappers.forEach(({ asFragment, container }) => {
      expect(container.querySelector('input')?.value).toEqual('');
      expect(container.querySelector('.ant-input-clear-icon-hidden')).toBeTruthy();
      expect(asFragment().firstChild).toMatchSnapshot();
    });
  });

  it('should trigger event correctly', () => {
    let argumentEventObjectType;
    let argumentEventObjectValue;
    const onChange: InputProps['onChange'] = (e) => {
      argumentEventObjectType = e.type;
      argumentEventObjectValue = e.target.value;
    };
    const { container } = render(<Input allowClear defaultValue="111" onChange={onChange} />);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(argumentEventObjectType).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(container.querySelector('input')?.value).toBe('');
  });

  it('should trigger event correctly on controlled mode', () => {
    let argumentEventObjectType;
    let argumentEventObjectValue;
    const onChange: InputProps['onChange'] = (e) => {
      argumentEventObjectType = e.type;
      argumentEventObjectValue = e.target.value;
    };
    const { container } = render(<Input allowClear value="111" onChange={onChange} />);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(argumentEventObjectType).toBe('click');
    expect(argumentEventObjectValue).toBe('');
    expect(container.querySelector('input')?.value).toBe('111');
  });

  it('should focus input after clear', () => {
    const { container, unmount } = render(<Input allowClear defaultValue="111" />, {
      container: document.body,
    });
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(document.activeElement).toBe(container.querySelector('input'));
    unmount();
  });

  ['disabled', 'readOnly'].forEach((prop) => {
    it(`should not support allowClear when it is ${prop}`, () => {
      const { container } = render(<Input allowClear defaultValue="111" {...{ [prop]: true }} />);
      expect(container.querySelector('.ant-input-clear-icon-hidden')).toBeTruthy();
    });
  });

  // https://github.com/ant-design/ant-design/issues/27444
  it('should support className', () => {
    const { container } = render(<Input allowClear className="my-class-name" />);
    expect((container.firstChild as Element).className.includes('my-class-name')).toBe(true);
    expect(container.querySelector('input')?.className.includes('my-class-name')).toBe(false);
  });

  // https://github.com/ant-design/ant-design/issues/31200
  it('should not lost focus when clear input', () => {
    const onBlur = jest.fn();
    const { container, unmount } = render(
      <Input allowClear defaultValue="value" onBlur={onBlur} />,
      {
        container: document.body,
      },
    );
    container.querySelector('input')?.focus();
    fireEvent.mouseDown(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.mouseUp(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.focus(container.querySelector('.ant-input-clear-icon')!);
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(onBlur).not.toHaveBeenCalled();
    unmount();
  });

  // https://github.com/ant-design/ant-design/issues/31927
  it('should correctly when useState', () => {
    const App = () => {
      const [query, setQuery] = useState('');
      return (
        <Input
          allowClear
          value={query}
          onChange={(e) => {
            setQuery(() => e.target.value);
          }}
        />
      );
    };

    const { container, unmount } = render(<App />);

    container.querySelector('input')?.focus();
    fireEvent.change(container.querySelector('input')!, { target: { value: '111' } });
    expect(container.querySelector('input')?.value).toEqual('111');

    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(container.querySelector('input')?.value).toEqual('');

    unmount();
  });

  it('not crash when value is number', () => {
    const { container } = render(<Input suffix="Bamboo" value={1} />);
    expect(container).toBeTruthy();
  });

  it('should display boolean value as string', () => {
    // @ts-ignore
    const { container, rerender } = render(<Input value />);
    expect(container.querySelector('input')?.value).toBe('true');
    // @ts-ignore
    rerender(<Input value={false} />);
    expect(container.querySelector('input')?.value).toBe('false');
  });

  it('should support custom clearIcon', () => {
    const { container } = render(<Input allowClear={{ clearIcon: 'clear' }} />);
    expect(container.querySelector('.ant-input-clear-icon')?.textContent).toBe('clear');
  });

  it('should support classNames and styles', () => {
    const { container } = render(
      <>
        <Input
          value="123"
          showCount
          prefixCls="rc-input"
          prefix="prefix"
          suffix="suffix"
          className="custom-class"
          style={{ backgroundColor: 'red' }}
          classNames={{
            input: 'custom-input',
            prefix: 'custom-prefix',
            suffix: 'custom-suffix',
            count: 'custom-count',
          }}
          styles={{
            input: { color: 'red' },
            prefix: { color: 'blue' },
            suffix: { color: 'yellow' },
            count: { color: 'green' },
          }}
        />
        <Input
          value="123"
          addonAfter="addon"
          showCount
          prefixCls="rc-input"
          prefix="prefix"
          suffix="suffix"
          className="custom-class"
          style={{ backgroundColor: 'red' }}
          classNames={{
            input: 'custom-input',
            prefix: 'custom-prefix',
            suffix: 'custom-suffix',
            count: 'custom-count',
          }}
          styles={{
            input: { color: 'red' },
            prefix: { color: 'blue' },
            suffix: { color: 'yellow' },
            count: { color: 'green' },
          }}
        />
        <Input
          value="123"
          prefixCls="rc-input"
          className="custom-class"
          style={{ backgroundColor: 'red' }}
          classNames={{
            input: 'custom-input',
          }}
          styles={{
            input: { color: 'red' },
          }}
        />
        <Input
          value="123"
          prefixCls="rc-input"
          className="custom-class"
          addonAfter="addon"
          style={{ backgroundColor: 'red' }}
          classNames={{
            input: 'custom-input',
          }}
          styles={{
            input: { color: 'red' },
          }}
        />
      </>,
    );
    expect(container).toMatchSnapshot();
  });
});

describe('typescript types', () => {
  it('InputProps type should support data-* attributes', () => {
    const props: InputProps = {
      value: 123,

      // expect no ts error here
      'data-testid': 'test-id',
      'data-id': '12345',
    };
    const { container } = render(<Input {...props} />);
    const input = container.querySelector('input');
    expect(input?.getAttribute('data-testid')).toBe('test-id');
    expect(input?.getAttribute('data-id')).toBe('12345');
  });
});

describe('triggerFocus', () => {
  it('triggerFocus correctly run when element is null', () => {
    expect(() => {
      triggerFocus();
    }).not.toThrow();
  });
});
