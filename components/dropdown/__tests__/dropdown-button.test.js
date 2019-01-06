import React from 'react';
import { mount } from 'enzyme';
import Dropdown from '..';
import Menu from '../../menu';

describe('DropdownButton', () => {
  it('pass appropriate props to Dropdown', () => {
    const props = {
      align: {
        offset: [10, 20],
      },
      overlay: (
        <Menu>
          <Menu.Item>foo</Menu.Item>
        </Menu>
      ),
      disabled: false,
      trigger: ['hover'],
      visible: true,
      onVisibleChange: () => {},
    };

    const wrapper = mount(<Dropdown.Button {...props} />);
    const dropdownProps = wrapper.find(Dropdown).props();

    Object.keys(props).forEach(key => {
      expect(dropdownProps[key]).toBe(props[key]); // eslint-disable-line
    });
  });

  it("don't pass visible to Dropdown if it's not exits", () => {
    const menu = (
      <Menu>
        <Menu.Item>foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<Dropdown.Button overlay={menu} />);
    const dropdownProps = wrapper.find(Dropdown).props();

    expect('visible' in dropdownProps).toBe(false);
  });

  it('should support href like Button', () => {
    const menu = (
      <Menu>
        <Menu.Item>foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<Dropdown.Button overlay={menu} href="https://ant.design" />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
