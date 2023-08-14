import React from 'react';
import Radio, { Button, Group } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Form from '../../form';

import { fireEvent, render } from '../../../tests/utils';

describe('Radio', () => {
  focusTest(Radio, { refFocus: true });
  mountTest(Radio);
  mountTest(Group);
  mountTest(Button);

  rtlTest(Radio);
  rtlTest(Group);
  rtlTest(Button);

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
});
