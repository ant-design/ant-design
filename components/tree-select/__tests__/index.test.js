import React from 'react';
import { render } from '../../../tests/utils';
import TreeSelect, { TreeNode } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('TreeSelect', () => {
  focusTest(TreeSelect, { refFocus: true });
  mountTest(TreeSelect);
  rtlTest(TreeSelect);

  describe('TreeSelect Custom Icons', () => {
    it('should support customized icons', () => {
      const { container: wrapper } = render(
        <TreeSelect
          showSearch
          clearIcon={<span>clear</span>}
          removeIcon={<span>remove</span>}
          value={['leaf1', 'leaf2']}
          placeholder="Please select"
          multiple
          allowClear
          treeDefaultExpandAll
        >
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf" key="random" />
              <TreeNode value="leaf2" title="your leaf" key="random1" />
            </TreeNode>
          </TreeNode>
        </TreeSelect>,
      );

      expect(wrapper.firstChild).toMatchSnapshot();
    });

    it('should `treeIcon` work', () => {
      const { container: wrapper } = render(
        <TreeSelect treeIcon open>
          <TreeNode value="parent 1" title="parent 1" icon={<span>Bamboo</span>} />
        </TreeSelect>,
      );

      expect(wrapper.firstChild).toMatchSnapshot();
    });
  });

  it('should support notFoundContent', () => {
    const { container: wrapper } = render(
      <TreeSelect treeIcon open notFoundContent="notFoundContent" />,
    );
    expect(wrapper.querySelector('.ant-select-empty').innerHTML).toBe('notFoundContent');
  });
});
