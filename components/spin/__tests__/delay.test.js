import React from 'react';
import { mount } from 'enzyme';
import Spin from '..';

describe('delay spinning', () => {
  it("should render with delay when it's mounted with spinning=true and delay", () => {
    const wrapper = mount(<Spin spinning delay={500} />);
    expect(wrapper.find('.ant-spin').at(0).hasClass('ant-spin-spinning')).toEqual(false);
  });

  it('should render when delay is init set', async () => {
    const wrapper = mount(<Spin spinning delay={100} />);

    expect(wrapper.find('.ant-spin').at(0).hasClass('ant-spin-spinning')).toEqual(false);

    // use await not jest.runAllTimers()
    // because of https://github.com/facebook/jest/issues/3465
    await new Promise(resolve => setTimeout(resolve, 500));
    wrapper.update();

    expect(wrapper.find('.ant-spin').at(0).hasClass('ant-spin-spinning')).toEqual(true);
  });

  it('should cancel debounce function when unmount', async () => {
    const wrapper = mount(<Spin spinning delay={100} />);
    const spy = jest.spyOn(wrapper.instance().updateSpinning, 'cancel');
    expect(wrapper.instance().updateSpinning.cancel).toEqual(expect.any(Function));
    expect(spy).not.toHaveBeenCalled();
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
  });
});
