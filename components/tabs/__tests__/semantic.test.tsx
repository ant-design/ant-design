import React from 'react';

import Tabs from '..';
import type { TabsProps } from '..';
import { fireEvent, render, triggerResize, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';

describe('Tabs.Semantic', () => {
  it('support classnames and styles', () => {
    const customClassnames = {
      root: 'test-class',
      item: 'test-item',
      remove: 'test-remove',
      indicator: 'test-indicator',
      header: 'test-header',
      body: 'test-body',
      content: 'test-content',
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'rgb(0, 0, 255)' },
      remove: { color: 'rgb(255, 0, 255)' },
      indicator: { color: 'rgb(255, 255, 0)' },
      header: { color: 'rgb(0, 255, 0)' },
      body: { color: 'rgb(0, 128, 128)' },
      content: { color: 'rgb(128, 0, 128)' },
    };
    const { container } = render(
      <Tabs
        defaultActiveKey="1"
        type="editable-card"
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
    const remove = container.querySelector('.ant-tabs-tab-remove');
    const indicator = container.querySelector('.ant-tabs-ink-bar');
    const header = container.querySelector('.ant-tabs-nav');
    const body = container.querySelector('.ant-tabs-body');
    const content = container.querySelector('.ant-tabs-content');
    expect(root).toHaveClass(customClassnames.root);
    expect(item).toHaveClass(customClassnames.item);
    expect(remove).toHaveClass(customClassnames.remove);
    expect(indicator).toHaveClass(customClassnames.indicator);
    expect(header).toHaveClass(customClassnames.header);
    expect(body).toHaveClass(customClassnames.body);
    expect(content).toHaveClass(customClassnames.content);
    expect(root).toHaveStyle({ color: customStyles.root.color });
    expect(item).toHaveStyle({ color: customStyles.item.color });
    expect(remove).toHaveStyle({ color: customStyles.remove.color });
    expect(indicator).toHaveStyle({ color: customStyles.indicator.color });
    expect(header).toHaveStyle({ color: customStyles.header.color });
    expect(body).toHaveStyle({ color: customStyles.body.color });
    expect(content).toHaveStyle({ color: customStyles.content.color });
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
  it('support popup classNames and styles', async () => {
    // The more dropdown only mounts when the tabs overflow, so fake the layout
    // Longest first: `ant-tabs-nav` is a prefix of the other two
    const sizes: Record<string, number> = {
      'ant-tabs-nav-operations': 40,
      'ant-tabs-nav-list': 2000,
      'ant-tabs-nav': 200,
    };
    const descriptors = (['offsetWidth', 'offsetHeight', 'offsetLeft'] as const).map(
      (name) => [name, Object.getOwnPropertyDescriptor(HTMLElement.prototype, name)] as const,
    );
    const define = (name: string, get: (ele: HTMLElement) => number) => {
      Object.defineProperty(HTMLElement.prototype, name, {
        configurable: true,
        get() {
          return get(this);
        },
      });
    };
    define('offsetWidth', (ele) => {
      if (ele.getAttribute('data-node-key')) {
        return 100;
      }
      const matched = Object.keys(sizes).find((cls) => ele.className.includes(cls));
      return matched ? sizes[matched] : 0;
    });
    define('offsetHeight', () => 20);
    define('offsetLeft', (ele) => Number(ele.getAttribute('data-node-key') ?? 0) * 100);

    jest.useFakeTimers();
    try {
      const { container } = render(
        <Tabs
          defaultActiveKey="0"
          classNames={{ popup: { root: 'test-popup' } }}
          styles={{ popup: { root: { color: 'rgb(255, 0, 0)' } } }}
          items={Array.from({ length: 20 }, (_, i) => ({
            key: String(i),
            label: `Tab-${i}`,
            children: `Content of tab ${i}`,
          }))}
        />,
      );
      triggerResize(container.querySelector('.ant-tabs-nav') as HTMLElement);
      await waitFakeTimer();
      fireEvent.mouseEnter(container.querySelector('.ant-tabs-nav-more') as HTMLElement);
      await waitFakeTimer();

      const popup = document.body.querySelector('.ant-tabs-dropdown');
      expect(popup).toHaveClass('test-popup');
      expect(popup).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    } finally {
      jest.useRealTimers();
      descriptors.forEach(([name, descriptor]) => {
        if (descriptor) {
          Object.defineProperty(HTMLElement.prototype, name, descriptor);
        }
      });
    }
  });

  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        tabs={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={[{ key: '1', label: 'Tab 1', children: 'Content' }]}
          styles={semanticRootStylePriority.styles}
          style={semanticRootStylePriority.style}
        />
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-tabs'));
  });
});
