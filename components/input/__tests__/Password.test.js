import React from 'react';
// eslint-disable-next-line import/no-unresolved
import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, sleep } from '../../../tests/utils';
import Password from '../Password';

describe('Input.Password', () => {
  focusTest(Input.Password, { refFocus: true });
  mountTest(Input.Password);
  rtlTest(Input.Password);

  it('should get input element from ref', () => {
    const ref = React.createRef();
    const onSelect = jest.fn();

    const { container } = render(<Input.Password onSelect={onSelect} ref={ref} />);
    expect(ref.current.input instanceof HTMLInputElement).toBe(true);
    fireEvent.select(container.querySelector('input'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('should support size', () => {
    const { asFragment, container } = render(<Password size="large" />);
    expect(container.querySelector('.ant-input-affix-wrapper-lg')).toBeTruthy();
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should change type when click', () => {
    const { asFragment, container } = render(<Input.Password />);
    fireEvent.change(container.querySelector('input'), { target: { value: '111' } });
    expect(asFragment().firstChild).toMatchSnapshot();

    fireEvent.click(container.querySelector('.ant-input-password-icon'));
    expect(asFragment().firstChild).toMatchSnapshot();

    fireEvent.click(container.querySelector('.ant-input-password-icon'));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('visibilityToggle should work', () => {
    const { container, rerender } = render(<Input.Password visibilityToggle={false} />);
    expect(container.querySelectorAll('.anticon-eye').length).toBe(0);
    rerender(<Input.Password visibilityToggle />);
    expect(container.querySelectorAll('.anticon-eye-invisible').length).toBe(1);
  });

  it('should not toggle visibility when disabled prop is true', () => {
    const { container } = render(<Input.Password disabled />);
    expect(container.querySelectorAll('.anticon-eye-invisible').length).toBe(1);
    fireEvent.click(container.querySelector('.anticon-eye-invisible'));
    expect(container.querySelectorAll('.anticon-eye').length).toBe(0);
  });

  it('should keep focus state', () => {
    const { container, unmount } = render(<Input.Password defaultValue="111" autoFocus />, {
      container: document.body,
    });
    expect(document.activeElement).toBe(container.querySelector('input'));
    document.activeElement.setSelectionRange(2, 2);
    expect(document.activeElement.selectionStart).toBe(2);
    fireEvent.mouseDown(container.querySelector('.ant-input-password-icon'));
    fireEvent.mouseUp(container.querySelector('.ant-input-password-icon'));
    fireEvent.click(container.querySelector('.ant-input-password-icon'));
    expect(document.activeElement).toBe(container.querySelector('input'));
    expect(document.activeElement.selectionStart).toBe(2);
    unmount();
  });

  // https://github.com/ant-design/ant-design/issues/20541
  it('should not show value attribute in input element', async () => {
    const { container } = render(<Input.Password />);
    fireEvent.change(container.querySelector('input'), { target: { value: 'value' } });
    await sleep();
    expect(container.querySelector('input').getAttribute('value')).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/24526
  it('should not show value attribute in input element after blur it', async () => {
    const { container } = render(<Input.Password />);
    fireEvent.change(container.querySelector('input'), { target: { value: 'value' } });
    await sleep();
    expect(container.querySelector('input').getAttribute('value')).toBeFalsy();
    fireEvent.blur(container.querySelector('input'));
    await sleep();
    expect(container.querySelector('input').getAttribute('value')).toBeFalsy();
    fireEvent.focus(container.querySelector('input'));
    await sleep();
    expect(container.querySelector('input').getAttribute('value')).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/20541
  it('could be unmount without errors', () => {
    expect(() => {
      const { container, unmount } = render(<Input.Password />);
      fireEvent.change(container.querySelector('input'), { target: { value: 'value' } });
      unmount();
    }).not.toThrow();
  });

  // https://github.com/ant-design/ant-design/pull/20544#issuecomment-569861679
  it('should not contain value attribute in input element with defaultValue', async () => {
    const { container } = render(<Input.Password defaultValue="value" />);
    await sleep();
    expect(container.querySelector('input').getAttribute('value')).toBeFalsy();
  });
});
