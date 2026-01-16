# FloatButton — 悬浮按钮

## 功能概述

悬浮于页面上方的按钮。

## 应用场景

- 用于网站上的全局功能；。
- 无论浏览到何处都可以看见的按钮。

## 输入字段

### 共同的 API 属性

#### 必填

- 无必填属性。

#### 可选

- `icon`: ReactNode，自定义图标。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `content`: ReactNode，文字及其它内容。
- `~~description~~`: ReactNode，请使用 `content` 代替。
- `tooltip`: ReactNode | [TooltipProps](/components/tooltip-cn#api)，气泡卡片的内容，版本 TooltipProps: 5.25.0。
- `type`: `default` | `primary`，设置按钮类型，默认 `default`。
- `shape`: `circle` | `square`，设置按钮形状，默认 `circle`。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `onClick`: (event) => void，点击按钮时的回调。
- `href`: string，点击跳转的地址，指定此属性 button 的行为和 a 链接一致。
- `target`: string，相当于 a 标签的 target 属性，href 存在时生效。
- `htmlType`: `submit` | `reset` | `button`，设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#type)，默认 `button`，版本 5.21.0。
- `badge`: [BadgeProps](/components/badge-cn#api)，带徽标数字的悬浮按钮（不支持 `status` 以及相关属性），版本 5.4.0。

### FloatButton.Group 属性

#### 必填

- 无必填属性。

#### 可选

- `shape`: `circle` | `square`，设置包含的 FloatButton 按钮形状，默认 `circle`。
- `trigger`: `click` | `hover`，触发方式（有触发方式为菜单模式）。
- `open`: boolean，受控展开，需配合 trigger 一起使用。
- `closeIcon`: React.ReactNode，自定义关闭按钮，默认 `<CloseOutlined />`。
- `placement`: `top` | `left` | `right` | `bottom`，自定义菜单弹出位置，默认 `top`，版本 5.21.0。
- `onOpenChange`: (open: boolean) => void，展开收起时的回调，需配合 trigger 一起使用。
- `onClick`: (event) => void，点击按钮时的回调（仅在菜单模式中有效），版本 5.3.0。

### FloatButton.BackTop 属性

#### 必填

- 无必填属性。

#### 可选

- `duration`: number，回到顶部所需时间（ms），默认 450。
- `target`: () => HTMLElement，设置需要监听其滚动事件的元素，默认 () => window。
- `visibilityHeight`: number，滚动高度达到此参数值才出现 BackTop，默认 400。
- `onClick`: () => void，点击按钮的回调函数。

## 方法

无公开方法。

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
    <FloatButton onClick={() => console.log('click')} />

    <FloatButton icon={<QuestionCircleOutlined />} type="primary" style={{ insetInlineEnd: 24 }} />

    <FloatButton shape="square" type="primary" description="HELP" style={{ insetInlineEnd: 84 }} />

    <FloatButton
      icon={<CustomerServiceOutlined />}
      tooltip={<div>Documents</div>}
      style={{ insetInlineEnd: 144 }}
    />

    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
      <FloatButton icon={<QuestionCircleOutlined />} />
      <FloatButton icon={<CustomerServiceOutlined />} />
      <FloatButton.BackTop visibilityHeight={0} />
    </FloatButton.Group>

    <FloatButton.Group
      trigger="hover"
      type="primary"
      style={{ insetInlineEnd: 94 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton icon={<CommentOutlined />} />
      <FloatButton icon={<QuestionCircleOutlined />} />
    </FloatButton.Group>

    <FloatButton.BackTop />
  </>
);
```

## 返回结果

渲染一个悬浮按钮，提供页面上的悬浮操作入口。
