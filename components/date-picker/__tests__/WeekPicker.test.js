import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';

const { WeekPicker } = DatePicker;

describe('WeekPicker', () => {
  focusTest(WeekPicker);

  it('should support style prop', () => {
    const wrapper = mount(
      <WeekPicker style={{ width: 400 }} />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
