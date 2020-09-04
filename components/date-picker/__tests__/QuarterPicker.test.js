import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '..';
import { resetWarned } from '../../_util/devWarning';

const { QuarterPicker } = DatePicker;

describe('QuarterPicker', () => {
  it('should support style prop', () => {
    resetWarned();
    const warnSpy = jest.spyOn(console, 'error');

    const wrapper = mount(<QuarterPicker style={{ width: 400 }} />);
    expect(wrapper.render()).toMatchSnapshot();

    expect(warnSpy).toHaveBeenCalledWith(
      "Warning: [antd: QuarterPicker] DatePicker.QuarterPicker is legacy usage. Please use DatePicker[picker='quarter'] directly.",
    );

    warnSpy.mockRestore();
  });
});
