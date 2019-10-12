import React from 'react';
import { mount } from 'enzyme';
import Tree from '../index';
import { calcRangeKeys } from '../util';

const { TreeNode } = Tree;

describe('Tree util', () => {
  it('calc range keys', () => {
    const wrapper = mount(
      <Tree>
        <TreeNode key="0-0">
          <TreeNode key="0-0-0" />
          <TreeNode key="0-0-1" />
        </TreeNode>
        <TreeNode key="0-1">
          <TreeNode key="0-1-0" />
          <TreeNode key="0-1-1" />
        </TreeNode>
        <TreeNode key="0-2">
          <TreeNode key="0-2-0">
            <TreeNode key="0-2-0-0" />
            <TreeNode key="0-2-0-1" />
            <TreeNode key="0-2-0-2" />
          </TreeNode>
        </TreeNode>
      </Tree>,
    );

    const { children } = wrapper.find(Tree).props();
    const keys = calcRangeKeys(children, ['0-0', '0-2', '0-2-0'], '0-2-0-1', '0-0-0');
    const target = ['0-0-0', '0-0-1', '0-1', '0-2', '0-2-0', '0-2-0-0', '0-2-0-1'];
    expect(keys.sort()).toEqual(target.sort());
  });
});
