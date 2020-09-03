import React, { useState } from 'react';
import { mount, render } from 'enzyme';
import Layout from '..';
import Icon from '../../icon';
import Menu from '../../menu';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

const { Sider, Content } = Layout;

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
    const wrapper = mount(
      <Layout>
        <Sider>Sider</Sider>
        <Content>Content</Content>
      </Layout>,
    );
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(true);
    wrapper.unmount();
  });

  it('umount from multiple siders', async () => {
    const App = () => {
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
    const wrapper = mount(<App />);
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(true);
    wrapper.find('button').at(0).simulate('click');
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(true);
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(false);
  });

  it('detect the sider inside the children', async () => {
    const wrapper = mount(
      <Layout>
        <div>
          <Sider>Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(true);
  });

  it('detect ant-layout-sider-has-trigger class in sider when ant-layout-sider-trigger div tag exists', async () => {
    const wrapper = mount(
      <Layout>
        <div>
          <Sider collapsible>Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(wrapper.find('.ant-layout-sider').hasClass('ant-layout-sider-has-trigger')).toBe(true);
  });

  it('should have 50% width of sidebar', async () => {
    const wrapper = mount(
      <Layout>
        <div>
          <Sider width="50%">Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(wrapper.find('.ant-layout-sider').at(0).prop('style').width).toBe('50%');
    expect(wrapper.find('.ant-layout-sider').at(0).prop('style').flex).toBe('0 0 50%');
  });

  it('detect ant-layout-sider-zero-width class in sider when its width is 0%', async () => {
    const wrapper = mount(
      <Layout>
        <div>
          <Sider width="0%">Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(wrapper.find('.ant-layout-sider').hasClass('ant-layout-sider-zero-width')).toBe(true);
  });

  it('detect ant-layout-sider-dark as default theme', async () => {
    const wrapper = mount(<Sider>Sider</Sider>);
    expect(wrapper.find('.ant-layout-sider').hasClass('ant-layout-sider-dark')).toBe(true);
  });

  it('detect ant-layout-sider-light when set light theme', async () => {
    const wrapper = mount(<Sider theme="light">Sider</Sider>);
    expect(wrapper.find('.ant-layout-sider').hasClass('ant-layout-sider-light')).toBe(true);
  });

  it('renders string width correctly', () => {
    const wrapper = render(<Sider width="200">Sider</Sider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be controlled by collapsed', () => {
    const wrapper = mount(<Sider>Sider</Sider>);
    expect(wrapper.find('InternalSider').instance().state.collapsed).toBe(false);
    wrapper.setProps({ collapsed: true });
    expect(wrapper.find('InternalSider').instance().state.collapsed).toBe(true);
  });

  it('should not add ant-layout-has-sider when `hasSider` is `false`', () => {
    const wrapper = mount(
      <Layout hasSider={false}>
        <Sider>Sider</Sider>
      </Layout>,
    );
    expect(wrapper.find('.ant-layout').hasClass('ant-layout-has-sider')).toBe(false);
  });

  it('render correct with Tooltip', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <Sider collapsible collapsed={false}>
        <Menu mode="inline">
          <Menu.Item key="1">
            <Icon type="user" />
            <span>Light</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    );

    wrapper.find('.ant-menu-item').simulate('mouseenter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-tooltip-inner').length).toBeFalsy();
    wrapper.find('.ant-menu-item').simulate('mouseout');
    jest.runAllTimers();
    wrapper.update();

    wrapper.setProps({ collapsed: true });
    wrapper.find('.ant-menu-item').simulate('mouseenter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.ant-tooltip-inner').length).toBeTruthy();

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

    mount(
      <Sider breakpoint="md" onBreakpoint={onBreakpoint}>
        Sider
      </Sider>,
    );
    expect(onBreakpoint).toHaveBeenCalledWith(true);
  });

  it('should warning if use `inlineCollapsed` with menu', () => {
    mount(
      <Sider collapsible>
        <Menu mode="inline" inlineCollapsed />
      </Sider>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Menu] `inlineCollapsed` not control Menu under Sider. Should set `collapsed` on Sider instead.',
    );
  });

  it('zeroWidthTriggerStyle should work', () => {
    const wrapper = mount(
      <Sider collapsedWidth={0} collapsible zeroWidthTriggerStyle={{ background: '#F96' }}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    );
    expect(wrapper.find('.ant-layout-sider-zero-width-trigger').props().style).toEqual({
      background: '#F96',
    });
  });

  it('should be able to customize zero width trigger by trigger prop', () => {
    const wrapper = mount(
      <Sider collapsedWidth={0} collapsible trigger={<span className="my-trigger" />}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
        </Menu>
      </Sider>,
    );
    expect(wrapper.find('.ant-layout-sider-zero-width-trigger').find('.my-trigger').length).toBe(1);
  });
});
