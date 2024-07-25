import React from 'react';
import { render } from '@testing-library/react';

import { resetWarned } from '../../_util/warning';
import { fireEvent } from '../../../tests/utils';
import ColorPicker from '../ColorPicker';

describe('ColorPicker.gradient', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  beforeEach(() => {
    resetWarned();
    jest.useFakeTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
    jest.useRealTimers();
  });

  it('switch', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <ColorPicker mode={['single', 'gradient']} defaultValue="#123456" open onChange={onChange} />,
    );

    // Switch to gradient
    fireEvent.click(container.querySelectorAll(`.ant-segmented-item-input`)[1]);

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      'linear-gradient(90deg, rgb(18,52,86) 0%, rgb(18,52,86) 100%)',
    );
  });
});
