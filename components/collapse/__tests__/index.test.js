import React from 'react';
import { mount } from 'enzyme';
import Collapse from '..';

describe('Collapse', () => {
  it('should support remove expandIcon', () => {
    const wrapper = mount(
      <Collapse expandIcon={() => null}>
        <Collapse.Panel header="header" />
      </Collapse>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
