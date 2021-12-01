import React from 'react';
import { mount, render } from 'enzyme';
import Tabs from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

const { TabPane } = Tabs;

describe('Tabs', () => {
  mountTest(() => (
    <Tabs>
      <TabPane tab="xx" key="xx" />
    </Tabs>
  ));
  rtlTest(() => (
    <Tabs>
      <TabPane tab="xx" key="xx" />
    </Tabs>
  ));

  describe('editable-card', () => {
    let handleEdit;
    let wrapper;

    beforeEach(() => {
      handleEdit = jest.fn();
      wrapper = mount(
        <Tabs type="editable-card" onEdit={handleEdit}>
          <TabPane tab="foo" key="1">
            foo
          </TabPane>
          {undefined}
          {null}
          {false}
        </Tabs>,
      );
    });

    it('add card', () => {
      wrapper.find('.ant-tabs-nav-add').first().simulate('click');
      expect(handleEdit.mock.calls[0][1]).toBe('add');
    });

    it('remove card', () => {
      wrapper.find('.anticon-close').simulate('click');
      expect(handleEdit).toHaveBeenCalledWith('1', 'remove');
    });

    it('validateElement', () => {
      expect(wrapper.find('.ant-tabs-tab').length).toBe(1);
    });
  });

  describe('tabPosition', () => {
    it('remove card', () => {
      const wrapper = render(
        <Tabs tabPosition="left" tabBarExtraContent="xxx">
          <TabPane tab="foo" key="1">
            foo
          </TabPane>
        </Tabs>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('renderTabBar', () => {
    it('custom-tab-bar', () => {
      const wrapper = render(
        <Tabs renderTabBar={() => <div>custom-tab-bar</div>}>
          <TabPane tab="foo" key="1">
            foo
          </TabPane>
        </Tabs>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('warning for onNextClick', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Tabs onNextClick={() => {}} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tabs] `onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.',
    );
    errorSpy.mockRestore();
  });

  it('tabBarGutter should work', () => {
    const wrapper = mount(<Tabs tabBarGutter={0}><TabPane /><TabPane /><TabPane /></Tabs>);
    expect(wrapper).toMatchRenderedSnapshot();
    const wrapper2 = mount(<Tabs tabBarGutter={0} tabPosition="left"><TabPane /><TabPane /><TabPane /></Tabs>);
    expect(wrapper2).toMatchRenderedSnapshot();
  });
});
