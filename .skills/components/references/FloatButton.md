# FloatButton — 悬浮按钮

## 功能概述

悬浮按钮。用于页面上的悬浮操作入口。

## 输入字段

### 可选

- `type`: string，按钮类型，可选 `default` | `primary`，默认 `default`。
- `shape`: string，按钮形状，可选 `circle` | `square`，默认 `circle`。
- `icon`: ReactNode，按钮图标。
- `description`: ReactNode，描述文字。
- `tooltip`: ReactNode | () => ReactNode，气泡提示。
- `href`: string，点击跳转的链接。
- `target`: string，链接打开方式。
- `badge`: BadgeProps，徽标配置。
- `onClick`: (e) => void，点击回调。

### FloatButton.Group 属性

悬浮按钮组：

- `trigger`: string，触发方式，可选 `click` | `hover`。
- `open`: boolean，是否展开（受控）。
- `closeIcon`: ReactNode，关闭图标。
- `onOpenChange`: (open) => void，展开状态变化回调。

### FloatButton.BackTop 属性

回到顶部按钮：

- `visibilityHeight`: number，滚动高度达到此值才显示，默认 `400`。
- `duration`: number，滚动到顶部时间（ms），默认 `450`。
- `target`: () => HTMLElement，设置需要监听其滚动事件的元素。
- `onClick`: () => void，点击回调。

## 使用建议

常用操作使用悬浮按钮；多个操作使用 Group；长页面使用 BackTop。

## 示例代码

```tsx
import {
  CommentOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    {/* 基础用法 */}
    <FloatButton onClick={() => console.log('click')} />

    {/* 带图标和描述 */}
    <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} />

    {/* 带描述（方形） */}
    <FloatButton shape="square" type="primary" description="HELP" style={{ insetInlineEnd: 84 }} />

    {/* 带气泡提示 */}
    <FloatButton
      icon={<CustomerServiceOutlined />}
      tooltip={<div>Documents</div>}
      style={{ insetInlineEnd: 144 }}
    />

    {/* 按钮组 */}
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton icon={<CustomerServiceOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>

    {/* 可展开的组 */}
    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton icon={<CommentOutlined />} />
      <FloatButton icon={<QuestionCircleOutlined />} />
    </FloatButton.Group>

    {/* 回到顶部 */}
    <FloatButton.BackTop />
  </>
);
```

## 返回结果

渲染一个悬浮按钮，提供页面上的悬浮操作入口。
