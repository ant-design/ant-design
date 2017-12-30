import React from 'react';
import Moment from 'moment';
import { mount } from 'enzyme';
import Calendar from '..';

describe('Calendar', () => {
  it('Calendar should be selectable', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <Calendar onSelect={onSelect} />
    );
    wrapper.find('.ant-fullcalendar-cell').at(0).simulate('click');
    expect(onSelect).toBeCalledWith(expect.anything());
    const value = onSelect.mock.calls[0][0];
    expect(Moment.isMoment(value)).toBe(true);
  });
});
