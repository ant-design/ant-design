import React from 'react';

import Tree from '..';
import type { TreeProps } from '..';
import { render } from '../../../tests/utils';

describe('Tree.Semantic', () => {
  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'leaf',
          key: '0-0-0',
        },
      ],
    },
  ];

  it('should support static classNames and styles', () => {
    const testClassNames: TreeProps['classNames'] = {
      root: 'custom-tree-root',
      item: 'custom-tree-item',
      itemIcon: 'custom-tree-item-icon',
      itemTitle: 'custom-tree-item-title',
    };

    const testStyles: TreeProps['styles'] = {
      root: { color: 'rgb(255, 0, 0)' },
      item: { color: 'blue' },
      itemIcon: { fontSize: '16px' },
      itemTitle: { fontWeight: 'bold' },
    };

    const { container } = render(
      <Tree
        treeData={treeData}
        defaultExpandAll
        showIcon
        classNames={testClassNames}
        styles={testStyles}
      />,
    );

    const root = container.querySelector('.ant-tree');
    expect(root).toHaveClass(testClassNames.root!);
    expect(root).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('should support function-based classNames and styles', () => {
    const testClassNames: TreeProps['classNames'] = ({ props }) => ({
      root: `dynamic-tree-root ${props.showIcon ? 'with-icon' : 'without-icon'}`,
      item: props.checkable ? 'checkable-item' : 'selectable-item',
      itemIcon: 'dynamic-icon',
      itemTitle: 'dynamic-title',
    });

    const testStyles: TreeProps['styles'] = ({ props }) => ({
      root: {
        backgroundColor: props.disabled ? 'rgb(245, 245, 245)' : 'rgb(255, 255, 255)',
        border: props.disabled ? '1px solid rgb(217, 217, 217)' : '1px solid rgb(64, 169, 255)',
      },
      item: {
        padding: props.showIcon ? '4px' : '2px',
      },
      itemIcon: {
        color: props.disabled ? 'rgb(191, 191, 191)' : 'rgb(82, 196, 26)',
      },
      itemTitle: {
        color: props.disabled ? 'rgb(191, 191, 191)' : 'rgb(24, 144, 255)',
      },
    });

    const { container, rerender } = render(
      <Tree
        treeData={treeData}
        defaultExpandAll
        showIcon
        checkable
        classNames={testClassNames}
        styles={testStyles}
      />,
    );

    let root = container.querySelector('.ant-tree');
    expect(root).toHaveClass('dynamic-tree-root', 'with-icon');
    expect(root).toHaveStyle({
      backgroundColor: 'rgb(255, 255, 255)',
      border: '1px solid rgb(64, 169, 255)',
    });

    // Test disabled state
    rerender(
      <Tree
        treeData={treeData}
        defaultExpandAll
        showIcon
        disabled
        classNames={testClassNames}
        styles={testStyles}
      />,
    );

    root = container.querySelector('.ant-tree');
    expect(root).toHaveStyle({
      backgroundColor: 'rgb(245, 245, 245)',
      border: '1px solid rgb(217, 217, 217)',
    });
  });
});
