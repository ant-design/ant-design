import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import TimePicker from '..';
import { resetWarned } from '../../_util/warning';
import { fireEvent, render } from '../../../tests/utils';

dayjs.extend(customParseFormat);

describe('TimePicker.Legacy', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    resetWarned();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('compatible onSelect', () => {
    const onSelect = jest.fn();
    render(<TimePicker onSelect={onSelect} open />);

    fireEvent.click(document.querySelectorAll('.ant-picker-time-panel-cell-inner')[0]);
    expect(onSelect).toHaveBeenCalledWith(233);
  });
});
