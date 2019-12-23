import React from 'react';
import { mount } from 'enzyme';
import Space from '..';
import mountTest from '../../../tests/shared/mountTest';

describe('Space', () => {
  mountTest(Space);
  mountTest(() => <Space size="small" />);
  mountTest(() => <Space size="large" />);
  mountTest(() => <Space size={5} />);

  it('render Space correctly', () => {
    const wrapper = mount(<Space />);
    const wrapper1 = mount(<Space size="default" />);
    const wrapper2 = mount(<Space size="large" />);
    const wrapper3 = mount(<Space size="small" />);
    const wrapper4 = mount(<Space size={7} />);

    expect(getComputedStyle(wrapper.find('span').getDOMNode())).toHaveProperty('width', '16px');
    expect(getComputedStyle(wrapper1.find('span').getDOMNode())).toHaveProperty('width', '16px');
    expect(getComputedStyle(wrapper2.find('span').getDOMNode())).toHaveProperty('width', '24px');
    expect(getComputedStyle(wrapper3.find('span').getDOMNode())).toHaveProperty('width', '8px');
    expect(getComputedStyle(wrapper4.find('span').getDOMNode())).toHaveProperty('width', '7px');

    expect(wrapper).toMatchSnapshot();
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
    expect(wrapper3).toMatchSnapshot();
    expect(wrapper4).toMatchSnapshot();
  });
});
