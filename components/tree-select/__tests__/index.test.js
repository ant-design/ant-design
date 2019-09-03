import React from 'react';
import { mount } from 'enzyme';
import TreeSelect from '..';
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
});
