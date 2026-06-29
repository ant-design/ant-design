import React from 'react';

import DatePicker from '..';
import { resetWarned } from '../../_util/warning';
import { render } from '../../../tests/utils';

const { QuarterPicker } = DatePicker;

describe('QuarterPicker', () => {
  it('should support style prop', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<QuarterPicker style={{ width: 400 }} />);
    expect(container.firstChild).toMatchSnapshot();

    expect(warnSpy).toHaveBeenCalledWith(
      "Warning: [antd: QuarterPicker] DatePicker.QuarterPicker is legacy usage. Please use DatePicker[picker='quarter'] directly.",
    );

    warnSpy.mockRestore();
  });
});
