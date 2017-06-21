import React from 'react';
import { shallow } from 'enzyme';
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
      trigger: ['hover'],
      visible: true,
      onVisibleChange: () => {},
    };

    const wrapper = shallow(<Dropdown.Button {...props} />);
    const dropdownProps = wrapper.find(Dropdown).props();

    Object.keys(props).forEach((key) => {
      expect(dropdownProps[key]).toBe(props[key]);
    });
  });

  it('don\'t pass visible to Dropdown if it\'s not exits', () => {
    const wrapper = shallow(<Dropdown.Button />);
    const dropdownProps = wrapper.find(Dropdown).props();

    expect('visible' in dropdownProps).toBe(false);
  });
});
