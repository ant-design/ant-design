import React from 'react';
import TreeSelect from '..';
import focusTest from '../../../tests/shared/focusTest';
import Icon from '../../icon';
import { render, mount } from 'enzyme';
const TreeNode = TreeSelect.TreeNode;

describe('TreeSelect', () => {
  focusTest(TreeSelect);

  it('support suffix icon and suffix string', () => {
    const wrapperIcon = mount(
      <TreeSelect
        suffix={<Icon type="smile" />}
        showSearch
        style={{ width: 300 }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
    const wrapperString = mount(
      <TreeSelect
        suffix="text"
        showSearch
        style={{ width: 300 }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
      >
        <TreeNode value="parent 1" title="parent 1" key="0-1">
          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
            <TreeNode value="leaf1" title="my leaf" key="random" />
            <TreeNode value="leaf2" title="your leaf" key="random1" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    );
    expect(render(wrapperIcon)).toMatchSnapshot();
    expect(render(wrapperString)).toMatchSnapshot();
  });
});
