import React from 'react';
import Checkbox from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';

describe('Checkbox', () => {
  focusTest(Checkbox, { refFocus: true });
  mountTest(Checkbox);
  rtlTest(Checkbox);

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const { container } = render(
      <Checkbox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />,
    );

    fireEvent.mouseEnter(container.querySelector('label')!);
    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(container.querySelector('label')!);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('should be controlled by value', () => {
    const mockChangeHandler = jest.fn();

    const { getByRole } = render(<Checkbox value onChange={mockChangeHandler} />);

    const checkboxNode = getByRole('checkbox');
    expect(checkboxNode).toBeTruthy();
    expect(checkboxNode).toBeChecked();

    fireEvent.click(checkboxNode);

    expect(mockChangeHandler).toHaveBeenCalledWith(expect.any(Object));
    expect(mockChangeHandler.mock.calls[0][0].target.checked).toBeFalsy();
    // controlled component, so still true after click
    expect(checkboxNode).toBeChecked();
  });

  it('should be uncontrolled by defaultValue', () => {
    const mockChangeHandler = jest.fn();

    const { getByRole } = render(<Checkbox defaultValue onChange={mockChangeHandler} />);

    const checkboxNode = getByRole('checkbox');
    expect(checkboxNode).toBeTruthy();
    expect(checkboxNode).toBeChecked();

    fireEvent.click(checkboxNode);

    expect(mockChangeHandler).toHaveBeenCalledWith(expect.any(Object));
    expect(mockChangeHandler.mock.calls[0][0].target.checked).toBeFalsy();
    // uncontrolled component, so false after click
    expect(checkboxNode).not.toBeChecked();
  });
});
