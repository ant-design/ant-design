import React from 'react';
import ConfigProvider from '..';
import Cascader from '../../cascader';
import DatePicker from '../../date-picker';
import Drawer from '../../drawer';
import Slider from '../../slider';
import { render, fireEvent } from '../../../tests/utils';

describe('ConfigProvider.GetPopupContainer', () => {
  it('Datepicker', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);
    render(
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <DatePicker open />
      </ConfigProvider>,
    );
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('Slider', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);
    const wrapper = render(
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <Slider />
      </ConfigProvider>,
    );
    fireEvent.mouseEnter(wrapper.container.querySelector('.ant-slider-handle')!);
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('Drawer', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);
    const Demo: React.FC<{ visible?: boolean }> = ({ visible }) => (
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <Drawer visible={visible} />
      </ConfigProvider>
    );
    render(<Demo visible />);
    expect(getPopupContainer).toHaveBeenCalled();
  });

  it('Cascader', () => {
    const getPopupContainer = jest.fn(node => node.parentNode);
    render(<Cascader getPopupContainer={getPopupContainer} open />);
    expect(getPopupContainer).toHaveBeenCalled();
  });
});
