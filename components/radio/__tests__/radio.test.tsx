import React from 'react';

import Radio, { Button, Group } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import Form from '../../form';

describe('Radio', () => {
  focusTest(Radio, { refFocus: true });
  mountTest(Radio);
  mountTest(Group);
  mountTest(Button);

  rtlTest(Radio);
  rtlTest(Group);
  rtlTest(Button);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly', () => {
    const { container } = render(<Radio className="customized">Test</Radio>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const { container } = render(<Radio onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    fireEvent.mouseEnter(container.querySelector('label')!);
    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(container.querySelector('label')!);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('should use own disabled status first', () => {
    const { getByRole } = render(
      <Form disabled>
        <Radio disabled={false} />
      </Form>,
    );
    expect(getByRole('radio')).not.toBeDisabled();
  });

  it('should obtained correctly disabled status', () => {
    const { getByRole } = render(
      <Form disabled>
        <Radio.Group disabled={false}>
          <Radio />
        </Radio.Group>
      </Form>,
    );
    expect(getByRole('radio')).not.toBeDisabled();
  });

  it('have static property for type detecting', () => {
    expect(Radio.__ANT_RADIO).toBeTruthy();
  });

  it('event bubble should not trigger twice', () => {
    const onClick = jest.fn();
    const onRootClick = jest.fn();

    const { container } = render(
      <div onClick={onRootClick}>
        <Radio onClick={onClick} />
      </div>,
    );

    // Click on label
    fireEvent.click(container.querySelector('label')!);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onRootClick).toHaveBeenCalledTimes(1);
    act(() => {
      jest.runAllTimers();
    });

    // Click on input
    fireEvent.click(container.querySelector('input')!);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onRootClick).toHaveBeenCalledTimes(2);
    act(() => {
      jest.runAllTimers();
    });

    // Click on input again
    fireEvent.click(container.querySelector('input')!);
    expect(onClick).toHaveBeenCalledTimes(3);
    expect(onRootClick).toHaveBeenCalledTimes(3);
  });
  it('should support custom styles for Card.Meta', () => {
    const customClassNames = {
      root: 'custom-root',
      input: 'custom-input',
      label: 'custom-label',
    };

    const customStyles = {
      root: { backgroundColor: 'red' },
      input: { backgroundColor: 'black' },
      label: { backgroundColor: 'gray' },
    };
    const { container } = render(
      <Radio classNames={customClassNames} styles={customStyles}>
        Test
      </Radio>,
    );

    const rootElement = container.querySelector('.ant-radio-wrapper') as HTMLElement;
    const inputElement = container.querySelector('.ant-radio') as HTMLElement;
    const labelElement = container.querySelector('.ant-radio-label') as HTMLElement;

    expect(rootElement.classList).toContain('custom-root');
    expect(inputElement.classList).toContain('custom-input');
    expect(labelElement.classList).toContain('custom-label');

    expect(rootElement.style.backgroundColor).toBe('red');
    expect(inputElement.style.backgroundColor).toBe('black');
    expect(labelElement.style.backgroundColor).toBe('gray');
  });
});
