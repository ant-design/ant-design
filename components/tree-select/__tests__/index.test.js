import React from 'react';
import { mount } from 'enzyme';
import TreeSelect, { TreeNode } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';

describe('TreeSelect', () => {
  focusTest(TreeSelect);
  mountTest(TreeSelect);

  describe('showSearch', () => {
    it('keep default logic', () => {
      const single = mount(<TreeSelect open />);
      expect(single.find('.ant-select-search__field').length).toBeFalsy();

      const multiple = mount(<TreeSelect multiple open />);
      expect(multiple.find('.ant-select-search__field').length).toBeTruthy();
    });
  });

  describe('TreeSelect Custom Icons', () => {
    it('should support customized icons', () => {
      const wrapper = mount(
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

      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
