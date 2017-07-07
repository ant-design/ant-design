import React from 'react';
import { mount } from 'enzyme';
import Menu from '..';
import Icon from '../../icon';

const SubMenu = Menu.SubMenu;
const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Menu', () => {
  it('should accept defaultOpenKeys in mode horizontal', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
  });

  it('should accept defaultOpenKeys in mode inline', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
  });

  it('should accept defaultOpenKeys in mode vertical', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
  });

  it('should accept openKeys in mode horizontal', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="horizontal" openTransitionName="">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.setProps({ openKeys: [] });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(true);
    wrapper.setProps({ openKeys: ['1'] });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
  });

  it('should accept openKeys in mode inline', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="inline" openAnimation="">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.setProps({ openKeys: [] });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(true);
    wrapper.setProps({ openKeys: ['1'] });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
  });

  it('should accept openKeys in mode vertical', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="vertical" openTransitionName="">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.setProps({ openKeys: [] });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(true);
    wrapper.setProps({ openKeys: ['1'] });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
  });

  // https://github.com/ant-design/ant-design/pulls/4677
  // https://github.com/ant-design/ant-design/issues/4692
  // TypeError: Cannot read property 'indexOf' of undefined
  it('pr #4677 and issue #4692', () => {
    const wrapper = mount(
      <Menu mode="horizontal">
        <SubMenu title="submenu">
          <Menu.Item key="1">menu1</Menu.Item>
          <Menu.Item key="2">menu2</Menu.Item>
        </SubMenu>
      </Menu>
    );
    wrapper.update();
    // just expect no error emit
  });

  it('should always follow openKeys when mode is switched', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.setProps({ mode: 'vertical' });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.setProps({ mode: 'inline' });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
  });

  it('should always follow openKeys when mode is switched', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="inline">
        <Menu.Item key="menu1">
          <Icon type="inbox" />
          <span>Option</span>
        </Menu.Item>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">
            Option
          </Menu.Item>
          <Menu.Item key="submenu2">
            Option
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-inline')).toBe(true);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(false);
    wrapper.setProps({ inlineCollapsed: true });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-vertical')).toBe(true);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(true);
    wrapper.setProps({ inlineCollapsed: false });
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-inline')).toBe(true);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(false);
  });

  it('should open submenu when click submenu title (inline)', async () => {
    const wrapper = mount(
      <Menu mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').length).toBe(0);
    wrapper.find('.ant-menu-submenu-title').simulate('click');
    expect(wrapper.find('.ant-menu-sub').length).toBe(1);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.find('.ant-menu-submenu-title').simulate('click');
    await delay(300);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(true);
  });

  it('should open submenu when hover submenu title (vertical)', async () => {
    const wrapper = mount(
      <Menu mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').length).toBe(0);
    wrapper.find('.ant-menu-submenu-title').simulate('mouseenter');
    expect(wrapper.find('.ant-menu-sub').length).toBe(1);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.find('.ant-menu-submenu').simulate('mouseleave');
    await delay(300);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(true);
  });

  it('should open submenu when hover submenu title (horizontal)', async () => {
    const wrapper = mount(
      <Menu mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    expect(wrapper.find('.ant-menu-sub').length).toBe(0);
    wrapper.find('.ant-menu-submenu-title').simulate('mouseenter');
    expect(wrapper.find('.ant-menu-sub').length).toBe(1);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).not.toBe(true);
    wrapper.find('.ant-menu-submenu').simulate('mouseleave');
    await delay(300);
    expect(wrapper.find('.ant-menu-sub').at(0).hasClass('ant-menu-hidden')).toBe(true);
  });
});
