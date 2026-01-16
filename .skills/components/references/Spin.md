# Spin — 加载中

## 功能概述

用于页面和区块的加载中状态。

## 应用场景

- 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。

## 输入字段

### Spin 属性

#### 必填

- 无必填属性。

#### 可选

- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `delay`: number (毫秒)，延迟显示加载效果的时间（防止闪烁）。
- `fullscreen`: boolean，显示带有 `Spin` 组件的背景，默认 false，版本 5.11.0。
- `indicator`: ReactNode，加载指示符。
- `percent`: number | 'auto'，展示进度，当设置 `percent="auto"` 时会预估一个永远不会停止的进度，版本 5.18.0。
- `size`: string，组件大小，可选值为 `small` `default` `large`，默认 `default`。
- `spinning`: boolean，是否为加载中状态，默认 true。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `tip`: ReactNode，当作为包裹元素时，可以自定义描述文案。
- `wrapperClassName`: string，包装器的类属性。

## 方法

- `Spin.setDefaultIndicator(indicator: ReactNode)`

## 使用建议

区块加载包裹内容使用；页面加载使用 `fullscreen`；短时间加载使用 `delay` 防闪烁。

## 示例代码

```tsx
import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Space, Spin } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Space>
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>

    <Spin tip="Loading...">
      <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      />
    </Spin>

    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />

    <Spin spinning={true} delay={500}>
      <div style={{ padding: 50 }}>Content</div>
    </Spin>
  </Space>
);
```

## 返回结果

渲染一个加载指示器，可包裹内容显示加载状态。
