import React from 'react';

import Listy from '..';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

interface User {
  id: number;
  name: string;
  group: string;
}

const users: User[] = [
  { id: 0, name: 'Olivia', group: 'Design' },
  { id: 1, name: 'Liam', group: 'Design' },
  { id: 2, name: 'Emma', group: 'Engineering' },
  { id: 3, name: 'Noah', group: 'Engineering' },
];

const renderListy = (props = {}) => (
  <Listy<User, string>
    height={200}
    items={users}
    rowKey="id"
    group={{ key: (user) => user.group, title: (group) => group }}
    itemRender={(user) => user.name}
    {...props}
  />
);

describe('Listy.Semantic', () => {
  it('should apply classNames and styles to each semantic node', () => {
    const { container } = render(
      renderListy({
        classNames: { root: 'custom-root', item: 'custom-item', groupHeader: 'custom-header' },
        styles: {
          root: { backgroundColor: 'rgb(255, 0, 0)' },
          item: { color: 'rgb(0, 128, 0)' },
          groupHeader: { color: 'rgb(0, 0, 255)' },
        },
      }),
    );

    const root = container.querySelector<HTMLElement>('.ant-listy');
    expect(root).toHaveClass('custom-root');
    expect(root).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });

    const items = container.querySelectorAll<HTMLElement>('.ant-listy-item');
    expect(items.length).toBeGreaterThan(0);
    items.forEach((item) => {
      expect(item).toHaveClass('custom-item');
      expect(item).toHaveStyle({ color: 'rgb(0, 128, 0)' });
    });

    const header = container.querySelector<HTMLElement>('.ant-listy-group-header');
    expect(header).toHaveClass('custom-header');
    expect(header).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('should merge ConfigProvider listy config with component props', () => {
    const { container } = render(
      <ConfigProvider
        listy={{
          className: 'context-root',
          classNames: { item: 'context-item' },
          styles: { item: { padding: '2px', color: 'rgb(1, 2, 3)' } },
        }}
      >
        {renderListy({
          classNames: { item: 'own-item' },
          styles: { item: { color: 'rgb(4, 5, 6)' } },
        })}
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-listy')).toHaveClass('context-root');

    const item = container.querySelector<HTMLElement>('.ant-listy-item');
    expect(item).toHaveClass('context-item');
    expect(item).toHaveClass('own-item');
    expect(item).toHaveStyle({ color: 'rgb(4, 5, 6)', padding: '2px' });
  });

  it('should support function form classNames and styles', () => {
    const { container } = render(
      <ConfigProvider
        listy={{
          classNames: ({ props }) => ({ item: props.sticky ? 'context-sticky' : 'context-fn' }),
        }}
      >
        <Listy<User, string>
          height={200}
          items={users}
          rowKey="id"
          itemRender={(user) => user.name}
          classNames={({ props }) => ({ item: props.height === 200 ? 'own-fn' : 'own-other' })}
          styles={() => ({ item: { color: 'rgb(7, 8, 9)' } })}
        />
      </ConfigProvider>,
    );

    const item = container.querySelector<HTMLElement>('.ant-listy-item');
    expect(item).toHaveClass('context-fn');
    expect(item).toHaveClass('own-fn');
    expect(item).toHaveStyle({ color: 'rgb(7, 8, 9)' });
  });

  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        listy={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        {renderListy({
          styles: semanticRootStylePriority.styles,
          style: semanticRootStylePriority.style,
        })}
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-listy'));
  });

  it('should pass ConfigProvider direction down to rc-listy', () => {
    const { container } = render(<ConfigProvider direction="rtl">{renderListy()}</ConfigProvider>);

    const root = container.querySelector<HTMLElement>('.ant-listy');
    expect(root).toHaveClass('ant-listy-rtl');
    expect(root).toHaveAttribute('dir', 'rtl');
  });
});
