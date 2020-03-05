import React from 'react';
import { render, mount } from 'enzyme';
import Slider from '..';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import focusTest from '../../../tests/shared/focusTest';
import { sleep } from '../../../tests/utils';

describe('Slider', () => {
  mountTest(Slider);
  rtlTest(Slider);
  focusTest(Slider);

  it('should show tooltip when hovering slider handler', () => {
    const wrapper = mount(<Slider defaultValue={30} />);
    wrapper
      .find('.ant-slider-handle')
      .at(0)
      .simulate('mouseEnter');
    expect(
      render(
        wrapper
          .find('Trigger')
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
    wrapper
      .find('.ant-slider-handle')
      .at(0)
      .simulate('mouseLeave');
    expect(
      render(
        wrapper
          .find('Trigger')
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
  });

  it('when tooltipVisible is true, tooltip should show always, or should never show', () => {
    let wrapper = mount(<Slider defaultValue={30} tooltipVisible />);
    expect(
      wrapper
        .find('.ant-tooltip-content')
        .at(0)
        .hasClass('ant-tooltip-hidden'),
    ).toBe(false);
    wrapper
      .find('.ant-slider-handle')
      .at(0)
      .simulate('mouseEnter');
    expect(
      wrapper
        .find('.ant-tooltip-content')
        .at(0)
        .hasClass('ant-tooltip-hidden'),
    ).toBe(false);
    wrapper
      .find('.ant-slider-handle')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('.ant-tooltip-content')
        .at(0)
        .hasClass('ant-tooltip-hidden'),
    ).toBe(false);
    wrapper = mount(<Slider defaultValue={30} tooltipVisible={false} />);
    expect(wrapper.find('.ant-tooltip-content').length).toBe(0);
  });

  it('should render in RTL direction', () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Slider defaultValue={30} tooltipVisible />
      </ConfigProvider>,
    );
    expect(render(wrapper)).toMatchSnapshot();
  });

  it('should keepAlign by calling forcePopupAlign', async () => {
    const wrapper = mount(<Slider defaultValue={30} tooltipVisible />);
    wrapper.find('Tooltip').instance().tooltip.forcePopupAlign = jest.fn();
    await sleep(0);
    expect(wrapper.find('Tooltip').instance().tooltip.forcePopupAlign).toHaveBeenCalled();
  });
});
