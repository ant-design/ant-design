import React from 'react';

import Tabs from '..';
import type { TabsProps } from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

const { TabPane } = Tabs;

describe('Tabs.Semantic', () => {
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
    expect(root).toHaveClass('test-class');
    expect(item).toHaveClass('test-item');
    expect(indicator).toHaveClass('test-indicator');
    expect(header).toHaveClass('test-header');
    expect(content).toHaveClass('test-content');
    expect(root).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(item).toHaveStyle({ color: 'rgb(0, 0, 255)' });
    expect(indicator).toHaveStyle({ color: 'rgb(255, 255, 0)' });
    expect(header).toHaveStyle({ color: 'rgb(0, 255, 0)' });
    expect(content).toHaveStyle({ color: 'rgb(128, 0, 128)' });
  });

  it('support function classNames and styles', () => {
    const classNamesFn: TabsProps['classNames'] = (info) => {
      if (info.props.type === 'card') {
        return { root: 'custom-card-root' };
      }
      return { root: 'custom-line-root' };
    };

    const stylesFn: TabsProps['styles'] = (info) => {
      if (info.props.centered) {
        return { root: { backgroundColor: 'rgb(255, 0, 0)' } };
      }
      return { root: { backgroundColor: 'rgb(0, 255, 0)' } };
    };

    const { container } = render(
      <Tabs
        defaultActiveKey="1"
        type="card"
        centered
        classNames={classNamesFn}
        styles={stylesFn}
        items={[
          { key: '1', label: 'Tab 1', children: 'Content 1' },
          { key: '2', label: 'Tab 2', children: 'Content 2' },
        ]}
      />,
    );

    const root = container.querySelector('.ant-tabs');
    expect(root).toHaveClass('custom-card-root');
    expect(root).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });
});
