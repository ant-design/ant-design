# Popover — 气泡卡片

## 功能概述

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 应用场景

- 当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。
- 和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 输入字段

### Popover 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `content`: ReactNode | () => ReactNode，卡片内容。
- `title`: ReactNode | () => ReactNode，卡片标题。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。

## 方法

无公开方法。

## 使用建议

需要展示更多信息时使用 Popover 而非 Tooltip；需要确认操作使用 Popconfirm；点击触发的交互使用 `trigger="click"`。

## 示例代码

```tsx
import { Button, Popover, Space } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const App: React.FC = () => (
  <Space>
    <Popover content={content} title="Title">
      <Button type="primary">Hover me</Button>
    </Popover>

    <Popover content={content} title="Title" trigger="click">
      <Button>Click me</Button>
    </Popover>

    <Popover placement="topLeft" title="Title" content={content}>
      <Button>Top Left</Button>
    </Popover>
    <Popover placement="rightTop" title="Title" content={content}>
      <Button>Right Top</Button>
    </Popover>

    <Popover content="Content without title">
      <Button>No Title</Button>
    </Popover>
  </Space>
);
```

## 返回结果

渲染一个气泡卡片，用于展示更多信息。
