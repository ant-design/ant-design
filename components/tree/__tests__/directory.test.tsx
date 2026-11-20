import React from 'react';
import type RcTree from '@rc-component/tree';
import debounce from 'lodash/debounce';

import type { TreeProps } from '..';
import Tree from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';

const { DirectoryTree, TreeNode } = Tree;

jest.mock('lodash/debounce');

describe('Directory Tree', () => {
  mountTest(Tree);
  mountTest(DirectoryTree);

  rtlTest(Tree);
  rtlTest(DirectoryTree);

  (debounce as any).mockImplementation((fn: () => void) => fn);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    (debounce as any).mockRestore();
  });

  function createTree(props?: TreeProps & React.RefAttributes<RcTree>) {
    return (
      <DirectoryTree {...props}>
        <TreeNode key="0-0">
          <TreeNode key="0-0-0" />
          <TreeNode key="0-0-1" />
        </TreeNode>
        <TreeNode key="0-1">
          <TreeNode key="0-1-0" />
          <TreeNode key="0-1-1" />
        </TreeNode>
      </DirectoryTree>
    );
  }

  describe('expand', () => {
    it('click', () => {
      const onExpand = jest.fn();
      const { container } = render(createTree({ onExpand }));

      fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper')!);
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith(['0-0'], expect.anything());
      onExpand.mockReset();

      act(() => {
        jest.runAllTimers();
      });
      fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper')!);
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith([], expect.anything());
    });

    it('double click', () => {
      const onExpand = jest.fn();
      const { container } = render(createTree({ expandAction: 'doubleClick', onExpand }));

      fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper')!);
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith(['0-0'], expect.anything());
      onExpand.mockReset();

      act(() => {
        jest.runAllTimers();
      });
      fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper')!);
      act(() => {
        jest.runAllTimers();
      });
      expect(onExpand).toHaveBeenCalledWith([], expect.anything());
    });

    describe('with state control', () => {
      const StateDirTree: React.FC<TreeProps> = (props) => {
        const [expandedKeys, setExpandedKeys] = React.useState<React.Key[]>([]);
        return (
          <DirectoryTree expandedKeys={expandedKeys} onExpand={setExpandedKeys} {...props}>
            <TreeNode key="0-0" title="parent">
              <TreeNode key="0-0-0" title="children" />
            </TreeNode>
          </DirectoryTree>
        );
      };

      it('click', async () => {
        const { container, asFragment } = render(<StateDirTree expandAction="click" />);

        fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper')!);
        await waitFakeTimer();
        expect(asFragment().firstChild).toMatchSnapshot();
      });
      it('doubleClick', async () => {
        const { container, asFragment } = render(<StateDirTree expandAction="doubleClick" />);

        fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper')!);
        await waitFakeTimer();
        expect(asFragment().firstChild).toMatchSnapshot();
      });
    });
  });

  it('defaultExpandAll', () => {
    const { asFragment } = render(createTree({ defaultExpandAll: true }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('select multi nodes when shift key down', () => {
    const treeData = [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ];
    const { container } = render(
      <DirectoryTree multiple defaultExpandAll={false} treeData={treeData} />,
    );
    expect(container.querySelectorAll('.ant-tree-node-content-wrapper').length).toBe(4);
    expect(container.querySelectorAll('.ant-tree-node-selected').length).toBe(0);
    const leaf0 = container.querySelectorAll('.ant-tree-node-content-wrapper')[0];
    const leaf1 = container.querySelectorAll('.ant-tree-node-content-wrapper')[1];
    const leaf2 = container.querySelectorAll('.ant-tree-node-content-wrapper')[2];
    const leaf3 = container.querySelectorAll('.ant-tree-node-content-wrapper')[3];
    fireEvent.click(leaf2);
    fireEvent.click(leaf0, { shiftKey: true });
    expect(leaf0).toHaveClass('ant-tree-node-selected');
    expect(leaf1).toHaveClass('ant-tree-node-selected');
    expect(leaf2).toHaveClass('ant-tree-node-selected');
    expect(leaf3).not.toHaveClass('ant-tree-node-selected');
  });

  it('starts a new range when the first selection uses Shift', () => {
    const onSelect = jest.fn();
    const treeData = ['A', 'B', 'C'].map((key) => ({ key, title: key }));
    const { getByText } = render(
      <DirectoryTree multiple treeData={treeData} onSelect={onSelect} />,
    );

    fireEvent.click(getByText('B'), { shiftKey: true });
    expect(onSelect).toHaveBeenLastCalledWith(
      ['B'],
      expect.objectContaining({ selectedNodes: [treeData[1]] }),
    );

    fireEvent.click(getByText('C'), { shiftKey: true });
    expect(onSelect).toHaveBeenLastCalledWith(
      ['B', 'C'],
      expect.objectContaining({ selectedNodes: treeData.slice(1) }),
    );
  });

  it.each([false, true])(
    'starts a new range after removing the anchor (controlled: %s)',
    (controlled) => {
      const onSelect = jest.fn();
      const treeData = ['A', 'B', 'C', 'D'].map((key) => ({ key, title: key }));
      const renderTree = (data: typeof treeData, selectedKeys: string[]) => (
        <DirectoryTree
          multiple
          treeData={data}
          selectedKeys={controlled ? selectedKeys : undefined}
          onSelect={onSelect}
        />
      );
      const { getByText, rerender } = render(renderTree(treeData, []));

      fireEvent.click(getByText('B'));
      rerender(renderTree(treeData, ['B']));
      const remainingData = treeData.filter(({ key }) => key !== 'B');
      rerender(renderTree(remainingData, []));
      fireEvent.click(getByText('C'), { shiftKey: true });

      expect(onSelect).toHaveBeenLastCalledWith(
        ['C'],
        expect.objectContaining({ selectedNodes: [treeData[2]] }),
      );

      rerender(renderTree(remainingData, ['C']));
      fireEvent.click(getByText('D'), { shiftKey: true });
      expect(onSelect).toHaveBeenLastCalledWith(
        ['C', 'D'],
        expect.objectContaining({ selectedNodes: treeData.slice(2) }),
      );
    },
  );

  it('starts a new range after collapsing the anchor parent', () => {
    const onSelect = jest.fn();
    const treeData = [
      { key: 'folder', title: 'Folder', children: [{ key: 'A', title: 'A' }] },
      { key: 'B', title: 'B' },
      { key: 'C', title: 'C' },
    ];
    const renderTree = (expandedKeys: string[]) => (
      <DirectoryTree
        multiple
        expandAction={false}
        treeData={treeData}
        expandedKeys={expandedKeys}
        onSelect={onSelect}
      />
    );
    const { getByText, rerender } = render(renderTree(['folder']));
    fireEvent.click(getByText('A'));
    rerender(renderTree([]));
    fireEvent.click(getByText('B'), { shiftKey: true });

    expect(onSelect).toHaveBeenLastCalledWith(
      ['B'],
      expect.objectContaining({ selectedNodes: [treeData[1]] }),
    );
  });

  it.each(['ctrlKey', 'metaKey'])(
    'does not restore removed cached selections after %s selection',
    (modifier) => {
      const onSelect = jest.fn();
      const treeData = ['A', 'B', 'C', 'D'].map((key) => ({ key, title: key }));
      const { getByText, rerender } = render(
        <DirectoryTree multiple treeData={treeData} onSelect={onSelect} />,
      );
      fireEvent.click(getByText('A'));
      fireEvent.click(getByText('B'), { [modifier]: true });
      rerender(<DirectoryTree multiple treeData={treeData.slice(1)} onSelect={onSelect} />);
      fireEvent.click(getByText('D'), { shiftKey: true });
      expect(onSelect).toHaveBeenLastCalledWith(
        ['B', 'C', 'D'],
        expect.objectContaining({ selectedNodes: treeData.slice(1) }),
      );

      fireEvent.click(getByText('C'), { shiftKey: true });
      expect(onSelect).toHaveBeenLastCalledWith(
        ['B', 'C'],
        expect.objectContaining({ selectedNodes: treeData.slice(1, 3) }),
      );
    },
  );

  it('resets a removed numeric anchor with custom fieldNames', () => {
    const onSelect = jest.fn();
    const treeData = [0, 1, 2].map((id) => ({ id, label: `File ${id}`, isLeaf: true }));
    const renderTree = (data: typeof treeData) => (
      <DirectoryTree
        multiple
        treeData={data}
        fieldNames={{ key: 'id', title: 'label' }}
        onSelect={onSelect}
      />
    );
    const { getByText, rerender } = render(renderTree(treeData));
    fireEvent.click(getByText('File 0'));
    rerender(renderTree(treeData.slice(1)));
    fireEvent.click(getByText('File 1'), { shiftKey: true });
    expect(onSelect).toHaveBeenLastCalledWith(
      [1],
      expect.objectContaining({ selectedNodes: [treeData[1]] }),
    );
    fireEvent.click(getByText('File 2'), { shiftKey: true });
    expect(onSelect).toHaveBeenLastCalledWith(
      [1, 2],
      expect.objectContaining({ selectedNodes: treeData.slice(1) }),
    );
  });

  it.each([false, true])('skip unselectable nodes in shift selection (reverse: %s)', (reverse) => {
    const onSelect = jest.fn();
    const treeData = [
      { title: 'A', key: 'a' },
      {
        title: 'B',
        key: 'b',
        selectable: false,
        children: [{ title: 'B child', key: 'b-child' }],
      },
      {
        title: 'D',
        key: 'd',
        disabled: true,
        children: [{ title: 'D child', key: 'd-child' }],
      },
      { title: 'C', key: 'c' },
    ];
    const { container, getByText } = render(
      <DirectoryTree
        multiple
        defaultExpandAll
        expandAction={false}
        treeData={treeData}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(getByText('B'));
    fireEvent.click(getByText('D'));
    expect(onSelect).not.toHaveBeenCalled();

    fireEvent.click(getByText(reverse ? 'C' : 'A'));
    fireEvent.click(getByText(reverse ? 'A' : 'C'), { shiftKey: true });

    expect(onSelect).toHaveBeenLastCalledWith(
      reverse ? ['c', 'a', 'b-child', 'd-child'] : ['a', 'b-child', 'd-child', 'c'],
      expect.objectContaining({
        selectedNodes: [
          treeData[0],
          treeData[1].children![0],
          treeData[2].children![0],
          treeData[3],
        ],
      }),
    );
    expect(
      Array.from(container.querySelectorAll('.ant-tree-node-selected .ant-tree-title')).map(
        (node) => node.textContent,
      ),
    ).toEqual(['A', 'B child', 'D child', 'C']);
  });

  it('select range when the first selected key is 0', () => {
    const onSelect = jest.fn();
    const treeData = [
      { title: 'Zero', key: 0 },
      { title: 'One', key: 1 },
      { title: 'Two', key: 2 },
    ];
    const { container } = render(
      <DirectoryTree multiple treeData={treeData} onSelect={onSelect} />,
    );
    const nodes = container.querySelectorAll('.ant-tree-node-content-wrapper');

    fireEvent.click(nodes[0]);
    fireEvent.click(nodes[2], { shiftKey: true });

    expect(container.querySelectorAll('.ant-tree-node-selected')).toHaveLength(3);
    expect(onSelect).toHaveBeenLastCalledWith(
      [0, 1, 2],
      expect.objectContaining({ selectedNodes: treeData }),
    );
  });

  it('selects a range of numeric keys with defaultExpandAll', () => {
    const onSelect = jest.fn();
    const treeData = [
      {
        key: 1,
        title: 'Folder',
        children: [
          { key: 2, title: 'File A' },
          { key: 3, title: 'File B' },
          { key: 4, title: 'File C' },
        ],
      },
    ];
    const { getByText, container } = render(
      <DirectoryTree
        multiple
        defaultExpandAll
        expandAction="doubleClick"
        treeData={treeData}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(getByText('File A'));
    fireEvent.click(getByText('File C'), { shiftKey: true });

    expect(container.querySelectorAll('.ant-tree-node-selected')).toHaveLength(3);
    expect(onSelect).toHaveBeenLastCalledWith(
      [2, 3, 4],
      expect.objectContaining({ selectedNodes: treeData[0].children }),
    );
  });

  it('DirectoryTree should expend all when use treeData and defaultExpandAll is true', () => {
    const treeData = [
      {
        key: '0-0-0',
        title: 'Folder',
        children: [
          {
            title: 'Folder2',
            key: '0-0-1',
            children: [
              {
                title: 'File',
                key: '0-0-2',
                isLeaf: true,
              },
            ],
          },
        ],
      },
    ];
    const { asFragment } = render(createTree({ defaultExpandAll: true, treeData }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('defaultExpandParent', () => {
    const { asFragment } = render(createTree({ defaultExpandParent: true }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('defaultExpandParent with false', () => {
    const { asFragment } = render(createTree({ defaultExpandParent: false }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('expandedKeys update', async () => {
    const { rerender, asFragment } = render(createTree());
    rerender(createTree({ expandedKeys: ['0-1'] }));
    await waitFakeTimer();
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('selectedKeys update', () => {
    const { rerender, asFragment } = render(createTree({ defaultExpandAll: true }));
    rerender(createTree({ selectedKeys: ['0-1-0'] }));
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('group select', () => {
    const onSelect = jest.fn();
    const { container, asFragment } = render(
      createTree({
        defaultExpandAll: true,
        expandAction: 'doubleClick',
        multiple: true,
        onSelect,
      }),
    );

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[0]);
    expect(onSelect.mock.calls[0][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[0][1].selectedNodes.length).toBe(1);

    // Click twice should keep selected
    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[0]);
    expect(onSelect.mock.calls[1][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[0][0]).toEqual(onSelect.mock.calls[1][0]);
    expect(onSelect.mock.calls[1][1].selectedNodes.length).toBe(1);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[1], {
      ctrlKey: true,
    });
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(onSelect.mock.calls[2][0].length).toBe(2);
    expect(onSelect.mock.calls[2][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[2][1].selectedNodes.length).toBe(2);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[4], {
      shiftKey: true,
    });
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(onSelect.mock.calls[3][0].length).toBe(5);
    expect(onSelect.mock.calls[3][1].selected).toBeTruthy();
    expect(onSelect.mock.calls[3][1].selectedNodes.length).toBe(5);
  });

  it('onDoubleClick', () => {
    const onDoubleClick = jest.fn();
    const { container } = render(createTree({ onDoubleClick }));
    fireEvent.doubleClick(container.querySelector('.ant-tree-node-content-wrapper')!);
    expect(onDoubleClick).toHaveBeenCalled();
  });

  it('should not expand tree now when pressing ctrl', () => {
    const onExpand = jest.fn();
    const onSelect = jest.fn();
    const { container } = render(createTree({ onExpand, onSelect }));
    fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper')!, { ctrlKey: true });
    expect(onExpand).not.toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith(
      ['0-0'],
      expect.objectContaining({ event: 'select', nativeEvent: expect.anything() }),
    );
  });

  it('should not expand tree now when click leaf node', () => {
    const onExpand = jest.fn();
    const onSelect = jest.fn();
    const { container } = render(
      createTree({
        onExpand,
        onSelect,
        defaultExpandAll: true,
        treeData: [
          {
            key: '0-0-0',
            title: 'Folder',
            children: [
              {
                title: 'Folder2',
                key: '0-0-1',
                children: [
                  {
                    title: 'File',
                    key: '0-0-2',
                    isLeaf: true,
                  },
                ],
              },
            ],
          },
        ],
      }),
    );
    const nodeList = container.querySelectorAll('.ant-tree-node-content-wrapper');
    fireEvent.click(nodeList[nodeList.length - 1]);
    expect(onExpand).not.toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith(
      ['0-0-2'],
      expect.objectContaining({ event: 'select', nativeEvent: expect.anything() }),
    );
  });

  // https://github.com/ant-design/ant-design/issues/49668
  it('should stay uncontrolled when expandedKeys is undefined', () => {
    const { container } = render(createTree({ expandedKeys: undefined }));
    expect(container.querySelectorAll('[role="treeitem"]')).toHaveLength(2);

    fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper')!);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('[role="treeitem"]')).toHaveLength(4);
  });

  it('should stay controlled when expandedKeys is provided', () => {
    const onExpand = jest.fn();
    const { container } = render(createTree({ expandedKeys: [], onExpand }));
    expect(container.querySelectorAll('[role="treeitem"]')).toHaveLength(2);

    fireEvent.click(container.querySelector('.ant-tree-node-content-wrapper')!);
    act(() => {
      jest.runAllTimers();
    });
    // The caller owns the state, so nothing expands until it feeds new keys back in
    expect(onExpand).toHaveBeenCalledWith(['0-0'], expect.anything());
    expect(container.querySelectorAll('[role="treeitem"]')).toHaveLength(2);
  });

  it('should support shift range selection when expandedKeys is undefined', () => {
    const onSelect = jest.fn();
    const treeData = [
      { title: 'Zero', key: 0 },
      { title: 'One', key: 1 },
      { title: 'Two', key: 2 },
    ];
    const { container } = render(
      <DirectoryTree multiple expandedKeys={undefined} treeData={treeData} onSelect={onSelect} />,
    );
    const nodes = container.querySelectorAll('.ant-tree-node-content-wrapper');

    fireEvent.click(nodes[0]);
    fireEvent.click(nodes[2], { shiftKey: true });

    expect(onSelect).toHaveBeenLastCalledWith(
      [0, 1, 2],
      expect.objectContaining({ selectedNodes: treeData }),
    );
  });

  it('ref support', () => {
    const treeRef = React.createRef<RcTree>();
    render(createTree({ ref: treeRef }));
    expect('scrollTo' in treeRef.current!).toBeTruthy();
  });

  it('fieldNames support', () => {
    const treeData = [
      {
        id: '0-0-0',
        label: 'Folder',
        child: [
          {
            label: 'Folder2',
            id: '0-0-1',
            child: [
              {
                label: 'File',
                id: '0-0-2',
                isLeaf: true,
              },
            ],
          },
        ],
      },
    ];
    const onSelect = jest.fn();
    const { container } = render(
      createTree({
        defaultExpandAll: true,
        // @ts-ignore
        treeData,
        onSelect,
        fieldNames: { key: 'id', title: 'label', children: 'child' },
      }),
    );

    // https://github.com/ant-design/ant-design/issues/55418
    expect(container.querySelectorAll('.ant-tree-node-content-wrapper-open').length).toBe(2);

    fireEvent.click(container.querySelectorAll('.ant-tree-node-content-wrapper')[0]);
    expect(onSelect.mock.calls[0][1].selectedNodes.length).toBe(1);
  });
});
