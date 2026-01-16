# Badge — 徽标数

## 功能概述

图标右上角的圆形徽标数字。

## 应用场景

- 一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 输入字段

### Badge 属性

#### 必填

- 无必填属性。

#### 可选

- `color`: string，自定义小圆点的颜色。
- `count`: ReactNode，展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `dot`: boolean，不展示数字，只有一个小红点，默认 false。
- `offset`: \[number, number]，设置状态点的位置偏移。
- `overflowCount`: number，展示封顶的数字值，默认 99。
- `showZero`: boolean，当数值为 0 时，是否展示 Badge，默认 false。
- `size`: `default` | `small`，在设置了 `count` 的前提下有效，设置小圆点的大小。
- `status`: `success` | `processing` | `default` | `error` | `warning`，设置 Badge 为状态点。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `text`: ReactNode，在设置了 `status` 的前提下有效，设置状态点的文本。
- `title`: string，设置鼠标放在状态点上时显示的文字。

### Badge.Ribbon 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `color`: string，自定义缎带的颜色。
- `placement`: `start` | `end`，缎带的位置，`start` 和 `end` 随文字方向（RTL 或 LTR）变动，默认 `end`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `text`: ReactNode，缎带中填入的内容。

## 方法

无公开方法。

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

      <Badge dot>
        <a href="#">Link something</a>
      </Badge>

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

      <Space>
        <Badge status="success" text="Success" />
        <Badge status="error" text="Error" />
        <Badge status="default" text="Default" />
        <Badge status="processing" text="Processing" />
        <Badge status="warning" text="Warning" />
      </Space>

      <Badge.Ribbon text="Ribbon" color="pink">
        <div style={{ padding: 20, background: '#f5f5f5' }}>Content</div>
      </Badge.Ribbon>
    </Space>
  );
};
```

## 返回结果

渲染一个徽标，用于展示数量或状态。
