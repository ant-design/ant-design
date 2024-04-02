import React from 'react';
import dayjs, { type Dayjs } from 'dayjs';
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
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: TimePicker] `onSelect` is deprecated. Please use `onCalendarChange` instead.',
    );

    fireEvent.click(document.querySelectorAll('.ant-picker-time-panel-cell-inner')[1]);
    expect(onSelect).toHaveBeenCalled();

    const passedDate: Dayjs = onSelect.mock.calls[0][0];
    expect(passedDate.format('HH:mm:ss')).toBe('01:00:00');
  });
});
