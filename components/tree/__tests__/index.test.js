import React from 'react';
import { mount } from 'enzyme';
import Tree from '../index';

const { TreeNode } = Tree;

describe('Tree', () => {
  it('icon and switcherIcon of Tree with showLine should render correctly', () => {
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('switcherIcon in Tree should not render at leaf nodes', () => {
    const wrapper = mount(
      <Tree switcherIcon={<i className="switcherIcon" />} defaultExpandAll>
        <TreeNode icon="icon">
          <TreeNode id="node1" title="node1" icon="icon" key="0-0-2" />
          <TreeNode id="node2" title="node2" key="0-0-3" />
        </TreeNode>
      </Tree>,
    );
    expect(wrapper.find('.switcherIcon').length).toBe(1);
  });
});
