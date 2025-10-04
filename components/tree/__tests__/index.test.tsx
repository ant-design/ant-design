import React from 'react';
import { SmileOutlined } from '@ant-design/icons';

import { render, screen } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Form from '../../form';
import Tree from '../index';
import type { AntTreeNodeProps, TreeProps } from '../Tree';

const { TreeNode } = Tree;

describe('Tree', () => {
  it('icon and switcherIcon of Tree with showLine should render correctly', () => {
    const { asFragment } = render(
      <Tree showLine showIcon>
        <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0">
          <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0-0" />
          <TreeNode switcherIcon="switcherIcon" key="0-0-1" />
          <TreeNode icon="icon" key="0-0-2" />
          <TreeNode key="0-0-3" />
        </TreeNode>
        <TreeNode switcherIcon="switcherIcon" key="0-1">
          <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0-0" />
          <TreeNode switcherIcon="switcherIcon" key="0-0-1" />
          <TreeNode icon="icon" key="0-0-2" />
          <TreeNode key="0-0-3" />
        </TreeNode>
        <TreeNode key="0-2">
          <TreeNode icon="icon" switcherIcon="switcherIcon" key="0-0-0" />
          <TreeNode switcherIcon="switcherIcon" key="0-0-1" />
          <TreeNode icon="icon" key="0-0-2" />
          <TreeNode key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('switcherIcon in Tree should not render at leaf nodes', () => {
    const { container } = render(
      <Tree switcherIcon={<i className="switcherIcon" />} defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(container.querySelectorAll('.switcherIcon').length).toBe(1);
  });

  it('leaf nodes should render custom icons when provided', () => {
    const { container } = render(
      <Tree showLine={{ showLeafIcon: <i className="customLeafIcon" /> }} defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(container.querySelectorAll('.customLeafIcon').length).toBe(2);
  });

  it('leaf nodes should render custom icons when provided as render function', () => {
    const { container } = render(
      <Tree showLine={{ showLeafIcon: () => <i className="customLeafIcon" /> }} defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );

    expect(container.querySelectorAll('.customLeafIcon').length).toBe(2);
  });

  it('leaf nodes should render custom icons when provided as string', async () => {
    render(
      <Tree showLine={{ showLeafIcon: 'customLeafIcon' }} defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );

    const customIcons = await screen.findAllByText('customLeafIcon');
    expect(customIcons).toHaveLength(2);
  });

  it('switcherIcon in Tree could be string', () => {
    const { asFragment } = render(
      <Tree switcherIcon="switcherIcon" defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('switcherIcon should be loading icon when loadData', () => {
    const onLoadData = () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    const { asFragment } = render(
      <Tree switcherIcon="switcherIcon" defaultExpandAll loadData={onLoadData}>
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('support switcherLoadingIcon prop when loadData', () => {
    const onLoadData = () =>
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    const { asFragment } = render(
      <Tree
        switcherIcon="switcherIcon"
        loadData={onLoadData}
        defaultExpandedKeys={['0-0-2', '0-0-3']}
        switcherLoadingIcon={<div>loading...</div>}
      >
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('switcherIcon in Tree could be render prop function', () => {
    const { container } = render(
      <Tree
        defaultExpandAll
        switcherIcon={({ expanded }: AntTreeNodeProps) =>
          expanded ? <span className="open" /> : <span className="close" />
        }
      >
        <TreeNode icon="icon">
          <TreeNode title="node1" icon="icon" key="0-0-2" />
          <TreeNode title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(container.querySelectorAll('.open').length).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/23261
  it('showLine is object type should render correctly', () => {
    const { asFragment } = render(
      <Tree showLine={{ showLeafIcon: false }} defaultExpandedKeys={['0-0-0']}>
        <TreeNode title="parent 1" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0">
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
            <TreeNode title="leaf" key="0-0-0-2" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title="leaf" key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="parent 1-2" key="0-0-2">
            <TreeNode title="leaf" key="0-0-2-0" />
            <TreeNode title="leaf" key="0-0-2-1" />
          </TreeNode>
        </TreeNode>
      </Tree>,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  describe('draggable', () => {
    const dragTreeData = [
      {
        title: 'bamboo',
        key: 'bamboo',
      },
    ];

    it('hide icon', () => {
      const { container } = render(<Tree treeData={dragTreeData} draggable={{ icon: false }} />);
      expect(container.querySelector('.anticon-holder')).toBeFalsy();
    });

    it('customize icon', () => {
      const { container } = render(
        <Tree treeData={dragTreeData} draggable={{ icon: <span className="little" /> }} />,
      );
      expect(container.querySelector('.little')).toBeTruthy();
    });

    it('nodeDraggable', () => {
      const nodeDraggable = jest.fn(() => false);
      render(<Tree treeData={dragTreeData} draggable={{ nodeDraggable }} />);
      expect(nodeDraggable).toHaveBeenCalledWith(dragTreeData[0]);
    });

    it('nodeDraggable func', () => {
      const nodeDraggable = jest.fn(() => false);
      render(<Tree treeData={dragTreeData} draggable={nodeDraggable} />);
      expect(nodeDraggable).toHaveBeenCalledWith(dragTreeData[0]);
    });
  });

  describe('semantic DOM', () => {
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

  describe('hidden switcherIcon', () => {
    it('use `switcherIcon={() => null}`', () => {
      const { container } = render(
        <Tree defaultExpandAll switcherIcon={() => null}>
          <TreeNode icon="icon">
            <TreeNode title="node1" icon="icon" key="0-0-2" />
            <TreeNode title="node2" key="0-0-3" />
          </TreeNode>
        </Tree>,
      );
      container.querySelectorAll('.ant-tree-switcher').forEach((el) => {
        expect(el.children.length).toBe(0);
      });
    });
    it('use `switcherIcon={null}`', () => {
      const { container } = render(
        <Tree defaultExpandAll switcherIcon={null}>
          <TreeNode icon="icon">
            <TreeNode title="node1" icon="icon" key="0-0-2" />
            <TreeNode title="node2" key="0-0-3" />
          </TreeNode>
        </Tree>,
      );
      container.querySelectorAll('.ant-tree-switcher').forEach((el) => {
        expect(el.children.length).toBe(0);
      });
    });
  });
  it('customize classNames and styles', () => {
    const data = [
      {
        title: 'parent 1',
        key: '0-0',
        icon: <SmileOutlined />,
        children: [
          {
            title: 'leaf',
            key: '0-0-0',
            icon: <SmileOutlined />,
          },
          {
            title: 'leaf',
            key: '0-0-1',
            icon: <SmileOutlined />,
          },
        ],
      },
    ];
    const testClassNames = {
      item: 'test-item',
      itemIcon: 'test-icon',
      itemTitle: 'test-title',
      root: 'test-root',
    };
    const testStyles = {
      item: { background: 'rgb(255, 0, 0)' },
      itemIcon: { color: 'rgb(0, 0, 255)' },
      itemTitle: { color: 'rgb(255, 255, 0)' },
      root: { color: 'rgb(0, 255, 0)' },
    };
    const { container } = render(
      <Tree
        treeData={data}
        showIcon
        defaultExpandAll
        styles={testStyles}
        classNames={testClassNames}
      />,
    );
    const root = container.querySelector('.ant-tree');
    const title = container.querySelector('.ant-tree-title');
    const item = container.querySelector(`.${testClassNames.item}`);
    const icon = container.querySelector('.ant-tree-iconEle');

    expect(root).toHaveStyle(testStyles.root);
    expect(root).toHaveClass(testClassNames.root);
    expect(icon).toHaveStyle(testStyles.itemIcon);
    expect(icon).toHaveClass(testClassNames.itemIcon);
    expect(title).toHaveStyle(testStyles.itemTitle);
    expect(title).toHaveClass(testClassNames.itemTitle);
    expect(item).toHaveStyle(testStyles.item);
  });
  describe('form disabled', () => {
    it('should support Form disabled', () => {
      const { container } = render(
        <Form disabled>
          <Form.Item name="tree1" label="禁用">
            <Tree>
              <TreeNode title="parent 1" key="0-0">
                <TreeNode title="child 1" key="0-0-0" />
              </TreeNode>
            </Tree>
          </Form.Item>
        </Form>,
      );

      expect(container.querySelector('.ant-tree.ant-tree-disabled')).toBeTruthy();
    });

    it('set Tree enabled when ConfigProvider componentDisabled is false', () => {
      const { container } = render(
        <Form disabled>
          <ConfigProvider componentDisabled={false}>
            <Form.Item name="tree1" label="启用">
              <Tree>
                <TreeNode title="parent 1" key="0-0">
                  <TreeNode title="child 1" key="0-0-0" />
                </TreeNode>
              </Tree>
            </Form.Item>
          </ConfigProvider>
          <Form.Item name="tree2" label="禁用">
            <Tree>
              <TreeNode title="parent 2" key="1-0">
                <TreeNode title="child 2" key="1-0-0" />
              </TreeNode>
            </Tree>
          </Form.Item>
        </Form>,
      );

      const trees = container.querySelectorAll('.ant-tree');
      expect(trees[0]).not.toHaveClass('ant-tree-disabled');
      expect(trees[1]).toHaveClass('ant-tree-disabled');
    });
  });
});
