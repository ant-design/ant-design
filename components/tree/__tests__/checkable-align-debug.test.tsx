import React from 'react';

import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Tree from '../index';
import type { DataNode } from '../index';

/** Relevant css vars on the tree root (when using component token overrides they should differ). */
function snapshotTreeCssVars(container: HTMLElement) {
  const root = container.querySelector<HTMLElement>('.ant-tree');
  if (!root) {
    return { error: 'missing .ant-tree' };
  }
  const cs = getComputedStyle(root);
  return {
    titleHeight: cs.getPropertyValue('--ant-tree-title-height').trim(),
    controlInteractiveSize: cs.getPropertyValue('--ant-control-interactive-size').trim(),
  };
}

/** Snapshot flex alignment helpers for every treenode that renders a checkbox. */
function snapshotCheckboxLayout(container: HTMLElement) {
  const rows = [...container.querySelectorAll('.ant-tree-treenode')].filter((el) =>
    el.querySelector('.ant-tree-checkbox'),
  );

  return rows.map((row, index) => {
    const checkbox = row.querySelector<HTMLElement>('.ant-tree-checkbox');
    if (!checkbox) {
      return { index, error: 'missing checkbox' };
    }
    const cs = getComputedStyle(checkbox);
    return {
      index,
      alignSelf: cs.alignSelf,
      marginBlockStart: cs.marginBlockStart,
      marginTop: cs.marginTop,
      flexShrink: cs.flexShrink,
    };
  });
}

function snapshotLayoutDebug(container: HTMLElement) {
  return {
    treeVars: snapshotTreeCssVars(container),
    checkboxRows: snapshotCheckboxLayout(container),
  };
}

describe('Tree checkable node align (debug)', () => {
  const singleLineTreeData: DataNode[] = [
    {
      title: 'Single-line parent',
      key: 'p',
      children: [{ title: 'Leaf A', key: 'p-a' }],
    },
  ];

  const multiLineTreeData: DataNode[] = [
    {
      title:
        'Parent with a deliberately long title so it wraps to several lines when the tree has a narrow width',
      key: 'p',
      children: [
        {
          title:
            'Child whose label is also long enough to verify multi-line rows under a wrapping parent',
          key: 'p-c',
        },
      ],
    },
  ];

  it('default token: single-line parent', () => {
    const { asFragment, container } = render(
      <Tree checkable defaultExpandAll treeData={singleLineTreeData} style={{ width: 480 }} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
    expect(snapshotLayoutDebug(container)).toMatchSnapshot();
  });

  it('default token: multi-line parent and child', () => {
    const { asFragment, container } = render(
      <Tree checkable defaultExpandAll treeData={multiLineTreeData} style={{ width: 200 }} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
    expect(snapshotLayoutDebug(container)).toMatchSnapshot();
  });

  it('custom component token titleHeight (larger row): margin offset scales', () => {
    const { asFragment, container } = render(
      <ConfigProvider
        theme={{
          components: {
            Tree: {
              titleHeight: 40,
            },
          },
        }}
      >
        <Tree checkable defaultExpandAll treeData={singleLineTreeData} style={{ width: 480 }} />
      </ConfigProvider>,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
    expect(snapshotLayoutDebug(container)).toMatchSnapshot();
  });

  it('custom component token titleHeight (tight row)', () => {
    const { asFragment, container } = render(
      <ConfigProvider
        theme={{
          components: {
            Tree: {
              titleHeight: 20,
            },
          },
        }}
      >
        <Tree checkable defaultExpandAll treeData={singleLineTreeData} style={{ width: 480 }} />
      </ConfigProvider>,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
    expect(snapshotLayoutDebug(container)).toMatchSnapshot();
  });

  it('RTL: checkbox still uses block-axis margin (not swapped with inline)', () => {
    const { asFragment, container } = render(
      <ConfigProvider direction="rtl">
        <Tree checkable defaultExpandAll treeData={singleLineTreeData} style={{ width: 480 }} />
      </ConfigProvider>,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
    expect(snapshotLayoutDebug(container)).toMatchSnapshot();
  });

  it('blockNode + checkable + wrapping parent (flex stretch on content)', () => {
    const { asFragment, container } = render(
      <Tree
        blockNode
        checkable
        defaultExpandAll
        treeData={multiLineTreeData}
        style={{ width: 200 }}
      />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();
    expect(snapshotLayoutDebug(container)).toMatchSnapshot();
  });
});
