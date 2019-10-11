import React from 'react';
import { mount } from 'enzyme';
import Tree from '../index';
import { calcRangeKeys, getFullKeyListByTreeData } from '../util';

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

  it('calc range keys by treeData', () => {
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
      {
        key: '0-0-3',
        title: 'Folder',
        children: [
          {
            title: 'File',
            key: '0-0-4',
            isLeaf: true,
          },
          {
            title: 'File',
            key: '0-0-5',
            isLeaf: true,
          },
          {
            title: 'File',
            key: '0-0-6',
            isLeaf: true,
          },
        ],
      },
    ];

    const keys = getFullKeyListByTreeData(treeData);
    const target = ['0-0-0', '0-0-1', '0-0-2', '0-0-3', '0-0-4', '0-0-5', '0-0-6'];
    expect(keys.sort()).toEqual(target.sort());
  });
});
