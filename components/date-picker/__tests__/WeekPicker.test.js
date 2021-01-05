import React from 'react';
import { mount } from 'enzyme';
import { setMockDate, resetMockDate } from '../../../tests/utils';
import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';

const { WeekPicker } = DatePicker;

describe('WeekPicker', () => {
  beforeEach(() => {
    setMockDate();
  });

  afterEach(() => {
    resetMockDate();
  });

  focusTest(WeekPicker, { refFocus: true });

  it('should support style prop', () => {
    const wrapper = mount(<WeekPicker style={{ width: 400 }} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
