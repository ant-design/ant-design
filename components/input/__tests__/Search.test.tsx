import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Button from '../../button';
import type { InputRef } from '../Input';
import Search from '../Search';

describe('Input.Search', () => {
  focusTest(Search, { refFocus: true });
  mountTest(Search);
  rtlTest(Search);

  it('should support custom button', () => {
    const { asFragment } = render(<Search enterButton={<button type="button">ok</button>} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support custom Button', () => {
    const { asFragment } = render(<Search enterButton={<Button>ok</Button>} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support enterButton null', () => {
    expect(() => {
      render(<Search enterButton={null} />);
    }).not.toThrow();
  });

  it('should support ReactNode suffix without error', () => {
    const { asFragment } = render(<Search suffix={<div>ok</div>} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should disable enter button when disabled prop is true', () => {
    const { container } = render(<Search placeholder="input search text" enterButton disabled />);
    expect(container.querySelectorAll('.ant-btn-primary[disabled]')).toHaveLength(1);
  });

  it('should disable search icon when disabled prop is true', () => {
    const onSearch = jest.fn();
    const { container } = render(
      <Search defaultValue="search text" onSearch={onSearch} disabled />,
    );
    fireEvent.click(container.querySelector('button')!);
    expect(onSearch).toHaveBeenCalledTimes(0);
  });

  it('should trigger onSearch when click search icon', () => {
    const onSearch = jest.fn();
    const { container } = render(<Search defaultValue="search text" onSearch={onSearch} />);
    fireEvent.click(container.querySelector('button')!);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('search text', expect.anything());
  });

  it('should trigger onSearch when click search button', () => {
    const onSearch = jest.fn();
    const { container } = render(
      <Search defaultValue="search text" enterButton onSearch={onSearch} />,
    );
    fireEvent.click(container.querySelector('button')!);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('search text', expect.anything());
  });

  it('should trigger onSearch when click search button with text', () => {
    const onSearch = jest.fn();
    const { container } = render(
      <Search defaultValue="search text" enterButton="button text" onSearch={onSearch} />,
    );
    fireEvent.click(container.querySelector('button')!);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('search text', expect.anything());
  });

  it('should trigger onSearch when click search button with customize button', () => {
    const onSearch = jest.fn();
    const { container } = render(
      <Search
        defaultValue="search text"
        enterButton={<Button>antd button</Button>}
        onSearch={onSearch}
      />,
    );
    fireEvent.click(container.querySelector('button')!);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('search text', expect.anything());
  });

  it('should trigger onSearch when click search button of native', () => {
    const onSearch = jest.fn();
    const onButtonClick = jest.fn();
    const { container } = render(
      <Search
        defaultValue="search text"
        enterButton={
          <button type="button" onClick={onButtonClick}>
            antd button
          </button>
        }
        onSearch={onSearch}
      />,
    );
    fireEvent.click(container.querySelector('button')!);
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('search text', expect.anything());
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should trigger onSearch when press enter', () => {
    const onSearch = jest.fn();
    const { container } = render(<Search defaultValue="search text" onSearch={onSearch} />);
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Enter', keyCode: 13 });
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('search text', expect.anything());
  });

  // https://github.com/ant-design/ant-design/issues/34844
  it('should not trigger onSearch when press enter using chinese inputting method', () => {
    const onSearch = jest.fn();
    const { container } = render(<Search defaultValue="search text" onSearch={onSearch} />);
    fireEvent.compositionStart(container.querySelector('input')!);
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Enter', keyCode: 13 });
    expect(onSearch).not.toHaveBeenCalled();

    fireEvent.compositionEnd(container.querySelector('input')!);
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Enter', keyCode: 13 });
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('search text', expect.anything());
  });

  // https://github.com/ant-design/ant-design/issues/14785
  it('should support addonAfter', () => {
    const addonAfter = <span>Addon After</span>;
    const { asFragment } = render(<Search addonAfter={addonAfter} />);
    const { asFragment: asFragmentWithEnterButton } = render(
      <Search enterButton addonAfter={addonAfter} />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(asFragmentWithEnterButton().firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/18729
  it('should trigger onSearch when click clear icon', () => {
    const onSearch = jest.fn();
    const onChange = jest.fn();
    const { container } = render(
      <Search allowClear defaultValue="value" onSearch={onSearch} onChange={onChange} />,
    );
    fireEvent.click(container.querySelector('.ant-input-clear-icon')!);
    expect(onSearch).toHaveBeenLastCalledWith('', expect.anything());
    expect(onChange).toHaveBeenCalled();
  });

  it('should support loading', () => {
    const { asFragment } = render(<Search loading />);
    const { asFragment: asFragmentWithEnterButton } = render(<Search loading enterButton />);
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(asFragmentWithEnterButton().firstChild).toMatchSnapshot();
  });

  it('should not trigger onSearch when press enter while loading', () => {
    const onSearch = jest.fn();
    const { container } = render(<Search loading onSearch={onSearch} />);
    fireEvent.keyDown(container.querySelector('input')!, { key: 'Enter', keyCode: 13 });
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('should support addonAfter and suffix for loading', () => {
    const { asFragment } = render(<Search loading suffix="suffix" addonAfter="addonAfter" />);
    const { asFragment: asFragmentWithEnterButton } = render(
      <Search loading enterButton suffix="suffix" addonAfter="addonAfter" />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(asFragmentWithEnterButton().firstChild).toMatchSnapshot();
  });

  it('should support invalid suffix', () => {
    const { asFragment } = render(<Search suffix={[]} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support invalid addonAfter', () => {
    const { asFragment } = render(<Search addonAfter={[]} enterButton />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should prevent search button mousedown event', () => {
    const ref = React.createRef<InputRef>();
    const { container } = render(<Search ref={ref} enterButton="button text" />, {
      container: document.body,
    });
    ref.current?.focus();
    expect(document.activeElement).toBe(container.querySelector('input'));
    fireEvent.mouseDown(container.querySelector('button')!);
    expect(document.activeElement).toBe(container.querySelector('input'));
  });

  it('not crash when use function ref', () => {
    const ref = jest.fn();
    const { container } = render(<Search ref={ref} enterButton />);
    expect(() => {
      fireEvent.mouseDown(container.querySelector('button')!);
    }).not.toThrow();
  });

  // https://github.com/ant-design/ant-design/issues/27258
  it('Search with allowClear should have one className only', () => {
    const { container } = render(<Search allowClear className="className" />);
    expect(
      container.querySelector('.ant-input-group-wrapper')?.classList.contains('className'),
    ).toBe(true);
    expect(
      container.querySelector('.ant-input-affix-wrapper')?.classList.contains('className'),
    ).toBe(false);
  });
});
