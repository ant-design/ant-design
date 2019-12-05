import React from 'react';
import { mount } from 'enzyme';
import Tree from '../index';

const { TreeNode } = Tree;

describe('Tree', () => {
  it('icon of TreeNode should put inside line when showLine is true', () => {
    const wrapper = mount(
      <Tree showLine>
        <TreeNode icon="icon" key="0-0">
          <TreeNode icon="icon" key="0-0-0" />
          <TreeNode key="0-0-1" />
        </TreeNode>
      </Tree>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
