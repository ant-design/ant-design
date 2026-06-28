import React from 'react';
import { vi } from 'vitest';

import AutoComplete from '..';
import { act, render } from '../../../tests/utils';

describe('AutoComplete children could be focus', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('focus() and onFocus', () => {
    const handleFocus = vi.fn();
    const { container: wrapper } = render(<AutoComplete onFocus={handleFocus} />, { container });
    wrapper.querySelector('input')?.focus();
    act(() => {
      vi.runAllTimers();
    });
    expect(handleFocus).toHaveBeenCalled();
  });

  it('blur() and onBlur', () => {
    const handleBlur = vi.fn();
    const { container: wrapper } = render(<AutoComplete onBlur={handleBlur} />, { container });
    wrapper.querySelector('input')?.focus();
    act(() => {
      vi.runAllTimers();
    });
    wrapper.querySelector('input')?.blur();
    act(() => {
      vi.runAllTimers();
    });
    expect(handleBlur).toHaveBeenCalled();
  });

  it('child.ref should work', () => {
    const mockRef = vi.fn();
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
