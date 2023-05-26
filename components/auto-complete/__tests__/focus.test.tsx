import React from 'react';
import { act } from 'react-dom/test-utils';
import AutoComplete from '..';
import { render } from '../../../tests/utils';

describe('AutoComplete children could be focus', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('focus() and onFocus', () => {
    const handleFocus = jest.fn();
    const { container: wrapper } = render(<AutoComplete onFocus={handleFocus} />, { container });
    wrapper.querySelector('input')?.focus();
    act(() => {
      jest.runAllTimers();
    });
    expect(handleFocus).toHaveBeenCalled();
  });

  it('blur() and onBlur', () => {
    const handleBlur = jest.fn();
    const { container: wrapper } = render(<AutoComplete onBlur={handleBlur} />, { container });
    wrapper.querySelector('input')?.focus();
    act(() => {
      jest.runAllTimers();
    });
    wrapper.querySelector('input')?.blur();
    act(() => {
      jest.runAllTimers();
    });
    expect(handleBlur).toHaveBeenCalled();
  });

  it('child.ref should work', () => {
    const mockRef = jest.fn();
    render(
      <AutoComplete dataSource={[]}>
        <input ref={mockRef} />
      </AutoComplete>,
    );
    expect(mockRef).toHaveBeenCalled();
  });

  it('child.ref instance should support be focused and blurred', () => {
    const inputRef = React.createRef<HTMLInputElement>();
    render(
      <AutoComplete dataSource={[]}>
        <input ref={inputRef} />
      </AutoComplete>,
    );
    expect(typeof inputRef.current?.focus).toBe('function');
    expect(typeof inputRef.current?.blur).toBe('function');
  });
});
