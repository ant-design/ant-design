# Alert — 警告提示

## 功能概述

警告提示，展现需要关注的信息。

## 应用场景

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 输入字段

### Alert 属性

#### 必填

- 无必填属性。

#### 可选

- `action`: ReactNode，自定义操作项，版本 4.9.0。
- `~~afterClose~~`: () => void，关闭动画结束后触发的回调函数，请使用 `closable.afterClose` 替换。
- `banner`: boolean，是否用作顶部公告，默认 false。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，自定义组件内部各语义化结构的类名。支持对象或函数。
- `closable`: boolean | [ClosableType](#closabletype) & React.AriaAttributes，可关闭配置，>=5.15.0: 支持 `aria-*`，默认 `false`。
- `description`: ReactNode，警告提示的辅助性文字介绍。
- `icon`: ReactNode，自定义图标，`showIcon` 为 true 时有效。
- `~~message~~`: ReactNode，警告提示内容，请使用 `title` 替换。
- `title`: ReactNode，警告提示内容。
- `showIcon`: boolean，是否显示辅助图标，默认 false，`banner` 模式下默认值为 true。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>，自定义组件内部各语义化结构的内联样式。支持对象或函数。
- `type`: string，指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error`，默认 `info`，`banner` 模式下默认值为 `warning`。
- `~~onClose~~`: (e: MouseEvent) => void，关闭时触发的回调函数，请使用 `closable.onClose` 替换。

### ClosableType 属性

#### 必填

- 无必填属性。

#### 可选

- `afterClose`: function，关闭动画结束后触发的回调函数。
- `closeIcon`: ReactNode，自定义关闭图标。
- `onClose`: (e: MouseEvent) => void，关闭时触发的回调函数。

### Alert.ErrorBoundary 属性

#### 必填

- 无必填属性。

#### 可选

- `description`: ReactNode，自定义错误内容，如果未指定会展示报错堆栈，默认 {{ error stack }}。
- `~~message~~`: ReactNode，自定义错误标题，如果未指定会展示原生报错信息，请使用 `title` 替换，默认 {{ error }}。
- `title`: ReactNode，自定义错误标题，如果未指定会展示原生报错信息，默认 {{ error }}。

## 方法

无公开方法。

## 使用建议

重要操作反馈使用 `success` 或 `error` 类型；提示信息使用 `info`；需要用户关注使用 `warning`；页面级提示使用 `banner`。

## 示例代码

```tsx
import { Alert, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon closable />
    <Alert message="Error" type="error" showIcon />
    <Alert
      message="Success Tips"
      description="Detailed description and advice about successful copywriting."
      type="success"
      showIcon
    />
  </Space>
);
```

## 返回结果

渲染一个警告提示框，用于展示重要信息。
