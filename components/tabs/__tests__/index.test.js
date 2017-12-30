import React from 'react';
import { mount } from 'enzyme';
import Tabs from '..';

const { TabPane } = Tabs;

describe('Tabs', () => {
  describe('editable-card', () => {
    let handleEdit;
    let wrapper;

    beforeEach(() => {
      handleEdit = jest.fn();
      wrapper = mount(
        <Tabs type="editable-card" onEdit={handleEdit}>
          <TabPane tab="foo" key="1">foo</TabPane>
        </Tabs>
      );
    });

    it('add card', () => {
      wrapper.find('.ant-tabs-new-tab').hostNodes().simulate('click');
      expect(handleEdit.mock.calls[0][1]).toBe('add');
    });

    it('remove card', () => {
      wrapper.find('.anticon-close').simulate('click');
      expect(handleEdit).toBeCalledWith('1', 'remove');
    });
  });

  describe('tabPosition', () => {
    it('remove card', () => {
      const wrapper = mount(
        <Tabs tabPosition="left" tabBarExtraContent="xxx">
          <TabPane tab="foo" key="1">foo</TabPane>
        </Tabs>
      );
      expect(wrapper).toMatchSnapshot();
    });
  });
});
