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
  it('only Valid range should be selectable', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-02-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} />
    );
    wrapper.find('[title="February 1, 2018"]').at(0).simulate('click');
    wrapper.find('[title="February 2, 2018"]').at(0).simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });
});
