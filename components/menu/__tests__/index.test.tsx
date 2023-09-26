import {
  AppstoreOutlined,
  InboxOutlined,
  MailOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import type { MenuProps, MenuRef } from '..';
import Menu from '..';
import { TriggerMockContext } from '../../../tests/shared/demoTestContext';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import initCollapseMotion from '../../_util/motion';
import { noop } from '../../_util/warning';
import Layout from '../../layout';
import OverrideContext from '../OverrideContext';

Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', {
  writable: true,
  value: true,
});

type MouseEvent = 'click' | 'mouseEnter' | 'mouseLeave';

const { SubMenu } = Menu;

describe('Menu', () => {
  function triggerAllTimer() {
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }
  }

  const expectSubMenuBehavior = (
    defaultTestProps: MenuProps,
    instance: ReturnType<typeof render>,
    enter = noop,
    leave = noop,
  ) => {
    const { container } = instance;

    expect(container.querySelectorAll('ul.ant-menu-sub')).toHaveLength(0);
    const AnimationClassNames = {
      horizontal: 'ant-slide-up-leave',
      inline: 'ant-motion-collapse-leave',
      vertical: 'ant-zoom-big-leave',
    };
    const mode = defaultTestProps.mode || 'horizontal';

    act(() => {
      enter();
    });

    // React concurrent may delay creating this
    triggerAllTimer();

    function getSubMenu() {
      return container.querySelector<HTMLUListElement | HTMLDivElement>(
        mode === 'inline' ? 'ul.ant-menu-sub.ant-menu-inline' : 'div.ant-menu-submenu-popup',
      );
    }

    expect(
      getSubMenu()?.classList.contains('ant-menu-hidden') ||
        getSubMenu()?.classList.contains(AnimationClassNames[mode]),
    ).toBeFalsy();

    act(() => {
      leave();
    });

    // React concurrent may delay creating this
    triggerAllTimer();

    if (getSubMenu()) {
      expect(
        getSubMenu()?.classList.contains('ant-menu-hidden') ||
          getSubMenu()?.classList.contains(AnimationClassNames[mode]),
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

  const RtlDemo: React.FC = () => (
    <Menu>
      <Menu.Item />
      <Menu.ItemGroup />
      <Menu.SubMenu />
    </Menu>
  );

  rtlTest(RtlDemo);

  let div: HTMLDivElement;

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('If has select nested submenu item ,the menu items on the grandfather level should be highlight', () => {
    const { container } = render(
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
    expect(container.querySelectorAll('li.ant-menu-submenu-selected').length).toBe(1);
  });

  it('forceSubMenuRender', () => {
    const { container, rerender } = render(
      <Menu mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="1-1">
            <span className="bamboo" />
          </Menu.Item>
        </SubMenu>
      </Menu>,
    );

    expect(container.querySelector('.bamboo')).toBeFalsy();

    rerender(
      <Menu mode="horizontal" forceSubMenuRender>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="1-1">
            <span className="bamboo" />
          </Menu.Item>
        </SubMenu>
      </Menu>,
    );
    expect(container.querySelector('.bamboo')).toBeTruthy();
  });

  it('should accept defaultOpenKeys in mode horizontal', () => {
    const { container } = render(
      <Menu defaultOpenKeys={['1']} mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );

    expect(
      container.querySelector('.ant-menu-submenu-open')?.querySelector('.ant-menu-submenu-title')
        ?.textContent,
    ).toEqual('submenu1');
  });

  it('should accept defaultOpenKeys in mode inline', () => {
    const { container } = render(
      <Menu defaultOpenKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );

    expect(
      container.querySelector('.ant-menu-submenu-open')?.querySelector('.ant-menu-submenu-title')
        ?.textContent,
    ).toEqual('submenu1');
  });

  it('should accept defaultOpenKeys in mode vertical', () => {
    const { container } = render(
      <Menu defaultOpenKeys={['1']} mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    expect(container.querySelector('.ant-menu-sub')).toBeFalsy();
  });

  it('should accept openKeys in mode horizontal', () => {
    const { container } = render(
      <Menu openKeys={['1']} mode="horizontal">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    triggerAllTimer();
    expect(container.querySelector('div.ant-menu-submenu-popup')).not.toHaveClass(
      'ant-menu-submenu-hidden',
    );
  });

  it('should accept openKeys in mode inline', () => {
    const { container } = render(
      <Menu openKeys={['1']} mode="inline">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    expect(container.querySelector('ul.ant-menu-sub')).not.toHaveClass('ant-menu-hidden');
  });

  it('should accept openKeys in mode vertical', () => {
    const { container } = render(
      <Menu openKeys={['1']} mode="vertical">
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>,
    );
    triggerAllTimer();
    expect(container.querySelector('div.ant-menu-submenu-popup')).not.toHaveClass(
      'ant-menu-submenu-hidden',
    );
  });

  it('test submenu in mode horizontal', async () => {
    const defaultTestProps: MenuProps = { mode: 'horizontal' };

    const Demo: React.FC<MenuProps> = (props) => (
      <Menu {...defaultTestProps} {...props}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );

    const instance = render(<Demo />);

    expectSubMenuBehavior(
      defaultTestProps,
      instance,
      () => instance.rerender(<Demo openKeys={['1']} />),
      () => instance.rerender(<Demo openKeys={[]} />),
    );

    instance.rerender(<Demo openKeys={['1']} />);
  });

  it('test submenu in mode inline', () => {
    const defaultTestProps: MenuProps = { mode: 'inline' };
    const Demo: React.FC<MenuProps> = (props) => (
      <Menu {...defaultTestProps} {...props}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );
    const instance = render(<Demo />);
    expectSubMenuBehavior(
      defaultTestProps,
      instance,
      () => instance.rerender(<Demo openKeys={['1']} />),
      () => instance.rerender(<Demo openKeys={[]} />),
    );
  });

  it('test submenu in mode vertical', () => {
    const defaultTestProps: MenuProps = { mode: 'vertical' };
    const Demo: React.FC<MenuProps> = (props) => (
      <Menu {...defaultTestProps} {...props}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
          <Menu.Item key="submenu2">Option 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="2">menu2</Menu.Item>
      </Menu>
    );

    const instance = render(<Demo />);
    expectSubMenuBehavior(
      defaultTestProps,
      instance,
      () => instance.rerender(<Demo openKeys={['1']} />),
      () => instance.rerender(<Demo openKeys={[]} />),
    );
  });

  describe('allows the overriding of theme at the popup submenu level', () => {
    const menuModesWithPopupSubMenu: MenuProps['mode'][] = ['horizontal', 'vertical'];
    menuModesWithPopupSubMenu.forEach((menuMode) => {
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
    const Demo: React.FC<MenuProps> = (props) => (
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
    const Demo: React.FC<MenuProps> = (props) => (
      <Menu defaultOpenKeys={['1']} mode="inline" {...props}>
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

    expect(container.querySelector('li.ant-menu-submenu-inline')).toHaveClass(
      'ant-menu-submenu-open',
    );
    // inlineCollapsed
    rerender(<Demo inlineCollapsed />);

    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('ul.ant-menu-root')).toHaveClass('ant-menu-vertical');
    expect(container.querySelector('.ant-menu-submenu-popup')).toBeFalsy();

    // !inlineCollapsed
    rerender(<Demo inlineCollapsed={false} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelector('ul.ant-menu-sub')).toHaveClass('ant-menu-inline');
    expect(container.querySelector('li.ant-menu-submenu-inline')).toHaveClass(
      'ant-menu-submenu-open',
    );
  });

  it('inlineCollapsed should works well when specify a not existed default openKeys', () => {
    const Demo: React.FC<MenuProps> = (props) => (
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
    fireEvent(container.querySelector('ul')!, transitionEndEvent);
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.mouseEnter(container.querySelector('.ant-menu-submenu-title')!);
    triggerAllTimer();

    expect(container.querySelector('.ant-menu-submenu')).toHaveClass('ant-menu-submenu-vertical');
    expect(container.querySelector('.ant-menu-submenu')).toHaveClass('ant-menu-submenu-open');
    expect(container.querySelector('ul.ant-menu-sub')).toHaveClass('ant-menu-vertical');
    expect(container.querySelector('ul.ant-menu-sub')).not.toHaveClass('ant-menu-hidden');
  });

  it('inlineCollapsed Menu.Item Tooltip can be removed', () => {
    const { container } = render(
      <Menu
        defaultOpenKeys={['not-existed']}
        mode="inline"
        inlineCollapsed
        getPopupContainer={(node) => node.parentNode as HTMLElement}
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
    fireEvent.mouseEnter(container.querySelectorAll('li.ant-menu-item')[0]);
    fireEvent.mouseEnter(container.querySelectorAll('li.ant-menu-item')[1]);
    fireEvent.mouseEnter(container.querySelectorAll('li.ant-menu-item')[2]);
    fireEvent.mouseEnter(container.querySelectorAll('li.ant-menu-item')[3]);
    fireEvent.mouseEnter(container.querySelectorAll('li.ant-menu-item')[4]);
    fireEvent.mouseEnter(container.querySelectorAll('li.ant-menu-item')[5]);

    triggerAllTimer();
    // when title is null or '' and false, tooltip will not render.
    expect(container.querySelectorAll('.ant-tooltip-inner').length).toBe(3);
    expect(container.querySelectorAll('.ant-tooltip-inner')[0].textContent).toBe('item');
    expect(container.querySelectorAll('.ant-tooltip-inner')[1].textContent).toBe('title');
    expect(container.querySelectorAll('.ant-tooltip-inner')[2].textContent).toBe('item');
  });

  describe('open submenu when click submenu title', () => {
    const toggleMenu = (
      instance: ReturnType<typeof render>,
      index: number,
      event: MouseEvent,
    ): void => {
      fireEvent[event](instance.container.querySelectorAll('.ant-menu-submenu-title')[index]);
      triggerAllTimer();
    };

    it('inline', () => {
      const defaultTestProps: MenuProps = { mode: 'inline' };
      const Demo: React.FC<MenuProps> = (props) => (
        <Menu {...defaultTestProps} {...props}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultTestProps,
        instance,
        () => toggleMenu(instance, 0, 'click'),
        () => toggleMenu(instance, 0, 'click'),
      );
    });

    it('inline menu collapseMotion should be triggered', async () => {
      const cloneMotion = {
        ...initCollapseMotion(),
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

      fireEvent.click(container.querySelector('.ant-menu-submenu-title')!);

      triggerAllTimer();

      expect(onOpenChange).toHaveBeenCalled();
      expect(onEnterEnd).toHaveBeenCalledTimes(1);
    });

    it('vertical with hover(default)', () => {
      const defaultTestProps: MenuProps = { mode: 'vertical' };
      const Demo: React.FC = () => (
        <Menu {...defaultTestProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultTestProps,
        instance,
        () => toggleMenu(instance, 0, 'mouseEnter'),
        () => toggleMenu(instance, 0, 'mouseLeave'),
      );
    });

    it('vertical with click', () => {
      const defaultTestProps: MenuProps = { mode: 'vertical', triggerSubMenuAction: 'click' };
      const Demo: React.FC = () => (
        <Menu {...defaultTestProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultTestProps,
        instance,
        () => toggleMenu(instance, 0, 'click'),
        () => toggleMenu(instance, 0, 'click'),
      );
    });

    it('horizontal with hover(default)', () => {
      const defaultTestProps: MenuProps = { mode: 'horizontal' };
      const Demo: React.FC = () => (
        <Menu {...defaultTestProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultTestProps,
        instance,
        () => toggleMenu(instance, 0, 'mouseEnter'),
        () => toggleMenu(instance, 0, 'mouseLeave'),
      );
    });

    it('horizontal with click', () => {
      const defaultTestProps: MenuProps = { mode: 'horizontal', triggerSubMenuAction: 'click' };
      const Demo: React.FC = () => (
        <Menu {...defaultTestProps}>
          <SubMenu key="1" title="submenu1">
            <Menu.Item key="submenu1">Option 1</Menu.Item>
            <Menu.Item key="submenu2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">menu2</Menu.Item>
        </Menu>
      );

      const instance = render(<Demo />);

      expectSubMenuBehavior(
        defaultTestProps,
        instance,
        () => toggleMenu(instance, 0, 'click'),
        () => toggleMenu(instance, 0, 'click'),
      );
    });
  });

  it('inline title', () => {
    const { container } = render(
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
    fireEvent.mouseEnter(container.querySelector('.ant-menu-item')!);
    triggerAllTimer();
    expect(container.querySelector('.ant-tooltip-inner')?.textContent).toBe('bamboo lucky');
  });

  it('render correctly when using with Layout.Sider', () => {
    const Demo: React.FC = () => {
      const [collapsed, setCollapsed] = useState<boolean>(false);
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
          >
            <div className="demo-logo" />
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
    };

    const { container } = render(<Demo />);

    expect(container.querySelector('ul.ant-menu-root')).toHaveClass('ant-menu-inline');

    fireEvent.click(container.querySelector('.ant-menu-submenu-title')!);
    fireEvent.click(container.querySelector('.ant-layout-sider-trigger')!);
    triggerAllTimer();
    expect(container.querySelector('ul.ant-menu-root')).toHaveClass('ant-menu-inline-collapsed');

    fireEvent.mouseEnter(container.querySelector('ul.ant-menu-root')!);
    expect(container.querySelector('ul.ant-menu-root')).not.toHaveClass('ant-menu-inline');
    expect(container.querySelector('ul.ant-menu-root')).toHaveClass('ant-menu-vertical');
  });

  it('onMouseEnter should work', () => {
    const onMouseEnter = jest.fn();
    const { container } = render(
      <Menu onMouseEnter={onMouseEnter} defaultSelectedKeys={['test1']}>
        <Menu.Item key="test1">Navigation One</Menu.Item>
        <Menu.Item key="test2">Navigation Two</Menu.Item>
      </Menu>,
    );
    fireEvent.mouseEnter(container.querySelector('ul.ant-menu-root')!);
    expect(onMouseEnter).toHaveBeenCalled();
  });

  it('MenuItem should not render Tooltip when inlineCollapsed is false', () => {
    const { container } = render(
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
    );

    fireEvent.mouseEnter(container.querySelector('li.ant-menu-item')!);
    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelectorAll('.ant-tooltip-inner').length).toBe(0);
  });

  it('MenuItem should render icon and icon should be the first child when icon exists', () => {
    const { container } = render(
      <Menu>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
      </Menu>,
    );
    expect(container.querySelector('.ant-menu-item .anticon')).toHaveClass('anticon-mail');
  });

  it('should controlled collapse work', () => {
    const { asFragment, rerender } = render(
      <Menu mode="inline" inlineCollapsed={false}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
      </Menu>,
    );

    expect(asFragment()).toMatchSnapshot();

    rerender(
      <Menu mode="inline" inlineCollapsed>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
      </Menu>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('not title if not collapsed', () => {
    jest.useFakeTimers();
    const { container } = render(
      <Menu mode="inline" inlineCollapsed={false}>
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          Option 1
        </Menu.Item>
      </Menu>,
    );
    fireEvent.mouseEnter(container.querySelector('.ant-menu-item')!);
    act(() => {
      jest.runAllTimers();
    });

    expect(container.querySelectorAll('.ant-tooltip-inner').length).toBeFalsy();

    jest.useRealTimers();
  });

  it('props#onOpen and props#onClose do not warn anymore', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const Demo: React.FC = () => {
      const menuProps = useMemo<MenuProps>(() => ({ onOpen, onClose }) as MenuProps, []);
      return (
        <Menu
          {...menuProps}
          defaultOpenKeys={['1']}
          mode="inline"
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
        />
      );
    };
    render(<Demo />);
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
    const Demo: React.FC<MenuProps> = (props) => {
      const menuProps = useMemo<MenuProps>(() => ({ collapsedWidth: 0 }) as MenuProps, []);
      return (
        <Menu
          mode="inline"
          inlineCollapsed={false}
          defaultSelectedKeys={['1']}
          openKeys={['3']}
          {...menuProps}
          {...props}
        >
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.SubMenu key="3" title="Option 3">
            <Menu.Item key="4">Option 4</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      );
    };

    const { container, rerender } = render(<Demo />);
    expect(container.querySelector('li.ant-menu-item-selected')?.textContent).toBe('Option 1');
    fireEvent.click(container.querySelectorAll('li.ant-menu-item')[1]);
    expect(container.querySelector('li.ant-menu-item-selected')?.textContent).toBe('Option 2');

    rerender(<Demo inlineCollapsed />);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelector('li.ant-menu-item-selected')?.textContent).toBe('O');

    rerender(<Demo inlineCollapsed={false} />);

    expect(container.querySelector('li.ant-menu-item-selected')?.textContent).toBe('Option 2');
    jest.useRealTimers();
  });

  it('Menu.Item with icon children auto wrap span', () => {
    const { asFragment } = render(
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
    expect(asFragment()).toMatchSnapshot();
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
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    expect(onOpenChange).toHaveBeenCalledWith([]);
  });

  it('Use first char as Icon when collapsed', () => {
    const { container } = render(
      <Menu mode="inline" inlineCollapsed>
        <Menu.SubMenu title="Light" />
        <Menu.Item>Bamboo</Menu.Item>
      </Menu>,
    );
    expect(container.querySelectorAll('.ant-menu-inline-collapsed-noicon')[0]?.textContent).toEqual(
      'L',
    );
    expect(container.querySelectorAll('.ant-menu-inline-collapsed-noicon')[1]?.textContent).toEqual(
      'B',
    );
  });

  it('divider should show', () => {
    const { container } = render(
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

    expect(container.querySelectorAll('li.ant-menu-item-divider').length).toBe(2);
    expect(container.querySelectorAll('li.ant-menu-item-divider-dashed').length).toBe(1);
  });

  it('should support ref', async () => {
    const ref = React.createRef<MenuRef>();
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
    const { container } = render(
      <Menu defaultOpenKeys={['1']} mode="inline" expandIcon={() => <span className="bamboo" />}>
        <SubMenu key="1" title="submenu1">
          <Menu.Item key="submenu1">Option 1</Menu.Item>
        </SubMenu>
      </Menu>,
    );

    expect(container.querySelector('.bamboo')).toBeTruthy();
  });

  it('all types must be available in the "items" syntax', () => {
    const { asFragment } = render(
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
              { key: 'group-item', label: 'GroupItem' },
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

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not warning deprecated message when items={undefined}', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Menu items={undefined} />);
    expect(errorSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('`children` will be removed in next major version'),
    );
    errorSpy.mockRestore();
  });

  it('expandIconClassName', () => {
    const { container } = render(
      <Menu
        expandIcon={<span className="custom-expand-icon" />}
        inlineCollapsed
        items={[
          {
            label: 'Option 1',
            key: '1',
            icon: '112',
            children: [
              {
                label: 'Option 1-1',
                key: '1-1',
              },
            ],
          },
        ]}
      />,
    );
    expect(container.querySelector('.custom-expand-icon')).toBeTruthy();
  });

  // https://github.com/ant-design/ant-design/issues/40041
  it('should not show icon when inlineCollapsed', () => {
    const { container } = render(
      <Menu
        expandIcon={<span className="bamboo">I</span>}
        inlineCollapsed
        items={[
          {
            label: 'Option 1',
            key: '1',
            icon: '112',
            children: [
              {
                label: 'Option 1-1',
                key: '1-1',
              },
            ],
          },
        ]}
      />,
    );

    expect(container.querySelector('.bamboo')).toBeTruthy();
    expect(getComputedStyle(container.querySelector('.bamboo') as HTMLElement)).toHaveProperty(
      'opacity',
      '0',
    );
  });

  it('Overflow indicator className should not override menu class', () => {
    const { container } = render(
      <TriggerMockContext.Provider value={{ popupVisible: true }}>
        <Menu
          items={[
            { key: '1', label: 'Option 1' },
            { key: '2', label: 'Option 1' },
            { key: '3', label: 'Option 1' },
            { key: '4', label: 'Option 1' },
            { key: '5', label: 'Option 1' },
            { key: '6', label: 'Option 1' },
            { key: '7', label: 'Option 1' },
            { key: '8', label: 'Option 1' },
          ]}
          mode="horizontal"
          overflowedIndicatorPopupClassName="custom-popover"
          getPopupContainer={(node) => node.parentElement!}
        />
      </TriggerMockContext.Provider>,
    );
    expect(container.querySelector('.ant-menu.ant-menu-light.custom-popover')).toBeTruthy();
  });

  it('hide expand icon when pass null or false into expandIcon', () => {
    const App = ({ expand }: { expand?: React.ReactNode }) => (
      <Menu
        expandIcon={expand}
        items={[
          {
            label: 'Option 1',
            key: '1',
            icon: '112',
            children: [
              {
                label: 'Option 1-1',
                key: '1-1',
              },
            ],
          },
        ]}
      />
    );
    const { container, rerender } = render(<App />);
    expect(container.querySelector('.ant-menu-submenu-arrow')).toBeTruthy();

    rerender(<App expand={null} />);

    expect(container.querySelector('.ant-menu-submenu-arrow')).toBeFalsy();

    rerender(<App expand={false} />);

    expect(container.querySelector('.ant-menu-submenu-arrow')).toBeFalsy();

    rerender(
      <OverrideContext.Provider value={{ expandIcon: null }}>
        <App />
      </OverrideContext.Provider>,
    );
    expect(container.querySelector('.ant-menu-submenu-arrow')).toBeFalsy();

    rerender(
      <OverrideContext.Provider value={{ expandIcon: false }}>
        <App />
      </OverrideContext.Provider>,
    );
    expect(container.querySelector('.ant-menu-submenu-arrow')).toBeFalsy();
  });
});
