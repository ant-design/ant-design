import React from 'react';
import { render, mount } from 'enzyme';
import Space from '..';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';

describe('Space', () => {
  mountTest(Space);

  it('should render width empty children', () => {
    const wrapper = mount(<Space />);

    expect(wrapper.instance()).toBe(null);
  });

  it('should render width ConfigProvider', () => {
    const wrapper = mount(
      <ConfigProvider space={{ size: 'large' }}>
        <Space>
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="middle">
          <span>1</span>
          <span>2</span>
        </Space>
        <Space size="large">
          <span>1</span>
          <span>2</span>
        </Space>
      </ConfigProvider>,
    );

    expect(render(wrapper)).toMatchSnapshot();
  });

  it('should render width customize size', () => {
    const wrapper = mount(
      <Space size={10}>
        <span>1</span>
        <span>2</span>
      </Space>,
    );

    expect(wrapper.find('.ant-space-item').at(0).prop('style').marginRight).toBe(10);
    expect(wrapper.find('.ant-space-item').at(1).prop('style').marginRight).toBeUndefined();
  });

  it('should render vertical space width customize size', () => {
    const wrapper = mount(
      <Space size={10} direction="vertical">
        <span>1</span>
        <span>2</span>
      </Space>,
    );

    expect(wrapper.find('.ant-space-item').at(0).prop('style').marginBottom).toBe(10);
    expect(wrapper.find('.ant-space-item').at(1).prop('style').marginBottom).toBeUndefined();
  });

  it('should render correct with children', () => {
    const wrapper = mount(
      <Space>
        text1<span>text1</span>
        <>text3</>
      </Space>,
    );

    expect(render(wrapper)).toMatchSnapshot();
  });

  it('should render with invalidElement', () => {
    const wrapper = mount(
      <Space>
        text1<span>text1</span>
        text1
      </Space>,
    );

    expect(wrapper.find('.ant-space-item').length).toBe(3);
  });
});
