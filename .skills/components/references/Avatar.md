# Avatar — 头像

## 功能概述

用来代表用户或事物，支持图片、图标或字符展示。

## 输入字段

### 必填

无必填属性。

### 可选

- `src`: string，图片地址。
- `srcSet`: string，图片 srcSet 属性。
- `alt`: string，图片 alt 属性。
- `icon`: ReactNode，图标头像。
- `children`: ReactNode，字符头像。
- `size`: number | `large` | `default` | `small` | { xs, sm, md, lg, xl, xxl }，尺寸，默认 `default`。
- `shape`: string，形状，可选 `circle` | `square`，默认 `circle`。
- `gap`: number，字符头像距边框距离，默认 `4`。
- `draggable`: boolean | `true` | `false`，图片是否可拖动。
- `crossOrigin`: string，CORS 属性，可选 `anonymous` | `use-credentials`。
- `onError`: () => boolean，图片加载失败回调，返回 false 阻止默认 fallback。

### Avatar.Group 属性

- `children`: Avatar[],头像列表。
- `size`: 同上，统一尺寸。
- `shape`: 同上，统一形状。
- `max`: object，最多显示配置（5.18.0+）。
  - `count`: number，最多显示数量。
  - `style`: CSSProperties，多余头像样式。
  - `popover`: PopoverProps，气泡配置。
- `maxCount`: number，最多显示数量（已废弃，使用 max.count）。
- `maxStyle`: CSSProperties，多余头像样式（已废弃，使用 max.style）。
- `maxPopoverPlacement`: string，多余头像气泡位置（已废弃，使用 max.popover）。
- `maxPopoverTrigger`: string，多余头像气泡触发方式（已废弃，使用 max.popover）。

## 使用建议

用户头像使用图片；无图片时使用图标或首字母；头像组使用 Avatar.Group。

## 示例代码

```tsx
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Space, Tooltip } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    {/* 基础用法 */}
    <Space>
      <Avatar size={64} icon={<UserOutlined />} />
      <Avatar size="large" icon={<UserOutlined />} />
      <Avatar icon={<UserOutlined />} />
      <Avatar size="small" icon={<UserOutlined />} />
    </Space>

    {/* 类型 */}
    <Space>
      <Avatar icon={<UserOutlined />} />
      <Avatar>U</Avatar>
      <Avatar size={40}>USER</Avatar>
      <Avatar src="https://joeschmoe.io/api/v1/random" />
    </Space>

    {/* 形状 */}
    <Space>
      <Avatar shape="square" icon={<UserOutlined />} />
      <Avatar shape="square">U</Avatar>
    </Space>

    {/* 头像组 */}
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
