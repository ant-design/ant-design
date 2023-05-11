import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import Layout from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import Menu from '../../menu';

const { Sider, Content, Footer, Header } = Layout;

describe('Layout', () => {
  mountTest(Layout);
  mountTest(Content);
  mountTest(Sider);
  mountTest(() => (
    <Layout>
      <Sider breakpoint="xs" />
      <Content />
    </Layout>
  ));

  rtlTest(Layout);
  rtlTest(Content);
  rtlTest(Sider);

  it('detect the sider as children', () => {
    const { container, unmount } = render(
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>,
    );
    expect(container.querySelector('.ant-layout')?.className.includes('ant-layout-has-sider')).toBe(
      true,
    );
    unmount();
  });

  it('umount from multiple siders', async () => {
    const App: React.FC = () => {
      const [hide1, setHide1] = useState(false);
      const [hide2, setHide2] = useState(false);
      return (
        <Layout>
          {hide1 ? null : <Sider>Sider</Sider>}
          {hide2 ? null : <Sider>Sider</Sider>}
          <Content>
            <button onClick={() => setHide1(true)} type="button">
              hide sider 1
            </button>
            <button onClick={() => setHide2(true)} type="button">
              hide sider 2
            </button>
          </Content>
        </Layout>
      );
    };
    const { container } = render(<App />);
    expect(container.querySelector('.ant-layout')?.className.includes('ant-layout-has-sider')).toBe(
      true,
    );
    fireEvent.click(container.querySelectorAll('button')[0]);
    expect(container.querySelector('.ant-layout')?.className.includes('ant-layout-has-sider')).toBe(
      true,
    );
    fireEvent.click(container.querySelectorAll('button')[1]);
    expect(container.querySelector('.ant-layout')?.className.includes('ant-layout-has-sider')).toBe(
      false,
    );
  });

  it('detect the sider inside the children', async () => {
    const { container } = render(
      <Layout>
        <div>
          <Sider>Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(container.querySelector('.ant-layout')?.className.includes('ant-layout-has-sider')).toBe(
      true,
    );
  });

  it('detect ant-layout-sider-has-trigger class in sider when ant-layout-sider-trigger div tag exists', async () => {
    const { container } = render(
      <Layout>
        <div>
          <Sider collapsible>Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(
      container
        .querySelector('.ant-layout-sider')
        ?.className.includes('ant-layout-sider-has-trigger'),
    ).toBe(true);
  });

  it('should have 50% width of sidebar', async () => {
    const { container } = render(
      <Layout>
        <div>
          <Sider width="50%">Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(container.querySelector<HTMLElement>('.ant-layout-sider')?.style.width).toBe('50%');
    expect(container.querySelector<HTMLElement>('.ant-layout-sider')?.style.flex).toBe('0 0 50%');
  });

  describe('zeroWidth', () => {
    it('detect ant-layout-sider-zero-width class in sider when its width is 0%', async () => {
      const { container } = render(
        <Layout>
          <div>
            <Sider width="0%">Sider</Sider>
          </div>
          <Content>Content</Content>
        </Layout>,
      );
      expect(
        container
          .querySelector('.ant-layout-sider')
          ?.className.includes('ant-layout-sider-zero-width'),
      ).toBe(true);
    });

    describe('should collapsible', () => {
      it('uncontrolled', () => {
        const onCollapse = jest.fn();

        const { container } = render(
          <Layout>
            <Sider collapsible breakpoint="lg" collapsedWidth="0" onCollapse={onCollapse}>
              Sider
            </Sider>
            <Content>Content</Content>
          </Layout>,
        );

        onCollapse.mockReset();
        fireEvent.click(container.querySelector('.ant-layout-sider-zero-width-trigger')!);
        expect(onCollapse).toHaveBeenCalledTimes(1);
      });

      it('controlled', () => {
        const Demo: React.FC = () => {
          const [collapsed, setCollapsed] = React.useState(true);

          return (
            <Layout>
              <Sider
                collapsed={collapsed}
                collapsible
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={setCollapsed}
              >
                Sider
              </Sider>
              <Content>Content</Content>
            </Layout>
          );
        };

        const { container } = render(<Demo />);
        expect(container.querySelector('.ant-layout-sider-collapsed')).toBeTruthy();
        fireEvent.click(container.querySelector('.ant-layout-sider-zero-width-trigger')!);
        expect(container.querySelector('.ant-layout-sider-collapsed')).toBeFalsy();
      });
    });
  });

  it('detect ant-layout-sider-dark as default theme', async () => {
    const { container } = render(<Sider>Sider</Sider>);
    expect(
      container.querySelector('.ant-layout-sider')?.className.includes('ant-layout-sider-dark'),
    ).toBe(true);
  });

  it('detect ant-layout-sider-light when set light theme', async () => {
    const { container } = render(<Sider theme="light">Sider</Sider>);
    expect(
      container.querySelector('.ant-layout-sider')?.className.includes('ant-layout-sider-light'),
    ).toBe(true);
  });

  it('renders string width correctly', () => {
    const { asFragment } = render(<Sider width="200">Sider</Sider>);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should be controlled by collapsed', () => {
    const { asFragment, rerender } = render(<Sider>Sider</Sider>);
    expect(asFragment().firstChild).toMatchSnapshot();
    rerender(<Sider collapsed>Sider</Sider>);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should not add ant-layout-has-sider when `hasSider` is `false`', () => {
    const { container } = render(
      <Layout hasSider={false}>
        <Sider>Sider</Sider>
      </Layout>,
    );
    expect(container.querySelector('.ant-layout')?.className.includes('ant-layout-has-sider')).toBe(
      false,
    );
  });

  it('render correct with Tooltip', () => {
    jest.useFakeTimers();
    const { container, rerender } = render(
      <Sider collapsible collapsed={false}>
        <Menu mode="inline">
          <Menu.Item key="1">
            <UserOutlined />
            <span>Light</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    );

    fireEvent.mouseEnter(container.querySelector('.ant-menu-item')!);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-tooltip-inner').length).toBeFalsy();
    rerender(
      <Sider collapsible collapsed>
        <Menu mode="inline">
          <Menu.Item key="1">
            <UserOutlined />
            <span>Light</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    );
    fireEvent.mouseEnter(container.querySelector('.ant-menu-item')!);
    act(() => {
      jest.runAllTimers();
    });
    expect(container.querySelectorAll('.ant-tooltip-inner').length).toBeTruthy();

    jest.useRealTimers();
  });
});

describe('Sider', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('should trigger onBreakpoint', async () => {
    const onBreakpoint = jest.fn();

    render(
      <Sider breakpoint="md" onBreakpoint={onBreakpoint}>
        Sider
      </Sider>,
    );
    expect(onBreakpoint).toHaveBeenCalledWith(true);
  });

  it('should warning if use `inlineCollapsed` with menu', () => {
    render(
      <Sider collapsible>
        <Menu mode="inline" inlineCollapsed />
      </Sider>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Menu] `inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
    );
  });

  it('zeroWidthTriggerStyle should work', () => {
    const { container } = render(
      <Sider collapsedWidth={0} collapsible zeroWidthTriggerStyle={{ background: '#F96' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <UserOutlined />
            <span>nav 1</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    );
    expect(
      container.querySelector<HTMLDivElement>('.ant-layout-sider-zero-width-trigger')?.style
        .background,
    ).toEqual('rgb(255, 153, 102)');
  });

  it('should be able to customize zero width trigger by trigger prop', () => {
    const { container } = render(
      <Sider collapsedWidth={0} collapsible trigger={<span className="my-trigger" />}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <UserOutlined />
            <span>nav 1</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    );
    expect(
      container.querySelector('.ant-layout-sider-zero-width-trigger')?.querySelector('.my-trigger'),
    ).toBeTruthy();
  });

  (['Layout', 'Header', 'Footer', 'Sider'] as const).forEach((tag) => {
    const ComponentMap = { Layout, Header, Footer, Sider };

    it(`should get ${tag} element from ref`, () => {
      const ref = React.createRef<HTMLDivElement>();
      const onSelect = jest.fn();
      const Component = ComponentMap[tag];
      render(
        <Component onSelect={onSelect} ref={ref}>
          {tag}
        </Component>,
      );
      expect(ref.current instanceof HTMLElement).toBe(true);
    });
  });
});
