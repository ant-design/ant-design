import { mount } from 'enzyme';
import React from 'react';
import DropdownButton from '../dropdown-button';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import Menu from '../../menu';
import type { DropdownProps } from '../dropdown';
import { render } from '../../../tests/utils';

let dropdownProps: DropdownProps;
jest.mock('../dropdown', () => {
  const ActualDropdown = jest.requireActual('../dropdown');
  const ActualDropdownComponent = ActualDropdown.default;
  const h: typeof React = jest.requireActual('react');

  const mockedDropdown = (props: DropdownProps) => {
    dropdownProps = props;
    const { children, ...restProps } = props;
    return h.createElement(ActualDropdownComponent, { ...restProps }, children);
  };
  mockedDropdown.defaultProps = ActualDropdownComponent.defaultProps;
  mockedDropdown.Button = ActualDropdownComponent.Button;

  return {
    ...ActualDropdown,
    __esModule: true,
    default: mockedDropdown,
  };
});

describe('DropdownButton', () => {
  mountTest(DropdownButton);
  rtlTest(DropdownButton);

  it('pass appropriate props to Dropdown', () => {
    const props: DropdownProps = {
      align: {
        offset: [10, 20],
      },
      overlay: (
        <Menu>
          <Menu.Item key="1">foo</Menu.Item>
        </Menu>
      ),
      disabled: false,
      trigger: ['hover'],
      visible: true,
      onVisibleChange: () => {},
    };

    render(<DropdownButton {...props} />);

    Object.keys(props).forEach((key: keyof DropdownProps) => {
      expect(dropdownProps[key]).toBe(props[key]);
    });
  });

  it("don't pass visible to Dropdown if it's not exits", () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<DropdownButton overlay={menu} />);
    // const dropdownProps = wrapper.find(Dropdown).props();

    // expect('visible' in dropdownProps).toBe(false);
  });

  it('should support href like Button', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<DropdownButton overlay={menu} href="https://ant.design" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have static property for type detecting', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(<DropdownButton overlay={menu} />);
    expect(wrapper.find(DropdownButton).type().__ANT_BUTTON).toBe(true);
  });

  it('should pass mouseEnterDelay and mouseLeaveDelay to Dropdown', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(
      <DropdownButton mouseEnterDelay={1} mouseLeaveDelay={2} overlay={menu} />,
    );
    expect(wrapper.find('Dropdown').props().mouseEnterDelay).toBe(1);
    expect(wrapper.find('Dropdown').props().mouseLeaveDelay).toBe(2);
  });

  it('should support overlayClassName and overlayStyle', () => {
    const menu = (
      <Menu>
        <Menu.Item key="1">foo</Menu.Item>
      </Menu>
    );
    const wrapper = mount(
      <DropdownButton
        overlayClassName="className"
        overlayStyle={{ color: 'red' }}
        overlay={menu}
        visible
      />,
    );
    expect(wrapper.find('.ant-dropdown').getDOMNode().className).toContain('className');
    expect(wrapper.find('.ant-dropdown').getDOMNode().style.color).toContain('red');
  });

  it('should support loading', () => {
    const wrapper = mount(<DropdownButton loading />);

    expect(wrapper.find('.ant-dropdown-button .ant-btn-loading').getDOMNode().className).toContain(
      'ant-btn',
    );
  });
});
