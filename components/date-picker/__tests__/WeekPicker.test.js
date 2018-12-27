import React from 'react';
import { mount, render } from 'enzyme';
import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';

const { WeekPicker } = DatePicker;

describe('WeekPicker', () => {
  focusTest(WeekPicker);

  it('should support style prop', () => {
    const wrapper = mount(<WeekPicker style={{ width: 400 }} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support dateRender', () => {
    const wrapper = mount(
      <WeekPicker open dateRender={current => <span>{current.format('YYYY-MM-DD')}</span>} />,
    );
    expect(
      render(
        wrapper
          .find('Trigger')
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
  });
});
