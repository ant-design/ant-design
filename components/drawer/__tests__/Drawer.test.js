import React from 'react';
import { mount } from 'enzyme';
import Drawer from '..';

describe('Drawer', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <Drawer
        visible
        width={400}
        getContainer={false}
      >
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have a title', () => {
    const wrapper = mount(
      <Drawer
        visible
        title="Test Title"
        getContainer={false}
      >
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('closable is false', () => {
    const wrapper = mount(
      <Drawer
        visible
        closable={false}
        getContainer={false}
      >
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

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
