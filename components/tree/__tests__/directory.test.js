import React from 'react';
import { mount, render } from 'enzyme';
import Tree from '../index';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

describe('Directory Tree', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  function createTree(props) {
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
      const wrapper = mount(createTree());

      wrapper.find(TreeNode).find('.ant-tree-node-content-wrapper').at(0).simulate('click');
      expect(wrapper.render()).toMatchSnapshot();
      jest.runAllTimers();
      wrapper.find(TreeNode).find('.ant-tree-node-content-wrapper').at(0).simulate('click');
      expect(wrapper.render()).toMatchSnapshot();
    });

    it('double click', () => {
      const wrapper = mount(createTree({ expandAction: 'doubleClick' }));

      wrapper.find(TreeNode).find('.ant-tree-node-content-wrapper').at(0).simulate('doubleClick');
      expect(wrapper.render()).toMatchSnapshot();
      jest.runAllTimers();
      wrapper.find(TreeNode).find('.ant-tree-node-content-wrapper').at(0).simulate('doubleClick');
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  it('defaultExpandAll', () => {
    const wrapper = render(createTree({ defaultExpandAll: true }));
    expect(wrapper).toMatchSnapshot();
  });

  it('defaultExpandParent', () => {
    const wrapper = render(createTree({ defaultExpandParent: true }));
    expect(wrapper).toMatchSnapshot();
  });
});
