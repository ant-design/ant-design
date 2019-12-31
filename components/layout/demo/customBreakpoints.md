---
order: 5
title:
  zh-CN: 响应式布局
  en-US: Custom Breakpoint
---

## zh-CN

<!-- Layout.Sider 支持响应式布局。

> 说明：配置 `breakpoint` 属性即生效，视窗宽度小于 `breakpoint` 时 Sider 缩小为 `collapsedWidth` 宽度，若将 `collapsedWidth` 设置为零，会出现特殊 trigger。 -->

## en-US

Layout.Sider supports the option to setup custom breakpoints.

> Note: You need to add the values of the breakpoints in px - ex '1000px'. These breakpoints will be used when you setup a `breakpoint`. The Sider will collapse to the width of `collapsedWidth` when window width is below the `breakpoint` (Using the value that you provided in the object as a breakpoint).

```jsx
import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const customBreakpointMap = {
  xs: '299.98px',
  sm: '599.98px',
  md: '849.98px',
  lg: '1023.98px',
  xl: '1319.98px',
  xxl: '1799.98px',
};

ReactDOM.render(
  <Layout>
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      breakpointMap={customBreakpointMap}
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="1">
          <Icon type="user" />
          <span className="nav-text">nav 1</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="video-camera" />
          <span className="nav-text">nav 2</span>
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="upload" />
          <span className="nav-text">nav 3</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="user" />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>content</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>,
  mountNode,
);
```

```css
#components-layout-demo-responsive .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
```
