# Alert — 警告提示

## 功能概述

警告提示，展现需要关注的信息。用于页面中展示重要的提示信息。

## 输入字段

### 必填

- `message`: ReactNode，警告提示内容。

### 可选

- `type`: string，警告类型，可选 `success` | `info` | `warning` | `error`，默认 `info`。
- `description`: ReactNode，辅助性文字介绍。
- `showIcon`: boolean，显示图标，默认 `false`（有 description 时默认 `true`）。
- `icon`: ReactNode，自定义图标。
- `closable`: boolean | { closeIcon, 'aria-label' }，可关闭，默认 `false`。
- `closeIcon`: ReactNode，自定义关闭图标。
- `banner`: boolean，横幅样式。
- `action`: ReactNode，操作区域。
- `afterClose`: () => void，关闭后回调。
- `onClose`: (e) => void，关闭时回调。

### Alert.ErrorBoundary 属性

用于捕获子组件错误：

- `message`: ReactNode，错误标题。
- `description`: ReactNode，错误描述。

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
