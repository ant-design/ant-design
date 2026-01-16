# Tooltip — 文字提示

## 功能概述

简单的文字提示气泡框。

## 应用场景

- 鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。
- 可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## 输入字段

### Tooltip 属性

#### 必填

- 无必填属性。

#### 可选

- `title`: ReactNode | () => ReactNode，提示文字。
- `color`: string，设置背景颜色，使用该属性后内部文字颜色将自适应，版本 5.27.0。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，语义化结构 class。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>，语义化结构 style。

## 方法

无公开方法。

## 使用建议

简短提示使用 Tooltip；复杂内容使用 Popover；配合 disabled 元素时需包装 span。

## 示例代码

```tsx
import { Button, Divider, Space, Tooltip } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    <Tooltip title="prompt text">
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>

    <div style={{ margin: 100 }}>
      <div style={{ marginBottom: 10, textAlign: 'center' }}>
        <Tooltip placement="topLeft" title="Prompt Text">
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" title="Prompt Text">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" title="Prompt Text">
          <Button>TR</Button>
        </Tooltip>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tooltip placement="bottomLeft" title="Prompt Text">
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Prompt Text">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" title="Prompt Text">
          <Button>BR</Button>
        </Tooltip>
      </div>
    </div>

    <Space>
      <Tooltip title="prompt text" color="cyan">
        <Button>Cyan</Button>
      </Tooltip>
      <Tooltip title="prompt text" color="purple">
        <Button>Purple</Button>
      </Tooltip>
      <Tooltip title="prompt text" color="#108ee9">
        <Button>Custom</Button>
      </Tooltip>
    </Space>

    <Tooltip title="Disabled Button">
      <span>
        <Button disabled style={{ pointerEvents: 'none' }}>
          Disabled
        </Button>
      </span>
    </Tooltip>
  </Space>
);
```

## 返回结果

渲染一个文字提示气泡框。
