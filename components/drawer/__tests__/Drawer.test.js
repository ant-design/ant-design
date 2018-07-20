import React from 'react';
import { mount } from 'enzyme';
import Drawer from '..';

describe('Drawer', () => {
  it('destroyOnClose is true', () => {
    const wrapper = mount(
      <Drawer
        destroyOnClose
        visible={false}
        getContainer={false}
      >
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
