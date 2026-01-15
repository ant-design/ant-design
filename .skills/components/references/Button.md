# Button — 按钮

## 功能概述

按钮用于开始一个即时操作，响应用户点击行为并触发相应业务逻辑。支持多种类型、尺寸和状态。

## 输入字段

### 必填

- `children`: ReactNode，按钮内容（文本或图标等）。

### 可选

- `type`: string，按钮类型，可选 `primary` | `dashed` | `link` | `text` | `default`，默认 `default`。
- `color`: string，按钮颜色（5.21.0+），可选 `default` | `primary` | `danger` 或 PresetColors。
- `variant`: string，按钮变体（5.21.0+），可选 `outlined` | `dashed` | `solid` | `filled` | `text` | `link`。
- `size`: string，按钮尺寸，可选 `large` | `middle` | `small`，默认 `middle`。
- `icon`: ReactNode，按钮图标。
- `iconPosition`: string，图标位置，可选 `start` | `end`，默认 `start`。
- `loading`: boolean | { delay: number }，加载状态，默认 `false`。
- `disabled`: boolean，禁用状态，默认 `false`。
- `ghost`: boolean，幽灵按钮（背景透明），默认 `false`。
- `danger`: boolean，危险按钮样式，默认 `false`。
- `block`: boolean，撑满父容器宽度，默认 `false`。
- `shape`: string，按钮形状，可选 `default` | `circle` | `round`，默认 `default`。
- `href`: string，点击跳转地址，指定后按钮渲染为 `<a>` 标签。
- `target`: string，配合 `href` 使用，设置链接打开方式。
- `htmlType`: string，原生 HTML type 属性，可选 `submit` | `reset` | `button`，默认 `button`。
- `onClick`: (event: MouseEvent) => void，点击事件回调。

### Button.Group 属性

- `size`: string，按钮组尺寸，可选 `large` | `default` | `small`。

## 使用建议

优先使用 `type="primary"` 作为主操作按钮，每个页面建议只有一个主按钮；危险操作使用 `danger` 属性；加载中状态使用 `loading` 防止重复提交。

## 示例代码

```tsx
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="link">Link</Button>
  </Flex>
);
```

## 返回结果

渲染一个可交互的按钮元素，支持点击事件和各种视觉状态。
