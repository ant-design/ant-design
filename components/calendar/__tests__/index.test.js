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
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-01')} />
    );
    wrapper.find('[title="February 1, 2018"]').at(0).simulate('click');
    wrapper.find('[title="February 2, 2018"]').at(0).simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });

  it('Calendar should change mode by prop', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const wrapper = mount(
      <Calendar />
    );
    expect(wrapper.state().mode).toEqual(monthMode);
    wrapper.setProps({ mode: 'year' });
    expect(wrapper.state().mode).toEqual(yearMode);
  });

  it('Calendar should switch mode', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const onPanelChangeStub = jest.fn();
    const wrapper = mount(
      <Calendar mode={yearMode} onPanelChange={onPanelChangeStub} />
    );
    expect(wrapper.state().mode).toEqual(yearMode);
    wrapper.instance().setType('date');
    expect(wrapper.state().mode).toEqual(monthMode);
    expect(onPanelChangeStub).toHaveBeenCalledTimes(1);
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
