import React from 'react';
import { mount } from 'enzyme';
import Card from '../index';
import Button from '../../button/index';

describe('Card', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should still have padding when card which set padding to 0 is loading', () => {
    const wrapper = mount(
      <Card loading bodyStyle={{ padding: 0 }}>
        xxx
      </Card>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('title should be vertically aligned', () => {
    const wrapper = mount(
      <Card title="Card title" extra={<Button>Button</Button>} style={{ width: 300 }}>
        <p>Card content</p>
      </Card>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('warning', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Card noHovering>xxx</Card>);
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: [antd: Card] `noHovering` is deprecated, you can remove it safely or use `hoverable` instead.',
    );
    mount(<Card noHovering={false}>xxx</Card>);
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: [antd: Card] `noHovering={false}` is deprecated, use `hoverable` instead.',
    );
    warnSpy.mockRestore();
  });

  it('onTabChange should work', () => {
    const tabList = [
      {
        key: 'tab1',
        tab: 'tab1',
      },
      {
        key: 'tab2',
        tab: 'tab2',
      },
    ];
    const onTabChange = jest.fn();
    const wrapper = mount(
      <Card onTabChange={onTabChange} tabList={tabList}>
        xxx
      </Card>,
    );
    wrapper
      .find('.ant-tabs-tab')
      .at(1)
      .simulate('click');
    expect(onTabChange).toHaveBeenCalledWith('tab2');
  });

  it('getCompatibleHoverable should work', () => {
    const wrapper = mount(<Card noHovering={false}>xxx</Card>);
    expect(wrapper.find('.ant-card-hoverable').length).toBe(1);
  });

  it('should not render when actions is number', () => {
    const wrapper = mount(
      <Card title="Card title" actions={11}>
        <p>Card content</p>
      </Card>,
    );
    expect(wrapper.find('.ant-card-actions').length).toBe(0);
  });
});
