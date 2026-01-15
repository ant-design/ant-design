# Badge — 徽标数

## 功能概述

图标右上角的圆形徽标数字或状态点。用于展示需要关注的数量或状态。

## 输入字段

### 必填

无必填属性。

### 可选

- `count`: ReactNode，展示的数字或内容。
- `dot`: boolean，不展示数字，只有一个小红点。
- `showZero`: boolean，当数值为 0 时是否展示，默认 `false`。
- `overflowCount`: number，封顶数字，超过显示 `${overflowCount}+`，默认 `99`。
- `size`: string，尺寸，可选 `default` | `small`，默认 `default`。
- `color`: string，自定义徽标颜色（预设或十六进制）。
- `status`: string，状态点，可选 `success` | `processing` | `default` | `error` | `warning`。
- `text`: ReactNode，状态点的文本。
- `title`: string，鼠标悬停时显示的标题。
- `offset`: [number, number]，偏移量 [left, top]。
- `styles`: { root, indicator }，各部分样式（5.10.0+）。
- `classNames`: { root, indicator }，各部分类名（5.7.0+）。

### Badge.Ribbon 属性

- `children`: ReactNode，包裹内容。
- `text`: ReactNode，缎带文本。
- `color`: string，缎带颜色。
- `placement`: string，位置，可选 `start` | `end`，默认 `end`。

## 使用建议

消息数量使用 count；状态指示使用 status + text；独立状态点使用不带子元素的 Badge。

## 示例代码

```tsx
import { useState } from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Switch } from 'antd';

const App: React.FC = () => {
  const [count, setCount] = useState(5);
  const [show, setShow] = useState(true);

  return (
    <Space direction="vertical">
      {/* 基础用法 */}
      <Space size="large">
        <Badge count={5}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={0} showZero>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
          <Avatar shape="square" size="large" />
        </Badge>
      </Space>

      {/* 小红点 */}
      <Badge dot>
        <a href="#">Link something</a>
      </Badge>

      {/* 封顶数字 */}
      <Space>
        <Badge count={99}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={100}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={1000} overflowCount={999}>
          <Avatar shape="square" size="large" />
        </Badge>
      </Space>

      {/* 状态点 */}
      <Space>
        <Badge status="success" text="Success" />
        <Badge status="error" text="Error" />
        <Badge status="default" text="Default" />
        <Badge status="processing" text="Processing" />
        <Badge status="warning" text="Warning" />
      </Space>

      {/* 缎带 */}
      <Badge.Ribbon text="Ribbon" color="pink">
        <div style={{ padding: 20, background: '#f5f5f5' }}>Content</div>
      </Badge.Ribbon>
    </Space>
  );
};
```

## 返回结果

渲染一个徽标，用于展示数量或状态。
