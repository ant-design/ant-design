import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import DatePicker from '../../date-picker';
import Slider from '../../slider';
import Drawer from '../../drawer';

describe('ConfigProvider.GetPopupContainer', () => {
  it('Datepicker', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);
    mount(
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <DatePicker open />
      </ConfigProvider>,
    );
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('Slider', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);
    const wrapper = mount(
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <Slider />
      </ConfigProvider>,
    );
    wrapper.find('.ant-slider-handle').first().simulate('mouseenter');
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('drawer', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);
    const Demo = ({ visible }) => (
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <Drawer visible={visible} />
      </ConfigProvider>
    );
    mount(<Demo visible />);
    expect(getPopupContainer).toHaveBeenCalled();
  });
});
