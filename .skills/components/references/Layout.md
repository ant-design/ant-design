# Layout — 布局

## 功能概述

协助进行页面级整体布局。包含 Header、Sider、Content、Footer 等子组件。

## 输入字段

### Layout 属性

- `children`: ReactNode，子组件。
- `hasSider`: boolean，包含 Sider 时可设为 `true`，一般不需要手动指定。
- `className`: string，类名。
- `style`: CSSProperties，样式。

### Layout.Header / Layout.Footer / Layout.Content 属性

- `children`: ReactNode，子组件。
- `className`: string，类名。
- `style`: CSSProperties，样式。

### Layout.Sider 属性

- `children`: ReactNode，子组件。
- `breakpoint`: string，触发响应式布局的断点，可选 `xs` | `sm` | `md` | `lg` | `xl` | `xxl`。
- `collapsed`: boolean，当前收起状态（受控）。
- `defaultCollapsed`: boolean，默认收起状态。
- `collapsedWidth`: number，收起后宽度，默认 `80`。
- `collapsible`: boolean，是否可收起，默认 `false`。
- `reverseArrow`: boolean，翻转折叠按钮方向。
- `trigger`: ReactNode | null，自定义触发器，设为 `null` 隐藏。
- `width`: number | string，宽度，默认 `200`。
- `theme`: string，主题，可选 `light` | `dark`，默认 `dark`。
- `zeroWidthTriggerStyle`: CSSProperties，宽度为 0 时触发器样式。
- `onBreakpoint`: (broken) => void，断点触发回调。
- `onCollapse`: (collapsed, type) => void，展开/收起回调。

## 使用建议

上-中-下布局使用 Header + Content + Footer；侧边栏布局使用 Sider + Layout；侧边栏固定使用 `fixed` 定位。

## 示例代码

```tsx
import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            { key: '1', icon: <UserOutlined />, label: 'nav 1' },
            { key: '2', icon: <VideoCameraOutlined />, label: 'nav 2' },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          {collapsed ? (
            <MenuUnfoldOutlined onClick={() => setCollapsed(false)} />
          ) : (
            <MenuFoldOutlined onClick={() => setCollapsed(true)} />
          )}
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>Content</Content>
      </Layout>
    </Layout>
  );
};
```

## 返回结果

渲染一个页面级布局结构，包含头部、侧边栏、内容区和底部。
