import React from 'react';
import type RcTree from '@rc-component/tree';
import type { BasicDataNode } from '@rc-component/tree';
import debounce from 'lodash/debounce';

import type { TreeProps } from '..';
import Tree from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';

const { DirectoryTree, TreeNode } = Tree;

interface FileDropTreeNode extends BasicDataNode {
  id: number;
  label: string;
}

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

  it('preserves numeric node keys when files are dropped from outside the browser', () => {
    const onFileDrop = jest.fn();
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    const { container } = render(
      <DirectoryTree
        allowFileDrop
        treeData={[{ key: 0, title: 'Zero' }]}
        onFileDrop={onFileDrop}
      />,
    );

    const targets = container.querySelectorAll('.ant-tree-file-drop-target');
    expect(targets[0]).toHaveTextContent('Zero');

    fireEvent.drop(targets[0], {
      dataTransfer: { files: [file], types: ['Files'] },
    });

    expect(onFileDrop).toHaveBeenCalledWith(
      expect.objectContaining({
        files: [file],
        node: expect.objectContaining({ key: 0 }),
      }),
    );
  });

  it('only handles external file drags and preserves custom titles', () => {
    const onFileDrop = jest.fn();
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    const { container } = render(
      <DirectoryTree
        allowFileDrop
        treeData={[{ key: 'custom', title: 'Custom' }]}
        titleRender={(node) => <strong>{node.title}</strong>}
        onFileDrop={onFileDrop}
      />,
    );
    const target = container.querySelector<HTMLElement>('.ant-tree-file-drop-target')!;
    const wrapper = container.querySelector<HTMLElement>('.ant-tree-directory-file-drop')!;

    expect(target.querySelector('strong')).toHaveTextContent('Custom');

    const textDrop = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(textDrop, 'dataTransfer', {
      value: { files: [], types: ['text/plain'] },
    });
    target.dispatchEvent(textDrop);
    expect(textDrop.defaultPrevented).toBe(false);
    expect(onFileDrop).not.toHaveBeenCalled();

    const textDragOver = new Event('dragover', { bubbles: true, cancelable: true });
    Object.defineProperty(textDragOver, 'dataTransfer', {
      value: { files: [], types: ['text/plain'] },
    });
    target.dispatchEvent(textDragOver);
    expect(textDragOver.defaultPrevented).toBe(false);

    fireEvent.dragOver(target.querySelector('strong')!, {
      dataTransfer: { dropEffect: 'none', files: [], types: ['Files'] },
    });
    expect(target).toHaveClass('ant-tree-file-drop-target-active');

    const innerDragLeave = new Event('dragleave', { bubbles: true });
    Object.defineProperty(innerDragLeave, 'relatedTarget', { value: target });
    target.dispatchEvent(innerDragLeave);
    expect(target).toHaveClass('ant-tree-file-drop-target-active');

    fireEvent.dragLeave(wrapper, { relatedTarget: document.body });
    expect(target).not.toHaveClass('ant-tree-file-drop-target-active');

    fireEvent.drop(wrapper, {
      dataTransfer: { files: [file], types: ['Files'] },
    });
    expect(onFileDrop).not.toHaveBeenCalled();

    fireEvent.drop(target, {
      dataTransfer: { files: [file], types: ['Files'] },
    });
    expect(onFileDrop).toHaveBeenCalledTimes(1);
    expect(target).not.toHaveClass('ant-tree-file-drop-target-active');
  });

  it('preserves custom title fields when external files are dropped', () => {
    const onFileDrop = jest.fn();
    const file = new File(['content'], 'example.txt', { type: 'text/plain' });
    const treeData: FileDropTreeNode[] = [{ id: 0, label: 'Custom title' }];
    const { container } = render(
      <DirectoryTree<FileDropTreeNode>
        allowFileDrop
        treeData={treeData}
        fieldNames={{ key: 'id', title: 'label' }}
        onFileDrop={onFileDrop}
      />,
    );
    const target = container.querySelector<HTMLElement>('.ant-tree-file-drop-target')!;

    expect(target).toHaveTextContent('Custom title');

    fireEvent.drop(target, {
      dataTransfer: { files: [file], types: ['Files'] },
    });
    expect(onFileDrop).toHaveBeenCalledWith(
      expect.objectContaining({ node: treeData[0], files: [file] }),
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
