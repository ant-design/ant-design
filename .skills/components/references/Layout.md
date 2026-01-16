# Layout — 布局

## 功能概述

协助进行页面级整体布局。

## 应用场景

- 协助进行页面级整体布局。
- 需要在页面中以一致样式呈现布局能力时。

## 输入字段

### Layout 属性

#### 必填

- 无必填属性。

#### 可选

- `className`: string，容器 className。
- `hasSider`: boolean，表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动。
- `style`: CSSProperties，指定样式。

### Layout.Sider 属性

#### 必填

- 无必填属性。

#### 可选

- `breakpoint`: `xs` | `sm` | `md` | `lg` | `xl` | `xxl`，触发响应式布局的[断点](/components/grid-cn#col)。
- `className`: string，容器 className。
- `collapsed`: boolean，当前收起状态。
- `collapsedWidth`: number，收缩宽度，设置为 0 会出现特殊 trigger，默认 80。
- `collapsible`: boolean，是否可收起，默认 false。
- `defaultCollapsed`: boolean，是否默认收起，默认 false。
- `reverseArrow`: boolean，翻转折叠提示箭头的方向，当 Sider 在右边时可以使用，默认 false。
- `style`: CSSProperties，指定样式。
- `theme`: `light` | `dark`，主题颜色，默认 `dark`。
- `trigger`: ReactNode，自定义 trigger，设置为 null 时隐藏 trigger。
- `width`: number | string，宽度，默认 200。
- `zeroWidthTriggerStyle`: object，指定当 `collapsedWidth` 为 0 时出现的特殊 trigger 的样式。
- `onBreakpoint`: (broken) => {}，触发响应式布局[断点](/components/grid-cn#api)时的回调。
- `onCollapse`: (collapsed, type) => {}，展开-收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发。

## 方法

无公开方法。

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
