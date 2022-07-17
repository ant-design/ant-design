import {
  AppstoreOutlined,
  InboxOutlined,
  MailOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { mount } from 'enzyme';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import Menu from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import Layout from '../../layout';
import Tooltip from '../../tooltip';
import collapseMotion from '../../_util/motion';
import { noop } from '../../_util/warning';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const { SubMenu } = Menu;

describe('Menu', () => {
  function triggerAllTimer() {
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }
  }

  const expectSubMenuBehavior = (defaultProps, instance, enter = noop, leave = noop) => {
    const { container } = instance;

    expect(container.querySelectorAll('ul.ant-menu-sub')).toHaveLength(0);
    const AnimationClassNames = {
      horizontal: 'ant-slide-up-leave',
      inline: 'ant-motion-collapse-leave',
      vertical: 'ant-zoom-big-leave',
    };
    const mode = defaultProps.mode || 'horizontal';

    act(() => {
      enter();
    });

    // React concurrent may delay creat this
    triggerAllTimer();

    function getSubMenu() {
      if (mode === 'inline') {
        return container.querySelector('ul.ant-menu-sub.ant-menu-inline');
      }
      return container.querySelector('div.ant-menu-submenu-popup');
    }

    expect(
      getSubMenu().classList.contains('ant-menu-hidden') ||
        getSubMenu().classList.contains(AnimationClassNames[mode]),
    ).toBeFalsy();

    act(() => {
      leave();
    });

    // React concurrent may delay creat this
    triggerAllTimer();

    if (getSubMenu()) {
      expect(
        getSubMenu().classList.contains('ant-menu-hidden') ||
          getSubMenu().classList.contains(AnimationClassNames[mode]),
      ).toBeTruthy();
    }
  };

  // window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
  // window.cancelAnimationFrame = window.clearTimeout;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  mountTest(() => (
    <Menu>
      <Menu.Item />
      <Menu.ItemGroup />
      <Menu.SubMenu />
    </Menu>
  ));

  mountTest(() => (
    <Menu>
      <Menu.Item />
      <>
        <Menu.ItemGroup />
        <Menu.SubMenu />
        {null}
      </>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <>
        <Menu.Item />
      </>
      {undefined}
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <>
        {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
        <>
          <Menu.Item />
        </>
      </>
    </Menu>
  ));

  rtlTest(() => (
    <Menu>
      <Menu.Item />
      <Menu.ItemGroup />
      <Menu.SubMenu />
    </Menu>
  ));

  let div;

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('If has select nested submenu item ,the menu items on the grandfather level should be highlight', () => {
    const wrapper = mount(
      <Menu defaultSelectedKeys={['1-3-2']} mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="1-1">Option 1</Menu.Item>
          <Menu.Item key="1-2">Option 2</Menu.Item>
          <SubMenu key="1-3" title="submenu1-3">
            <Menu.Item key="1-3-1">Option 3</Menu.Item>
            <Menu.Item key="1-3-2">Option 4</Menu.Item>
          </SubMenu>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    expect(wrapper.find('li.ant-menu-submenu-selected').length).toBe(1);
  });

  it('forceSubMenuRender', () => {
    const wrapper = mount(
      <Menu mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="1-1">
            <span className="bamboo" />
          </Menu.Item>
        </SubMenu>
      </Menu>,
    );

    expect(wrapper.find('.bamboo').hostNodes()).toHaveLength(0);

    wrapper.setProps({ forceSubMenuRender: true });
    expect(wrapper.find('.bamboo').hostNodes()).toHaveLength(1);
  });

  it('should accept defaultOpenKeys in mode horizontal', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    expect(wrapper.exists('.ant-menu-sub')).toBeFalsy();
  });

  it('should accept defaultOpenKeys in mode inline', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
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
      </Menu>,
    );
    expect(wrapper.find('PopupTrigger').first().prop('visible')).toBeTruthy();
  });

  it('should accept openKeys in mode horizontal', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    expect(wrapper.find('PopupTrigger').first().prop('visible')).toBeTruthy();
  });

  it('should accept openKeys in mode inline', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    expect(wrapper.find('InlineSubMenuList').first().prop('open')).toBeTruthy();
  });

  it('should accept openKeys in mode vertical', () => {
    const wrapper = mount(
      <Menu openKeys={['1']} mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    expect(wrapper.find('PopupTrigger').first().prop('visible')).toBeTruthy();
  });

  it('test submenu in mode horizontal', async () => {
    const defaultProps = {
      mode: 'horizontal',
    };

    const Demo = props => (
      <Menu {...defaultProps} {...props}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );

    const instance = render(<Demo />);

    expectSubMenuBehavior(
      defaultProps,
      instance,
      () => instance.rerender(<Demo openKeys={['1']} />),
      () => instance.rerender(<Demo openKeys={[]} />),
    );

    instance.rerender(<Demo openKeys={['1']} />);
  });

  it('test submenu in mode inline', () => {
    const defaultProps = { mode: 'inline' };

    const Demo = props => (
      <Menu {...defaultProps} {...props}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    const instance = render(<Demo />);
    expectSubMenuBehavior(
      defaultProps,
      instance,
      () => instance.rerender(<Demo openKeys={['1']} />),
      () => instance.rerender(<Demo openKeys={[]} />),
    );
  });

  it('test submenu in mode vertical', () => {
    const defaultProps = { mode: 'vertical', openTransitionName: '' };

    const Demo = props => (
      <Menu {...defaultProps} {...props}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );

    const instance = render(<Demo />);
    expectSubMenuBehavior(
      defaultProps,
      instance,
      () => instance.rerender(<Demo openKeys={['1']} />),
      () => instance.rerender(<Demo openKeys={[]} />),
    );
  });

  describe('allows the overriding of theme at the popup submenu level', () => {
    const menuModesWithPopupSubMenu = ['horizontal', 'vertical'];

    menuModesWithPopupSubMenu.forEach(menuMode => {
      it(`when menu is mode ${menuMode}`, () => {
        const { container } = render(
          <Menu mode={menuMode} openKeys={['1']} theme="dark">
            <SubMenu key="1" title="submenu1" theme="light">
              <Menu.Item key="submenu1">Option 1</Menu.Item>
              <Menu.Item key="submenu2">Option 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">menu2</Menu.Item>
          </Menu>,
        );

        act(() => {
          jest.runAllTimers();
        });

        expect(container.querySelector('ul.ant-menu-root')).toHaveClass('ant-menu-dark');
        expect(container.querySelector('div.ant-menu-submenu-popup')).toHaveClass('ant-menu-light');
      });
    });
  });

  // https://github.com/ant-design/ant-design/pulls/4677
  // https://github.com/ant-design/ant-design/issues/4692
  // TypeError: Cannot read property 'indexOf' of undefined
  it('pr #4677 and issue #4692', () => {
    render(
      <Menu mode="horizontal">
        <SubMenu title="submenu">
          <Menu.Item key="1">menu1</Menu.Item>
          <Menu.Item key="2">menu2</Menu.Item>
        </SubMenu>
      </Menu>,
    );

    act(() => {
      jest.runAllTimers();
    });
    // just expect no error emit
  });

  it('should always follow openKeys when mode is switched', () => {
    const Demo = props => (
      <Menu openKeys={['1']} mode="inline" {...props}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );

    const { container, rerender } = render(<Demo />);
    expect(container.querySelector('ul.ant-menu-sub')).not.toHaveClass('ant-menu-hidden');

    rerender(<Demo mode="vertical" />);
    expect(container.querySelector('ul.ant-menu-sub')).not.toHaveClass('ant-menu-hidden');

    rerender(<Demo mode="inline" />);
    expect(container.querySelector('ul.ant-menu-sub')).not.toHaveClass('ant-menu-hidden');
  });

  it('should always follow openKeys when inlineCollapsed is switched', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="inline">
        <Menu.Item key="menu1" icon={<InboxOutlined />}>
          Option
        </Menu.Item>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option</Menu.Item>
          <Menu.Item key="submenu2">Option</Menu.Item>
        </SubMenu>
      </Menu>,
    );

    expect(wrapper.find('InlineSubMenuList').prop('open')).toBeTruthy();

    // inlineCollapsed
    wrapper.setProps({ inlineCollapsed: true });
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('ul.ant-menu-root').hasClass('ant-menu-vertical')).toBeTruthy();
    expect(wrapper.find('PopupTrigger').prop('visible')).toBeFalsy();

    // !inlineCollapsed
    wrapper.setProps({ inlineCollapsed: false });
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('ul.ant-menu-sub').last().hasClass('ant-menu-inline')).toBeTruthy();
    expect(wrapper.find('InlineSubMenuList').prop('open')).toBeTruthy();
  });

  it('inlineCollapsed should works well when specify a not existed default openKeys', () => {
    const Demo = props => (
      <Menu defaultOpenKeys={['not-existed']} mode="inline" {...props}>
        <Menu.Item key="menu1" icon={<InboxOutlined />}>
          Option
        </Menu.Item>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option</Menu.Item>
          <Menu.Item key="submenu2">Option</Menu.Item>
        </SubMenu>
      </Menu>
    );
    const { container, rerender } = render(<Demo />);

    expect(container.querySelectorAll('.ant-menu-sub')).toHaveLength(0);

    rerender(<Demo inlineCollapsed />);
    act(() => {
      jest.runAllTimers();
    });

    const transitionEndEvent = new Event('transitionend');
    fireEvent(container.querySelector('ul'), transitionEndEvent);
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.mouseEnter(container.querySelector('.ant-menu-submenu-title'));
    triggerAllTimer();

    expect(container.querySelector('.ant-menu-submenu')).toHaveClass('ant-menu-submenu-vertical');
    expect(container.querySelector('.ant-menu-submenu')).toHaveClass('ant-menu-submenu-open');
    expect(container.querySelector('ul.ant-menu-sub')).toHaveClass('ant-menu-vertical');
    expect(container.querySelector('ul.ant-menu-sub')).not.toHaveClass('ant-menu-hidden');
  });

  it('inlineCollapsed Menu.Item Tooltip can be removed', () => {
    const wrapper = mount(
      <Menu
        defaultOpenKeys={['not-existed']}
        mode="inline"
        inlineCollapsed
        getPopupContainer={node => node.parentNode}
      >
        <Menu.Item key="menu1">item</Menu.Item>
        <Menu.Item key="menu2" title="title">
          item
        </Menu.Item>
        <Menu.Item key="menu3" title={undefined}>
          item
        </Menu.Item>
        <Menu.Item key="menu4" title={null}>
          item
        </Menu.Item>
        <Menu.Item key="menu5" title="">
          item
        </Menu.Item>
        <Menu.Item key="menu6" title={false}>
          item
        </Menu.Item>
      </Menu>,
    );
    expect(wrapper.find(Menu.Item).at(0).find(Tooltip).props().title).toBe('item');
    expect(wrapper.find(Menu.Item).at(1).find(Tooltip).props().title).toBe('title');
    expect(wrapper.find(Menu.Item).at(2).find(Tooltip).props().title).toBe('item');
    expect(wrapper.find(Menu.Item).at(3).find(Tooltip).props().title).toBe(null);
    expect(wrapper.find(Menu.Item).at(4).find(Tooltip).props().title).toBe('');
    expect(wrapper.find(Menu.Item).at(4).find(Tooltip).props().title).toBe('');
  });

  describe('open submenu when click submenu title', () => {
    const toggleMenu = (instance, index, event) => {
      fireEvent[event](instance.container.querySelectorAll('.ant-menu-submenu-title')[index]);

      triggerAllTimer();
    };

    it('inline', () => {
      const defaultProps = { mode: 'inline' };

      const Demo = props => (
        <Menu {...defaultProps} {...props}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultProps,
        instance,
        () => toggleMenu(instance, 0, 'click'),
        () => toggleMenu(instance, 0, 'click'),
      );
    });

    it('inline menu collapseMotion should be triggered', async () => {
      const cloneMotion = {
        ...collapseMotion,
        motionDeadline: 1,
      };

      const onOpenChange = jest.fn();
      const onEnterEnd = jest.spyOn(cloneMotion, 'onEnterEnd');

      const { container } = render(
        <Menu mode="inline" motion={cloneMotion} onOpenChange={onOpenChange}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>,
      );

      fireEvent.click(container.querySelector('.ant-menu-submenu-title'));

      triggerAllTimer();

      expect(onOpenChange).toHaveBeenCalled();
      expect(onEnterEnd).toHaveBeenCalledTimes(1);
    });

    it('vertical with hover(default)', () => {
      const defaultProps = { mode: 'vertical' };

      const Demo = () => (
        <Menu {...defaultProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultProps,
        instance,
        () => toggleMenu(instance, 0, 'mouseEnter'),
        () => toggleMenu(instance, 0, 'mouseLeave'),
      );
    });

    it('vertical with click', () => {
      const defaultProps = { mode: 'vertical', triggerSubMenuAction: 'click' };
      const Demo = () => (
        <Menu {...defaultProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultProps,
        instance,
        () => toggleMenu(instance, 0, 'click'),
        () => toggleMenu(instance, 0, 'click'),
      );
    });

    it('horizontal with hover(default)', () => {
      const defaultProps = { mode: 'horizontal' };
      const Demo = () => (
        <Menu {...defaultProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultProps,
        instance,
        () => toggleMenu(instance, 0, 'mouseEnter'),
        () => toggleMenu(instance, 0, 'mouseLeave'),
      );
    });

    it('horizontal with click', () => {
      const defaultProps = { mode: 'horizontal', triggerSubMenuAction: 'click' };
      const Demo = () => (
        <Menu {...defaultProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultProps,
        instance,
        () => toggleMenu(instance, 0, 'click'),
        () => toggleMenu(instance, 0, 'click'),
      );
    });
  });

  it('inline title', () => {
    const wrapper = mount(
      <Menu mode="inline" inlineCollapsed>
        <Menu.Item key="1" title="bamboo lucky" icon={<PieChartOutlined />}>
          Option 1
          <img
            style={{ width: 20 }}
            alt="test"
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          />
        </Menu.Item>
      </Menu>,
    );

    wrapper.find('.ant-menu-item').hostNodes().simulate('mouseenter');
    triggerAllTimer();
    wrapper.update();

    const text = wrapper.find('.ant-tooltip-inner').text();
    expect(text).toBe('bamboo lucky');
  });

  it('render correctly when using with Layout.Sider', () => {
    class Demo extends React.Component {
      state = {
        collapsed: false,
      };

      onCollapse = collapsed => this.setState({ collapsed });

      render() {
        const { collapsed } = this.state;
        return (
          <Layout style={{ minHeight: '100vh' }}>
            <Layout.Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
              </Menu>
            </Layout.Sider>
          </Layout>
        );
      }
    }
    const wrapper = mount(<Demo />);
    expect(wrapper.find(Menu).at(0).getDOMNode().classList.contains('ant-menu-inline')).toBe(true);
    wrapper.find('.ant-menu-submenu-title').simulate('click');
    wrapper.find('.ant-layout-sider-trigger').simulate('click');
    triggerAllTimer();
    wrapper.update();
    expect(wrapper.find(Menu).getDOMNode().classList.contains('ant-menu-inline-collapsed')).toBe(
      true,
    );
    wrapper.find(Menu).simulate('mouseenter');
    expect(wrapper.find(Menu).getDOMNode().classList.contains('ant-menu-inline')).toBe(false);
    expect(wrapper.find(Menu).getDOMNode().classList.contains('ant-menu-vertical')).toBe(true);
  });

  it('onMouseEnter should work', () => {
    const onMouseEnter = jest.fn();
    const wrapper = mount(
      <Menu onMouseEnter={onMouseEnter} defaultSelectedKeys={['test1']}>
        <Menu.Item key="test1">Navigation One</Menu.Item>
        <Menu.Item key="test2">Navigation Two</Menu.Item>
      </Menu>,
    );
    wrapper.find('ul.ant-menu-root').simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();
  });

  it('MenuItem should not render Tooltip when inlineCollapsed is false', () => {
    const wrapper = mount(
      <Menu defaultSelectedKeys={['mail']} defaultOpenKeys={['mail']} mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>,
      { attachTo: div },
    );

    wrapper.find('li.ant-menu-item').first().simulate('mouseenter');

    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find('.ant-tooltip-inner').length).toBe(0);
  });

  it('MenuItem should render icon and icon should be the first child when icon exists', () => {
    const wrapper = mount(
      <Menu>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
      </Menu>,
    );
    expect(wrapper.find('.ant-menu-item .anticon').hasClass('anticon-mail')).toBe(true);
  });

  it('should controlled collapse work', () => {
    const wrapper = mount(
      <Menu mode="inline" inlineCollapsed={false}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
      </Menu>,
    );

    expect(wrapper.render()).toMatchSnapshot();

    wrapper.setProps({ inlineCollapsed: true });

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('not title if not collapsed', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Menu mode="inline" inlineCollapsed={false}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
      </Menu>,
    );

    wrapper.find('.ant-menu-item').hostNodes().simulate('mouseenter');
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();

    jest.useRealTimers();
  });

  it('props#onOpen and props#onClose do not warn anymore', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const onOpen = jest.fn();
    const onClose = jest.fn();
    render(
      <Menu
        defaultOpenKeys={['1']}
        mode="inline"
        onOpen={onOpen}
        onClose={onClose}
        items={[
          {
            key: '1',
            label: 'submenu1',
            children: [
              { key: 'submenu1', label: 'Option 1' },
              { key: 'submenu2', label: 'Option 2' },
            ],
          },
          { key: '2', label: 'menu2' },
        ]}
      />,
    );

    expect(errorSpy.mock.calls.length).toBe(1);
    expect(errorSpy.mock.calls[0][0]).not.toContain(
      '`onOpen` and `onClose` are removed, please use `onOpenChange` instead, see: https://u.ant.design/menu-on-open-change.',
    );
    expect(onOpen).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/18825
  // https://github.com/ant-design/ant-design/issues/8587
  it('should keep selectedKeys in state when collapsed to 0px', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Menu
        mode="inline"
        inlineCollapsed={false}
        defaultSelectedKeys={['1']}
        collapsedWidth={0}
        openKeys={['3']}
      >
        <Menu.Item key="1">Option 1</Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.SubMenu key="3" title="Option 3">
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.SubMenu>
      </Menu>,
    );
    expect(wrapper.find('li.ant-menu-item-selected').getDOMNode().textContent).toBe('Option 1');
    wrapper.find('li.ant-menu-item').at(1).simulate('click');
    expect(wrapper.find('li.ant-menu-item-selected').getDOMNode().textContent).toBe('Option 2');
    wrapper.setProps({ inlineCollapsed: true });

    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(
      wrapper
        .find('PopupTrigger')
        .map(node => node.prop('popupVisible'))
        .findIndex(node => !!node),
    ).toBe(-1);

    wrapper.setProps({ inlineCollapsed: false });
    expect(wrapper.find('li.ant-menu-item-selected').getDOMNode().textContent).toBe('Option 2');
    jest.useRealTimers();
  });

  it('Menu.Item with icon children auto wrap span', () => {
    const wrapper = mount(
      <Menu>
        <Menu.Item key="1" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="2" icon={<MailOutlined />}>
          <span>Navigation One</span>
        </Menu.Item>
        <Menu.SubMenu key="3" icon={<MailOutlined />} title="Navigation One" />
        <Menu.SubMenu key="4" icon={<MailOutlined />} title={<span>Navigation One</span>} />
      </Menu>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/23755
  it('should trigger onOpenChange when collapse inline menu', () => {
    const onOpenChange = jest.fn();
    function App() {
      const [inlineCollapsed, setInlineCollapsed] = useState(false);
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setInlineCollapsed(!inlineCollapsed);
            }}
          >
            collapse menu
          </button>
          <Menu mode="inline" onOpenChange={onOpenChange} inlineCollapsed={inlineCollapsed}>
            <Menu.SubMenu key="1" title="menu">
              <Menu.Item key="1-1">menu</Menu.Item>
              <Menu.Item key="1-2">menu</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </>
      );
    }
    const wrapper = mount(<App />);
    wrapper.find('button').simulate('click');
    expect(onOpenChange).toHaveBeenCalledWith([]);
  });

  it('Use first char as Icon when collapsed', () => {
    const wrapper = mount(
      <Menu mode="inline" inlineCollapsed>
        <Menu.SubMenu title="Light" />
        <Menu.Item>Bamboo</Menu.Item>
      </Menu>,
    );

    expect(wrapper.find('.ant-menu-inline-collapsed-noicon').first().text()).toEqual('L');
    expect(wrapper.find('.ant-menu-inline-collapsed-noicon').last().text()).toEqual('B');
  });

  it('divider should show', () => {
    const wrapper = mount(
      <Menu mode="vertical">
        <SubMenu key="sub1" title="Navigation One">
          <Menu.Item key="1">Option 1</Menu.Item>
        </SubMenu>
        <Menu.Divider dashed />
        <SubMenu key="sub2" title="Navigation Two">
          <Menu.Item key="2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Divider />
        <SubMenu key="sub4" title="Navigation Three">
          <Menu.Item key="3">Option 3</Menu.Item>
        </SubMenu>
      </Menu>,
    );

    expect(wrapper.find('li.ant-menu-item-divider').length).toBe(2);
    expect(wrapper.find('li.ant-menu-item-divider-dashed').length).toBe(1);
  });

  it('should support ref', async () => {
    const ref = React.createRef();
    const { container } = render(
      <Menu ref={ref}>
        <Menu.Item key="1">Option 1</Menu.Item>
      </Menu>,
    );
    expect(ref.current?.menu?.list).toBe(container.querySelector('ul'));
    ref.current?.focus();
    expect(document.activeElement).toBe(container.querySelector('li'));
  });

  it('expandIcon', () => {
    const wrapper = mount(
      <Menu defaultOpenKeys={['1']} mode="inline" expandIcon={() => <span className="bamboo" />}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
        </SubMenu>
      </Menu>,
    );

    expect(wrapper.exists('.bamboo')).toBeTruthy();
  });

  it('all types must be available in the "items" syntax', () => {
    const wrapper = mount(
      <Menu
        mode="inline"
        defaultOpenKeys={['submenu', 'group-submenu']}
        items={[
          {
            key: 'submenu',
            label: 'Submenu',
            children: [
              { key: 'submenu-item1', label: 'SubmenuItem 1' },
              { key: 'submenu-item2', label: 'SubmenuItem 2' },
            ],
          },
          { key: 'divider', type: 'divider' },
          {
            key: 'group',
            type: 'group',
            label: 'Group',
            children: [
              {
                key: 'group-item',
                label: 'GroupItem',
              },
              { key: 'group-divider', type: 'divider' },
              {
                key: 'group-submenu',
                label: 'GroupSubmenu',
                children: [
                  { key: 'group-submenu-item1', label: 'GroupSubmenuItem 1' },
                  { key: 'group-submenu-item2', label: 'GroupSubmenuItem 2' },
                ],
              },
            ],
          },
        ]}
      />,
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should not warning deprecated message when items={undefined}', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    mount(<Menu items={undefined} />);
    expect(errorSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('`children` will be removed in next major version'),
    );
    errorSpy.mockRestore();
  });
});
