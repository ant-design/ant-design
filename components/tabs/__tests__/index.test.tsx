import React from 'react';

import Tabs from '..';
import type { TabsRef } from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

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
      'Warning: [antd: Tabs] `Tabs.TabPane` is deprecated. Please use `items` instead.',
    );
    errorSpy.mockRestore();
  });

  it('indicator in ConfigProvider should work', () => {
    const { container } = render(
      <ConfigProvider tabs={{ indicator: { size: 12 } }}>
        <Tabs items={[{ key: '1', label: 'foo' }]} className="Tabs_1" />
        <Tabs items={[{ key: '2', label: 'bar' }]} className="Tabs_2" />
        <Tabs items={[{ key: '3', label: 'too' }]} indicator={{ size: 4 }} className="Tabs_3" />
      </ConfigProvider>,
    );

    expect(container.querySelector('.Tabs_1 .ant-tabs-ink-bar')).toHaveStyle({ width: 12 });
    expect(container.querySelector('.Tabs_2 .ant-tabs-ink-bar')).toHaveStyle({ width: 12 });
    expect(container.querySelector('.Tabs_3 .ant-tabs-ink-bar')).toHaveStyle({ width: 4 });
  });

  it('warning for indicatorSize', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Tabs indicatorSize={10} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Tabs] `indicatorSize` has been deprecated. Please use `indicator={{ size: ... }}` instead.',
    );
    errorSpy.mockRestore();
  });
  it('support classnames and styles', () => {
    const customClassnames = {
      root: 'test-class',
      item: 'test-item',
      indicator: 'test-indicator',
      header: 'test-header',
      content: 'test-content',
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'rgb(0, 0, 255)' },
      indicator: { color: 'rgb(255, 255, 0)' },
      header: { color: 'rgb(0, 255, 0)' },
      content: { color: 'rgb(128, 0, 128)' },
    };
    const { container } = render(
      <Tabs
        defaultActiveKey="1"
        styles={customStyles}
        classNames={customClassnames}
        items={Array.from({ length: 30 }, (_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />,
    );
    const root = container.querySelector('.ant-tabs');
    const item = container.querySelector('.ant-tabs-tab');
    const indicator = container.querySelector('.ant-tabs-ink-bar');
    const header = container.querySelector('.ant-tabs-nav');
    const content = container.querySelector('.ant-tabs-tabpane');
    expect(root).toHaveClass(customClassnames.root);
    expect(item).toHaveClass(customClassnames.item);
    expect(indicator).toHaveClass(customClassnames.indicator);
    expect(header).toHaveClass(customClassnames.header);
    expect(content).toHaveClass(customClassnames.content);
    expect(root).toHaveStyle({ color: customStyles.root.color });
    expect(item).toHaveStyle({ color: customStyles.item.color });
    expect(indicator).toHaveStyle({ color: customStyles.indicator.color });
    expect(header).toHaveStyle({ color: customStyles.header.color });
    expect(content).toHaveStyle({ color: customStyles.content.color });
  });
  describe('Tabs placement transformation', () => {
    let consoleErrorSpy: jest.SpyInstance;

    beforeAll(() => {
      consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleErrorSpy.mockClear();
    });

    afterAll(() => {
      consoleErrorSpy.mockRestore();
    });

    const renderTabs = (props: any = {}, direction: 'ltr' | 'rtl' = 'ltr') => {
      return render(
        <ConfigProvider direction={direction}>
          <Tabs {...props} items={[{ label: 'Tab 1', key: '1', children: 'Content 1' }]} />
        </ConfigProvider>,
      );
    };

    it.each([
      // [description, props, direction, expectedClass, shouldWarn]
      ['LTR: start -> left', { tabPlacement: 'start' }, 'ltr', '.ant-tabs-left', false],
      ['LTR: end -> right', { tabPlacement: 'end' }, 'ltr', '.ant-tabs-right', false],
      ['RTL: start -> right', { tabPlacement: 'start' }, 'rtl', '.ant-tabs-right', false],
      ['RTL: end -> left', { tabPlacement: 'end' }, 'rtl', '.ant-tabs-left', false],
      ['legacy left (with warning)', { tabPosition: 'left' }, 'ltr', '.ant-tabs-left', true],
      ['legacy right (with warning)', { tabPosition: 'right' }, 'ltr', '.ant-tabs-right', true],
      [
        'placement priority',
        { tabPlacement: 'end', tabPosition: 'left' },
        'rtl',
        '.ant-tabs-left',
        true,
      ],
      ['no placement', {}, 'ltr', '.ant-tabs-top', false],
    ])('%s', (_, props, direction, expectedClass, shouldWarn) => {
      const { container } = renderTabs(props, direction as 'ltr' | 'rtl');
      expect(container.querySelector(expectedClass)).toBeTruthy();

      if (shouldWarn) {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining('`tabPosition` is deprecated'),
        );
      } else {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      }
    });
  });

  it('should support ref', () => {
    const tabsRef = React.createRef<TabsRef>();
    const { unmount } = render(<Tabs ref={tabsRef} />);
    expect(tabsRef.current).toBeTruthy();
    expect(tabsRef.current?.nativeElement).toBeInstanceOf(HTMLElement);
    unmount();
    expect(tabsRef.current).toBeNull();
  });
});
