# Avatar — 头像

## 功能概述

用来代表用户或事物，支持图片、图标或字符展示。

## 应用场景

- 用来代表用户或事物，支持图片、图标或字符展示。
- 需要在页面中以一致样式呈现头像能力时。

## 输入字段

### Avatar 属性

#### 必填

- 无必填属性。

#### 可选

- `alt`: string，图像无法显示时的替代文本。
- `gap`: number，字符类型距离左右两侧边界单位像素，默认 4，版本 4.3.0。
- `icon`: ReactNode，设置头像的自定义图标。
- `shape`: `circle` | `square`，指定头像的形状，默认 `circle`。
- `size`: number | `large` | `small` | `default` | { xs: number, sm: number, ...}，设置头像的大小，默认 `default`，版本 4.7.0。
- `src`: string | ReactNode，图片类头像的资源地址或者图片元素，版本 ReactNode: 4.8.0。
- `srcSet`: string，设置图片类头像响应式资源地址。
- `draggable`: boolean | `'true'` | `'false'`，图片是否允许拖动，默认 true。
- `crossOrigin`: `'anonymous'` | `'use-credentials'` | `''`，CORS 属性设置，版本 4.17.0。
- `onError`: () => boolean，图片加载失败的事件，返回 false 会关闭组件默认的 fallback 行为。

### Avatar.Group <Badge>4.5.0+</Badge> 属性

#### 必填

- 无必填属性。

#### 可选

- `max`: `{ count?: number; style?: CSSProperties; popover?: PopoverProps }`，设置最多显示相关配置，`5.18.0` 前可使用 [参数](https://github.com/ant-design/ant-design/blob/9d134859becbdae5b9ce276f6d9af4264691d81f/components/avatar/group.tsx#L35-L38)，版本 5.18.0。
- `size`: number | `large` | `small` | `default` | { xs: number, sm: number, ...}，设置头像的大小，默认 `default`，版本 4.8.0。
- `shape`: `circle` | `square`，设置头像的形状，默认 `circle`，版本 5.8.0。

## 方法

无公开方法。

## 使用建议

用户头像使用图片；无图片时使用图标或首字母；头像组使用 Avatar.Group。

## 示例代码

```tsx
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Tooltip } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    <Space>
      <Avatar size={64} icon={<UserOutlined />} />
      <Avatar size="large" icon={<UserOutlined />} />
      <Avatar icon={<UserOutlined />} />
      <Avatar size="small" icon={<UserOutlined />} />
    </Space>

    <Space>
      <Avatar icon={<UserOutlined />} />
      <Avatar>U</Avatar>
      <Avatar size={40}>USER</Avatar>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
    </Space>

    <Space>
      <Avatar shape="square" icon={<UserOutlined />} />
      <Avatar shape="square">U</Avatar>
    </Space>

    <Avatar.Group
      max={{
        count: 2,
        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
      }}
    >
      <Avatar src="https://joeschmoe.io/api/v1/random" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="User 3">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
  </Space>
);
```

## 返回结果

渲染一个头像，支持图片、图标或字符展示。
