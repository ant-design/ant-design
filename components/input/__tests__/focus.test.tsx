import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import React from 'react';
import Input from '..';
import { fireEvent, render } from '../../../tests/utils';
import type { InputRef } from '../Input';
import type { TextAreaRef } from '../TextArea';

const { TextArea } = Input;

describe('Input.Focus', () => {
  let inputSpy: ReturnType<typeof spyElementPrototypes>;
  let textareaSpy: ReturnType<typeof spyElementPrototypes>;
  let focus: ReturnType<typeof jest.fn>;
  let setSelectionRange: ReturnType<typeof jest.fn>;

  beforeEach(() => {
    focus = jest.fn();
    setSelectionRange = jest.fn();
    inputSpy = spyElementPrototypes(HTMLInputElement, {
      focus,
      setSelectionRange,
    });
    textareaSpy = spyElementPrototypes(HTMLTextAreaElement, {
      focus,
      setSelectionRange,
    });
  });

  afterEach(() => {
    inputSpy.mockRestore();
    textareaSpy.mockRestore();
  });

  it('start', () => {
    const ref = React.createRef<InputRef>();
    render(<TextArea ref={ref} defaultValue="light" />);
    ref.current!.focus({ cursor: 'start' });

    expect(focus).toHaveBeenCalled();
    expect(setSelectionRange).toHaveBeenCalledWith(expect.anything(), 0, 0);
  });

  it('end', () => {
    const ref = React.createRef<InputRef>();
    render(<TextArea ref={ref} defaultValue="light" />);
    ref.current!.focus({ cursor: 'end' });

    expect(focus).toHaveBeenCalled();
    expect(setSelectionRange).toHaveBeenCalledWith(expect.anything(), 5, 5);
  });

  it('all', () => {
    const ref = React.createRef<TextAreaRef>();
    render(<TextArea ref={ref} defaultValue="light" />);
    ref.current!.focus({ cursor: 'all' });

    expect(focus).toHaveBeenCalled();
    expect(setSelectionRange).toHaveBeenCalledWith(expect.anything(), 0, 5);
  });

  it('disabled should reset focus', () => {
    const { rerender, container } = render(<Input allowClear />);
    fireEvent.focus(container.querySelector('input')!);
    expect(container.querySelector('.ant-input-affix-wrapper-focused')).toBeTruthy();

    rerender(<Input allowClear disabled />);
    expect(container.querySelector('.ant-input-affix-wrapper-focused')).toBeFalsy();
  });
});
