import React from 'react';

import TreeSelect from '..';
import { render } from '../../../tests/utils';

describe('TreeSelect.Semantic', () => {
  it('support classNames and styles as functions', () => {
    const treeData = [
      {
        value: 'parent 1',
        title: 'parent 1',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
        ],
      },
    ];

    const { container } = render(
      <TreeSelect
        treeData={treeData}
        placeholder="Please select"
        disabled={false}
        size="middle"
        classNames={(info) => ({
          root: info.props.disabled ? 'disabled-tree-select-root' : 'enabled-tree-select-root',
          input: `dynamic-input-${info.props.size}`,
          suffix: 'dynamic-suffix',
          popup: {
            root: 'dynamic-popup-root',
            item: info.props.disabled ? 'disabled-item' : 'enabled-item',
            itemTitle: 'dynamic-item-title',
          },
        })}
        styles={(info) => ({
          root: {
            opacity: info.props.disabled ? 0.5 : 1,
            backgroundColor: info.props.disabled ? 'gray' : 'white',
          },
          input: { fontSize: '14px' },
          suffix: { color: 'blue' },
          popup: {
            root: { zIndex: 1000 },
            item: { padding: '6px' },
            itemTitle: { color: 'black' },
          },
        })}
      />,
    );

    const treeSelectElement = container.querySelector('.ant-select');
    expect(treeSelectElement).toHaveClass('enabled-tree-select-root');
    expect(treeSelectElement).toHaveAttribute('style');
    const style = treeSelectElement?.getAttribute('style');
    expect(style).toContain('opacity: 1');
    expect(style).toContain('background-color: white');
  });
});
