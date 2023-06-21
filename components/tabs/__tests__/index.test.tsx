import React from 'react';
import Tabs from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';

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
    let handleEdit: jest.Mock;
    let wrapper: ReturnType<typeof render>['container'];

    beforeEach(() => {
      handleEdit = jest.fn();
      const { container } = render(
        <Tabs type="editable-card" onEdit={handleEdit}>
          <TabPane tab="foo" key="1">
            foo
          </TabPane>
          {undefined}
          {null}
          {false}
        </Tabs>,
      );
      wrapper = container;
    });

    it('add card', () => {
      fireEvent.click(wrapper.querySelector('.ant-tabs-nav-add')!);
      expect(handleEdit.mock.calls[0][1]).toBe('add');
    });

    it('remove card', () => {
      fireEvent.click(wrapper.querySelector('.anticon-close')!);
      expect(handleEdit).toHaveBeenCalledWith('1', 'remove');
    });

    it('validateElement', () => {
      expect(wrapper.querySelectorAll('.ant-tabs-tab').length).toBe(1);
    });
  });

  describe('tabPosition', () => {
    it('remove card', () => {
      const { container } = render(
        <Tabs tabPosition="left" tabBarExtraContent="xxx">
          <TabPane tab="foo" key="1">
            foo
          </TabPane>
        </Tabs>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('renderTabBar', () => {
    it('custom-tab-bar', () => {
      const { container } = render(
        <Tabs renderTabBar={() => <div>custom-tab-bar</div>}>
          <TabPane tab="foo" key="1">
            foo
          </TabPane>
        </Tabs>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('warning for onNextClick', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onNextClick = { onNextClick() {} } as any;
    render(<Tabs {...onNextClick} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tabs] `onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.',
    );
    errorSpy.mockRestore();
  });

  it('tabBarGutter should work', () => {
    const { container: wrapper } = render(
      <Tabs tabBarGutter={0}>
        <TabPane />
        <TabPane />
        <TabPane />
      </Tabs>,
    );
    expect(wrapper.firstChild).toMatchSnapshot();
    const { container: wrapper2 } = render(
      <Tabs tabBarGutter={0} tabPosition="left">
        <TabPane />
        <TabPane />
        <TabPane />
      </Tabs>,
    );
    expect(wrapper2.firstChild).toMatchSnapshot();
  });

  it('deprecated warning', () => {
    resetWarned();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(
      <Tabs>
        <TabPane />
        invalidate
      </Tabs>,
    );
    expect(container.querySelectorAll('.ant-tabs-tab')).toHaveLength(1);

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tabs] Tabs.TabPane is deprecated. Please use `items` directly.',
    );
    errorSpy.mockRestore();
  });
});
