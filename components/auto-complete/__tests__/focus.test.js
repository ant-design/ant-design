import React from 'react';
import { mount } from 'enzyme';
import AutoComplete from '..';

describe('AutoComplete children could be focus', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  let container;
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
    const wrapper = mount(<AutoComplete onFocus={handleFocus} />, { attachTo: container });
    wrapper
      .find('input')
      .instance()
      .focus();
    jest.runAllTimers();
    expect(handleFocus).toHaveBeenCalled();
  });

  it('blur() and onBlur', () => {
    const handleBlur = jest.fn();
    const wrapper = mount(<AutoComplete onBlur={handleBlur} />, { attachTo: container });
    wrapper
      .find('input')
      .instance()
      .focus();
    jest.runAllTimers();
    wrapper
      .find('input')
      .instance()
      .blur();
    jest.runAllTimers();
    expect(handleBlur).toHaveBeenCalled();
  });

  it('child.ref should work', () => {
    const mockRef = jest.fn();
    mount(
      <AutoComplete dataSource={[]}>
        <input ref={mockRef} />
      </AutoComplete>,
    );
    expect(mockRef).toHaveBeenCalled();
  });

  it('child.ref instance should support be focused and blured', () => {
    let inputRef;
    mount(
      <AutoComplete dataSource={[]}>
        <input
          ref={node => {
            inputRef = node;
          }}
        />
      </AutoComplete>,
    );
    expect(typeof inputRef.focus).toBe('function');
    expect(typeof inputRef.blur).toBe('function');
  });
});
